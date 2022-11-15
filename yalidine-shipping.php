<?php
/**
 * Plugin Name:     Yalidine Shipping
 * Plugin URI:      https://yalidine.app
 * Description:     Yalidine integration to create shipping labels from your dashboard.
 * Author:          Nadir Seghir
 * Author URI:      https://profiles.wordpress.org/assassinateur/
 * Text Domain:     yalidine-shipping
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Yalidine_Shipping
 */

// Your code starts here.
define( 'YALIDINE_VERSION', '0.1.0' );

add_filter(
	'woocommerce_shipping_settings',
	function ( $settings ) {

		/*$submit_button = array_pop( $settings );*/

		$settings[] = array(
			'title' => __( 'Yalidine API', 'yalidine-shipping' ),
			'type'  => 'title',
			'id'    => 'yalidine-shipping',
		);

		$settings[] = array(
			'title'         => __( 'API ID', 'yalidine-shipping' ),
			'desc'          => __( 'Yalidine API ID, i.e. 94986571734304520846', 'yalidine-shipping' ),
			'id'            => 'yalidine_shipping_api_id',
			'default'       => '',
			'type'          => 'password',
			'autoload'      => true,
		);

		$settings[] = array(
			'title'         => __( 'API TOKEN', 'yalidine-shipping' ),
			'desc'          => __( 'Yalidine API Token, i.e. 5MKfvcyQtO3eouL6tDv0VDFhUT8Sc7w5', 'yalidine-shipping' ),
			'id'            => 'yalidine_shipping_api_token',
			'default'       => '',
			'type'          => 'password',
			'autoload'      => true,
		);

		$settings[] = array(
			'type' => 'sectionend',
			'id'   => 'yalidine_shipping',
		);

		return $settings;
	},
	10,
	1
);


add_filter(
	'woocommerce_get_country_locale',
	function ( $countries ) {
		$countries['DZ'] = array(
			'state' => array(
				'priority' => 65,
				'label'    => __( 'Wilaya', 'yalidine-shipping' ),
			),
			'postcode' => array(
				'hidden' => true,
				'required' => false
			),
			'address_1' => array(
				'hidden' => false,
				'required' => false
			)

		);
		return $countries;
	},
	1,
	10
);

require_once __DIR__ . '/inc/Yalidine_API.php';
require_once __DIR__ . '/inc/Yalidine_Shipping_Method.php';
require_once __DIR__ . '/inc/Yalidine_Shipping_Label.php';
require_once __DIR__ . '/inc/Yalidine_Shipping_Status.php';

new Yalidine_Shipping_Label();
new Yalidine_Shipping_Status();

add_filter( 'wc_city_select_cities', 'yalidine_dz_cities' );

function yalidine_dz_cities( $cities ) {
	  $cities_data = include 'inc/cities-dz.php';
    $cities['DZ'] = $cities_data;
    return $cities;
}

add_action( 'plugins_loaded', function() {
	if ( class_exists( '\Automattic\WooCommerce\Blocks\Package' ) ) {
		require dirname( __FILE__ ) . '/woocommerce-blocks-integration.php';
		add_action(
			'woocommerce_blocks_checkout_block_registration',
			function( $integration_registry ) {
				$integration_registry->register( new Yalidine_Blocks_Integration() );
			},
			10,
			1
		);
	}
} );

add_action( 'init', 'yalidine_load_textdomain' );

function yalidine_load_textdomain() {
    load_plugin_textdomain( 'yalidine-shipping', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}