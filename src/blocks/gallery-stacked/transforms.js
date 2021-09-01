/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { GalleryTransforms } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [
				'coblocks/gallery-collage',
				'coblocks/gallery-masonry',
				'coblocks/gallery-offset',
				'coblocks/gallery-carousel',
				'core/gallery',
			],
			transform: ( attributes ) => (
				createBlock( metadata.name, {
					...GalleryTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/image' ],
			transform: ( attributes ) => {
				const validImages = filter( attributes, ( { id, url } ) => Number.isInteger( id ) && url );
				const hasCaption = !! filter( attributes, ( { caption } ) => !! caption );

				if ( validImages.length > 0 ) {
					return createBlock( metadata.name, {
						images: validImages.map( ( { id, url, alt, caption }, index ) => ( { index, id, url, alt: alt || '', caption: caption || '' } ) ),
						ids: validImages.map( ( { id } ) => id ),
						captions: hasCaption,
					} );
				}
				return createBlock( metadata.name );
			},
		},
		{
			type: 'prefix',
			prefix: ':stacked',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform: ( attributes ) => createBlock( 'core/gallery', {
				...GalleryTransforms( attributes ),
			} ),
		},
	],
};

export default transforms;
