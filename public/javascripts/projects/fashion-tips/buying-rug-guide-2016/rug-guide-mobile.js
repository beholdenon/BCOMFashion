/* globals BLOOMIES, Hammer, escape  */

'use strict';

$(document).ready(function() {
	
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

	var opt1, opt2,	opt3;
	// cmProjectCategory = "fall14_rugsguide";

	var lookbookUrl = "http://www.bloomingdales.com/fashion-index/rug-finder-2015.jsp",
		lookbookUrlBitly = "http://bit.ly/1AoboF4",
		lookbookUrlPinImage = '/fashion/images/projects/fashion-tips/buying-rug-guide-2016/RUG_GUIDE_PINTEREST_VS2.jpg',
		lookbookUrlFbImage = '/fashion/images/projects/fashion-tips/buying-rug-guide-2016/RUG_GUIDE_FB_ICON_VS2.jpg';

	var uparrow="/fashion/images/projects/fashion-tips/buying-rug-guide-2016/mobile-arrow.jpg", 
		downarrow="/fashion/images/projects/fashion-tips/buying-rug-guide-2016/mobile-down-arrow.jpg";

	$("#mobile_arrow").on("click tap", function() {
		$("#mobile-menu").slideToggle(function(){
			mobileArrowToggle();	
		});
		
	});

	if(BLOOMIES.isTouch){
        //swipe left
        Hammer('.mobile-choices .container').on('swiperight', function(){
        	$(this).parent().find(".left")[0].dispatchEvent(evObj);
        });
        //swipe right
        Hammer('.mobile-choices .container').on('swipeleft', function(){
            $(this).parent().find(".right")[0].dispatchEvent(evObj);
        });
    }

	$('#mobile-menu div').on("click tap", function(){
		var link = $(this).data("link"),
			name = $(this).text();

		if (link !== undefined) {
			$(".mobile section").hide();
			$(link).show();			
			$("#mobile-page-name").text(name);
			$("#mobile-menu").slideToggle(function(){
				mobileArrowToggle();	
			});
			
			jump('sec=' + link.substring( 1 ) );
			if ( link === "#mobile-finder" ) {
				$('#mobile-finder-1').show();
				$("#mobile-finder-2, .mobile-step-2, .mobile-step-3").hide();

				opt1=undefined;
				opt2=undefined;
				opt3=undefined;
			}
		}
	});

	$('#mobile-choice-1 li').on("click tap", function(){
		opt1 = $(this).data("value");
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		$("#mobile-finder-1").hide();
		$('#mobile-finder-2').show();
		$('#'+opt1).show().siblings().hide();
		$('.mobile-choice-1').text($(this).find('p').text());
		jump( 's1=' + opt1 );
	});

	$('#mobile-finder-2 .mobile-choices .choice div').on("click tap", function(){
		opt2 = $(this).data("value");
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		$('#mobile-finder-2').hide();
		$('#mobile-finder-3, .mobile-step-3').show();
		$('#'+opt1).hide();
		$('.mobile-choice-2').text($(this).text());	
		jump('s1='+opt1+'?s2='+opt2);
	});

	$('#mobile-finder-3 .mobile-choices .choice div, #mobile-finder-3 .mobile-choices .choice img').on("click tap", function(){
		opt3 = $(this).data("value");
		
		window.open("/shop/home/rugs?id=1001971&channel=mobile&ppp=20#!fn=BopsRadius%3D0%26RUG_SIZE%3D"+opt2+"%26RUG_TYPE%3D"+opt3+"%26sortBy%3DORIGINAL%26productsPerPage%3D20%26channel%3Dmobile",'_parent');
	});

	$('.mobile-choices .arrows div').on("click tap", function(){
		// var currentSlide = $(this).parents('.mobile-choices').find("active").data("pos");
		var direction = $(this).attr('class');
		sizeSwipe($(this),direction);
	});

	$('.mobile-guideLink').on('click tap', function(){
		$('#mobile-finder, #mobile-glossary').hide();
		$('#mobile-guide').show();

	});

	function sizeSwipe(elem, direction) {
		if (direction==='right') {
			$(elem).parents('.mobile-choices').find(".container").find(".choice:first").animate({
				left: "-=450",
			},500);
			$(elem).parents('.mobile-choices').find(".container").find(".choice:first").appendTo($(elem).parents('.mobile-choices').find(".container"));
			$(elem).parents('.mobile-choices').find(".container").find(".choice:first").css('left','450px').animate({
				left: "-=450",
			},500);

		} else {
			$(elem).parents('.mobile-choices').find(".container").find(".choice:first").animate({
				left: "+=450",
			},500);
			$(elem).parents('.mobile-choices').find(".container").find(".choice:last").prependTo($(elem).parents('.mobile-choices').find(".container"));
			$(elem).parents('.mobile-choices').find(".container").find(".choice:first").css('left','-450px').animate({
				left: "+=450",
			},500);
		}
	}

	function mobileArrowToggle() {
		$("#mobile_arrow").toggleClass('open');

		if ( $("#mobile_arrow").hasClass('open') ) {
			$("#mobile_arrow").css('background-image','url('+downarrow+')');
		} else {
			$("#mobile_arrow").css('background-image','url('+uparrow+')');
		}
	}

/*.................................SOCIAL LINKS.......................................*/
	var lookbookFacebookUrl = 'https://www.facebook.com/dialog/feed?',
	lookbookFacebookTitle = "Rug Buying Guide | bloomingdales.com",
	lookbookFacebookSummary = "Carpet diem! We've got your floor covered with a brand-new interactive guide. ",
	lookbookSocFacebookLink = lookbookFacebookUrl;
	lookbookSocFacebookLink += 'app_id=145634995501895';
	lookbookSocFacebookLink += '&name=' + encodeURIComponent(lookbookFacebookTitle);
	lookbookSocFacebookLink += '&display=popup';
	lookbookSocFacebookLink += '&description=' + encodeURIComponent(lookbookFacebookSummary);
	lookbookSocFacebookLink += '&link=' + encodeURIComponent(lookbookUrl);
	lookbookSocFacebookLink += '&picture=' + encodeURIComponent(lookbookUrlFbImage);
	lookbookSocFacebookLink += '&redirect_uri=' + ('https://www.facebook.com/');

	var lookbookTwitterUrl = 'http://twitter.com/intent/tweet?source=webclient&text=',
	lookbookTwitterTextParam = "Carpet diem! We've got your floor covered with a brand-new interactive guide. " +" "+ lookbookUrlBitly,
	lookbookSocTwitterLink = lookbookTwitterUrl;
	lookbookSocTwitterLink += encodeURIComponent(lookbookTwitterTextParam).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");

	var lookbookPinterestUrl = 'http://pinterest.com/pin/create/button/',
	lookbookPinterestUrlParam = lookbookUrl,
	lookbookPinterestDescriptionParam = "Rug Buying Guide | bloomingdales.com",
	lookbookSocPinterestLink = lookbookPinterestUrl;
	lookbookSocPinterestLink += '?url=' + encodeURIComponent(lookbookPinterestUrlParam).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
	lookbookSocPinterestLink += '&description=' + encodeURIComponent(lookbookPinterestDescriptionParam).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
	lookbookSocPinterestLink += '&media=' + encodeURIComponent(lookbookUrlPinImage).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
		
	$('.social-pinterest').attr('href', lookbookSocPinterestLink);
	$('.social-fb').attr('href', lookbookSocFacebookLink);
	$('.social-twitter').attr('href', lookbookSocTwitterLink);
	$('.social-fb, .social-twitter, .social-pinterest').attr('target','_blank');


	function jump(h){
	    // var url = location.href;
	    location.href = "#"+h;
	    // history.replaceState(null,null,url);
	}

});