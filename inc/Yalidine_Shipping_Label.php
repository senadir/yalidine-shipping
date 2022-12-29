<?php

class Yalidine_Shipping_Label {

	public function __construct() {
		add_action( 'wp_ajax_yalidine_shipping_create_shipping_label', [ $this, 'creat_shipping_label' ] );
		add_action( 'admin_head', [ $this, 'print_create_label_styles' ] );
		add_filter( 'woocommerce_admin_order_actions', [ $this, 'add_shipping_label_button' ], 100, 2 );
		add_filter( 'bulk_actions-edit-post', [ $this, 'add_create_label_bulk_action' ] );
		add_filter( 'handle_bulk_actions-edit-post', [ $this, 'handle_create_label_bulk_action' ] , 10, 3 );

		$this->yalidine_api = new Yalidine_API();
	}

	public function add_create_label_bulk_action( $bulk_array ) {

		$bulk_array[ 'yalidine_bulk_create_label' ] = 'Create labels';
		return $bulk_array;

	}

	// process the action
	public function handle_create_label_bulk_action( $redirect, $doaction, $object_ids ) {

		// let's remove query args first
		$redirect = remove_query_arg(
			array( 'yalidine_create_label' ),
			$redirect
		);

		// do something for "Make Draft" bulk action
		if ( 'yalidine_bulk_create_label' === $doaction ) {

			foreach ( $object_ids as $post_id ) {
				wp_update_post(
					array(
						'ID' => $post_id,
						'post_status' => 'draft' // set status
					)
				);
			}

			// do not forget to add query args to URL because we will show notices later
			$redirect = add_query_arg(
				'bulk_make_draft', // just a parameter for URL
				count( $object_ids ), // how many posts have been selected
				$redirect
			);

		}

		return $redirect;

	}


	public function add_shipping_label_button( $actions, $order  ) {
		$order_shipping_methods = array_map(
			function( $method ) {
				return $method->get_method_id();
			},
			$order->get_shipping_methods(),
		);
		if ( $order->has_status( array( 'processing', 'on-hold', 'pending' ) ) && in_array( 'yalidine-shipping', $order_shipping_methods ) ) {

			// Get Order ID (compatibility all WC versions)
			$order_id = method_exists( $order, 'get_id' ) ? $order->get_id() : $order->id;
			// Set the action button
			$actions['yalidine'] = array(
					'url'       => wp_nonce_url( admin_url( 'admin-ajax.php?action=yalidine_shipping_create_shipping_label&order_id=' . $order_id ), 'yalidine_shipping_create_shipping_label' ),
					'name'      => __( 'Create shipping label', 'yalidine-shipping' ),
					'action'    => "view yalidine-shipping",
			);
		}
		return $actions;
	}

	public function print_create_label_styles() {
		echo '<style>.view.yalidine-shipping::after { font-family: dashicons; content: "\f498" !important; }</style>';
	}

	public function creat_shipping_label() {
			if ( current_user_can( 'edit_shop_orders' ) && check_admin_referer( 'yalidine_shipping_create_shipping_label' ) && isset( $_GET['order_id'] ) ) {
				$order  = wc_get_order( absint( wp_unslash( $_GET['order_id'] ) ) );

				$shipping_label = $order->get_meta( 'yalidine_shipping_label' );

				if ( $shipping_label ) {
					header( 'Location: ' . $shipping_label );
					exit;
				} else {
					if ( ! $this->yalidine_api->is_ready() ) {
						exit;
					}
					$labels = [];
					foreach ($order->get_items( 'shipping' ) as $rate_id => $rate) {
						$is_stop_desk = (bool) $rate->get_meta('is_stop_desk');
						$is_cod       = $order->get_payment_method() === 'cod';
						$phone        = $order->get_billing_phone() ?? $order->get_shipping_phone();
						$state        = $order->get_shipping_state();
						$city         = $is_stop_desk ? $rate->get_meta('desk') : $this->get_formatted_city_name( $order->get_shipping_city() );
						$items = array_map( [ $this, 'formate_items' ], $order->get_items( 'line_item' ) );

						$labels[] = array (
							"order_id"           => $order->get_id() . '-' . $rate_id,
							"firstname"          => $order->get_shipping_first_name(),
							"familyname"         => $order->get_shipping_last_name(),
							"contact_phone"      => $phone,
							"address"            => $order->get_shipping_address_1(),
							"to_commune_name"    => $city,
							"to_wilaya_name"     => $this->get_formatted_state_name( $state ),
							"product_list"       => implode( ' | ', $items ),
							"price"              => $is_cod ? intval( $order->get_total('raw') ) : 0,
							"is_stopdesk"        => $is_stop_desk,
						);
					}
					$labels = $this->yalidine_api->create_labels( $labels );
					foreach ( $labels as $label ) {
						$order->add_order_note( sprintf( __( 'Shipping label with tracking %s created', 'yalidine-shipping' ), $label['tracking'] ) , true);
						$order->update_meta_data( 'yalidine_shipping_label', $label['labels'] );
						$order->update_meta_data( 'yalidine_tracking_number', $label['tracking'] );
					}
					$order->save();
					header( 'Location: ' . $order->get_meta( 'yalidine_shipping_label' ) );
				}
			}

			exit;
		}

