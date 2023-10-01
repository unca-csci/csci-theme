<?php
/**
 * Template Post Type: post, page, person
 * Template part for displaying posts
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
    
    <div class="entry-wrapper two-column">
        <div class="entry-content">
            <header class="entry-header">
                <?php
                if ( is_singular() ) {
                    echo '<div class="breadcrumbs">'; 
                        echo '<h1 class="entry-title"><a href="/people/">People</a>';
                        echo ' <i class="fa-solid fa-chevron-right"></i> ';
                        the_title();
                        echo '</h1>';
                    echo '</div>';
                } else {
                    the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
                }

                if ( 'post' === get_post_type() ) :
                    ?>
                    <div class="entry-meta">
                        <?php
                        unca_csci_posted_on();
                        ?>
                    </div><!-- .entry-meta -->
                <?php endif; ?>
            </header><!-- .entry-header -->

            <div id="person-main">
                <!-- populated by JavaScript -->
            </div>

        </div><!-- .entry-content -->
        <aside id="secondary" class="widget-area" role="complementary">
            <div class="programs-submenu news">
                <?php
                if ( is_active_sidebar( 'sidebar-post' ) ) {
                    dynamic_sidebar( 'sidebar-post' );
                }
                ?>
            </div>
        </aside>
    </div>
	
</article><!-- #post-<?php the_ID(); ?> -->

<?php 
    echo displayPerson();
?>
