<?php
/**
 * Template Name: Programs Template
 * Template Post Type: post, page, product, person
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package UNCA CSCI
 */


 get_header(); ?>
 
 <div class="inner-wrap">
     <div id="primary" class="content-area">
 
         <main id="main" class="site-main" role="main">
             <?php
             while ( have_posts() ) :
                 the_post();
 
                 get_template_part( 'template-parts/page/programs-content', 'page' );
 
             endwhile; // End the loop.
             ?>
 
         </main><!-- #main -->
  
     </div><!-- #primary -->
 </div><!-- .inner-wrap -->

 
 <?php
 get_footer();
 
