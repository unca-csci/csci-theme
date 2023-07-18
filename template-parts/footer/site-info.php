<?php
/**
 * Displays footer site info
 *
 * @package Inspiro
 * @subpackage Inspiro_Lite
 * @since Inspiro 1.0.0
 * @version 1.0.0
 */

?>
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
