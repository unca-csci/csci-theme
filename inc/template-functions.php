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
    $script_ref = '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/lightbox.js"></script>';
    $css_ref = '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/lightbox.css">';
    return 
        '
        <section class="" id="lightbox" onclick="hideLightbox(event)">
            <button id="close" class="close" onclick="hideLightbox(event)">
                <i id="close-icon" class="fas fa-times"></i>
            </button>
            <div class="content"></div>
        </section>
        ' . 
        "\r\n" .
        $css_ref . 
        "\r\n" . 
        $script_ref; 
}
