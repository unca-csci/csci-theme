<?php

function getContactInfo($post_id) {
    $html = '<div class="contact-info">';
    if ( get_post_meta($post_id, 'phone_number', true) != '') {
        $html = $html . 
            '<div class="meta">' .
                '<i class="fa-solid fa-phone"></i>  ' . 
                get_post_meta($post_id, 'phone_number', true) . 
            '</div>';
    } 
    if ( get_post_meta($post_id, 'address', true) != '') {
        $html = $html . 
            '<div class="meta">' .
                '<i class="fa-solid fa-location-dot"></i> ' . 
                get_post_meta($post_id, 'address', true) . 
            '</div>';
    }
    if ( get_post_meta($post_id, 'email', true) != '') {
        $html = $html . 
            '<div class="meta">' .
                '<i class="fa-regular fa-envelope"></i> ' . 
                get_post_meta($post_id, 'email', true) . 
            '</div>';
    }
    $html = $html . '</div>';
    return $html;
}

add_shortcode('people_card', 'shortcode_people_card');
function shortcode_people_card($atts) {
    extract(shortcode_atts(array(
            'post_id' => NULL,
        ), $atts)
    );
    global $post;
    $post_id = (NULL === $post_id) ? $post->ID : $post_id;
    
    
    $html = '<div class="people-card">';

    // row 1a:
    $html = $html . 
        '<div>' .
            '<h2>' .
                get_the_title() .
            '</h2>' .
            '<p class="title">' .
                get_post_meta($post_id, 'title', true) . 
            '</p>';
    $html = $html . getContactInfo($post_id);
   
    $html = $html . '</div>';

    // row 1b:
    if ( has_post_thumbnail()) {
        $html = $html . get_the_post_thumbnail( $post_id, 'small' );
    } else {
        $html = $html . '<div></div>'; 
    }
    
    // row 2: 
    $html = $html . '<p class="span-2 interests">' .
        get_post_meta($post_id, 'interests', true) . 
    '</p>';
    
    // row 3: 
    $html = $html . 
        '<p class="span-2">' .
            // '<a class="more-link" href="' . get_permalink($post) . '">More</a>' .
            // '<a class="more-link" href="/wp-json/wp/v2/people/' . $post->ID .
            '<button class="more-link" onclick="showPerson(' . $post->ID . ')">More</button>' . 
        '</p>';
    $html = $html . '</div>';
    return $html;
}

add_shortcode('people_card_list', 'shortcode_people_card_list');
function shortcode_people_card_list() {
    $args = array(
        'post_type' => 'person'
    );

    $post_query = new WP_Query($args);

    // return $post_query->found_posts;
    $html_elements = array();
    if($post_query->have_posts() ) {
        while($post_query->have_posts() ) {
            $post_query->the_post();
            global $post;
            array_push($html_elements, shortcode_people_card([$post->ID]));
        }
        wp_reset_postdata();
    }

    $script_ref = '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/lightbox.js"></script>'; 
    $css_ref = '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/lightbox.css">';
    return '<div class="people-list">' . 
        implode( '', $html_elements ) . 
    '</div>' . 
    '<section class="" id="lightbox" onclick="hideLightbox(event)">
        <button id="close" class="close" onclick="hideLightbox(event)">
            <i id="close-icon" class="fas fa-times"></i>
        </button>
        <div class="content"></div>
    </section>' . "\r\n" . 
    $css_ref . "\r\n" . 
    $script_ref;
}

?>