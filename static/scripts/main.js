var isDrawing = false;
var windowSizeChanged = false;
var vars = {stage: 0};
var shouldAnimate = false;

$(document).ready(function() {
    if (!shouldAnimate) {
      skipAnimation();
    }
    else {
      changeCursor(2);
      setTimeout(function() {
          $(".artboard").animate({
              width: "100%",
              height: "100%"
          }, 800);
          setTimeout(function() {
              changeCursor(1);
              $(".artboard").attr("class", "artboard artboardReady");
              handlers($(".content"), true);
              $(".intro").css("background", "#F2F2F2");

              setTimeout( function() {
              	resizeTo($(".content"), $(document).width(), $(document).height(), true);
              }, 100);
          }, 800);
      }, 500);
    }
});

function changeCursor(type) {
    switch (type) {
        case 1:
            console.log("default");
            // default cursor
            $(".cursor").attr("class", "cursor defaultCursor");
            break;
        case 2:
            console.log("draw");
            // draw cursor
            $(".cursor").attr("class", "cursor drawCursor");
            break;
        case 3:
            // resize vertical
            $(".cursor").attr("class", "cursor resizeVerticalCursor");
            break;
        case 4:
            // resize horizontal
            $(".cursor").attr("class", "cursor resizeHorizontalCursor");
            break;
        case 5:
            // resize left top
            $(".cursor").attr("class", "cursor resizeLeftTopCursor");
            break;
        case 6:
            // resize right top
            $(".cursor").attr("class", "cursor resizeRightTopCursor");
            break;
        case 7:
            // resize left bottom
            $(".cursor").attr("class", "cursor resizeLeftBottomCursor");
            break;
        case 8:
            // resize right bottom
            $(".cursor").attr("class", "cursor resizeRightBottomCursor");
            break;
        case 9:
        	$(".cursor").attr("class", "cursor textCursor");
        	break;
        default:
            $(".cursor").attr("class", "cursor defaultCursor");
            break;
    }
}

function handlers(elem, state) {
    if (state) {
        // turn handlers on
        elem.attr("handlers", "true");
    } else {
        // turn handlers off
        elem.attr("handlers", "false");
    }
}

var resizeCursorType = 1;

function resizeTo(elem, newWidth, newHeight, cover) {
    var newLeft = "";
    var newTop = "";

    console.log("newWidth: " + newWidth + "; newHeight: " + newHeight + ";");

    if (newWidth == undefined || parseInt(newWidth) == elem.width()) {
    	newWidth = "";
    }
    if (newHeight == undefined || parseInt(newHeight) == elem.height()) {
    	newHeight = "";
    }

    /* resize cursor types:
    			3 - resize vertical
    			4 - resize horizontal
    			5 - resize left top
    			6 - resize right top
    			7 - resize left bottom
    			8 - resize right bottom
    */

    // first we need to animate the cursor over the resizer toggles
    if (newWidth.toString().length > 0 && newHeight.toString().length > 0) {
    	console.log("a suh dude!");
        // resize from left top handler
        newLeft = "-11px";
        newTop = "-11px";

        resizeCursorType = 5;
    } else if (newWidth.toString().length == 0 && newHeight.toString().length > 0) {
        // new height
        newLeft = elem / 2 - 11;
        // resize from middle top handlers
        newTop = "-11px";

        resizeCursorType = 3;

        // prevent newWidth issues
        newWidth = elem.width();
    } else {
        // new width
        newTop = elem.height() / 2 - 11;
        console.log("new top: " + newTop);

       	newLeft = "-11px";

        resizeCursorType = 4;

        // prevent newHeight issues
        newHeight = elem.height();
    }

    console.log("newLeft: " + newLeft + "; newTop: " + newTop + ";");

    var animationDuration = 500;
    if (parseInt(newLeft) != parseInt($(".cursor").css("left").replace("px", "")) && parseInt(newTop) != parseInt($(".cursor").css("top").replace("px", ""))) {
    	changeCursor(1);
    }
    else {
    	animationDuration = 0;
    }

    $(".cursor").animate({
        left: newLeft,
        top: newTop,
    }, animationDuration, function() {
    	console.log("lets go!");
    	// change the cursor to the respective icon
        changeCursor(resizeCursorType);
        // update the size of the artboard
        setTimeout( function() {
        	if (cover) {
        		newWidth = "100%";
        		newHeight = "100%";
        		setTimeout( function() {
        			vars["stage"]++; // 1
        		}, 800);
        	}
        	elem.animate({
	            width: newWidth,
	            height: newHeight
	        }, 800);
        }, 100);
    });
}
$(".content").on( "resize", function() {
	$(".artboard").addClass("artboardResizing");
	console.log('Resize...');
	waitForFinalEvent(function(){
      //...
      $(".artboard").removeClass("artboardResizing");
      console.log("done!");
    }, 500, "artboardResize");
});
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

