$(document).ready( function() {
  setTimeout( function() {
    $("body").addClass("ready");
    setTimeout( function() {
      $("body").addClass("loaded");
    }, 800);
  }, 500);
});
