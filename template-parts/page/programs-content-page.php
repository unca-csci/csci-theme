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

	<header class="entry-header">

		<?php

		if ( ( is_single() || is_page() ) && has_post_thumbnail( get_the_ID() ) ) {
			echo '<div class="inner-wrap">';
			the_title( '<h1 class="entry-title">', '</h1>' );
			echo '</div><!-- .inner-wrap -->';
		} else {
			echo '<div class="inner-wrap">';
			the_title( '<h1 class="entry-title">', '</h1>' );
			echo '</div><!-- .inner-wrap -->';
		}

		?>

	</header><!-- .entry-header -->

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
                <h2>Learning CS at UNCA</h2>
                <h3>For Prospective Students</h3>
                <ul>
                    <li>
                        <a href="/cs-areas">What is Computer Science?</a>
                    </li>
                    <li>
                        <a href="/our-programs">Majoring / Minoring in Computer Science</a>
                    </li>
                    <li>
                        <a href="/our-programs/about-the-capstone">About the Capstone</a>
                    </li>
                    <li>
                        <a href="/our-programs/faqs/">FAQs</a>
                    </li>
                </ul>
                <h3>For Current Students</h3>
                <ul>
                    <li>
                        <a href="/our-programs/schedule-of-classes">Schedule of Classes</a>
                    </li>
                    <li>
                        <a href="/our-programs/course-offerings">Course Offerings</a>
                    </li>
                    <li>
                        <a href="/our-programs/sample-plans">Sample Course Plans</a>
                    </li>
                    <li>
                        <a href="/our-programs/student-projects">Student Projects</a>
                    </li>
                </ul>
            </div>
        </aside>

    </div><!-- .entry-wrapper -->

    <div class="clear"></div>
</article><!-- #post-<?php the_ID(); ?> -->
