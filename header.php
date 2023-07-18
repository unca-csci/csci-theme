<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package UNCA_CSCI
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'unca-csci' ); ?></a>

	<header id="masthead" class="site-header">
        <!-- exclude the site branding -->
		<!-- <div class="site-branding">
			<?php
			the_custom_logo();
			if ( is_front_page() && is_home() ) :
				?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
			else :
				?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php
			endif;
			$unca_csci_description = get_bloginfo( 'description', 'display' );
			if ( $unca_csci_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php echo $unca_csci_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
			<?php endif; ?>
		</div> -->

        <nav id="unca">
            <img class="unca-logo" src="https://www.unca.edu/wp-content/themes/tin/assets/logo.svg">
            <a class="button" href="https://www.unca.edu/admission/apply/">Apply</a>
        </nav>
		

        <div id="unca-navigation">
   
            <div class="header-logo-wrapper">
                <a href="https://csci.ywtech.org" title="" class="custom-logo-text">Computer Science</a>		
            </div>
            
            <!-- #site-navigation -->
            <nav id="site-navigation" class="main-navigation">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'unca-csci' ); ?></button>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'menu-1',
                        'menu_id'        => 'primary-menu',
                    )
                );
                ?>
            </nav>
        </div>
				
		
	</header><!-- #masthead -->
