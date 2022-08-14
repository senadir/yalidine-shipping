

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { getSetting } from '@woocommerce/settings';
/**
* Internal dependencies
*/
import Block from './block'

 const { optinDefaultText } = getSetting( 'newsletter-test_data', '' );

 export const Edit = ( { attributes, setAttributes } ) => {
	 const blockProps = useBlockProps();
	 const validation = {
		hasValidationErrors: false,
		getValidationError: () => undefined,
		clearValidationError: () => undefined,
		hideValidationError: () => undefined,
		setValidationErrors: () => undefined,
	}

	 return (
		 <div { ...blockProps }>
			 <Block validation={ validation } />
		 </div>
	 );
 };

 export const Save = ( { attributes } ) => {
	 const { text } = attributes;
	 return (
		 <div { ...useBlockProps.save() }>
			 <RichText.Content value={ text } />
		 </div>
	 );
 };