vars.watch("stage", function (id, oldval, newval) {
	if (parseInt(newval) != parseInt(oldval) && shouldAnimate) {
		console.log("Stage: " + newval);

		switch(newval) {
			case 1: {
				handlers($(".content"), false);
				changeCursor(1);
    			drawElement($(".profile-picture"), 2);
				break;
			}
			case 2: {
				// profile picture added
				drawElement($(".name-at-top"), 3);
				break;
			}
			case 3: {
				// name is typed.. now we need to click-off
				$(".cursor").show();
				$(".cursor").animate({
					left: $(".cursor").offset().left + 50,
					top: $(".cursor").offset().top + $(".name-at-top").height() + 10
				}, 200, function() {
					changeCursor(1); // back to default cursor
					// set the width of the .name-at-top to content size
					$(".name-at-top").blur();
					$(".name-at-top").attr("drawn", 3);

					vars.stage++; // 4
				});
				break;
			}
			case 4: {
				// add description added
				drawElement($(".short-description-designer"), 3);
				break;
			}
			case 5: {
				// add description added
				drawElement($(".short-description-developer"), 3);
				break;
			}
			case 6: {
				// add description added
				drawElement($(".short-description-speaker"), 3);
				break;
			}
			case 7: {
				// set color for designer
				$(".cursor").show();
				$(".cursor").animate({
					left: $(".short-description-designer").offset().left + 50,
					top: $(".short-description-designer").offset().top + $(".short-description-designer").height() / 2
				}, 200, function() {
					changeCursor(9); // back to default cursor
					// highlight "Designer"
					$(".short-description-designer").focus();
					$(".short-description-designer").select();
					setTimeout( function() {
						// set the text color to purple
						$(".short-description-designer").css("color", $(".short-description-designer").attr("highlight-color"));

						vars.stage++;
					}, 100);
				});

				break;
			}
			case 8: {
				// set color for designer
				$(".cursor").show();
				$(".cursor").animate({
					left: $(".short-description-developer").offset().left + 30,
					top: $(".short-description-developer").offset().top + $(".short-description-developer").height() / 2
				}, 200, function() {
					changeCursor(9); // back to default cursor
					// highlight "Designer"
					$(".short-description-developer").focus();
					$(".short-description-developer").select();
					setTimeout( function() {
						// set the text color to purple
						$(".short-description-developer").css("color", $(".short-description-developer").attr("highlight-color"));

						vars.stage++;
					}, 100);
				});

				break;
			}
			case 9: {
				// set color for designer
				$(".cursor").show();
				$(".cursor").animate({
					left: $(".short-description-speaker").offset().left + 80,
					top: $(".short-description-speaker").offset().top + $(".short-description-speaker").height() / 2
				}, 200, function() {
					changeCursor(9); // back to default cursor
					// highlight "Designer"
					$(".short-description-speaker").focus();
					$(".short-description-speaker").select();
					setTimeout( function() {
						// set the text color to purple
						$(".short-description-speaker").css("color", $(".short-description-speaker").attr("highlight-color"));

						setTimeout( function() {
							vars.stage++;
						}, 200);
					}, 200);
				});

				break;
			}
			case 10: {
				// short description is done.. now we need to click-off
				$(".cursor").animate({
					left: $(".cursor").offset().left + 50,
					top: $(".short-description-container").offset().top + $(".short-description-container").height() + 10
				}, 200, function() {
					changeCursor(1); // back to default cursor
					// set the width of the .name-at-top to content size
					$(".short-description-speaker").blur();
					$(".short-description-speaker").attr("drawn", 3);

					vars.stage++; // 4
				});
				break;
			}
			case 11: {
				// scroll down type
				drawElement($(".scroll-down-for-more"), 3);
				// show all the other content boxes underneath
				$(".section").css("display", "block");
				break;
			}
			case 12: {
				$(".scroll-down-for-more").blur();
				break;
			}
			default:
				// nothing
		}
	}
	else {
		skipAnimation();
	}
    return newval;
});
