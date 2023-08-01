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
            </header>

            <div id="project-main">
                <!-- populated by JavaScript -->
            </div>

        </div>

        <aside id="secondary" class="widget-area" role="complementary">
            <div id="project-side">
                <!-- populated by JavaScript -->
            </div>
        </aside>
    </div>
	
</article><!-- #post-<?php the_ID(); ?> -->

<?php 
    echo displayProject();
?>

