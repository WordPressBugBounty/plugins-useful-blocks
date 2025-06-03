<?php
namespace Ponhiro_Blocks;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * ブロックの登録
 */
add_action( 'init', function() {
	$blocks = [
		'cv-box',
		'cv-box-note',
		'compare-box',
		'iconbox',
		'list',
		'list-item',
		'button',
		'image',
		'bar-graph',
		'bar-graph-item',
		'rating-graph',
		'rating-graph-item',
	];
	foreach( $blocks as $block ) {
		pb_register_block_type( $block );
	}
});


/**
 * ブロックの登録処理
 */
function pb_register_block_type( $block_name ) {
	$asset = include( USFL_BLKS_PATH. 'dist/blocks/'. $block_name .'/index.asset.php');

	$script_handle = 'ponhiro-blocks/'. $block_name;

	// ブロック用スクリプトの登録
	wp_register_script(
		$script_handle,
		USFL_BLKS_URL. 'dist/blocks/'. $block_name .'/index.js',
		array_merge( ['ponhiro-blocks-script'], $asset['dependencies'] ),
		$asset['version'],
		true
	);

	// ブロックの登録
	register_block_type(
		'ponhiro-blocks/'. $block_name,
		[
			// 'editor_style'    => 'ponhiro-blocks-style',
			'editor_script'   => $script_handle,
		]
	);
}


/**
 * ブロックカテゴリー追加
 */
global $wp_version;
$hookname = ( version_compare( $wp_version, '5.8-beta' ) >= 0 ) ? 'block_categories_all' : 'block_categories';
add_filter( $hookname, function( $categories ) {

	$my_category = [
		[
			'slug'  => 'useful-blocks',
			'title' => __( 'Useful Blocks', 'useful-blocks' ),
			'icon'  => null,
		]
	];

	// ウィジェットの前にカテゴリーを追加する
	foreach ( $categories as $index => $data ) {
		$slug = $data['slug'] ?? '';
		if ( 'widgets' === $slug ) {
			array_splice( $categories, $index, 0, $my_category );
			break;
		}
	}

	return $categories;
} );

/**
 * リストブロックで空のulタグを出力しない
 */
add_filter( 'render_block_ponhiro-blocks/list', function ( $block_content, $block ) {
	$is_empty = true;
	foreach ( $block['innerBlocks'] as $inner_block ) {
		if ( ! empty( $inner_block['innerHTML'] ) ) {
			$is_empty = false;
			break;
		}
	}
	return $is_empty ? null : $block_content;
}, 10, 2 );
