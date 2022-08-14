<?php

class Yalidine_Shipping_Label {

	public function __construct() {
		add_action( 'wp_ajax_yalidine_shipping_create_shipping_label', [ $this, 'creat_shipping_label' ] );
		add_action( 'admin_head', [ $this, 'print_create_label_styles' ] );
		add_filter( 'woocommerce_admin_order_actions', [ $this, 'add_shipping_label_button' ], 100, 2 );

		$this->yalidine_api = new Yalidine_API();
	}

	public function add_shipping_label_button( $actions, $order  ) {
		if ( $order->has_status( array( 'processing', 'on-hold' ) ) ) {

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
		// current_user_can( 'edit_shop_orders' ) && check_admin_referer( 'yalidine_shipping_create_shipping_label' ) && isset( $_GET['order_id'] )
			if ( true ) {
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
						$phone        = $order->get_billing_phone() ?? $order->get_shipping_phone();
						$state        = $order->get_shipping_state();
						$city         = $is_stop_desk ? $rate->get_meta('desk') : $this->get_formatted_city_name( $order->get_shipping_city() );
						$items = array_map( [ $this, 'formate_items' ], $order->get_items( 'line_item' ) );

						$labels[] = array (
							"order_id"           => $order->get_id() . '-' . $rate_id,
							"firstname"          => $order->get_shipping_first_name(),
							"familyname"         => $order->get_shipping_first_name(),
							"contact_phone"      => $phone,
							"address"            => $order->get_shipping_address_1(),
							"to_commune_name"    => $city,
							"to_wilaya_name"     => $this->get_formatted_state_name( $state ),
							"product_list"       => implode( '\n', $items ),
							"price"              => intval( $order->get_total('raw') ),
							"is_stopdesk"        => $is_stop_desk,
						);
					}
					$labels = $this->yalidine_api->create_labels( $labels );
					foreach ( $labels as $label ) {
						$order->add_order_note( sprintf( __( 'Shipping label with tracking %s created', 'yalidine-shipping' ), $label['tracking'] ) , true);
						$order->update_meta_data( 'yalidine_shipping_label', $label['labels'] );
					}
					$order->save();
					header( 'Location: ' . $order->get_meta( 'yalidine_shipping_label' ) );
				}
			}

			exit;
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