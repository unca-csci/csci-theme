<?php

add_shortcode('cs_area_card', 'shortcode_cs_area_card');
function shortcode_cs_area_card($atts) {
    extract(shortcode_atts(array(
            'post_id' => NULL,
        ), $atts)
    );
    global $post;
    $post_id = (NULL === $post_id) ? $post->ID : $post_id;
    
    $style = '';
    if ( has_post_thumbnail()) {
        $style = 'background-image: url(' . get_the_post_thumbnail_url( $post_id, 'small' ) . ');';
    }

    return '
        <section class="hci" style="' . $style . '" onclick="showArea(' . $post->ID . ')">
            <div class="overlay-box">
                <h2>' . get_the_title() . '</h2>
            </div>
        </section>';
}

add_shortcode('cs_area_card_list', 'shortcode_cs_area_card_list');
function shortcode_cs_area_card_list() {
    $args = array(
        'post_type' => 'cs-area'
    );

    $post_query = new WP_Query($args);

    $html_elements = array();
    if($post_query->have_posts() ) {
        while($post_query->have_posts() ) {
            $post_query->the_post();
            global $post;
            array_push($html_elements, shortcode_cs_area_card([$post->ID]));
        }
        wp_reset_postdata();
    }

    $script_ref = '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/lightbox.js"></script>';
    $css_refs = 
        '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/areas.css">' . 
        "\r\n" . 
        '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/lightbox.css">';
    
    return '<div class="areas">' . 
        implode( '', $html_elements ) . 
    '</div>' . 
    '<section class="" id="lightbox" onclick="hideLightbox(event)">
        <button id="close" class="close" onclick="hideLightbox(event)">
            <i id="close-icon" class="fas fa-times"></i>
        </button>
        <div class="content"></div>
    </section>' . "\r\n" . 
    $css_refs . "\r\n" . 
    $script_ref;
}

?>