<?php


/**
 * Service class for adding DraftOrder functionality to WooCommerce core.
 *
 * Sets up all logic related to the Checkout Draft Orders service
 *
 * @internal
 */
class Yalidine_Shipping_Status {

	const DB_STATUS = 'wc-yalidine-shipping';
	const STATUS    = 'yalidine-shipping';

	const processing_statuses = [
    "Pas encore expédié",
    "A vérifier",
    "En préparation",
    "Pas encore ramassé",
    "Prêt à expédier",
	];
	const shipping_statuses = [
    "Ramassé",
    "Transfert",
    "Expédié",
    "Centre",
    "Vers Wilaya",
    "Reçu à Wilaya",
    "En attente du client",
    "Sorti en livraison",
    "En attente",
    "En alerte",
    "Alerte résolue",
    "Tentative échouée",
    "Echèc livraison",
    "Retour vers centre",
    "Retourné au centre",
    "Retour transfert",
    "Retour groupé",
    "Retour à retirer",
    "Retour vers vendeur",
    "Retourné au vendeur",
    "Echange échoué"
	];

	const completed_statuses = [
    "Livré",
	];
	public function __construct() {
		$this->yalidine_api = new Yalidine_API();
		add_filter( 'wc_order_statuses', [ $this, 'register_shipping_status' ] );
		add_filter( 'woocommerce_register_shop_order_post_statuses', [ $this, 'register_shipping_post_status' ] );
		add_action( 'yalidine_update_shipping_orders', [ $this, 'update_shipping_status_orders' ] );
		add_action( 'admin_init', [ $this, 'install' ] );

	}

	/**
	 * Installation related logic for Draft order functionality.
	 *
	 * @internal
	 */
	public function install() {
		$this->maybe_create_cronjobs();
	}

	/**
	 * Maybe create cron events.
	 */
	protected function maybe_create_cronjobs() {
		if ( function_exists( 'as_next_scheduled_action' ) && false === as_next_scheduled_action( 'yalidine_update_shipping_orders' ) ) {
			as_schedule_recurring_action( strtotime( 'next hour' ), HOUR_IN_SECONDS, 'yalidine_update_shipping_orders' );
		}
	}

	/**
	 * Register custom order status for orders created via the API during checkout.
	 *
	 * Draft order status is used before payment is attempted, during checkout, when a cart is converted to an order.
	 *
	 * @param array $statuses Array of statuses.
	 * @internal
	 * @return array
	 */
	public function register_shipping_status( array $statuses ) {
		$statuses[ self::DB_STATUS ] = _x( 'Shipping', 'Order status', 'yalidine-shipping' );
		return $statuses;
	}

	/**
	 * Register custom order post status for orders created via the API during checkout.
	 *
	 * @param array $statuses Array of statuses.
	 * @internal

	 * @return array
	 */
	public function register_shipping_post_status( array $statuses ) {
		$statuses[ self::DB_STATUS ] = $this->get_post_status_properties();
		return $statuses;
	}

	/**
	 * Returns the properties of this post status for registration.
	 *
	 * @return array
	 */
	private function get_post_status_properties() {
		return [
			'label'                     => _x( 'Shipping', 'Order status', 'yalidine-shipping' ),
			'public'                    => false,
			'exclude_from_search'       => false,
			'show_in_admin_all_list'    => true,
			'show_in_admin_status_list' => true,
			/* translators: %s: number of orders */
			'label_count'               => _n_noop( 'Shippings <span class="count">(%s)</span>', 'Shippings <span class="count">(%s)</span>', 'yalidine-shipping' ),
		];
	}

	/**
	 * Delete draft orders older than a day in batches of 20.
	 *
	 * Ran on a daily cron schedule.
	 *
	 * @internal
	 */
	public function update_shipping_status_orders() {
		$orders = wc_get_orders(
			[
				'status'        => [self::DB_STATUS, 'wc-processing'],
				'type'          => 'shop_order',
				'meta_key'      => 'yalidine_tracking_number', // The postmeta key field
				'meta_compare'  => 'EXISTS',
			]
		);

		// do we bail because the query results are unexpected?
		try {
			if ( $orders ) {
				$this->update_orders_status( $orders );
			}

		} catch ( Exception $error ) {
			wc_caught_exception( $error, __METHOD__ );
		}
	}

	/**
	 * Since it's possible for third party code to clobber the `$wp_post_statuses` global,
	 * we need to do a final check here to make sure the draft post status is
	 * registered with the global so that it is not removed by WP_Query status
	 * validation checks.
	 */
	private function ensure_shipping_status_registered() {
		$is_registered = get_post_stati( [ 'name' => self::DB_STATUS ] );
		if ( empty( $is_registered ) ) {
			register_post_status(
				self::DB_STATUS,
				$this->get_post_status_properties()
			);
		}
	}

	private function update_orders_status( $orders ) {
		$tracking_map = array_map( function( $order ) {
			$shipping_label = $order->get_meta( 'yalidine_tracking_number' );
			return $shipping_label;
		}, $orders );
		$parcels = $this->yalidine_api->get_parcels( $tracking_map );
		foreach ($parcels as $parcel ) {
			$tracking_number = $parcel['tracking'];
			$orders = wc_get_orders( [
				'meta_key'      => 'yalidine_tracking_number', // The postmeta key field
				'meta_value'    => $tracking_number,
			] );
			$order = $orders[0];

			if ( ! $order ) {
				continue;
			}
			$parcel_status = $parcel['last_status'];
			if ( in_array( $parcel_status, self::processing_statuses ) && $order->get_status() !== 'processing' ) {
				$order->set_status( 'processing' );
				$order->save();
				continue;
			}
			if ( in_array( $parcel_status, self::shipping_statuses ) && $order->get_status() !== 'yalidine-shipping' ) {
				$order->set_status( 'yalidine-shipping' );
				$order->save();
				continue;
			}
			if ( in_array( $parcel_status, self::completed_statuses ) && $order->get_status() !== 'completed' ) {
				$order->set_status( 'completed' );
				$order->save();
				continue;
			}
		}
	}
	/**
	 * Asserts whether incoming order results are expected given the query
	 * this service class executes.
	 *
	 * @param WC_Order[] $order_results The order results being asserted.
	 * @param int        $expected_batch_size The expected batch size for the results.
	 * @throws Exception If any assertions fail, an exception is thrown.
	 */
	private function assert_order_results( $order_results, $expected_batch_size ) {
		// if not an array, then just return because it won't get handled
		// anyways.
		if ( ! is_array( $order_results ) ) {
			return;
		}

		$suffix = ' This is an indicator that something is filtering WooCommerce or WordPress queries and modifying the query parameters.';

		// if count is greater than our expected batch size, then that's a problem.
		if ( count( $order_results ) > 20 ) {
			throw new Exception( 'There are an unexpected number of results returned from the query.' . $suffix );
		}

		// if any of the returned orders are not draft (or not a WC_Order), then that's a problem.
		foreach ( $order_results as $order ) {
			if ( ! ( $order instanceof WC_Order ) ) {
				throw new Exception( 'The returned results contain a value that is not a WC_Order.' . $suffix );
			}
			if ( ! $order->has_status( self::STATUS, 'processing' ) ) {
				throw new Exception( 'The results contain an order that is not a `wc-yalidine-shipping` or `wc-processing` status in the results.' . $suffix );
			}
		}
	}
}
