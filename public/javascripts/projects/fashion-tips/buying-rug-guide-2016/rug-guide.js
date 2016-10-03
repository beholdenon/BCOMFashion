/* globals BLOOMIES, escape */
'use strict';

var cmProjectCategory = "fall14_rugsguide";

$(window).load( function() {
	BLOOMIES.coremetrics.cmCreatePageviewTag('fall14_rugsguide--find-your-rug', cmProjectCategory);
	BLOOMIES.coremetrics.cmCreatePageviewTag('fall14_rugsguide--step 1', cmProjectCategory);
});

$(document).ready(function () {

	var pageWindow = $('html,body');
	
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

	var opt1, opt2,	opt3, step1, step2, 
		setmobile=false;

	var lookbookUrl = "http://www.bloomingdales.com/fashion-index/rug-finder-2015.jsp",
		lookbookUrlBitly = "http://bit.ly/1AoboF4",
		lookbookUrlPinImage = '${baseUrlAssets}/web20/assets/img/specialProjects/rug-finder-2015/RUG_GUIDE_PINTEREST_VS2.jpg',
		lookbookUrlFbImage = '${baseUrlAssets}/web20/assets/img/specialProjects/rug-finder-2015/RUG_GUIDE_FB_ICON_VS2.jpg';

	$(window).on('hashchange', function() {
		var hash = window.location.hash;
		
		if ( hash.indexOf( 'sec=' ) >= 0 || hash.indexOf( 's1=') >=0 || hash.indexOf( 'guide-' ) ) {

			if(setmobile) {

				if ( hash.length === 0 || (hash.indexOf('mobile-finder') >= 0))
				{
					pageWindow.scrollTop(0);
					
					$(".mobile section").hide();
					$('#mobile-finder').show();
					$("#mobile-page-name").text( 'find your rug' );

					$('#mobile-finder-1').show();
					$("#mobile-finder-2, .mobile-step-2, .mobile-step-3").hide();
				
				}
				else
				{
					navigateTo(hash);
				}

			} else {
				if ( hash.length === 0 || (hash.indexOf('rf_finder') >= 0))
				{
					pageWindow.scrollTop(0);
					
					$( '.step-2' ).hide();
					$( '.step-3' ).hide();
					$( '.step-1' ).show();
					$( '#navigation-finder' ).addClass('active').siblings().removeClass('active');
					$( '#rf_finder' ).show().siblings().hide();
					$(".step-2 .subSelect").hide();		
					
				}
				else
				{
					navigateTo(hash);			
				}
			}

			
		}			
				
	});

	$('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });


	$(window).load(function () {
		var hash = window.location.hash;
       if( hash.length !== 0 ) {
       		navigateTo(hash);
       }
 
      });

	$('#navigation-finder').on('click', function() {
		opt1=undefined;
		opt2=undefined;
		opt3=undefined;

		$(".step-1").show();
		$(".step-2").hide();
		$(".step-3").hide();
		$(".step-2 .subSelect").hide();

		// history.replaceState(null,null,url);

		BLOOMIES.coremetrics.cmCreatePageviewTag('fall14_rugsguide--'+ $(this).attr("data-cm"), cmProjectCategory);
	});

	$('#rug_nav .tab').on('click', function ( ){
		
		var navChoice = $(this),
			cmElementTag = '';

		if (navChoice.attr('id') !== "navigation-shop" && navChoice.attr('id') !== "navigation-social") {

			cmElementTag = $(this).attr("data-cm");
			
			navChoice.addClass('active').siblings().removeClass('active');
			$(navChoice.data("link")).show().siblings().hide();
			jump('sec=' + navChoice.data("link").substring(1));

		}
		
		BLOOMIES.coremetrics.cmCreatePageviewTag('fall14_rugsguide--'+cmElementTag, cmProjectCategory);
		BLOOMIES.coremetrics.cmCreatePageElementTag(cmElementTag, cmProjectCategory);
	});

	$( '#navigation-social a, #navigation-socia-mobile a' ).on('click', function(){
		BLOOMIES.coremetrics.cmCreatePageElementTag($(this).attr('class'), cmProjectCategory);
	});

	$('.fireElementTag, #rf_guide a, .highlights a').click( function() {
        var attrCm = $(this).attr('data-cm');
        if ( typeof attrCm === 'string' && attrCm.length > 0 ) {
            BLOOMIES.coremetrics.cmCreatePageElementTag( attrCm, cmProjectCategory );
        }
	});

	$('.choice-1').on('click', function () {
		$(".step-1").hide();
		$(".step-2").show();
		step1 = $(this).find("p").text();
		$(".step-2 .soFar .your_choice-1").text(step1);

		opt1 = $(this).data("value");
		$('.'+opt1).show();
		
		jump( 's1=' + opt1 );

		BLOOMIES.coremetrics.cmCreatePageElementTag('room-'+opt1, cmProjectCategory);
		BLOOMIES.coremetrics.cmCreatePageviewTag('fall14_rugsguide--step 2', cmProjectCategory);
	});

	$('.choice-2').on('click', function () {
		$(".step-2").hide();
		$(".step-3").show();
		step2 = $(this).text();
		$(".step-3 .soFar .your_choice-1").text(step1);
		$(".step-3 .soFar .your_choice-2").text(step2);

		opt2 = $(this).data("value");
		jump('s1='+opt1+'?s2='+opt2);

		BLOOMIES.coremetrics.cmCreatePageElementTag('size-'+opt2, cmProjectCategory);
		BLOOMIES.coremetrics.cmCreatePageviewTag('fall14_rugsguide--step 3', cmProjectCategory);
	});

	$('.choice-3').on('click', function () {
		opt3 = $(this).data("value");

		BLOOMIES.coremetrics.cmCreatePageElementTag('style-'+opt3, cmProjectCategory);
		window.open("/shop/home/rugs/Bopsradius,Rug_size,Rug_type,Bopszipcode,Sortby,Productsperpage/0,"+opt2+","+opt3+",10001,ORIGINAL,96?id=1001971",'_parent');
	});

	$('.guideLink').on('click tap', function(){
		$("#navigation-guide").addClass('active').siblings().removeClass('active');
		$("#rf_guide").show().siblings().hide();
	});
		

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
	    location.href = "#"+h;
	    // history.replaceState(null,null,url);
	}

	function navigateTo( hash ) {
		var hashStep1,
			hashStep2,
			section,
			pageName;

		if ( setmobile ) {

			if ( hash.indexOf( 'sec=' ) >= 0 || hash.indexOf( 'guide-' ) >=0 ) {

				section = '#' + (hash.indexOf( 'guide-' ) >=0 ? 'mobile-guide' : hash.substring( hash.indexOf( 'sec=' )  + 4  ) );
				pageName = '';

				$(".mobile section").hide();
				$(section).show();
				
				switch ( section ) {
					case '#mobile-finder':
						pageName = 'find your rug';
					break;
					case '#mobile-guide':
						pageName = 'rug buying guide';
					break;
					case '#mobile-glossary':
						pageName = 'glossary';
					break;

				}
				$("#mobile-page-name").text( pageName );
				
				if ( section === "#mobile-finder" ) {
					$('#mobile-finder-1').show();
					$("#mobile-finder-2, .mobile-step-2, .mobile-step-3").hide();
				}
				

			}else {

				pageWindow.scrollTop(0);

		  		if(hash.indexOf( 's2=' ) >= 0)
		  		{	
		  			hashStep1 = hash.substring(hash.indexOf('s1=') + 3, hash.indexOf('?'));
		  			hashStep2 = hash.substring(hash.indexOf('s2=') + 3);
		  			
		  			opt1 = hashStep1;
		  			opt2 = hashStep2;
		  			$(".mobile section").hide();
		  			$('#mobile-finder-1').hide();
					$('#mobile-finder-2').hide();
					$('#mobile-finder').show();
					$('.mobile-step-3').show();
					$('#'+opt1).hide();
					$('.mobile-choice-1').text(hashStep1.replace('mobile-', ''));
					$('.mobile-choice-2').text( $( '#' + hashStep1 ).find( $( '*[data-value="'+hashStep2+'"]' ) ).text() ) ;

		  		}
		  		else
		  		{
		  			hashStep1 = hash.substring(hash.indexOf('s1=') + 3);

		  			opt1 = hashStep1;
		  			$(".mobile section").hide();
					$("#mobile-finder-1").hide();
					$('.mobile-step-3').hide();
					$('#mobile-finder').show();
					$('#mobile-finder-2').show();
					$('#'+opt1).show().siblings().hide();
					$('.mobile-choice-1').text(hashStep1.replace('mobile-', ''));
		  			
		  		}
		  	}

		}
		else {

			if ( hash.indexOf( 'sec=' ) >= 0 || hash.indexOf( 'guide-' ) >=0 ) {

				section = ( hash.indexOf( 'guide-' ) >=0 ? 'rf_guide' : hash.substring( hash.indexOf( 'sec=' )  + 4  ) );
				
				$(".step-1").show();
				$(".step-2").hide();
				$(".step-3").hide();
				$(".step-2 .subSelect").hide();

				$( '#navigation-' + section.substring( 3 ) ).addClass('active').siblings().removeClass('active');
				$( '#' + section ).show().siblings().hide();

			}else {

				pageWindow.scrollTop(0);

		  		if(hash.indexOf( 's2=' ) >= 0)
		  		{	
		  			hashStep1 = hash.substring(hash.indexOf('s1=') + 3, hash.indexOf('?'));
		  			hashStep2 = hash.substring(hash.indexOf('s2=') + 3);

		  			opt1 = hashStep1;
		  			opt2 = hashStep2;
		  			
		  			$( '.step-1' ).hide();
		  			$( '.step-2' ).hide();
					$( '.step-3' ).show();
					$( '#navigation-finder' ).addClass('active').siblings().removeClass('active');
					$( '#rf_finder' ).show().siblings().hide();
					step2 = hash.text();
					
					$(".step-3 .soFar .your_choice-1").text( ( ( hashStep1.indexOf('dining') >= 0 || hashStep1.indexOf('living') >= 0 ) ? hashStep1 + ' room' : hashStep1  ) );
					$(".step-3 .soFar .your_choice-2").text(hashStep2.split('x').join(' X '));

		  		}
		  		else
		  		{
		  			hashStep1 = hash.substring(hash.indexOf('s1=') + 3);

		  			opt1 = hashStep1;
		  			
		  			$( '.step-1' ).hide();
		  			$( '.step-3' ).hide();
		  			$( '#navigation-finder' ).addClass('active').siblings().removeClass('active');
					$( '#rf_finder' ).show().siblings().hide();
					$( '.step-2' ).show();
					$( '.' + hashStep1 ).show();

					$(".step-2 .soFar .your_choice-1").text( ( ( hashStep1.indexOf('dining') >= 0 || hashStep1.indexOf('living') >= 0 ) ? hashStep1 + ' room' : hashStep1  ) );
		  		}
		  	}
		}
	}

});



