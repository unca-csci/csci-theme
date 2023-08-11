<?php

add_shortcode('people_card_list', 'shortcode_people_card_list');
function shortcode_people_card_list() {
    return '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/people.css">' . 
    "\r\n" .
    '<div class="people-list"></div>' . 
    "\r\n" .
    '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/who-we-are.js"></script>'.
    "\r\n" .
    include_lightbox();
}

?>