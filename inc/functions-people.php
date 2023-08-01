<?php

add_shortcode('people_card_list', 'shortcode_people_card_list');
function shortcode_people_card_list() {
    $script_ref = 
        '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/who-we-are.js"></script>';
    return '<div class="people-list"></div>' . 
    "\r\n" .
    $script_ref .
    "\r\n" .
    include_lightbox();
}

add_shortcode('student_project_list', 'shortcode_student_project_list');
function student_project_list() {
    $script_ref = 
        '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/student-projects.js"></script>';
    return '<div class="people-list"></div>' . 
    "\r\n" .
    $script_ref .
    "\r\n" .
    include_lightbox();
}

?>