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
        $cur_cat = get_cat_ID( single_cat_title("",false) );
        $js_path = get_stylesheet_directory_uri();
    ?>

    <script type="module">
        import PostsByCategory from "<?php echo $js_path ?>/assets/js/posts-by-category.js";

        const posts = new PostsByCategory(<?php echo $cur_cat ?>);
        posts.fetchAndDisplayByCategory();

    </script>
    <div id="category-main">Categories go here...</div>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
