/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, BaseControl, Button, ButtonGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import FreePreview from '@blocks/freePreview';
/**
 * component
 */
const ColsetDOM = ({ colset }) => {
	return (
		<span className="pb-bar-graph" data-colset={colset} data-bg="1">
			<span className="pb-bar-graph__dl" data-bg="1">
				<span className="pb-bar-graph__item">
					<span className="pb-bar-graph__dt">
						<span className="pb-bar-graph__fill"></span>
					</span>
					<span className="pb-bar-graph__dd"></span>
				</span>
				<span className="pb-bar-graph__item">
					<span className="pb-bar-graph__dt">
						<span className="pb-bar-graph__fill"></span>
					</span>
					<span className="pb-bar-graph__dd"></span>
				</span>
			</span>
		</span>
	);
};

/**
 * 設定
 */
// カラーセット
const colorSets = ['y', 'p', 'g', 'b', '1'];

// 右テキストの位置
const valuePosChoices = {
	left: __('Left justified', 'useful-blocks'),
	right: __('Right justified', 'useful-blocks'),
};

// 左テキストの位置
const labelPosChoices = {
	top: __('Top', 'useful-blocks'),
	inner: __('Inner', 'useful-blocks'),
};

/**
 * InspectorControls
 */
export default ({ attributes, setAttributes }) => {
	const { colSet, hideTtl, ttlData, bg, barBg, valuePos, labelPos } = attributes;

	return (
		<>
			<PanelBody title={__('Color set', 'useful-blocks')} initialOpen={true}>
				<BaseControl>
					<ButtonGroup className="pb-panel--colorSet -bar-graph">
						{colorSets.map((setNum) => {
							const isSelected = colSet === setNum;
							const buttonId = 'pb-iconbox-colset-' + setNum;
							return (
								<div className="__btnBox" key={`key_style_${setNum}`}>
									<button
										type="button"
										id={buttonId}
										className="__btn"
										onClick={() => {
											setAttributes({
												colSet: setNum,
											});
										}}
									></button>
									<label
										htmlFor={buttonId}
										className="__label"
										data-selected={isSelected || null}
									>
										<ColsetDOM colset={setNum} />
									</label>
								</div>
							);
						})}
					</ButtonGroup>
				</BaseControl>
			</PanelBody>
			<PanelBody title={__('Title settings', 'useful-blocks')} initialOpen={true}>
				<ToggleControl
					label={__("Don't show", 'useful-blocks')}
					checked={hideTtl}
					onChange={(bool) => {
						setAttributes({ hideTtl: bool });
					}}
				/>

				<ToggleControl
					label={__('Add a border below', 'useful-blocks')}
					checked={'border' === ttlData}
					onChange={(bool) => {
						if (bool) {
							setAttributes({ ttlData: 'border' });
						} else {
							setAttributes({ ttlData: 'normal' });
						}
					}}
				/>
			</PanelBody>
			<PanelBody title={__('Graph settings', 'useful-blocks')} initialOpen={true}>
				<ToggleControl
					label={__('Add background color', 'useful-blocks')}
					checked={bg}
					onChange={(value) => {
						setAttributes({ bg: value });
					}}
				/>
				<FreePreview
					description={__('you can make more detailed settings.', 'useful-blocks')}
				>
					<ToggleControl
						label={__('Color the right side of the graph', 'useful-blocks')}
						checked={barBg}
						onChange={(value) => {
							setAttributes({ barBg: value });
						}}
					/>
					<BaseControl>
						<BaseControl.VisualLabel>
							{__('The position of the label on the left', 'useful-blocks')}
						</BaseControl.VisualLabel>
						<ButtonGroup className="pb-btn-group">
							{Object.keys(labelPosChoices).map((pos) => {
								return (
									<Button
										key={`key_${pos}`}
										isPrimary={pos === labelPos}
										onClick={() => {
											setAttributes({ labelPos: pos });
										}}
									>
										{labelPosChoices[pos]}
									</Button>
								);
							})}
						</ButtonGroup>
					</BaseControl>
					<BaseControl>
						<BaseControl.VisualLabel>
							{__('The position of the label on the right', 'useful-blocks')}
						</BaseControl.VisualLabel>
						<ButtonGroup className="pb-btn-group">
							{Object.keys(valuePosChoices).map((pos) => {
								return (
									<Button
										key={`key_${pos}`}
										isPrimary={pos === valuePos}
										onClick={() => {
											setAttributes({ valuePos: pos });
										}}
									>
										{valuePosChoices[pos]}
									</Button>
								);
							})}
						</ButtonGroup>
					</BaseControl>
				</FreePreview>
			</PanelBody>
		</>
	);
};
