<?php

add_shortcode('schedule_of_classes', 'shortcode_schedule_of_classes');
function shortcode_schedule_of_classes($atts) {
    $script_ref = '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/class-schedule.js"></script>';
    $css_ref = '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/class-schedule.css">';
    return 
        '<div id="unca-classes"></div>' .  
        $css_ref . "\r\n" . $script_ref .
        "\r\n" .
        include_lightbox() .
        include_modal();
}

?>