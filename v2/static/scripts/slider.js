var currentSlide = 0;

$(".speakingSlideshow .slideshowButtons .slideshowLeftButton").click( function() {
  currentSlide--;

  updateSlideshow();
});
$(".speakingSlideshow .slideshowButtons .slideshowRightButton").click( function() {
  currentSlide++;

  updateSlideshow();
});

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
  $(".speakingSlideshow .slideshowSlides").css("left", "calc(-1 * (((50vw - 15px - 120px) * " + currentSlide + ") + (2px * " + currentSlide + ")) + 60px)");
  $(".speakingSlideshow .slideshowSlides .currentSlideshowSlide").each( function() {
    $(this).removeClass("currentSlideshowSlide");
  });
  setTimeout( function() {
    $(".speakingSlideshow .slideshowSlides .slideshowSlide:nth-of-type(" + parseInt(currentSlide + 1) + ")").addClass("currentSlideshowSlide");
  }, 250);
}
