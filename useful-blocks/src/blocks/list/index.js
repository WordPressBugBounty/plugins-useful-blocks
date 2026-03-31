/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const compatibleUseInnerBlocksProps =
	typeof useInnerBlocksProps === 'function'
		? useInnerBlocksProps
		: __experimentalUseInnerBlocksProps;

/**
 * Internal dependencies
 */
import pbIcon from '@blocks/icon';
import MyToolbar from './_toolbar';
import MySidebar from './_sidebar';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * metadata
 */
import metadata from './block.json';
const { name, apiVersion, category, keywords, parent, supports } = metadata;

/**
 * Block
 */
const blockName = 'pb-list';

const isListEmpty = (listItems) => {
	if (listItems.length === 0) {
		return true;
	} else if (listItems.length === 1) {
		const firstProps = listItems[0].props;
		if (firstProps.children.length === 0) {
			return true;
		}
	}
	return false;
};

registerBlockType(name, {
	apiVersion,
	title: __('Useful List', 'useful-blocks'),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.list,
	},
	keywords,
	category,
	supports,
	parent,
	attributes: metadata.attributes,
	edit: function Edit(props) {
		const { className, attributes, setAttributes } = props;
		const { listTag, icon, showBorder } = attributes;
		const TagName = listTag;
		let blockClass = classnames(blockName, className);

		blockClass = classnames(blockClass, '-icon-' + icon);

		if (showBorder) {
			blockClass = classnames(blockClass, '-border-on');
		}

		const blockProps = useBlockProps({
			className: blockClass,
		});

		const innerBlocksProps = compatibleUseInnerBlocksProps(blockProps, {
			allowedBlocks: ['ponhiro-blocks/list-item'],
			template: [['ponhiro-blocks/list-item']],
			templateLock: false,
		});

		return (
			<>
				<BlockControls>
					<MyToolbar {...{ listTag, setAttributes }} />
				</BlockControls>
				<InspectorControls>
					<MySidebar {...{ attributes, setAttributes }} />
				</InspectorControls>
				<TagName className={blockClass} {...innerBlocksProps} />
			</>
		);
	},

	save: ({ attributes }) => {
		const { listTag, icon, showBorder } = attributes;
		const TagName = listTag;

		let blockClass = classnames(blockName, '-icon-' + icon);

		if (showBorder) {
			blockClass = classnames(blockClass, '-border-on');
		}
		const blockProps = useBlockProps.save({
			className: blockClass,
		});
		const innerBlocksProps = useInnerBlocksProps.save(blockProps);

		return <TagName {...innerBlocksProps}></TagName>;
	},
	deprecated: [
		{
			attributes: {
				listTag: {
					type: 'string',
					default: 'ul',
				},
				icon: {
					type: 'string',
					default: 'dot',
				},
				listItems: {
					type: 'array',
					source: 'children',
					selector: '.pb-list',
				},
				showBorder: {
					type: 'boolean',
					default: false,
				},
			},
			supports,
			save: ({ attributes }) => {
				const { listTag, listItems, icon, showBorder } = attributes;

				// 空の時は何も出力しない
				if (isListEmpty(listItems)) {
					return null;
				}

				let blockClass = classnames(blockName, '-icon-' + icon);

				if (showBorder) {
					blockClass = classnames(blockClass, '-border-on');
				}

				return (
					<RichText.Content tagName={listTag} className={blockClass} value={listItems} />
				);
			},
			migrate: (attributes) => {
				const { listTag, listItems, icon, showBorder } = attributes;
				if (!!listItems.length === 0) {
					return { listTag, icon, showBorder };
				}

				const innerBlocks = listItems.map((item) => {
					return createBlock('ponhiro-blocks/list-item', {
						content: item.props.children,
					});
				});
				return [{ listTag, icon, showBorder }, innerBlocks];
			},
		},
	],
});
