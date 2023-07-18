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

	<footer id="colophon" class="site-footer">
		<div class="site-info">
            <?php
            if ( function_exists( 'the_privacy_policy_link' ) ) {
                the_privacy_policy_link( '', '<span role="separator" aria-hidden="true"></span>' );
            }
            ?>
            <span class="copyright">
                <span>
                    © 2023 UNC Asheville
                </span>
                <span>
                    <a title="Careers" href="http://jobs.unca.edu" class="nav-link" aria-label="Careers">Careers</a>
                    <a title="Accessibility" href="https://accessibility.unca.edu/" class="nav-link" aria-label="Accessibility">Accessibility</a>
                    <a title="Title IX" href="https://titleix.unca.edu/" class="nav-link" aria-label="Title IX">Title IX</a>
                    <a title="Sitemap" href="https://csci.unca.edu/sitemap_index.xml" class="nav-link" aria-label="Sitemap">Sitemap</a>
                </span>
            </span>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
