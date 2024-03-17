<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UNCA_CSCI
 */

get_header();
?>

	<main id="primary" class="site-main">

    <?php
        the_archive_title( '<h1 class="page-title">', '</h1>' );
        get_cat_ID();
    ?>
    <div id="category-main">12345</div>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
