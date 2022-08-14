<?php

use Automattic\WooCommerce\Blocks\Integrations\IntegrationInterface;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CartSchema;
use Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema;
use Automattic\WooCommerce\StoreApi\StoreApi;

defined( 'ABSPATH' ) || exit;

/**
 * Class Yalidine_Blocks_Integration
 *
 * Class for integrating marketing optin block with WooCommerce Checkout
 *
 */
class Yalidine_Blocks_Integration implements IntegrationInterface {

	/**
	 * The name of the integration.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'city_field';
	}

	/**
	 * When called invokes any initialization/setup for the integration.
	 */
	public function initialize() {
		$this->register_frontend_scripts();
		$this->register_editor_scripts();
		$this->register_editor_blocks();
		//$this->extend_store_api();
		add_filter( '__experimental_woocommerce_blocks_add_data_attributes_to_block', [ $this, 'add_attributes_to_frontend_blocks' ], 10, 1 );
	}

	public function register_frontend_scripts() {
		$script_path       = '/build/frontend.js';
		$script_url        = plugins_url( $script_path, __FILE__ );
		$script_asset_path = dirname( __FILE__ ) . '/build/frontend.asset.php';
		$script_asset      = file_exists( $script_asset_path )
			? require $script_asset_path
			: array(
				'dependencies' => array(),
				'version'      => $this->get_file_version( $script_asset_path ),
			);

		wp_register_script(
			'yalidine-city-field-frontend',
			$script_url,
			$script_asset['dependencies'],
			$script_asset['version'],
			true
		);
		wp_set_script_translations(
			'yalidine-city-field-frontend', // script handle
			'yalidine-shipping', // text domain
			dirname( __FILE__ ) . '/languages'
		);
	}

	public function register_editor_scripts() {
		$script_path       = '/build/index.js';
		$script_url        = plugins_url( $script_path, __FILE__ );
		$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
		$script_asset      = file_exists( $script_asset_path )
			? require $script_asset_path
			: array(
				'dependencies' => array(),
				'version'      => $this->get_file_version( $script_asset_path ),
			);

		wp_register_script(
			'yalidine-city-field-editor',
			$script_url,
			$script_asset['dependencies'],
			$script_asset['version'],
			true
		);

		wp_set_script_translations(
			'yalidine-city-field-editor', // script handle
			'yalidine-shipping', // text domain
			dirname( __FILE__ ) . '/languages'
		);
	}
	/**
	 * Returns an array of script handles to enqueue in the frontend context.
	 *
	 * @return string[]
	 */
	public function get_script_handles() {
		return array( 'yalidine-city-field-frontend' );
	}

	/**
	 * Returns an array of script handles to enqueue in the editor context.
	 *
	 * @return string[]
	 */
	public function get_editor_script_handles() {
		return array( 'yalidine-city-field-editor' );
	}

	/**
	 * An array of key, value pairs of data made available to the block on the client side.
	 *
	 * @return array
	 */
	public function get_script_data() {
		$cities = include 'inc/cities-dz.php';
		$data = array(
			'cities' => $cities,
		);

		return $data;
	}

	/**
	 * Register blocks.
	 */
	public function register_editor_blocks() {
		register_block_type( dirname( __FILE__ ) . '/build/city-field', array(
			'editor_script' => 'yalidine-city-field-editor',
		) );
	}

	/**
	 * This allows dynamic (JS) blocks to access attributes in the frontend.
	 *
	 * @param string[] $allowed_blocks
	 */
	public function add_attributes_to_frontend_blocks( $allowed_blocks ) {
		$allowed_blocks[] = 'yalidine/city-field';
		return $allowed_blocks;
	}

	private function format_cities( $cities ) {
		return array_map(
			function( $city, $id ) {
				return array('id' => $id, 'value' => $city);
			},
			$cities,
			array_keys( $cities )
		);
	}
	/**
	 * Add schema Store API to support posted data.
	 */
	public function extend_store_api() {
		$extend = StoreApi::container()->get(
			ExtendSchema::class
		);
		$cities = include 'inc/cities-dz.php';

		$extend->register_endpoint_data(
			array(
				'endpoint'        => CartSchema::IDENTIFIER,
				'namespace'       => $this->get_name(),
				'schema_callback' => function() {
					return array(
						'cities' => array(
							'description' => __( 'Cities in current state.', 'yalidine-shipping' ),
							'type'        => 'array',
							'context'     => array(),
							'items'       => [
								'type'       => 'object',
								'properties' => [
									'id'   => [
										'description' => __( 'city id.', 'yalidine-shipping' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
									'value' => [
										'description' => __( 'city name.', 'yalidine-shipping' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
								],
							],
						),
					);
				},
				'data_callback' => function() use ( $cities ) {
					$state = WC()->customer->get_shipping_state();
					$country = WC()->customer->get_shipping_country();
					if ( $country !== 'DZ' || empty( $state ) ) {
						return [];
					}
					return $this->format_cities( $cities[ $state ] );
					return array(
						'cities' => array(
							'description' => __( 'Cities in current state.', 'yalidine-shipping' ),
							'type'        => 'array',
							'context'     => array(),
							'items'       => [
								'type'       => 'object',
								'properties' => [
									'id'   => [
										'description' => __( 'city id.', 'yalidine-shipping' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
									'value' => [
										'description' => __( 'city name.', 'yalidine-shipping' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
								],
							],
						),
					);
				}
			)
		);
	}

	/**
	 * Get the file modified time as a cache buster if we're in dev mode.
	 *
	 * @param string $file Local path to the file.
	 * @return string The cache buster value to use for the given file.
	 */
	protected function get_file_version( $file ) {
		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG && file_exists( $file ) ) {
			return filemtime( $file );
		}
		return YALIDINE_VERSION;
	}
}