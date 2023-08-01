<?php
/**
 * Template part for displaying a student Project
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package UNCA_CSCI
 * Old Code: https://github.com/unca-csci/csci-theme/blob/d605b08d6b2ab05a2c564690d2e5fd146c94e5ac/template-parts/post/content-person.php
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    
    <div class="entry-wrapper two-column">
        <div class="entry-content">
            <header class="entry-header">
                <?php
                if ( is_singular() ) {
                    echo '<div class="breadcrumbs">'; 
                        echo '<h1 class="entry-title"><a href="/student-projects/">Student Projects</a>';
                        echo ' <i class="fa-solid fa-chevron-right"></i> ';
                        the_title();
                        echo '</h1>';
                    echo '</div>';
                } else {
                    the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
                }
                ?>
            </header><!-- .entry-header -->

            <h2>Project Description</h2>
            <?php 
                $desc = wpautop(get_post_field("description")); //get_post_meta($post->ID, 'description', true);
                echo $desc;

                echo student_project_list();
            ?>

        </div><!-- .entry-content -->
        <aside id="secondary" class="widget-area" role="complementary">
            <?php 
                if(has_post_thumbnail()) {
                    echo '
                    <div class="programs-submenu featured-image">
                        <figure>';
                    the_post_thumbnail( 'medium' );
                    echo '<figcaption> ' . the_title() . '</figcaption>' .
                        '</figure>
                    </div>';
                }
            ?>
            
        </aside>
    </div>
	
</article><!-- #post-<?php the_ID(); ?> -->

