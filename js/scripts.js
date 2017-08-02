jQuery(document).ready(function () {
   
   // add-btn animation
   $(".add-btn").on("click", function () {
      $(".input-wrapper").fadeToggle(500);
   });

   $(window).load(function () {

      // Preloader
      $('#preloader').fadeOut('slow', function () {
         $(this).remove();
      });

      // Animation1
      setTimeout(function () {
         $(".slogan").addClass("anim");
      }, 1000);
      
   });

});
