$(document).ready( function($) {

	'use strict';

    if($.fn.postContest()){
    	//desktop
        $('.postcontest_dt_change0').attr("src", "/b/fashion/images/projects/2016-fall-campaign-100-percent-exclusive/contest_desktoptext_postcontest.png");
        $('.postcontest_dt_change1').attr("src", "/b/fashion/images/projects/2016-fall-campaign-100-percent-exclusive/contestiphone_postcontest.png");
        $('.contest_dt_entertowin').remove();
        $('.postcontest_dt_change2').remove();
        $('.contest_dt_button').remove();
        $('.postcontest_dt_change3').remove();
		$('.postcontest_dt_change4 p').text("Design your own exclusive word and post it to Instagram. Grab your mobile device and go to bloomingdales.com/designyourword to join the fun!");
		$('.contest_dt_description p').css({"max-width":"387px"});
		$('.postcontest_dt_change00').addClass('small-4').removeClass('small-2');
		$('.postcontest_dt_change01').addClass('small-7').removeClass('small-9');

    	//mobile
        $('.postcontest_change0').attr("src", "/b/fashion/images/projects/2016-fall-campaign-100-percent-exclusive/mc_page0top_postcontest.jpg");
        $('.contest_m_page0title').remove();
        $('.contest_m_page0description p').text("Design your own exclusive word, post it to Instagram with hashtag #100percentbloomies.");
        $('.postcontest_change1 p').text("Finally, post the image to Instagram with hashtag #100percentbloomies");
        $('div[coremetricTag="sweeps0_enter"] p').text("DESIGN YOUR WORD");
        $('div[coremetricTag="sweeps0_see-rules"]').remove();
        $('.contest_m_page2description p').html("Change the background color to your taste. When you’re done, save to your phone and post to Instagram with hashtag <strong>#100percentbloomies</strong>");
        $('.postcontest_change2 p').text("Now post it to Instagram with hashtag #100percentbloomies.");
    }


	$( window ).load(function() {


		var update = true;

		var canvas = document.getElementById("canvasBloom_mobile");
		canvas.width = ( $(window).width() * 2 );// make double pixel for canvas
		canvas.height = ( $(window).width() * 2 );

		var stage = new createjs.Stage("canvasBloom_mobile");

		//preload svgs
		// var characters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','special1','special2','special3','special4'];
		// for(var k=0;k<characters.length;k++){
		// 	$.fn.preload('/b/fashion/images/projects/2016-fall-campaign-100-percent-exclusive/svg/'+characters[k]+'.svg');
		// }

		if( $("#contest_step1").height() < $(window).height() )	$("#contest_step1").height($(window).height());
		if( $("#contest_step4").height() < $(window).height() )	$("#contest_step4").height($(window).height());

		if($(window).height()>=1030){
			$('.contest_desktop_height').css({
				'height':$(window).height()+'px'
			});			
		}


		$( window ).on('resize',function() {
			if( $("#contest_step1").height() < $(window).height() )	$("#contest_step1").height($(window).height());
			if($(window).height()>=1030){
				$('.contest_desktop_height').css({
					'height':$(window).height()+'px'
				});			
			}
		});

		//initial page
		contestGoToPage(0);



	    $('.contest_m_button_enter').on('click', function(){
			resetLetters();
			contestGoToPage(1);
	    });

	    $('.contest_m_button_back').on('click', function(){
			resetLetters();
			contestGoToPage(0);
	    });

	    $('.contest_m_button_back2').on('click', function(){	
			contestGoToPage(1);
	    });



		var charArr=[];
		var charLeftPos=0;
		var foulwords=[
			'Abortion','Allah','anal','analsex','anus','ass','assclown','asshole','assfuck','assmunch','asswipe','balls','bastard','beat off','bitch','biatch','blowjob','boner','boob','bum','butt','chink','christ','clit','clitoris','cock','coon','crap','cum',
			'cunt','damn','dick','dildo','dyke','fag','fart','feces','fellate','fellatio','felate','felatio','felch','fuck','fudgepacker','fudge packer','flange','gangbang','gang bang','Goddamn','Head','hell','hitler','homo',
			'islam','jerk','jesus','jigaboo','jism','jizz','job','lick','masturbate','masterbate','milf','molest','muslim','nazi','nigger','nigga','niggah','niggar','nigguh','nipple','nuts','orgasm','penis','piss','poop','porno','prick','pube',
			'pubic','pussy','queef','raghead','rape','schlong','scrotum','semen','shit','slut','smegma','spade','sperm','spic','spook','spunk','suck','swastika','tit','towelhead','twat','vagina','whore',
		];




		var finalword='';


	    $('.contest_m_button_next').on('click', function(){  	

			charLeftPos = 0;
			finalword = $('#contest_m_textfield').val();
			finalword = finalword.replace(/\s+/g, '');
			finalword = finalword.toLowerCase();


			for (var j = 0; j < foulwords.length; j++) {
				if( finalword.toLowerCase() === foulwords[j].toLowerCase() ){
					finalword=foulwords[j];
					finalword = '000000000000000';
					$('#contest_m_textfield').val("");
					break;
				}
			}

			if(finalword==='000000000000000'){
				resetLetters();
				contestGoToPage(4);
			}else{

				charArr = finalword.split('') ;
				stage.removeAllChildren();
		        update = true;
				for (var i = 0; i < charArr.length; i++) {
					createChar( charArr[i],i);
				}
			
				var shape = new createjs.Shape();
				shape.graphics.beginFill("#fff").drawRect(0, 0, canvas.width, canvas.width);
				stage.addChild(shape);
				stage.setChildIndex( shape, stage.getNumChildren()-(charArr.length+1));
		    	contestGoToPage(2);

			}


	    });




		$('.contest_m_button_savetophone').click(function() {
		    var $img = $("<img/>");
		    $img.attr("src", $('#canvasBloom_mobile')[0].toDataURL() );

		    // this.href = $('#canvasBloom_mobile')[0].toDataURL();
			//$.fn.trace( $('#canvasBloom_mobile')[0].toDataURL().replace('data:image/png;base64,','') );

	    	// $img.attr("src", "data:image/png;base64," + $('#canvasBloom_mobile')[0].toDataURL().replace('data:image/png;base64,',''));
	    	$("#contest_screenshot").empty();
	    	$("#contest_screenshot").prepend($img);
			contestGoToPage(3);


		});
		$('.contest_m_button_home').click(function() {
			resetLetters();
			contestGoToPage(0);
		});

		$(".color_picker").on("click", function(){
			var shape = new createjs.Shape();
			shape.graphics.beginFill(""+$(this).css("background-color")).drawRect(0, 0, canvas.width, canvas.width);
			stage.addChild(shape);
			stage.setChildIndex( shape, stage.getNumChildren()-(charArr.length+1));

	        update = true;

		});


		function createChar(inputChar,positionIndex){
			var imageb = new Image();
			imageb.src = '/b/fashion/images/projects/2016-fall-campaign-100-percent-exclusive/svg/'+inputChar+'.svg';
			imageb.index=positionIndex;
			imageb.onload = handleImageLoad;
		}


		function handleImageLoad(event) {

			$.fn.trace(event.target.index);

		    var image = event.target;
		    var bitmap = new createjs.Bitmap(image);
	        bitmap.scaleX = bitmap.scaleY = ( (canvas.width) / (200*charArr.length) );
	        var bitmapWidth=200*bitmap.scaleX;

		    charLeftPos = charLeftPos + ( (canvas.width) / charArr.length );
		    // charLeftPos = charLeftPos + bitmap.image.width;
	        // bitmap.x = charLeftPos-( (canvas.width) / charArr.length ) ;
	        bitmap.x = (canvas.width / charArr.length )*(event.target.index) ;
	        bitmap.y = (canvas.height-bitmapWidth)/2 ;

	        //bitmap.rotation = parseInt( 360 * Math.random() );
	        bitmap.name = "bmp_"+bitmap.x;

		    stage.addChild(bitmap);


	        update = true;
		    createjs.Ticker.addEventListener("tick", tick);
		    createjs.Ticker.interval=100;
		}

		function tick(event) {
		    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
		    if (update) {
		        update = false; // only update once
		        stage.update(event);
		    }
		}



	    $('.contest_m_button_startover, .contest_m_button_tryagain').on('click', function(){
			resetLetters();
	    	contestGoToPage(1);
	    });

	    function resetLetters(){
	    	$("#contest_screenshot").empty();
			$('#contest_m_textfield').val("");
			stage.removeAllChildren();
	        update = true;
	    }

	    function contestGoToPage(pagenum){
			$('#contest_mobile').children().children('.row').each(function () {
				$(this).hide();
			});
			$("#contest_step"+pagenum).show();
	        $('body,html').animate({
	            scrollTop: 0 ,
	            }, 100
	        );
			$.fn.coreTag('Pageview', 'fall16_100percent--sweeps'+pagenum);
	    }


		/*
		    $('meta[name=viewport]').remove();
		    $('head').append( '<meta name="viewport" width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no >' );
		*/



	    
	});



});


