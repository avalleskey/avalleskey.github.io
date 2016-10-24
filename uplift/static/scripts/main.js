function type(string,element){
    (function writer(i){
      if(string.length <= i++){
        element.innerHTML = string;
        return;
      }
      element.innerHTML = string.substring(0,i);
      setTimeout(function(){writer(i);},150);
    })(0)
}
$(document).ready( function() {
  setTimeout( function() {
    $(".userInputPlaceholder").hide();
    type("Hey Tim, have a good day!", document.getElementById("userInput"));

    setTimeout( function() {
      // push send button down and remove text
      $(".sendButton").css("opacity", "0.25");
      setTimeout( function() {
        // remove text
        $(".userInput").text("");
        $(".userInputPlaceholder").show();

        $(".sendButton").css("opacity", "1");
        $(".receiveExampleNotification").addClass("notificationReceived");
      }, 200);
    }, 3850);
  }, 800);

});
