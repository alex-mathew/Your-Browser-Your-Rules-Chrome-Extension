$(document).ready(function () {
    
    // Scroll to next page
    $('.scroller').click(function() {
        
        // Variables
        var fuller = $(this).closest('.fullscreen').next(),
            section = $(this).closest('section');
        
        // Animate Smooth Scroll to Next Page
        section.animate({
             scrollTop: section.scrollTop() + fuller.offset().top
        }, 700); 
        
    });
    
    // Mouse-wheel Scroll to next page
    $('.fullscreen').on('DOMMouseScroll mousewheel', function (e) {
        
      if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
          
        // Variables
        var fuller = $(this).closest('.fullscreen').next(),
            section = $(this).closest('section');
          
         // Animate Smooth Scroll to Next Page
        section.animate({
             scrollTop: section.scrollTop() + fuller.offset().top
        }, 700); 
      } else {
        // Variables
        var fuller = $(this).closest('.fullscreen').prev(),
            section = $(this).closest('section');
          
         // Animate Smooth Scroll to Next Page
        section.animate({
             scrollTop: section.scrollTop() + fuller.offset().top
        }, 700); 
      }
    });

    
    // Return to top of page
    $('.scroller-last').click(function() {
        // Smooth Animation
        $('section, div').animate({scrollTop : 0}, 900);
    });

});
