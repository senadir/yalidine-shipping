/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { useCallback, useMemo, useEffect, useRef } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import ValidatedTextInput from './text-input';
import Combobox from './combobox';

const optionMatcher = (value, options) => {
	const foundOption = options.find(
		(option) =>
			option.label.toLocaleUpperCase() === value.toLocaleUpperCase() ||
			option.value.toLocaleUpperCase() === value.toLocaleUpperCase()
	);
	return foundOption ? foundOption.value : '';
};

const StateInput = ({
	className,
	id,
	cities = {},
	state,
	label,
	onChange,
	autoComplete = 'off',
	value = '',
	required = false,
	validation,
}) => {
	const citiesByState = cities[state] || {};
	const options = useMemo(
		() =>
			Object.entries(citiesByState).map(([id, value]) => ({
				value: id,
				label: decodeEntities(value),
			})),
		[[cities, state]]
	);
	/**
	 * Handles state selection onChange events. Finds a matching state by key or value.
	 */
	const onChangeState = useCallback(
		(stateValue) => {
			onChange(
				options.length > 0
					? optionMatcher(stateValue, options)
					: stateValue
			);
		},
		[onChange, options]
	);

	/**
	 * Track value changes.
	 */
	const valueRef = useRef(value);

	useEffect(() => {
		if (valueRef.current !== value) {
			valueRef.current = value;
		}
	}, [value]);

	useEffect(() => {
		if (state && Boolean(value) === false) {
			onChangeState(options[0].value);
		}
	}, [state, value]);

	/**
	 * If given a list of options, ensure the value matches those options or trigger change.
	 */
	useEffect(() => {
		if (options.length > 0 && valueRef.current) {
			const match = optionMatcher(valueRef.current, options);
			if (match !== valueRef.current) {
				onChangeState(match);
			}
		}
	}, [options, onChangeState]);

	if (options.length > 0) {
		return (
			<>
				<Combobox
					className={classnames(
						className,
						'wc-block-components-city-input'
					)}
					id={id}
					label={label}
					onChange={onChangeState}
					options={options}
					value={value}
					errorMessage={__(
						'Please select a city.',
						'woo-gutenberg-products-block'
					)}
					required={required}
					autoComplete={autoComplete}
					validation={validation}
				/>
				{autoComplete !== 'off' && (
					<input
						type="text"
						aria-hidden={true}
						autoComplete={autoComplete}
						value={value}
						onChange={(event) => onChangeState(event.target.value)}
						style={{
							minHeight: '0',
							height: '0',
							border: '0',
							padding: '0',
							position: 'absolute',
						}}
						tabIndex={-1}
					/>
				)}
			</>
		);
	}

	return (
		<ValidatedTextInput
			className={className}
			id={id}
			label={label}
			onChange={onChangeState}
			autoComplete={autoComplete}
			value={value}
			required={required}
			validation={validation}
		/>
	);
};

export default StateInput;
