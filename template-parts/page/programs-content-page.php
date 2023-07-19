<?php
/**
 * Template part for displaying page content in page.php
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
	/*
	 * If a regular page, and not the front page, show the featured image as header cover image.
	 */
	if ( ( is_single() ||  is_page() ) && has_post_thumbnail( get_the_ID() ) ) {
        echo '<div class="entry-cover-image">';
		echo '<div class="single-featured-image-header">';
		echo get_the_post_thumbnail( get_the_ID(), 'inspiro-featured-image' );
		echo '</div><!-- .single-featured-image-header -->';
	}
	?>


	<?php
	if ( ( is_single() || is_page() ) && has_post_thumbnail( get_the_ID() ) ) {
		echo '</div><!-- .entry-cover-image -->';
	}
	?>
    <div class="entry-wrapper two-column">
        <div class="entry-content">
            <?php
                the_content();
                ?>
        </div><!-- .entry-content -->

        <aside id="secondary" class="widget-area" role="complementary">
            <div class="programs-submenu">
                <?php
                if ( is_active_sidebar( 'sidebar-programs' ) ) {
                    dynamic_sidebar( 'sidebar-programs' );
                }
                ?>
            </div>
        </aside>

    </div><!-- .entry-wrapper -->

    <div class="clear"></div>
</article><!-- #post-<?php the_ID(); ?> -->
