$(document).ready( function() {
  setTimeout( function() {
    $("body").addClass("ready");
    setTimeout( function() {
      $("body").addClass("loaded");
      setTimeout( function() {
        $(".rightSideNav ul li[name='mywork']").addClass("activeNavItem");
      }, 600);
    }, 600);
  }, 500);
  $(".slideContainer").height($(".activeSlide").height());
});
$(".rightSideNav ul li").click( function() {
  var name = $(this).attr("name");
  if (name != "work") {
    $(".rightSideNav ul li").each( function() {
      $(this).removeClass("activeNavItem");
    });
    $(this).addClass("activeNavItem");
    $(".rightSideSlide").each( function() {
      $(this).removeClass("activeSlide");
    });
    $("#" + name).addClass("activeSlide");
    $(".slideContainer").animate({"height": Number(($("#" + name).height() * (10 / 9)).toFixed(0))}, 300);
  }
});
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    // Do something
    if (scroll <= 20 && $(".profilePicture").hasClass("hiddenProfilePicture")) {
      $(".profilePicture").removeClass("hiddenProfilePicture")
    }
    else if (scroll > 20 && !$(".profilePicture").hasClass("hiddenProfilePicture")) {
      $(".profilePicture").addClass("hiddenProfilePicture")
    }
});
