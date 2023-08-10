<?php


// Blog Post Widget Container
function post_sidebar() {
	$args = array(
		'id'            => 'sidebar-post',
		'name'          => __( 'Post Sidebar (Right-Hand Side)', 'text_domain' ),
		'description'   => __( 'Post Sidebar', 'text_domain' ),
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
	);
	register_sidebar( $args );
}
add_action( 'widgets_init', 'post_sidebar' );



// Programs Widget Container
function programs_sidebar() {
	$args = array(
		'id'            => 'sidebar-programs',
		'name'          => __( 'Generic Page Sidebar (Right-Hand Side)', 'text_domain' ),
		'description'   => __( 'Generic Page Sidebar', 'text_domain' ),
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
	);
	register_sidebar( $args );
}
add_action( 'widgets_init', 'programs_sidebar' );




// // Current Students Widget Container
// function current_students_sidebar() {
// 	$args = array(
// 		'id'            => 'sidebar-current-students',
// 		'name'          => __( 'Current Students Sidebar (Right-Hand Side)', 'text_domain' ),
// 		'description'   => __( 'Current Students Sidebar', 'text_domain' ),
// 		'before_title'  => '<h3 class="widget-title">',
// 		'after_title'   => '</h3>',
// 		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
// 		'after_widget'  => '</aside>',
// 	);
// 	register_sidebar( $args );
// }
// add_action( 'widgets_init', 'current_students_sidebar' );



// // Prospective Students Widget Container
// function prospective_students_sidebar() {
// 	$args = array(
// 		'id'            => 'sidebar-prospective-students',
// 		'name'          => __( 'Prospective Students Sidebar (Right-Hand Side)', 'text_domain' ),
// 		'description'   => __( 'Prospective Students Sidebar', 'text_domain' ),
// 		'before_title'  => '<h3 class="widget-title">',
// 		'after_title'   => '</h3>',
// 		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
// 		'after_widget'  => '</aside>',
// 	);
// 	register_sidebar( $args );
// }
// add_action( 'widgets_init', 'prospective_students_sidebar' );



// Footer Widget Container
function footer_sidebar() {
	$args = array(
		'id'            => 'sidebar-footer',
		'name'          => __( 'Footer', 'text_domain' ),
		'description'   => __( 'Footer', 'text_domain' ),
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
		'before_widget' => '<footer id="%1$s" class="widget %2$s">',
		'after_widget'  => '</footer>',
	);
	register_sidebar( $args );
}
add_action( 'widgets_init', 'footer_sidebar' );

?>