	protected function get_shipping_labels( $orders ) {
		$ready_labels = [];
		$uncreated_labels = [];

		foreach ( $orders as $order ) {
			$shipping_label = $order->get_meta( 'yalidine_shipping_label' );
			if ( $shipping_label ) {
				$ready_labels[] = $shipping_label;
				continue;
			}

			foreach ($order->get_items( 'shipping' ) as $rate_id => $rate) {
				$is_stop_desk = (bool) $rate->get_meta('is_stop_desk');
				$is_cod       = $order->get_payment_method() === 'cod';
				$phone        = $order->get_billing_phone() ?? $order->get_shipping_phone();
				$state        = $order->get_shipping_state();
				$city         = $is_stop_desk ? $rate->get_meta('desk') : $this->get_formatted_city_name( $order->get_shipping_city() );
				$items = array_map( [ $this, 'formate_items' ], $order->get_items( 'line_item' ) );

				$uncreated_labels[] = array (
					"order_id"           => $order->get_id() . '-' . $rate_id,
					"firstname"          => $order->get_shipping_first_name(),
					"familyname"         => $order->get_shipping_last_name(),
					"contact_phone"      => $phone,
					"address"            => $order->get_shipping_address_1(),
					"to_commune_name"    => $city,
					"to_wilaya_name"     => $this->get_formatted_state_name( $state ),
					"product_list"       => implode( ' | ', $items ),
					"price"              => $is_cod ? intval( $order->get_total('raw') ) : 0,
					"is_stopdesk"        => $is_stop_desk,
				);
			}

		}



		$labels = $this->yalidine_api->create_labels( $labels );
		$label = $labels[0];
		$order->add_order_note( sprintf( __( 'Shipping label with tracking %s created', 'yalidine-shipping' ), $label['tracking'] ) , true);
		$order->update_meta_data( 'yalidine_shipping_label', $label['labels'] );
		$order->update_meta_data( 'yalidine_tracking_number', $label['tracking'] );
		$order->save();
		return $label['labels'];


	}
	protected function formate_items( $item ) {
		return $item->get_name() . " x " . $item->get_quantity();
	}

	protected function get_formatted_state_name( $state ) {

		// If state isn't on DZ-XX format, it means it comes from shipping rate and is already formatted.
		if ( ! preg_match( '/DZ-\d{2}/', $state ) ) {
			return $state;
		}
		$state_id = substr( $state, -2 );
		$state    = $this->yalidine_api->get_wilayas([
			'id' => $state_id
		]);
		$state    = $state[0];

		return $state[ 'name' ];
	}

	protected function get_formatted_city_name( $city ) {
		// If city isn't on DZ-XX-XXXX format, it means it comes from shipping rate and is already formatted.
		if ( ! preg_match( '/DZ-\d{2}-\d{3,4}/', $city ) ) {
			return $city;
		}

		preg_match( '/DZ-\d{2}-(\d{3,4})/', $city, $city_id );
		$city_id = $city_id[1];
		$city    = $this->yalidine_api->get_communes([
			'id' => $city_id
		]);
		$city    = $city[0];

		return $city[ 'name' ];
	}
}