function type(string, element, cb){
  (function writer(i){
    if(string.length <= i++){
      element.innerHTML = string;
      return cb();
    }

    element.innerHTML = string.substring(0,i);
    setTimeout(function(){writer(i);},120);
  })(0)
}
$(document).ready( function() {
  setTimeout( function() {
    $(".userInputPlaceholder").hide();
    type("Hey Tim, have a good day!", document.getElementById("userInput"), function() {
      // push send button down and remove text
      $(".sendButton").css("opacity", "0.25");
      setTimeout( function() {
        // load next recipient
        $(".sendExample").addClass("messageSent");

        // remove text
        $(".userInput").text("");
        $(".userInputPlaceholder").show();

        $(".sendButton").css("opacity", "1");
        $(".receiveExampleNotification").addClass("notificationReceived");
      }, 200);
    });
  }, 800);
});

$(".promoVideoContainer").click( function() {
  if ($(this).hasClass("isPaused")) {
    // play it
    $(this).removeClass("isPaused");
    $("#promoVideo")[0].play();
  }
  else {
    // pause it
    $(this).addClass("isPaused");
    $("#promoVideo")[0].pause();
  }
});

$(".submitEmailButton").click( function() {
  $(".emailUpdatesBlock #updatesBlockHelper").text("Adding your email...");
  $(".emailUpdatesBlock #updatesBlockHelper").css("color", "#C3C3C3");
  $.ajax({
  method: "POST",
  url: "https://6znve23df4.execute-api.eu-west-1.amazonaws.com/prod/",
  data: JSON.stringify({ "email": $("#emailInput").val() })
  }).done(function(msg) {
    $(".emailUpdatesBlock").removeClass("errorAddingEmail");
    $(".emailUpdatesBlock").addClass("hasAddedEmail");
    console.log("200: " + msg);
  }).fail( function(msg) {
    $(".emailUpdatesBlock #updatesBlockHelper").attr("style", "");
    $(".emailUpdatesBlock #updatesBlockHelper").text("Invalid email. Please try again.");
    $(".emailUpdatesBlock").addClass("errorAddingEmail");
    console.log("400: " + msg);
  });
});
