import * as helpers from '../../../../.dev/tests/cypress/helpers';

import {
	TYPOGRAPHY_FEATURE_ENABLED_KEY,
} from '../constants';

before( () => {
	helpers.addBlockToPost( 'core/heading', true );
} );

describe( 'Settings Modal: Typography feature', () => {
	beforeEach( () => {
		// Reset settings.
		helpers.getWindowObject().then( ( win ) => {
			win.wp.data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
				[ TYPOGRAPHY_FEATURE_ENABLED_KEY ]: true,
			} );
		} );

		cy.get( '.edit-post-visual-editor .wp-block[data-type="core/heading"]' ).first().click();

		// Open settings modal.
		cy.get( '.interface-interface-skeleton__header .edit-post-more-menu .components-button' ).click();
	} );

	it( 'Editor settings menu should not exist', () => {
		cy.get( '.components-menu-item__button,.components-button' ).contains( 'Editor settings' ).should( 'not.exist' );
	} );
} );
