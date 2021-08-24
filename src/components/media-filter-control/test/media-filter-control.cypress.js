/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Media Filter Control component', function() {
	/**
	 * Custom test for WP.com build to make sure we're not extending the
	 * core/image block.
	 */
	it( 'Test core/image block is not extended with Media Filter Control component.', function() {
		helpers.addBlockToPost( 'core/image', true );

		helpers.upload.imageToBlock( 'core/image' );

		cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter .components-dropdown-menu__toggle' )
			.should( 'not.exist' );

		cy.reload();
	} );

	/**
	 * Custom test for WP.com build to make sure we're not extending the
	 * core/gallery block.
	 */
	it( 'Test core/gallery block extends with Media Filter Control component.', function() {
		helpers.addBlockToPost( 'core/gallery', true );

		helpers.upload.imageToBlock( 'core/gallery' );

		cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter' )
			.should( 'not.exist' );

		cy.reload();
	} );
} );
