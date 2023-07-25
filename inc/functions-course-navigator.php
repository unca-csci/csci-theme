<?php

add_shortcode('course_navigator', 'shortcode_course_navigator');
function shortcode_course_navigator($atts) {
    $script_ref = '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/course-navigator.js"></script>';
    $css_ref = '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/class-schedule.css">' . 
    "\r\n" . 
    '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/lightbox.css">';
    return 
        '
        <div id="course-navigator">
            <!-- populated via course-navigator.js -->      
        </div>
        <section class="" id="lightbox" onclick="hideLightbox(event)">
            <button id="close" class="close" onclick="hideLightbox(event)">
                <i id="close-icon" class="fas fa-times"></i>
            </button>
            <div class="content"></div>
        </section>
        ' .  $css_ref . "\r\n" . $script_ref;
}

?>