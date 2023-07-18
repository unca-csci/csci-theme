<?php

add_shortcode('course_card', 'shortcode_course_card');
function shortcode_course_card($atts) {
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
        <section class="course" onclick="showCourse(' . $post->ID . ')">
            <h3>' . get_the_title() . ': ' .  get_post_meta($post_id, 'title', true) . '</h3>' .
            '<p>' . get_post_meta($post_id, 'description', true) . '</p>' .
            showPrerequisites($post_id) .
            showMajorMinorRequirements($post_id) .
            showAreas($post_id) .
        '</section>';
}

function showPrerequisites($post_id) {
    $prereqs = get_post_meta($post_id, 'prerequisites', true);
    $html = '';
    if( $prereqs ) {
        $html = '<h4>Prerequisites</h4><ul>';
        foreach( $prereqs as $prereq) {
            $html .= '<li>' . 
                get_the_title($prereq) . ': ' . get_field( 'title', $prereq ) . 
            '</li>';
        }
        $html .= '</ul>';
    }
    return $html;
}

function showAreas($post_id) {
    $areas = get_post_meta($post_id, 'cs_areas', true);
    $html = '';
    if( $areas ) {
        foreach( $areas as $area) {
            $html .= '<span class="tag">' . 
                get_the_title($area) .
            '</span>';
        }
    }
    return $html;
}

function showMajorMinorRequirements($post_id) {
    $reqs = get_post_meta($post_id, 'major_minor_requirements', true);
    $html = '';
    if( $reqs ) {
        $html = '<h4>Required For:</h4><ul>';
        foreach( $reqs as $req) {
            $html .= '<li>' . $req . '</li>';
        }
        $html .= '</ul>';
    }
    return $html;
}

add_shortcode('course_card_list', 'shortcode_course_card_list');
function shortcode_course_card_list() {
    $args = array(
        'post_type' => 'course',
        'posts_per_page' => '50',
        'orderby'   => 'title',
        'order' => 'ASC'
    );

    $post_query = new WP_Query($args);

    $html_elements = array();
    if($post_query->have_posts() ) {
        while($post_query->have_posts() ) {
            $post_query->the_post();
            global $post;
            array_push($html_elements, shortcode_course_card([$post->ID]));
        }
        wp_reset_postdata();
    }

    $script_ref = '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/lightbox.js"></script>';
    $css_refs = '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/lightbox.css">';
    
    return '<div>' . 
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