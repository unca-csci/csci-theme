<?php

add_shortcode('course_navigator', 'shortcode_course_navigator');
function shortcode_course_navigator($atts) {
    $css_ref = '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/class-schedule.css">';
    return 
        '
        <div id="course-navigator">
            <!-- populated via course-navigator.js -->      
        </div>
        ' . 
        "\r\n" .
        $css_ref .  
        "\r\n" .
        include_lightbox() . 
        "\r\n" .
        '<script type="module">
            import CourseNavigator from "'. get_stylesheet_directory_uri() . '/assets/js/course-navigator.js";' .
            "\r\n" . '
            const courseNavigator = new CourseNavigator();
            courseNavigator.fetchAndDisplayNavigator();
            ' .
            "\r\n" .
        '</script>';
}

add_shortcode('degree_requirements', 'shortcode_degree_requirements');
function shortcode_degree_requirements($atts) {
    $code = $atts['code'];
    $css_ref = '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/assets/css/class-schedule.css">';
    return 
        '
        <div id="course-navigator">
            <!-- populated via degree-requirements.js -->      
        </div>
        ' . 
        "\r\n" .
        $css_ref .  
        "\r\n" .
        include_lightbox() . 
        "\r\n" .
        '<script type="module">
            import DegreeRequirements from "'. get_stylesheet_directory_uri() . '/assets/js/degree-requirements.js";' .
            "\r\n" . '
            const requirements = new DegreeRequirements();
            requirements.fetchAndDisplayDegreeRequirements("' . $code . '");
            ' .
            "\r\n" .
        '</script>';
}

?>