<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package UNCA_CSCI
 */

?>
    <?php
    if ( is_active_sidebar( 'sidebar-footer' ) ) {
        dynamic_sidebar( 'sidebar-footer' );
    }
    ?>

	
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
