/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

function CoBlocksFieldTextControl( props ) {
	const { attributes, setAttributes, isSelected, name } = props;
	const { required, label, textColor, customTextColor } = attributes;

	return (
		<Fragment>
			<div className="coblocks-field">
				<CoBlocksFieldLabel
					required={ required }
					label={ label }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
					name={ name }
					textColor={ textColor }
					customTextColor={ customTextColor }
				/>
				<TextControl />
			</div>
		</Fragment>
	);
}

export default CoBlocksFieldTextControl;
