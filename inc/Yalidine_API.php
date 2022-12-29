<?php

class Yalidine_API {

	private $api_token;

	private $api_id;

	public $api_route = 'https://api.yalidine.app/v1/';

	public $parcel_route = 'parcels';

	public $commune_route = 'communes';

	public $fees_route = 'deliveryfees';

	public $wilaya_route = 'wilayas';


	private $default_params = array(
		'Fields' => null,
		'Page' => null,
		'page_size' => null,
		'order_by' => null,
		'desc' => null
	);

	public function __construct() {
		$this->api_token = get_option( 'yalidine_shipping_api_token' );
		$this->api_id    = get_option( 'yalidine_shipping_api_id' );
	}

	public function is_ready() {
		if ( ! $this->api_id || ! $this->api_token ) {
			return false;
		}
		return true;
	}

	private function get_route( $route, $body = [] ) {
		$data = array(
			'headers' => array(
				'X-API-TOKEN' => $this->api_token,
				'X-API-ID'    => $this->api_id
			),
			'method'  => 'GET',
			'body'    => $body
		);

		$response = wp_remote_request( $this->api_route . $route, $data );
		$response = wp_remote_retrieve_body( $response );
		$response = json_decode( $response, true );
		$response = $response['data'];
		return $response;
	}

	public function get_delivery_fees( $args = [] ) {
		$args = wp_parse_args(
			$args,
			array_merge(
				$this->default_params,
				[
					'wilaya_id' => null
				]
			)
		);
		$cached_fees = get_transient( $args['wilaya_id'] . '-yalidine-fees' );
		if ( $cached_fees === false ) {
			$fees = $this->get_route( $this->fees_route, $args );
			$fees = $fees[0];
			set_transient( $args['wilaya_id'] . '-yalidine-fees', $fees );
			return $fees;
		}

		return $cached_fees;
	}

	public function get_communes( $args = [] ) {
		$args = wp_parse_args(
			$args,
			array_merge(
				$this->default_params,
				[
					'id' => null,
					'wilaya_id' => null,
					'has_stop_desk' => null,
					'is_deliverable' => null
				]
			)
		);
		$id = $args['id'] ?? $args['wilaya_id'];
		$cached_communes = get_transient( $id . '-yalidine-communes' );
		if ( $cached_communes === false ) {
			$communes = $this->get_route( $this->commune_route, $args );
			set_transient( $id . '-yalidine-communes', $communes );
			return $communes;
		}
		return $cached_communes;
	}

	public function get_wilayas( $args = [] ) {
		$args = wp_parse_args(
			$args,
			array_merge(
				$this->default_params,
				[
					'id' => null,
					'name' => null
				]
			)
		);
		return $this->get_route( $this->wilaya_route, $args );
	}

	public function get_parcels( $tracking_map ) {
		if ( ! is_array( $tracking_map ) ) {
			return;
		}
		return $this->get_route( $this->parcel_route . '?tracking=' . join( ',', $tracking_map ) );
	}

	public function create_labels( $args = [] ) {
		$labels = [];
		foreach ( $args as $label ) {
			$labels[] = wp_parse_args(
				$label,
					[
						'order_id' => null,
						'firstname' => null,
						'familyname' => null,
						'contact_phone' => null,
						'address' => null,
						'to_commune_name' => null,
						'to_wilaya_name' => null,
						'product_list' => '',
						'price' => 0,
						'freeshipping' => true,
						'is_stopdesk' => false,
						'has_exchange' => false,
						'product_to_collect' => null
					]
			);
		}

		$data = array(
			'headers' => array(
				'X-API-TOKEN'  => $this->api_token,
				'X-API-ID'     => $this->api_id,
				'Content-Type' => 'application/json'
			),
			'method'  => 'POST',
			'body'    => json_encode( $labels )
		);
		$response = wp_remote_request( $this->api_route . $this->parcel_route, $data );
		$response = wp_remote_retrieve_body( $response );
		$response = json_decode( $response, true );
		return $response;
	}

	public function delete_labels( $labels = [] ) {
		$data = array(
			'headers' => array(
				'X-API-TOKEN'  => $this->api_token,
				'X-API-ID'     => $this->api_id,
				'Content-Type' => 'application/json'
			),
			'method'  => 'DELETE',
		);
		$response = wp_remote_request( $this->api_route . $this->parcel_route . '?tracking=' . implode( ',', $labels ) , $data );
		$response = wp_remote_retrieve_body( $response );
		$response = json_decode( $response, true );
		return $response;
	}
}