<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package UNCA_CSCI
 */

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function unca_csci_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'unca_csci_pingback_header' );


function include_lightbox() {
    return '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/modal-manager.js"></script>' .
    "\r\n";
}

add_shortcode('linkify', 'shortcode_linkify');
function shortcode_linkify() {
    return '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/linkify.js"></script>' .
    "\r\n" .
    include_lightbox();
}