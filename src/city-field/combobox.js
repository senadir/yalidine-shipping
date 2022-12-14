/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';
import { ComboboxControl } from 'wordpress-components';
import ValidationInputError from './text-input/validation-input-error';

const Combobox = ({
	id,
	className,
	label,
	onChange,
	options,
	value,
	required = false,
	errorMessage = __('Please select a value.', 'woo-gutenberg-products-block'),
	errorId: incomingErrorId,
	instanceId = '0',
	autoComplete = 'off',
	validation,
}) => {
	const { getValidationError, setValidationErrors, clearValidationError } =
		validation;

	const controlRef = useRef(null);
	const controlId = id || 'control-' + instanceId;
	const errorId = incomingErrorId || controlId;
	const error = getValidationError(errorId) || {
		message: '',
		hidden: false,
	};

	useEffect(() => {
		if (!required || value) {
			clearValidationError(errorId);
		} else {
			setValidationErrors({
				[errorId]: {
					message: errorMessage,
					hidden: true,
				},
			});
		}
		return () => {
			clearValidationError(errorId);
		};
	}, [
		clearValidationError,
		value,
		errorId,
		errorMessage,
		required,
		setValidationErrors,
	]);

	// @todo Remove patch for ComboboxControl once https://github.com/WordPress/gutenberg/pull/33928 is released
	// Also see https://github.com/WordPress/gutenberg/pull/34090
	return (
		<div
			id={controlId}
			className={classnames('wc-block-components-combobox', className, {
				'is-active': value,
				'has-error': error.message && !error.hidden,
			})}
			ref={controlRef}
		>
			<ComboboxControl
				className={'wc-block-components-combobox-control'}
				label={label}
				onChange={onChange}
				onFilterValueChange={(filterValue) => {
					if (filterValue.length) {
						// If we have a value and the combobox is not focussed, this could be from browser autofill.
						const activeElement =
							controlRef.current instanceof Object
								? controlRef.current.ownerDocument.activeElement
								: undefined;

						if (
							activeElement &&
							controlRef.current instanceof Object &&
							controlRef.current.contains(activeElement)
						) {
							return;
						}

						// Try to match.
						const normalizedFilterValue =
							filterValue.toLocaleUpperCase();
						const foundOption = options.find(
							(option) =>
								option.label
									.toLocaleUpperCase()
									.startsWith(normalizedFilterValue) ||
								option.value.toLocaleUpperCase() ===
									normalizedFilterValue
						);
						if (foundOption) {
							onChange(foundOption.value);
						}
					}
				}}
				options={options}
				value={value || ''}
				allowReset={false}
				autoComplete={autoComplete}
				aria-invalid={error.message && !error.hidden}
			/>
			<ValidationInputError
				getValidationError={getValidationError}
				propertyName={errorId}
			/>
		</div>
	);
};

export default withInstanceId(Combobox);
