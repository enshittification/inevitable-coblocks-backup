/**
 * External dependencies
 */
import times from 'lodash/times';
import memoize from 'memize';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { Button, Tooltip } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Icon, plus } from '@wordpress/icons';

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change. HEAD
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'coblocks/accordion-item' ];

/**
 * Returns the layouts configuration for a given number of accordion items.
 *
 * @param {number} count Number of accordion items.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'coblocks/accordion-item' ] );
} );

/**
 * Block edit function
 */
class AccordionEdit extends Component {
	render() {
		const {
			clientId,
			attributes,
			className,
			isSelected,
		} = this.props;

		const {
			count,
		} = attributes;

		const items = this.props.getBlocksByClientId( clientId );

		const handleEvent = ( ) => {
			if ( items[ 0 ].innerBlocks ) {
				const lastId = items[ 0 ].innerBlocks[ items[ 0 ].innerBlocks.length - 1 ].clientId;
				let copyAttributes = {};

				if ( lastId ) {
					const lastBlockClient = this.props.getBlockAttributes( lastId );
					if ( lastBlockClient.backgroundColor ) {
						copyAttributes = Object.assign( copyAttributes, {
							backgroundColor: lastBlockClient.backgroundColor,
						} );
					}

					if ( lastBlockClient.borderColor ) {
						copyAttributes = Object.assign( copyAttributes, {
							borderColor: lastBlockClient.borderColor,
						} );
					}

					if ( lastBlockClient.textColor ) {
						copyAttributes = Object.assign( copyAttributes, {
							textColor: lastBlockClient.textColor,
						} );
					}

					if ( lastBlockClient.customTextColor ) {
						copyAttributes = Object.assign( copyAttributes, {
							customTextColor: lastBlockClient.customTextColor,
						} );
					}
				}

				const created = createBlock( 'coblocks/accordion-item', copyAttributes );
				this.props.insertBlock( created, undefined, clientId );
			}
		};

		return (
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div className={ className }>
					<InnerBlocks
						template={ getCount( count ) }
						allowedBlocks={ ALLOWED_BLOCKS }
						__experimentalCaptureToolbars={ true }
					/>
					{ isSelected && (
						<div className="coblocks-block-appender">
							<Tooltip text={ __( 'Add accordion item', 'coblocks' ) }>
								<Button
									label={ __( 'Add accordion item', 'coblocks' ) }
									className="block-editor-button-block-appender"
									onMouseDown={ handleEvent }
								>
									<Icon icon={ plus } />
								</Button>
							</Tooltip>
						</div>
					) }
				</div>
			</Fragment>
		);
	}
}

export default compose( [

	withSelect( ( select, props ) => {
		const {
			getBlockAttributes,
			getBlocksByClientId,
			getBlockHierarchyRootClientId,
			getSelectedBlockClientId,
		} = select( 'core/block-editor' );

		// Get clientID of the parent block.
		const rootClientId = getBlockHierarchyRootClientId( props.clientId );
		const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );

		return {
			getBlockAttributes,
			getBlocksByClientId,
			isSelected: props.isSelected || rootClientId === selectedRootClientId,
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			insertBlock,
		} = dispatch( 'core/block-editor' );

		return {
			insertBlock,
		};
	} ),

] )( AccordionEdit );
