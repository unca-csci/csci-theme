<?php
/**
 * Template part for displaying the News
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UNCA_CSCI
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    
    <div class="entry-wrapper two-column news">
        <div class="entry-content">
            <header class="entry-header">
                <?php
                if ( is_singular() ) {
                    echo '<div class="breadcrumbs">'; 
                        echo '<h1 class="entry-title"><a href="/news/">News</a>';
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


            <?php
            the_content(
                sprintf(
                    wp_kses(
                        /* translators: %s: Name of current post. Only visible to screen readers */
                        __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'unca-csci' ),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    wp_kses_post( get_the_title() )
                )
            );

            wp_link_pages(
                array(
                    'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'unca-csci' ),
                    'after'  => '</div>',
                )
            );
            ?>
        </div><!-- .entry-content -->
        <aside id="secondary" class="widget-area" role="complementary">
            
            <?php if ( has_post_thumbnail()) { ?> 
                <div class="programs-submenu featured-image">
                    
                        <figure>
                            <?php the_post_thumbnail( 'medium' ); ?>
                            <figcaption>
                                <?php the_title(); ?>
                            </figcaption>
                        </figure>
                    
                </div>
            <?php } ?>
            <div class="programs-submenu news">
                <h2 class="h2-sidebar">More News</h2>
                <?php
                if ( is_active_sidebar( 'sidebar-post' ) ) {
                    dynamic_sidebar( 'sidebar-post' );
                }
                ?>
            </div>
        </aside>
    </div>
	
</article><!-- #post-<?php the_ID(); ?> -->

