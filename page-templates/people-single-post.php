<?php
/**
 * Template Name: Custom People Template
 * Template Post Type: post, page, product, person
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Inspiro
 * @subpackage Inspiro_Lite
 * @since Inspiro 1.0.0
 * @version 1.0.0
 */

get_header(); ?>

<main id="main" class="site-main container-fluid person-template" role="main">
	<?php
	// Start the Loop.
	while ( have_posts() ) :
		the_post();

		get_template_part( 'template-parts/post/content-person', get_post_format() );
		
	endwhile; // End the loop.
    
	?>

</main><!-- #main -->

<?php
get_footer();
