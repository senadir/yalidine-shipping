// Aliased import
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';
import metadata from './block.json';
import Block from './block'
const options = {
	metadata,
	component: Block,
};

registerCheckoutBlock(options);
