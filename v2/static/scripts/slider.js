var currentSlide = 0;

$(".speakingSlideshow .slideshowButtons .slideshowLeftButton").click( function() {
  currentSlide--;

  updateSlideshow();
});
$(".speakingSlideshow .slideshowButtons .slideshowRightButton").click( function() {
  currentSlide++;

  updateSlideshow();
});

var resizeTimer;

$(window).on('resize', function(e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    fixSizing();
  }, 50);

});

function fixSizing() {
  var width = document.body.clientWidth;

  if (width > 1050) {
    $(".speakingSlideshow .slideshowSlides").css("left", "calc(-1 * (((50vw - 15px - 120px) * " + currentSlide + ") + (2px * " + currentSlide + ")) + 60px)");
  }
  else if (width <= 1050 && width > 960) {
    $(".speakingSlideshow .slideshowSlides").css("left", "calc(-1 * (((50vw - 15px - 80px) * " + currentSlide + ") + (2px * " + currentSlide + ")) + 40px)");
  }
  else {
    // width <= 960
    $(".speakingSlideshow .slideshowSlides").css("left", "calc(-1 * (((100vw - 20px - 60px) * " + currentSlide + ") + (2px * " + currentSlide + ")) + 30px)");
  }
}

function updateSlideshow() {
  if (currentSlide == 0) {
    // first slide
    $(".speakingSlideshow .slideshowButtons .slideshowLeftButton").addClass("hiddenSlideshowButton");
  }
  else {
    $(".speakingSlideshow .slideshowButtons .slideshowLeftButton").removeClass("hiddenSlideshowButton");
  }
  if (currentSlide == $(".speakingSlideshow .slideshowSlides .slideshowSlide").length - 1) {
    // last slide
    $(".speakingSlideshow .slideshowButtons .slideshowRightButton").addClass("hiddenSlideshowButton");
  }
  else {
    $(".speakingSlideshow .slideshowButtons .slideshowRightButton").removeClass("hiddenSlideshowButton");
  }

  var width = document.body.clientWidth;

  if (width > 1050) {
    $(".speakingSlideshow .slideshowSlides").css("left", "calc(-1 * (((50vw - 15px - 120px) * " + currentSlide + ") + (2px * " + currentSlide + ")) + 60px)");
  }
  else if (width <= 1050 && width > 960) {
    $(".speakingSlideshow .slideshowSlides").css("left", "calc(-1 * (((50vw - 15px - 80px) * " + currentSlide + ") + (2px * " + currentSlide + ")) + 40px)");
  }
  else {
    // width <= 960
    $(".speakingSlideshow .slideshowSlides").css("left", "calc(-1 * (((100vw - 20px - 60px) * " + currentSlide + ") + (2px * " + currentSlide + ")) + 30px)");
  }
  $(".speakingSlideshow .slideshowSlides .currentSlideshowSlide").each( function() {
    $(this).removeClass("currentSlideshowSlide");
  });
  setTimeout( function() {
    $(".speakingSlideshow .slideshowSlides .slideshowSlide:nth-of-type(" + parseInt(currentSlide + 1) + ")").addClass("currentSlideshowSlide");
  }, 250);
}
