import { useMemo } from '@wordpress/element';

export const ValidationInputError = ({
	errorMessage = '',
	propertyName = '',
	elementId = '',
	getValidationError,
}) => {
	const errorId = useMemo(() => {
		const error = getValidationError(propertyName);
		if (!error || error.hidden) {
			return '';
		}
		return `validate-error-${propertyName}`;
	}, []);

	if (!errorMessage || typeof errorMessage !== 'string') {
		const error = getValidationError(propertyName) || {};
		if (error.message && !error.hidden) {
			errorMessage = error.message;
		} else {
			return null;
		}
	}

	return (
		<div className="wc-block-components-validation-error" role="alert">
			<p id={errorId}>{errorMessage}</p>
		</div>
	);
};

export default ValidationInputError;
