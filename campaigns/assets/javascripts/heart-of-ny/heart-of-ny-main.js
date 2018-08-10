// mimified coremetrics plugin
window.bl=window.bl||{},function(e){var t=!1,i=window.ENV_CONFIG||"dev",o=window.location.host,r=["fashion.bloomingdales.com","www.bloomingdales.com","m.bloomingdales.com"],n={category_id:"",page_paths:{},call_page_tags:!0,use_attribute_tags:!0};var c=function(e,t,i){for(var o=0;o<e.length;o++)t.call(i,o,e[o])};function a(){(t=function(){try{return!(!window.BLOOMIES||!window.BLOOMIES.coremetrics)}catch(e){return d("ERROR: Could not find coremetrics library (from checkForCoremetrics method): "+e),!1}}())?(d("Library Initiated"),function(){if(window.BLOOMIES.coremetrics.pageViewExploreAttributes=new window.BLOOMIES.coremetrics.exploreAttributes,"dev"===i)return cmSetTest();if("production"===i)return r.indexOf(l)>=0?cmSetProduction():cmSetTest();throw"ERROR: Unidentified env variable (from initEnvironment method)"}(),function(){if(n.use_attribute_tags){var e=document.querySelectorAll("[coremetricTag]");c(e,function(e,t){t.onclick=function(){u({type:"element",id:t.getAttribute("coremetricTag"),cat:n.category_id})}})}}(),function(){if(n.page_paths!={}&&n.call_page_tags){var e=n.page_paths[l()];void 0!==e&&u({type:"page",id:e,cat:n.category_id})}}()):d("ERROR: Could not find coremetrics library (from init method)")}function d(e){window.console&&-1===r.indexOf(o)&&console.log(e)}function u(e){if(function(e){return t?void 0===e?(d("ERROR: Params not set"),!1):void 0!==e.id||(d("ERROR: ID not set"),!1):(d("ERROR: Coremetrics library not found"),!1)}(e)){var i=e.cat||n.category_id,o=e.id,r=e.type;if(o)switch(r){case"element":!function(e,t){try{window.BLOOMIES.coremetrics.cmCreatePageElementTag(e,t),d("Coremetrics Element: Category: "+t+" ID: "+e)}catch(e){d("cmCreatePageElementTag Error: "+e)}}(o,i);break;default:!function(e,t){try{window.BLOOMIES.coremetrics.cmCreatePageviewTag(e,t,"",""),d("Coremetrics Page: Category: "+t+" ID: "+e)}catch(e){d("cmCreatePageviewTag Error: "+e)}}(o,i)}else d("ERROR: No id specified (from fireTag Method)")}}function l(){var e=window.location.pathname.split("/");return""===e[e.length-1]?e[e.length-2]:e[e.length-1]}e.init=function(e){n=function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e}(n,e),a()},e.fireTag=function(e){u(e)},e.path=function(){return l()},e.category_id=function(e){if(!e)return n.category_id;n.category_id=e},e.libraryFound=function(){return t}}(window.bl.coremetrics=window.bl.coremetrics||{});

// mimfied adobe analytics plugin
window.bl=window.bl||{},function(n){var t=!1,i=window.ENV_CONFIG||"dev",o=window.location.host,e=["fashion.bloomingdales.com","www.bloomingdales.com","m.bloomingdales.com"],a=["view","link"],r={page_paths:{},call_page_tags:!0,use_attribute_tags:!0};var u=function(n,t,i){for(var o=0;o<n.length;o++)t.call(i,o,n[o])};function l(){(t=function(){try{return!!window.utag}catch(n){return c("ERROR: Could not find  library (from checkForLibrary method): "+n),!1}}())?(c("Library Initiated"),function(){if("dev"===i);else if("production"!==i)throw"ERROR: Unidentified env variable (from initEnvironment method)"}(),function(){if(r.use_attribute_tags){var n=document.querySelectorAll("[utag]");u(n,function(n,t){t.onclick=function(){f("link",{event_name:t.getAttribute("utag")})}})}}(),function(){if(r.page_paths!={}&&r.call_page_tags){var n=r.page_paths[d()];void 0!==n&&f("view",{page_type:"marketing",page_name:n})}}()):c("ERROR: Could not find coremetrics library (from init method)")}function c(n){window.console&&-1===e.indexOf(o)&&console.log(n)}function f(n,i){(function(n,i){return t?void 0===n||""===n?(c("ERROR: No type defined"),!1):-1===a.indexOf(n)?(c("ERROR: Invalid tag type"),!1):void 0!==i&&i!=={}||(c("ERROR: Params not set"),!1):(c("ERROR: Library not found"),!1)})(n,i)&&(c("fireTag: Type: "+n+" Params: "+JSON.stringify(i)),window.utag[n](i))}function d(){var n=window.location.pathname.split("/");return""===n[n.length-1]?n[n.length-2]:n[n.length-1]}n.init=function(n){r=function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);return n}(r,n),l()},n.fireTag=function(n,t){f(n,t)},n.path=function(){return d()},n.libraryFound=function(){return t}}(window.bl.utag=window.bl.utag||{});

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
	initCarousel();
	animatePage();
	initFeatureBar();
	initFlex();
	setTimeout(initAnimations, 300);
	
	var pagePath = {
			"": "landing-page",
			"men": "mens",
			"home": "home",
			"shoes": "shoes",
			"beauty": "beauty",
			"events": "events",
			"women": "women"
		};

	// initiate coremetrics
    // call core.fireTag({id: "", cat: ""});
	var core = bl.coremetrics;
    core.init({
        use_attribute_tags: true,
        category_id: "heart-of-ny",
        page_paths: pagePath
    });
    // initiate adobe analytics
    // call adobeTag.fireTag(type, {event_name: "" });
    // valid types are "link" and "view"
    var adobeTag = bl.utag;
    adobeTag.init({
        use_attribute_tags: true,
        page_paths: pagePath
    });

});