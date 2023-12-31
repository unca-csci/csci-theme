<?php
// used in template-parts/post/content-project.php:
function displayProject() {
    return include_lightbox() .
    '<script type="module">
        import StudentProject from "'. get_stylesheet_directory_uri() . '/assets/js/student-project.js";
        const project = new StudentProject();
        project.fetchAndDisplayById(' . get_the_ID() . ');
    </script>';
}


add_shortcode('student_project_list', 'shortcode_student_project_list');
function shortcode_student_project_list($args) {
    $term = NULL;
    $id = generateRandomString();
    $function_arg = '';
    if (array_key_exists('term', $args)) {
        $term = $args['term'];
        $function_arg = '"' . $term . '"';
    }
    return '<div id="' . $id . '" class="project-list"></div>' . 
    "\r\n" .
    '<script type="module">
        import StudentProjects from "'. get_stylesheet_directory_uri() . '/assets/js/student-projects.js";
        (function () {
            const projects = new StudentProjects("'. $id . '");
            projects.fetchAndDisplayByTerm(' . $function_arg . ');
        })();
    </script>';
}

?>