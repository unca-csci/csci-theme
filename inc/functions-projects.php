<?php

add_shortcode('student_project', 'shortcode_student_project');
function shortcode_student_project() {
    return '<div class="project-list"></div>' . 
    "\r\n" .
    include_lightbox() .
    '<script type="module">
        import StudentProjects from "'. get_stylesheet_directory_uri() . '/assets/js/student-projects.js";
        const projects = new StudentProjects();
        projects.fetchAndDisplay(' . get_the_ID() . ');
    </script>';
}

add_shortcode('student_project_list', 'shortcode_student_project_list');
function shortcode_student_project_list() {
    return '<div class="project-list"></div>' . 
    "\r\n" .
    include_lightbox() .
    '<script type="module">
        import StudentProjects from "'. get_stylesheet_directory_uri() . '/assets/js/student-projects.js";
        const projects = new StudentProjects();
        // projects.fetchAndDisplay(' . get_the_ID() . ');
        projects.fetchAndDisplay();
    </script>';
}

?>