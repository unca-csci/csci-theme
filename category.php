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
        // $categories = get_the_category();
        // var_dump($categories);
        // $category_id = $categories[0]->cat_ID;
        // echo $category_id;
        // $current_category = get_queried_object();
        $cur_cat = get_cat_ID( single_cat_title("",false) );
        echo $cur_cat;
    ?>
    <div id="category-main">12345</div>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();