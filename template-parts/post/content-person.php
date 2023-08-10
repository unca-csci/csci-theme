<?php
/**
 * Template Post Type: post, page, person
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Inspiro
 * @subpackage Inspiro_Lite
 * @since Inspiro 1.0.0
 * @version 1.0.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
    $styles = (has_post_thumbnail()) ? 'text-align: center' : '';
	if ( is_single() && 'side-right' === inspiro_get_theme_mod( 'layout_single_post' ) && is_active_sidebar( 'blog-sidebar' ) ) {
		echo '<div class="entry-wrapper">';
	}
	?>

	<?php if ( is_single() || ( ! is_single() && 'full-content' === inspiro_get_theme_mod( 'display_content' ) ) ) : ?>
		<div class="entry-content">
            <h1 class="person-header" style="<?php echo $styles; ?>"><?php echo get_the_title() ?></h1>
            <?php 
            if ( has_post_thumbnail()) {
                echo get_the_post_thumbnail( $post->ID, 'small', array( 'class' => 'people-thumb' ));
            }
            echo '<h2>' .get_post_meta($post->ID, 'title', true) . '</h2>';
            echo getContactInfo($post->ID);
            ?>
			<?php
			the_content(
				sprintf(
					/* translators: %s: Post title. */
					__( 'Read more<span class="screen-reader-text"> "%s"</span>', 'inspiro' ),
					get_the_title()
				)
			);

            // Bio:
            if ( get_post_meta($post->ID, 'bio', true) != '') {
                echo '<h2>Bio</h2>';
                
                echo the_field('bio');
            }

            // Education: 
            if ( get_post_meta($post->ID, 'education', true) != '') {
                echo '<h2>Education</h2>';
                echo the_field('education');
            }
            
            // Interests:
            if ( get_post_meta($post->ID, 'interests', true) != '') {
                echo '<h2>Professional & Research Interests</h2>';
                echo get_post_meta($post->ID, 'interests', true);
            }

            // Website:
            if ( get_post_meta($post->ID, 'website', true) != '') {
                echo '<h2>Website</h2>';
                echo '<a href="' . get_post_meta($post->ID, 'website', true) . '" target="_blank">' .
                    get_post_meta($post->ID, 'website', true) . '</a>';
            }
            
			wp_link_pages(
				array(
					'before'      => '<div class="page-links">' . __( 'Pages:', 'inspiro' ),
					'after'       => '</div>',
					'link_before' => '<span class="page-number">',
					'link_after'  => '</span>',
				)
			);

            // New:

			?>
		</div><!-- .entry-content -->
	<?php endif ?>

	<?php if ( is_single() && 'side-right' === inspiro_get_theme_mod( 'layout_single_post' ) && is_active_sidebar( 'blog-sidebar' ) ) : ?>

		<aside id="secondary" class="widget-area" role="complementary">
			<?php dynamic_sidebar( 'blog-sidebar' ); ?>
		</aside>

		</div><!-- .entry-wrapper -->

		<div class="clear"></div>

	<?php endif ?>
       

	<?php
	if ( is_single() && 1 == -1) {
		inspiro_entry_footer();
	}
	?>

</article><!-- #post-<?php the_ID(); ?> -->
