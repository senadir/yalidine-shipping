import CityInput from './city-input'
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useCallback } from '@wordpress/element'
import { getSetting } from '@woocommerce/settings';
export default function Block({
	validation,
}) {
	const { shippingAddress } = useSelect( ( select ) => {
		const store = select( storeKey );
		const { shippingAddress, useShippingAsBilling } = store.getCustomerData();
		return { shippingAddress, useShippingAsBilling };
	} );
	const { setShippingAddress, setBillingAddress } = useDispatch( storeKey );
	const setCity = useCallback( (city) => {
		setShippingAddress({
			city
		})
		setBillingAddress( {
			city
		} );
	}, [setShippingAddress, setBillingAddress]);
	const {cities} = getSetting('city_field_data');

	return (
		<CityInput
		validation={ validation }
		id='yalidine-city'
		label={__('City', 'woo-gutenberg-products-block')}
		onChange={ setCity }
		autoComplete="off"
		value={ shippingAddress.city }
		state={ shippingAddress.state }
		cities={ cities }
		required='true' />
	)
}
