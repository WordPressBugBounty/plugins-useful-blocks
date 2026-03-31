/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Button,
	ButtonGroup,
	BaseControl,
	RadioControl,
	CheckboxControl,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import FreePreview from '@blocks/freePreview';
import LsIconPicker from '@components/LsIconPicker';
import { isPro } from '@blocks/config';

/**
 * 設定項目
 */
const markTypeOptions = [
	{
		label: __('Dot', 'useful-blocks'),
		value: 'dot',
	},
	{
		label: __('Icon', 'useful-blocks'),
		value: 'icon',
	},
	{
		label: __('Image', 'useful-blocks'),
		value: 'image',
	},
];

export default ({ attributes, setAttributes }) => {
	const { activePoint, maxStep, markType, iconClass, mediaId, mediaUrl } = attributes;

	const setImage = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
		});
	};

	const removeImage = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: '',
		});
	};

	const pointControls = useMemo(() => {
		const mapNums = maxStep === 5 ? [1, 2, 3, 4, 5] : [1, 2, 3];
		const points = activePoint.split(',');

		return mapNums.map((num) => {
			const numStr = String(num);
			return (
				<CheckboxControl
					key={`checkbox_key_${num}`}
					checked={points.includes(numStr)}
					onChange={(checked) => {
						let newActivePoints = [...points];
						if (checked) {
							newActivePoints.push(numStr);
						} else {
							newActivePoints = newActivePoints.filter((point) => {
								return point !== numStr;
							});
						}
						setAttributes({ activePoint: newActivePoints.join(',') });
					}}
				/>
			);
		});
	}, [maxStep, activePoint, setAttributes]);

	return (
		<>
			<PanelBody title={__('Graph setting', 'useful-blocks')} initialOpen={true}>
				<div className="pb-rating-pointControls">
					<div className="components-base-control__label">
						{__('Position of active point', 'useful-blocks')}
					</div>
					<div className="__checks">{pointControls}</div>
				</div>
				<FreePreview
					description={__(
						'you can set the number of steps in the graph.',
						'useful-blocks',
					)}
				>
					<BaseControl>
						<BaseControl.VisualLabel>
							{__('Number of steps in the graph', 'useful-blocks')}
						</BaseControl.VisualLabel>
						<ButtonGroup className="pb-btn-group">
							<Button
								isPrimary={3 === maxStep}
								onClick={() => {
									setAttributes({ maxStep: 3 });
								}}
							>
								{__('3 stages', 'useful-blocks')}
							</Button>
							<Button
								isPrimary={5 === maxStep}
								onClick={() => {
									setAttributes({ maxStep: 5 });
								}}
							>
								{__('5 stages', 'useful-blocks')}
							</Button>
						</ButtonGroup>
					</BaseControl>
				</FreePreview>
				<FreePreview description={__('you can use icons and images.', 'useful-blocks')}>
					<RadioControl
						label={__('Active point shape', 'useful-blocks')}
						selected={markType}
						options={markTypeOptions}
						onChange={(val) => {
							if (!isPro) {
								return;
							}
							setAttributes({ markType: val });
						}}
					/>
					{'icon' === markType && (
						<>
							<BaseControl>
								<BaseControl.VisualLabel>
									{__('Select Icon', 'useful-blocks')}
								</BaseControl.VisualLabel>
								<LsIconPicker
									value={iconClass}
									onChange={(val) => {
										setAttributes({ iconClass: val });
									}}
									clearable={false}
								/>
							</BaseControl>
							{/* <TextControl
								label={__('Icon class', 'useful-blocks')}
								value={iconClass}
								onChange={(val) => {
									setAttributes({ iconClass: val });
								}}
							/> */}
						</>
					)}
					{'image' === markType && (
						<div className="pb-media-setting -rating-graph">
							<div className="pb-media-setting__preview">
								{mediaUrl && <img src={mediaUrl} alt="" />}
							</div>
							<div className="pb-media-setting__btns">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											// console.log(media);
											if (media) {
												setImage(media);
											} else {
												removeImage();
											}
										}}
										allowedTypes={['image', 'video']}
										value={mediaId}
										render={({ open }) => (
											<Button isPrimary onClick={open}>
												{mediaUrl
													? __('Change media', 'useful-blocks')
													: __('Select media', 'useful-blocks')}
											</Button>
										)}
									/>
								</MediaUploadCheck>
								{mediaUrl && (
									<Button
										isSecondary
										className="__delete"
										onClick={() => {
											removeImage();
										}}
									>
										{__('Delete', 'useful-blocks')}
									</Button>
								)}
							</div>
						</div>
					)}
				</FreePreview>
			</PanelBody>
		</>
	);
};
