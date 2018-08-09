
$(function(){

	var rtwBrands = ["1.STATE","360cashmere","3x1","525 America","7 For All Mankind","Adelyn Rae","adidas by Stella McCartney","adidas Originals","Adrianna Papell","AG","AGOLDE","Aidan Aidan","Aidan Mattox","Aijek","A.L.C.","Alexis","Alice + Olivia","Alice McCall","Alix","ALLSAINTS","Alo Yoga","Alpha & Omega","ALTERNATIVE","Amanda Uprichard","Andrew Marc","CANNOT CONFIRM","Anine Bing","Apparis","AQUA","AQUA Cashmere","CANNOT CONFIRM","ASTR the Label","ATM Anthony Thomas Melillo","b.tempt'd by Wacoal","Badgley Mischka","Bagatelle","Bailey 44","Band of Gypsies","Banjara","Barbour","Bardot","CANNOT CONFIRM","Baum und Pferdgarten","BB DAKOTA","BCBG","BCBGMAXAZRIA","Beach Riot","Bec & Bridge","BECCA® by Rebecca Virtue","BedHead Pajamas","Bella Dahl","Belstaff","Beltaine","Betsey Johnson","Beyond Yoga","Black Halo","BLANKNYC","Blu Pepper","Bobeau","Bristols Six","BRONX AND BANCO","Burberry","Calvin Klein","CAMI NYC","Canada Goose","Capote","Carmen Marc Valvo","Carven","C by Bloomingdale's","Champion","CHANEL","Chantelle","Charo Ruiz Ibiza","Cinq à Sept","CANNOT CONFIRM (we have a Cinzia Galeotti and Cinzia Rocca in Stella)","CK Collection","C/MEO Collective","CANNOT CONFIRM","Cole Haan","Colmar","Commando","CANNOT CONFIRM","CANNOT CONFIRM","Cosabella","Cotton Candy LA","Current/Elliott","Cynthia Steffe","CANNOT CONFIRM","Dawn Levy","Derek Lam 10 Crosby","DIANE von FURSTENBERG","Dita Von Teese","Divine Heritage","DKNY","DL1961","Do + Be","Donna Karan","Dress the Population","Eberjey","Echo","Eileen Fisher","Eileen West","Eleven Paris","Elie Tahari","Elizabeth and James","Eliza J","Emporio Armani","Endless Rose","Equipment","Faithfull the Brand","Falke","Fame and Partners","Fashion Forms","FILA","Finders Keepers","Fine Lines","Flora Nikrooz","Flying Monkey","Fogal","FORE","For Love & Lemons","FRAME","Free People","FRENCH CONNECTION","CANNOT CONFIRM","Generation Love","Gerard Darel","GINIA","Giorgio Armani","GOOD AMERICAN","Gottex","GUESS","HALSTON HERITAGE","Hanky Panky","Hanro","Happy Socks","Heartloom","Heidi Klum Intimates","Helmut Lang","Hemant & Nandita","Herno","Hervé Léger","Heurueh","HOBBS LONDON","Honeydew","Hudson","HUE","Hugo Boss","Hunter","In Bloom by Jonquil","Ingrid & Isabel","ITEM m6","CANNOT CONFIRM","James Perse","Jane & Bleecker New York","Jane Post","J Brand","Jill Jill Stuart","Jil Sander","JOA","Jocelyn","Joe's Jeans","John + Jenn","Johnny Was","Joie","Jonquil","Joseph","Josie","JS Collections","Julie Brown","June & Hudson","Just Black Denim","JUST cavalli","K-Deer","Karen Kane","KAREN MILLEN","Karina Grimaldi","CANNOT CONFIRM","kate spade new york","Keepsake","KENDALL + KYLIE","Kenneth Cole","Kenzo","Knowlita","Kobi Halperin","KORAL","Ksenia Schnaider","L'Agence","La Blanca","La Perla","La Vie","Lafayette 148 New York","Laundry by Shelli Segal","Lauren","Le Gali","Le Mystère","Lemlem","Levi's","LIKELY","Line & Dot","Lisa Todd","Little Black Bodysuit","LNA","LNDR","Lost + Wander","Louise Paris","Lovers + Friends","LoveShackFancy","Lauren Ralph Lauren Plus","L*Space","Lucky Brand","Lucy Paris","Lyssé","CANNOT CONFIRM","Mackage","Madeleine Thompson","Maje","Majestic Filatures","Marco de Vincenzo","Marella","Marmot","CANNOT CONFIRM","Maximilian Furs","Max Mara","Max Mara Studio","Michael Kors","MICHAEL Michael Kors","MICHAEL Michael Kors Plus","Michael Stars","Midnight Bakery","MILLY","MINKPINK","Minnie Rose","Miraclesuit","MISA Los Angeles","MKT Studio","Mochi","Molly Bracken","Moncler","Monrow","Moon & Meadow","Moose Knuckles","MOTHER","Muche et Muchette","Mustard Seed","n PHILANTHROPY","Naked","Nanette Lepore","Narciso Rodriguez","Natori","Natural Skin","NIC + ZOE","Nightwalker","Nike","Nobody","Nookie","The North Face®","NYDJ","Olivaceous","On Gossamer","CANNOT CONFIRM","On Twelfth","One Madison","Oscar de la Renta","Pacific Muse","PAIGE","PAM & GELA","PAPER London","Parajumpers","Parker","Parker Smith","Passionata by Chantelle","PAULE KA","Perfect Moment","Peri Luxe","PERSEVERANCE London","PINKO","Pistola","PJ Salvage","Place Nationale","Polo Ralph Lauren","CANNOT CONFIRM","Poupette St. Barth","PPLA","Preen Line","PUMA","Rachel Zoe","rag & bone/JEAN","rag & bone","Rails","Ralph Lauren","Ramy Brook","Rebecca Taylor","Rebecca Vallance","Red Carter","REISS","Re:Named","CANNOT CONFIRM","Rococo Sand","Ronny Kobo","Rose Carmine","S/W/F","Sadie & Sage","Sam Edelman","Sanctuary","Sandro","SAU LEE","Save The Duck","Saylor","Scotch & Soda","See by Chloé","Shoshanna","Show Me Your MuMu","Simone Perele","SJYP","Skarlett Blue","Soia & Kyo","SONIA RYKIEL","SPANX®","Spiritual Gangster","Splendid","St. John","Stance","Status by Chenault","Stella McCartney","Suboo","Sundry","Sunset + Spring","Surf Gypsy","T by Alexander Wang","Tadashi","Tadashi Petites","Tahari","TC Fine Intimates","Ted Baker","Terez","The East Order","The Fifth Label","The Kooples","Theory","Thistle & Spire","Three Dots","Tiger Mist","Tommy Bahama","Tory Burch","Trina Turk","Tuxe","UGG®","urbancode","Varley","Veda","Velvet","Velzera","Vilebrequin","Vince","VINCE CAMUTO","Vintage Havana","Wacoal","WAYF","Weekend Max Mara","Whistles","WILDFOX","Wilt","Wolford","WOOLRICH JOHN RICH & BROS","Work Custom Jeans","WOW Couture","Yummie","Z Supply","Zadig & Voltaire","Zeza B","Zoe Jordan"];
	var navActive = false;
	
	// create resuable reference to the body
	var bodyRef = $("body");

	function isNumber() {

	}
	// initiate the sticky nav
	function initNav() {
		if($('.heart-of-ny-sticky-header').length){
			var sticky = $('.heart-of-ny-sticky-header');
		
			//on hamburger click trigger nav roll out
			$("#heart-of-ny-nav-switcher").on('click', function () {
		        bodyRef.toggleClass('heart-of-ny-nav-is-active');
		        navActive = bodyRef.hasClass('heart-of-ny-nav-is-active');
		    });
		    
		    // add border on page scroll
		    var logoOffset = $("header .bloom-logo").offset();
		    $(window).scroll(function () {
		    	console.log("window scroll");
		        var offsetY = $(this).scrollTop();
		        if(offsetY > (logoOffset.top)) {
		            bodyRef.addClass("heart-scrolled");
		        } else {
		            bodyRef.removeClass("heart-scrolled");
		        }
		    });
		}
	}

	// initiate the lazy load instance
	function initLazyLoad() {
		if($('.lazy').length) {
		    $('.lazy').Lazy({
		        effect: 'fadeIn'
		    });
		}
	}

	// for pages with slick carousel
	function initCarousel() {
		if($(".59-carousel").length) {
			$('.59-carousel').slick({
				prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
				nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"></button>',
				dots: true,
				autoplay: true,
  				autoplaySpeed: 4000
			});
		}
	}
	function animatePage() {
		$(".heart-of-new-york").fadeOut(0).css("opacity", 1).fadeIn(1000);
	}
	function initFeatureBar() {
		console.log("initFeatureBar");
		if($(".new-feature").length) {
			$(window).on("resize", setFeatureBar);
			setFeatureBar();
		}
	}
	function setFeatureBar () {
		console.log("setFeatureBar");
		$(".new-feature").each(function() {
			if($(window).width() >= 767){
				$(this).height( $(this).find(".col").height() + $(this).find(".feature-type p").height() );
			}
			else {
				$(this).height( $(this).find(".col").height() + $(this).find(".small-feature-type").height() );
			}
		});
	}


	function initFlex() {
		if($(".flex-container").length) {
			checkFlex();
			$(window).on("resize", checkFlex);
		}
	}
	function checkFlex() {
		$(".flex-container").each(function(index) {
			var flexHeight = $(this).find(".flex-feature").height();
			$(this).find(".flex-bg").height(flexHeight/2)
			$(this).find(".flex-bg").css("top", (flexHeight/2) - $(this).find(".flex-bg").height()/2);
		});
	}
	function initAnimations() {
		AOS.init({
		  anchorPlacement: 'top-top', // defines which position of the element regarding to window should trigger the animation
		  delay: 200,
		  once: false,
		  mirror: true
		});
	}

	initNav();
	initLazyLoad();
	initCarousel();
	animatePage();
	initFeatureBar();
	initFlex();
	setTimeout(initAnimations, 300);
	
	var core = bl.coremetrics;
    core.init({
        use_attribute_tags: true,
        category_id: "heart-of-ny",
        page_paths: {
			"": "landing-page",
			"men": "mens"
		},
    });

});