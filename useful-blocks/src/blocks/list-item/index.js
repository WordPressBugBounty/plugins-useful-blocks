/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { RichText, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import pbIcon from '@blocks/icon';
import { textDomain } from '@blocks/config';

/**
 * metadata
 */
import metadata from './block.json';
const { name, apiVersion, category, keywords, parent, supports } = metadata;

registerBlockType(name, {
	apiVersion,
	title: __('Useful List Item', textDomain),
	icon: {
		foreground: pbIcon.color,
		src: pbIcon.listItem,
	},
	keywords,
	category,
	supports,
	parent,
	attributes: metadata.attributes,
	edit: ({ attributes, setAttributes, onReplace, onRemove, clientId }) => {
		const { content = '' } = attributes;
		const { getBlock, getPreviousBlockClientId, getNextBlockClientId } =
			useSelect(blockEditorStore);
		const { updateBlockAttributes, removeBlock } = useDispatch(blockEditorStore);

		const blockProps = useBlockProps({
			className: undefined,
		});

		const nextBlockClientId = getNextBlockClientId(clientId);
		const previousBlockClientId = getPreviousBlockClientId(clientId);

		return (
			<RichText
				{...blockProps}
				tagName='li'
				value={content || ''}
				placeholder={__('Text…', textDomain)}
				onChange={(value) => {
					setAttributes({ content: value });
				}}
				onMerge={(forward) => {
					if (forward) {
						if (!nextBlockClientId) {
							return;
						}
						const nextBlock = getBlock(nextBlockClientId);
						const newContent = content + nextBlock.attributes?.content || '';
						setAttributes({ content: newContent });
						removeBlock(nextBlockClientId);
					} else {
						if (!previousBlockClientId) {
							return;
						}
						const previousBlock = getBlock(previousBlockClientId);
						const newContent = previousBlock.attributes?.content || '' + content;
						updateBlockAttributes(previousBlockClientId, { content: newContent });
						removeBlock(clientId);
					}
				}}
				onReplace={onReplace}
				onRemove={onRemove}
				onSplit={(value, isOriginal) => {
					let newAttributes;
					if (isOriginal || value) {
						newAttributes = {
							...attributes,
							content: value,
						};
					}
					const block = createBlock(name, newAttributes);
					if (isOriginal) {
						block.clientId = clientId;
					}
					return block;
				}}
			/>
		);
	},

	save: ({ attributes }) => {
		const { content } = attributes;
		if (RichText.isEmpty(content)) {
			return null;
		}
		return (
			<li {...useBlockProps.save()}>
				<RichText.Content value={content} />
			</li>
		);
	},
});
