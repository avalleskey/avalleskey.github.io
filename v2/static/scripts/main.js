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
});
$(".rightSideNav ul li").click( function() {
  var name = $(this).attr("name");
  if (name != "work") {
    $(".rightSideNav ul li").each( function() {
      $(this).removeClass("activeNavItem");
    });
    $(this).addClass("activeNavItem");
  }
});
