<?php
/**
 * Plugin Name: 裏東京ロマンス Custom Post Types
 * Description: 裏東京ロマンス用のカスタム投稿タイプを登録します
 * Version: 1.0.0
 * Author: 裏東京ロマンス
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ---- Register Custom Post Types ----

function utr_register_post_types() {

    // セラピスト
    register_post_type( 'therapist', [
        'labels' => [
            'name'          => 'セラピスト',
            'singular_name' => 'セラピスト',
            'add_new'       => '新規追加',
            'add_new_item'  => 'セラピストを追加',
            'edit_item'     => 'セラピストを編集',
            'all_items'     => 'すべてのセラピスト',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'menu_icon'    => 'dashicons-businessman',
        'rest_base'    => 'therapist',
    ] );

    // 出勤情報
    register_post_type( 'schedule', [
        'labels' => [
            'name'          => '出勤情報',
            'singular_name' => '出勤情報',
            'add_new'       => '新規追加',
            'add_new_item'  => '出勤情報を追加',
            'edit_item'     => '出勤情報を編集',
            'all_items'     => 'すべての出勤情報',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-calendar',
        'rest_base'    => 'schedule',
    ] );

    // 口コミ
    register_post_type( 'review', [
        'labels' => [
            'name'          => '口コミ',
            'singular_name' => '口コミ',
            'add_new'       => '新規追加',
            'add_new_item'  => '口コミを追加',
            'edit_item'     => '口コミを編集',
            'all_items'     => 'すべての口コミ',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-star-filled',
        'rest_base'    => 'review',
    ] );

    // イベント
    register_post_type( 'event', [
        'labels' => [
            'name'          => 'イベント',
            'singular_name' => 'イベント',
            'add_new'       => '新規追加',
            'add_new_item'  => 'イベントを追加',
            'edit_item'     => 'イベントを編集',
            'all_items'     => 'すべてのイベント',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'menu_icon'    => 'dashicons-megaphone',
        'rest_base'    => 'event',
    ] );

    // スタッフブログ
    register_post_type( 'staff_blog', [
        'labels' => [
            'name'          => 'スタッフブログ',
            'singular_name' => 'スタッフブログ',
            'add_new'       => '新規追加',
            'add_new_item'  => 'スタッフブログを追加',
            'edit_item'     => 'スタッフブログを編集',
            'all_items'     => 'すべてのスタッフブログ',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => [ 'title', 'editor', 'thumbnail', 'author', 'custom-fields' ],
        'menu_icon'    => 'dashicons-edit',
        'rest_base'    => 'staff_blog',
    ] );

    // 求人情報
    register_post_type( 'recruit_news', [
        'labels' => [
            'name'          => '求人情報',
            'singular_name' => '求人情報',
            'add_new'       => '新規追加',
            'add_new_item'  => '求人情報を追加',
            'edit_item'     => '求人情報を編集',
            'all_items'     => 'すべての求人情報',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-id-alt',
        'rest_base'    => 'recruit_news',
    ] );
}
add_action( 'init', 'utr_register_post_types' );


// ---- Register Custom Fields (ACF-compatible meta) ----

function utr_register_meta() {

    // セラピスト フィールド
    $therapist_fields = [
        'therapist_name', 'age', 'height', 'tags', 'areas',
        'intro', 'recommended', 'is_new', 'show_in_ranking',
        'schedule_note', 'booking_cta',
    ];
    foreach ( $therapist_fields as $field ) {
        register_post_meta( 'therapist', $field, [
            'show_in_rest' => true,
            'single'       => true,
            'type'         => 'string',
        ] );
    }

    // 出勤情報 フィールド
    foreach ( [ 'therapist_name', 'date', 'status', 'note' ] as $field ) {
        register_post_meta( 'schedule', $field, [
            'show_in_rest' => true,
            'single'       => true,
            'type'         => 'string',
        ] );
    }

    // 口コミ フィールド
    foreach ( [ 'therapist_name', 'author_name', 'rating', 'review_content' ] as $field ) {
        register_post_meta( 'review', $field, [
            'show_in_rest' => true,
            'single'       => true,
            'type'         => 'string',
        ] );
    }

    // イベント フィールド
    foreach ( [ 'event_date', 'event_type', 'discount', 'detail' ] as $field ) {
        register_post_meta( 'event', $field, [
            'show_in_rest' => true,
            'single'       => true,
            'type'         => 'string',
        ] );
    }
}
add_action( 'init', 'utr_register_meta' );


// ---- Enable CORS for REST API (Next.js frontend) ----

function utr_add_cors_headers() {
    $origin = get_option( 'utr_frontend_url', 'https://ura-tokyo-romance.com' );
    header( "Access-Control-Allow-Origin: {$origin}" );
    header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
    header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
}
add_action( 'rest_api_init', 'utr_add_cors_headers' );
