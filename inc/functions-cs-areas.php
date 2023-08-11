<?php

add_shortcode('cs_areas', 'shortcode_cs_areas');
function shortcode_cs_areas() {
    $script_ref = 
        '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/cs-areas.js"></script>';
    $css_refs = 
        '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/areas.css">';
    
    return '<div class="areas" id="cs-areas"></div>' . 
    "\r\n" . 
    $css_refs . "\r\n" . 
    $script_ref . 
    "\r\n" .
    include_lightbox() .
    include_modal();
}

?>