// draw the elements
function drawElement(elem, type) {
	/* type
	   1: general box
	   2: image
	   3: text
	*/

	if (type == 1 || type == false) {
		// general box
		var elemX = elem.offset().left;
		var elemY = elem.offset().top;
		var elemWidth = elem.width();
		var elemHeight = elem.height();

		var outlineBox = $(document.createElement('div'));
		outlineBox.attr("class", "outline-box");
		outlineBox.css({
			left: elemX,
			top: elemY
		});
		$("body").append(outlineBox);

		// use the cursor to draw the box
		changeCursor(1); // set to default if not already
		// move the cursor to the point
		$(".cursor").animate({
			left: elemX,
			top: elemY
		}, 500, function() {
			// animation just finished... change it to draw cursor and draw the element!
			changeCursor(2); // now its a draw cursor
			setTimeout( function() {
				// I mean c'mon... no one starts drawing the exact INSTANT it gets changed to a draw cursor!
				var newLeft = parseInt(elemX) + elemWidth;
				var newTop = parseInt(elemY) + elemHeight;
				$(".cursor").animate({
					left: newLeft,
					top: newTop
				}, 300);
				outlineBox.animate({
					width: elemWidth,
					height: elemHeight
				}, 300);

				// wooo element has been drawn - now you can show it!
				setTimeout( function() {
					outlineBox.remove();
					elem.attr("drawn", "1"); //  resize/reposition during this stage

					// check for change in new x/y/width/height
					if (elemWidth != elem.width() || elemHeight != elem.height()) {
						// something changed in width/height
						// -- resize the element
						if (elemX != elem.offset().left || elemY != elem.offset().top) {
							// something changed in the x/y
							changeCursor(1);
						}
					}
					else {
						changeCursor(1);
						setTimeout( function() {
							elem.attr("drawn", "2");
							setTimeout( function() {
								elem.attr("drawn", "3");
								vars["stage"]++;
							}, 200);
						}, 200);
					}

				}, 300);
			}, 50);
		});
	}
	else if (type == 2) {
		// image

		// -- asume it's a copy/paste... and for ease, we're going to paste it exactly where it belongs... hah cuz that always happens
		handlers(elem, true);
		elem.attr("drawn", "3");

		setTimeout( function() {
			handlers(elem, false);
			vars["stage"]++;
		}, 250);
	}
	else if (type == 3) {
		// text
		var elemX = elem.offset().left;
		var elemY = elem.offset().top + ((elem.height() / parseInt($(elem).attr("rows"))) / 2);

		$(".cursor").animate({
			left: elemX,
			top: elemY
		}, 500, function() {
			// animation just finished... change it to text cursor and type the element!
			changeCursor(9); // now its a text cursor
			setTimeout( function() {
				elem.attr("drawn", "3");
        elem.focus();
        if (elem.attr("text") != "Developer" && elem.attr("text") != "Speaker") {
          elem.val("Type something");
          elem.select();
        }
				setTimeout( function() {
					simulateTyping(elem.attr("text"), elem);
				}, 500);
			}, 50);
		});
	}
}
function simulateTyping(str, textArea) {
    var currentCharIndex = 0;
    textArea.val("");
    $(".cursor").hide();
    function typeChar(){
      if (currentCharIndex >= str.length) {
        return;
      }
      var char = str[currentCharIndex];
      textArea.val(textArea.val() + char);
      currentCharIndex ++;
      console.log(currentCharIndex);
      console.log(str.length);
      if (currentCharIndex == str.length) {
      	vars.stage++;
      }
      setTimeout(typeChar, 80);
    }

    typeChar();
 }
function simulateClickOff(elem) {
	var cursor = $(".cursor");
	cursor.animate({
		left: cursor.offset().left + 5,
		top: cursor.offset().top + 5
	});
	setTimeout( function() {
		changeCursor(1);
		handlers(elem, false);
	}, 100);
}

$("textarea[type-out='true']").keydown( function(e){
	e.preventDefault();
});


function selectTextareaLine(tarea,lineNum) {
    lineNum--; // array starts at 0
    var lines = tarea.value.split("\n");

    // calculate start/end
    var startPos = 0, endPos = tarea.value.length;
    for(var x = 0; x < lines.length; x++) {
        if(x == lineNum) {
            break;
        }
        startPos += (lines[x].length+1);

    }

    var endPos = lines[lineNum].length+startPos;

    // do selection
    // Chrome / Firefox

    if(typeof(tarea.selectionStart) != "undefined") {
        tarea.focus();
        tarea.selectionStart = startPos;
        tarea.selectionEnd = endPos;
        return true;
    }

    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos);
        range.moveStart("character", startPos);
        range.select();
        return true;
    }

    return false;
}

function skipAnimation() {
  console.log("skip!");
  $("*[drawn='0'], *[drawn='1'], *[drawn='2']").each( function () {
    $(this).attr("drawn", "3");
  });
  $("*[handlers='true']").each( function () {
    $(this).attr("handlers", "false");
  });
  $("textarea[type-out='true']").each( function () {
    $(this).text($(this).attr("text"));
    $(this).css("color", $(this).attr("highlight-color"));
  });
  $(".artboard").css({
    width: "100%",
    height: "100%"
  });
  $(".content").css({
    width: "100%",
    height: "100%"
  })
  $(".cursor").hide();
  $(".section").css("display", "block");
  $(".artboard").attr("class", "artboard artboardDrawn artboardReady");
}
