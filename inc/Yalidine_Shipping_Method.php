<?php

function yalidine_shipping_method() {
	class Yalidine_Shipping_Rate extends WC_Shipping_Rate {
		/**
		 * Stores data for this rate.
		 *
		 * @since 3.2.0
		 * @var   array
		 */
		protected $data = array(
			'id'            => '',
			'method_id'     => '',
			'instance_id'   => 0,
			'label'         => '',
			'description'   => '',
			'delivery_time' => '',
			'cost'          => 0,
			'taxes'         => array(),
		);

		/**
		 * Set rate description.
		 *
		 * @param string $description Shipping rate description.
		 */
		public function set_description( $description ) {
			$this->data['description'] = (string) $description;
		}

		/**
		 * Set rate delivery time.
		 *
		 * @param string $delivery_time Shipping rate delivery time.
		 */
		public function set_delivery_time( $delivery_time ) {
			$this->data['delivery_time'] = (string) $delivery_time;
		}

		/**
		 * Get rate description.
		 *
		 */
		public function get_description() {
			return $this->data['description'];
		}

		/**
		 * Get rate delivery time.
		 *
		 */
		public function get_delivery_time() {
			return $this->data['delivery_time'];
		}
	}
	class Yalidine_Shipping_Method extends WC_Shipping_Method {
		/**
		* Constructor for your shipping class
		*
		* @access public
		* @return void
		*/
		public function __construct() {
			$this->id                 = 'yalidine-shipping';
			$this->method_title       = __( 'Yalidine', 'yalidine-shipping' );
			$this->method_description = __( 'Add Yalidine home delivery and stop desk rates', 'yalidine-shipping' );
			$this->availability       = 'including';
			$this->countries          = array( 'DZ' );
			$this->init();

			$this->enabled            = isset( $this->settings['enabled'] ) ? $this->settings['enabled'] : 'yes';
			$this->title              = isset( $this->settings['title'] ) ? $this->settings['title'] : __( 'Yalidine Shipping', 'yalidine-shipping' );

			$this->yalidine_api       = new Yalidine_API();
		}

		/**
	 * Add a shipping rate. If taxes are not set they will be calculated based on cost.
	 *
	 * @param array $args Arguments (default: array()).
	 */
	public function add_rate( $args = array() ) {
		$args = wp_parse_args(
			$args,
			array(
				'id'             => $this->get_rate_id(), // ID for the rate. If not passed, this id:instance default will be used.
				'label'          => '', // Label for the rate.
				'description'    => '',
				'delivery_time'  => '',
				'cost'           => '0', // Amount or array of costs (per item shipping).
				'taxes'          => '', // Pass taxes, or leave empty to have it calculated for you, or 'false' to disable calculations.
				'calc_tax'       => 'per_order', // Calc tax per_order or per_item. Per item needs an array of costs.
				'meta_data'      => array(), // Array of misc meta data to store along with this rate - key value pairs.
				'package'        => false, // Package array this rate was generated for @since 2.6.0.
				'price_decimals' => wc_get_price_decimals(),
			)
		);

		// ID and label are required.
		if ( ! $args['id'] || ! $args['label'] ) {
			return;
		}

		// Total up the cost.
		$total_cost = is_array( $args['cost'] ) ? array_sum( $args['cost'] ) : $args['cost'];
		$taxes      = $args['taxes'];

		// Taxes - if not an array and not set to false, calc tax based on cost and passed calc_tax variable. This saves shipping methods having to do complex tax calculations.
		if ( ! is_array( $taxes ) && false !== $taxes && $total_cost > 0 && $this->is_taxable() ) {
			$taxes = 'per_item' === $args['calc_tax'] ? $this->get_taxes_per_item( $args['cost'] ) : WC_Tax::calc_shipping_tax( $total_cost, WC_Tax::get_shipping_tax_rates() );
		}

		// Round the total cost after taxes have been calculated.
		$total_cost = wc_format_decimal( $total_cost, $args['price_decimals'] );

		// Create rate object.
		$rate = new Yalidine_Shipping_Rate();
		$rate->set_id( $args['id'] );
		$rate->set_method_id( $this->id );
		$rate->set_instance_id( $this->instance_id );
		$rate->set_label( $args['label'] );
		$rate->set_description( $args['description'] );
		$rate->set_delivery_time( $args['delivery_time'] );
		$rate->set_cost( $total_cost );
		$rate->set_taxes( $taxes );

		if ( ! empty( $args['meta_data'] ) ) {
			foreach ( $args['meta_data'] as $key => $value ) {
				$rate->add_meta_data( $key, $value );
			}
		}

		// Store package data.
		if ( $args['package'] ) {
			$items_in_package = array();
			foreach ( $args['package']['contents'] as $item ) {
				$product            = $item['data'];
				$items_in_package[] = $product->get_name() . ' &times; ' . $item['quantity'];
			}
			$rate->add_meta_data( __( 'Items', 'woocommerce' ), implode( ', ', $items_in_package ) );
		}

		$this->rates[ $args['id'] ] = apply_filters( 'woocommerce_shipping_method_add_rate', $rate, $args, $this );
	}
		/**
		* Init your settings
		*
		* @access public
		* @return void
		*/
		function init() {
			// Load the settings API
			$this->init_form_fields();
			$this->init_settings();

			// Save settings in admin if you have any defined
			add_action( 'woocommerce_update_options_shipping_' . $this->id, array( $this, 'process_admin_options' ) );
		}

		/**
		* Define settings field for this shipping
		* @return void
		*/
		function init_form_fields() {
			$this->form_fields = array(
				'enabled' => array(
					'title'       => __( 'Enable', 'yalidine-shipping' ),
					'type'        => 'checkbox',
					'description' => __( 'Enable this shipping.', 'yalidine-shipping' ),
					'default'      => 'yes'
				),

				'title' => array(
					'title'       => __( 'Title', 'yalidine-shipping' ),
					'type'        => 'text',
					'description' => __( 'Title to be display on site', 'dyalidine-shipping' ),
					'default'     => __( 'Yalidine Shipping', 'yalidine-shipping' )
				),
				'exclude' => array(
					'title'       => __( 'Skip wilaya', 'yalidine-shipping' ),
					'type'        => 'text',
					'description' => __( 'Wilayas to skip from using Yalidine', 'dyalidine-shipping' ),
					'default'     => __( '', 'yalidine-shipping' )
				),
			);
		}

		/**
		* This function is used to calculate the shipping cost. Within this function we can check for weights, dimensions and other parameters.
		*
		* @access public
		* @param mixed $package
		* @return void
		*/
		public function calculate_shipping( $package = array() ) {

			if ( ! $this->yalidine_api->is_ready() ) {
				return;
			}

			$wilaya = $package["destination"]["state"];

			if ( ! $wilaya ) {
				return;
			}
			$excluded_wilayas = isset( $this->settings['exclude'] ) ? $this->settings['exclude'] : '';

			$excluded_wilayas = explode(',', $excluded_wilayas );

			if ( in_array( $wilaya, $excluded_wilayas ) ) {
				return;
			}

			$wilaya_id = substr( $wilaya, 3 );

			$extra_weight_fees = $this->extra_weight_fees( $package );

			$fees = $this->yalidine_api->get_delivery_fees( [ 'wilaya_id' => $wilaya_id ] );

			$stop_desks = $this->yalidine_api->get_communes( [ 'has_stop_desk' => true, 'wilaya_id' => $wilaya_id ] );

			$delivery_time = min( $stop_desks[0][ 'delivery_time_parcel' ], $stop_desks[0][ 'delivery_time_payment' ] );
			$home_rate = array(
				'id'            => $this->id . '-home',
				'label'         => __( 'Express home delivery', 'yalidine-shipping' ),
				'cost'          => $fees['home_fee'] + $extra_weight_fees,
				'description'   => __('Delivered to your home', 'yalidine-shipping'),
				'delivery_time' => sprintf( _n( 'arrives in %d day', 'arrives in %d days', $delivery_time, 'yalidine-shipping' ), $delivery_time )
			);

			foreach ( $stop_desks as $stop_desk ) {
				$translated_city_label = translate( $stop_desk['name'], 'yalidine-shipping' );

				$stopdesk_rate = array(
					'id'            => $this->id . '-stopdesk-' . sanitize_title($stop_desk['name']),
					'label'         => sprintf( __( 'Yalidine Stop desk - %s', 'yalidine-shipping' ), $translated_city_label ),
					'cost'          => $fees['desk_fee'] + $extra_weight_fees,
					'description'   => sprintf( __('Pick it up from %s desk stop', 'yalidine-shipping'), $translated_city_label ),
					'delivery_time' => sprintf( _n( 'arrives in %d day', 'arrives in %d days', $delivery_time, 'yalidine-shipping' ), $delivery_time ),
					'meta_data'     => array(
						'is_stop_desk' => true,
						'desk'         => $stop_desk['name']
					)
				);
				$this->add_rate( $stopdesk_rate );
			}

			$this->add_rate( $home_rate );
		}

		protected function extra_weight_fees( $package = array() ) {
			$weight = 0;
			$base_free_weight = 5;
			$expensive_wilayats = array( "DZ-47", "DZ-01", "DZ-32", "DZ-45", "DZ-08", "DZ-37","DZ-11", "DZ-33" );

			if ( in_array( $wilaya = $package["destination"]["state"], $expensive_wilayats ) ) {
				$per_kg = 100;
			} else {
				$per_kg = 50;
			}

			foreach ( $package['contents'] as $item_id => $values ) {
				$_product = $values['data'];
				$product_weight = (int) $_product->get_weight() ?? 0;
				$weight = $weight + ($product_weight * $values['quantity']);
			}

			$weight = wc_get_weight( $weight, 'kg' );

			if( $weight <= 5 ) {
				return 0;
			} else {
				$extra_weight = $weight - $base_free_weight;
				return $extra_weight * $per_kg;
			}
		}

	}
}

add_action( 'woocommerce_shipping_init', 'yalidine_shipping_method' );

function add_yalidine_shipping_method( $methods ) {
		$methods[] = 'Yalidine_Shipping_Method';
		return $methods;
}

add_filter( 'woocommerce_shipping_methods', 'add_yalidine_shipping_method' );
