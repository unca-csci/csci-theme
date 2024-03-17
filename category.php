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
        // get_cat_ID();
        $categories = get_the_category();
        echo $categories;
        $category_id = $categories[0]->cat_ID;
        echo $category_id;
    ?>
    <div id="category-main">12345</div>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
