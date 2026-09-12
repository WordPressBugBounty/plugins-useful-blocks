<?php
namespace Ponhiro_Blocks;

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\hook__wp_enqueue_scripts', 12 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\hook__admin_enqueue_scripts' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\hook__enqueue_block_assets' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\hook__enqueue_block_editor_assets' );


/**
 * フロント用ファイルの読み込み
 */
function hook__wp_enqueue_scripts() {
	
	wp_enqueue_style( 'ponhiro-blocks-front', USFL_BLKS_URL . 'dist/css/front.css', [], USFL_BLKS_VER );
	
	// PHPで生成するスタイル
	wp_add_inline_style( 'ponhiro-blocks-front', \Ponhiro_Blocks\Style::output( 'front' ) );
}


/**
 * 管理画面（設定ページ）用ファイルの読み込み
 */
function hook__admin_enqueue_scripts( $hook_suffix ) {

	// 設定ページかどうか
	$is_menu_page = false !== strpos( $hook_suffix, 'useful_blocks' );

	// 設定ページにだけ読み込むファイル
	if ( $is_menu_page ) {
		wp_enqueue_style( 'ponhiro-blocks-admin', USFL_BLKS_URL . 'dist/css/admin.css', [], USFL_BLKS_VER );
		wp_add_inline_style( 'ponhiro-blocks-admin', get_editor_inline_css() );

		// カラーピッカー
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );

		// メディアアップローダー
		wp_enqueue_media();
		wp_enqueue_script( 'ponhiro-blocks-media', USFL_BLKS_URL . '/dist/js/media.js', ['jquery'], USFL_BLKS_VER, true );
	
		// CSS
		wp_enqueue_style( 'ponhiro-blocks-menu', USFL_BLKS_URL . 'dist/css/admin_menu.css', [], USFL_BLKS_VER );

		// JS
		wp_enqueue_script( 'ponhiro-blocks-menu', USFL_BLKS_URL . 'dist/js/admin_menu.js', ['jquery', 'wp-color-picker', 'wp-i18n'], USFL_BLKS_VER, true );

		// インラインで出力するグローバル変数
		wp_localize_script( 'ponhiro-blocks-menu', 'pbVars', [
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'ajaxNonce' => wp_create_nonce( 'pb-ajax-nonce' ),
		] );

		// JS用翻訳ファイルの読み込み: 設定画面のJS用
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_enqueue_script( 'ponhiro-blocks-script', USFL_BLKS_URL .'assets/js/empty.js', [], USFL_BLKS_VER, true );
			wp_set_script_translations( 'ponhiro-blocks-script', 'useful-blocks', USFL_BLKS_PATH . 'languages' );
		}
	}
}


/**
 * ブロックエディター用スタイルの読み込み
 *
 * WP 7.1 以降エディターは常に iframe 化され、enqueue_block_editor_assets や admin_enqueue_scripts で
 * 読み込んだスタイルは iframe 内のキャンバスに届かない。iframe 用アセットは enqueue_block_assets から
 * 収集されるため、エディター用スタイルはここで読み込む（親ページにも同時に読み込まれる）。
 */
function hook__enqueue_block_assets() {

	// フロントは wp_enqueue_scripts 側で読み込む
	if ( ! is_admin() ) return;

	wp_enqueue_style( 'ponhiro-blocks-style', USFL_BLKS_URL . 'dist/css/blocks.css', [], USFL_BLKS_VER );

	// 親ページ用と iframe 用アセット収集（別の WP_Styles インスタンス）で呼ばれるため、インスタンスごとに1回だけ付与する
	if ( ! wp_styles()->get_data( 'ponhiro-blocks-style', 'after' ) ) {
		wp_add_inline_style( 'ponhiro-blocks-style', get_editor_inline_css() );
	}
}


/**
 * PHPで生成するエディター用スタイル。Style::output() は呼ぶたびにルールが蓄積されるため1回だけ生成する
 */
function get_editor_inline_css() {
	static $css = null;
	if ( null === $css ) {
		$css = \Ponhiro_Blocks\Style::output( 'editor' );
	}
	return $css;
}


/**
 * Gutenberg用ファイルの読み込み（親ページのみ）
 */
function hook__enqueue_block_editor_assets() {

	// アイコン
	wp_enqueue_script( 'ponhiro-blocks-icon', USFL_BLKS_URL . 'dist/iconpack/index.js', [ 'wp-element' ], USFL_BLKS_VER, true );

	// JS用翻訳ファイルの読み込み: ブロックエディター用
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_enqueue_script( 'ponhiro-blocks-script', USFL_BLKS_URL .'assets/js/empty.js', [], USFL_BLKS_VER, true );
		wp_set_script_translations( 'ponhiro-blocks-script', 'useful-blocks', USFL_BLKS_PATH . 'languages' );
	}
}
