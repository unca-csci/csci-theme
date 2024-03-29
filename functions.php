<?php
/**
 * UNCA CSCI functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package UNCA_CSCI
 */

/******************************
 * Code for Custom Shortcodes *
 ******************************/
require_once( __DIR__ . '/inc/functions-sidebars.php');
require_once( __DIR__ . '/inc/functions-people.php');
require_once( __DIR__ . '/inc/functions-projects.php');
require_once( __DIR__ . '/inc/functions-cs-areas.php');
require_once( __DIR__ . '/inc/functions-class-schedule.php');
require_once( __DIR__ . '/inc/functions-courses.php');

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function unca_csci_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on UNCA CSCI, use a find and replace
		* to change 'unca-csci' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'unca-csci', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'unca-csci' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'unca_csci_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'unca_csci_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function unca_csci_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'unca_csci_content_width', 640 );
}
add_action( 'after_setup_theme', 'unca_csci_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function unca_csci_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'unca-csci' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'unca-csci' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'unca_csci_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function unca_csci_scripts() {
	wp_enqueue_style( 'unca-csci-style', get_stylesheet_uri(), array(), _S_VERSION );
	/* remember tat order matters here */
    wp_enqueue_style( 'main', get_template_directory_uri() . '/assets/css/main.css', array(), null, 'all' );
	wp_enqueue_style( 'nav', get_template_directory_uri() . '/assets/css/navigation.css', array(), null, 'all' );
	wp_enqueue_style( 'news', get_template_directory_uri() . '/assets/css/news.css', array(), null, 'all' );
	wp_enqueue_style( 'areas', get_template_directory_uri() . '/assets/css/areas.css', array(), null, 'all' );
	wp_enqueue_style( 'class-schedule', get_template_directory_uri() . '/assets/css/class-schedule.css', array(), null, 'all' );
	wp_enqueue_style( 'lightbox', get_template_directory_uri() . '/assets/css/lightbox.css', array(), null, 'all' );
	wp_enqueue_style( 'people', get_template_directory_uri() . '/assets/css/people.css', array(), null, 'all' );
	wp_enqueue_style( 'who-we-are', get_template_directory_uri() . '/assets/css/who-we-are.css', array(), null, 'all' );
	wp_style_add_data( 'unca-csci-style', 'rtl', 'replace' );

	wp_enqueue_script( 'unca-csci-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'unca_csci_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}




/* 7/31/2023
   Caution: Made the default sort order by title.
   May not be advisable for everything!
*/
function change_posts_order( $query ) {
    // $pt = $query->query_vars['post_type'];
    // var_dump($pt);
    if (is_admin() && $query->query_vars['post_type'] != 'acf-field') {
        $query->set( 'orderby', 'title' );
        $query->set( 'order', 'ASC' );
    }
}
add_action( 'pre_get_posts', 'change_posts_order');


// convenience function for generating IDs
function generateRandomString($length = 10) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}


/**
 * Sarah Added this on 1/15/2024 based on this post:
 * https://maheshwaghmare.com/rest-api/how-to/search-post-by-post-meta-in-rest-api/
 * Add meta fields support in rest API for post type `Post`
 *
 * This function will allow custom parameters within API request URL. 
 * Add post meta support for post type `Post`.
 * 
 * > How to use?
 * http://mysite.com/wp-json/wp/v2/posts?meta_key=<my_meta_key>&meta_value=<my_meta_value>
 * 
 * > E.g. Get posts which post meta `already-visited` value is `true`.
 *
 * Request like: http://mysite.com/wp-json/wp/v2/post?meta_key=already-visited&meta_value=true
 */
if( ! function_exists( 'post_meta_request_params' ) ) :
	function post_meta_request_params( $args, $request )
	{
		$args += array(
			'meta_key'   => $request['meta_key'],
			'meta_value' => $request['meta_value'],
			'meta_query' => $request['meta_query'],
		);

	    return $args;
	}
    // Note: need to add a new line for every custom post type:
	add_filter( 'rest_post_query', 'post_meta_request_params', 99, 2 ); // Add support for `post`
	add_filter( 'rest_page_query', 'post_meta_request_params', 99, 2 ); // Add support for `page`
	add_filter( 'rest_student-project_query', 'post_meta_request_params', 99, 2 ); // Add support for `student-project`
	add_filter( 'rest_course_query', 'post_meta_request_params', 99, 2 ); // Add support for `courses`
endif;


add_filter( 'rest_custom-post-type_collection_params', 'my_prefix_add_rest_orderby_params', 10, 1 );
function my_prefix_add_rest_orderby_params( $params ) {
    $params['orderby']['enum'][] = 'menu_order';

    return $params;
}