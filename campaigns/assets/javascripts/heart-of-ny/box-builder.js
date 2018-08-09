$(function() {
	var w = $(window), s;

	function node(type, obj, content) {
		if(!type) return "";
		var node = $("<" + type + "/>", obj);
		if(content) node.append(content);
		return node;
	}
	function buildBox(data) {
		return node("div", {class: "col"})
		.append(
			node("div", {class: "box"}).attr('data-aos', 'zoom-in')
			.append(
				node("img", {src: data.image, alt: data.title})
			)
			.append(
				node("h2", {}, data.title)
			)
			.append(
				node("p", {}, data.description)
			)
		);
	}
	function renderDom(data, el) {
		$.each( data, function( i, val ) {
			el.append(buildBox(val));
		});
	}
	function addBoxListener() {
		s = w.on("scroll", function() {
			checkScrollPos();
		});
		checkScrollPos();
	}
	function checkScrollPos() {
		var winScroll = w.scrollTop() + w.height();
		$(".box").not(".animate").each(function() {
			if(winScroll > $(this).position().top + 100) {
				$(this).addClass("animate");
			}
		});
		//if($(".box.animate").length === $(".box").length) s.off();
	}

	var shoesWhatsNewData = [
		{
			title: "Cobbler Concierge",
			description: "Our sole-saving experts protect and preserve your favorite pairs on demand.",
			image: "/b/fashion/campaigns/images/heart-of-ny/shoes/concierge.jpg"
		},
		{
			title: "Sneaker Bar",
			description: "Trick out your new kicks at our personalization station.",
			image: "/b/fashion/campaigns/images/heart-of-ny/shoes/shoes2.jpg"
		},
		{
			title: "EXCITING EVENTS & POP-UPS",
			description: "Look out for made-to-order pop-ups in partnership with covetable brands like M.Gemi, as well as special designer appearances.",
			image: "/b/fashion/campaigns/images/heart-of-ny/shoes/shoes3.jpg"
		}
	];
	var beautyWhatsNewData = [
		{
			title: "FRAGRANCE HALL",
			description: "Find your next signature scent in an airy space housing 14 new brands, from iconic names like CREED to emerging labels like The Fragrance Kitchen.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-1.jpg"
		},
		{
			title: "INTRODUCING WELLCHEMIST",
			description: "A curation of safe, science-backed, sustainably made products from brands like Juice Beauty, The Organic Pharmacy and Living Proof.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-2.jpg"
		},
		{
			title: "TOM FORD BEAUTY SHOP",
			description: "The luxe label debuts a sleek and state-of-the-art new boutique at 59th Street. Expect high-tech mirrors, virtual makeup try-on tools, an interactive scent experience and more.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-3.jpg"
		},
		{
			title: "GLOWHAUS",
			description: "A space where you can sample everything, swatch your heart out and get inspired. Shop labels like COVER FX, Rouge Bunny Rouge, STARSKIN, Frank Body, Winky Lux, SUVA Beauty, Supergoop! and Briogeo.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-4.jpg"
		},
		{
			title: "LANCÔME CUSTOMIZATION STATION",
			description: "Book an appointment to create a completely custom foundation at our reimagined Lancôme counter, the first of its kind in the U.S.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-5.jpg"
		},
		{
			title: "THE NEW NAIL BAR ON 2",
			description: "In the market for a mani-pedi? We’ve got you.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-6.jpg"
		},
		{
			title: "CLARINS open SPA",
			description: "Featuring a menu of customized facials for women and men, plus 30-minute express spa treatments for just $30.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-7.jpg"
		},
		{
			title: "BEAUTY STYLISTS",
			description: "Our team of dedicated beauty experts will help you make the most of your makeup and skin care routines.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-8.jpg"
		},
		{
			title: "NEW! LE LABO",
			description: "The cult-favorite fragrance house arrives at Bloomingdale’s. Select your favorite perfume and watch as it’s blended and bottled in front of you—complete with a personalized label.",
			image: "/b/fashion/campaigns/images/heart-of-ny/beauty/beauty-whats-new-9.jpg"
		}
	];

	var womenHighlightsData = [
		{
			title: "LEVI’S CUSTOMIZATION BAR",
			description: "Personalize your new pair of Levi’s with embroidery, embellishments and more.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-highlights-1.jpg"
		},
		{
			title: "DREAM DRESSES",
			description: "Slay every special occasion with our elevated edit of styles from new labels like BRONX AND BANCO, Fame and Partners, LIKELY, Rachel Zoe and SAU LEE.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-highlights-2.jpg"
		},
		{
			title: "EILEEN FISHER TINY FACTORY",
			description: "Bring back your previously worn Eileen Fisher pieces and watch as they’re transformed into entirely new designs in this sustainability-driven concept shop.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-highlights-3.jpg"
		},
		{
			title: "SUNSET + SPRING",
			description: "A unique boutique inspired by America’s style capitals, NYC and L.A. Six new labels—including Rare London and Vigoss—join the roster for fall.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-highlights-4.jpg"
		},
		{
			title: "AQUA",
			description: "Our exclusive label debuts a newly expanded boutique, with limited-edition capsule collections—from names like Happily Grey blogger Mary Lawless Lee and French brand Zadig & Voltaire—dropping every month.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-highlights-5.jpg"
		},
		{
			title: "MOON & MEADOW",
			description: "Our collection of dreamy bohemian styles welcomes covetable names like Sage the Label, Little Black Bodysuit and Re:Named.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-highlights-6.jpg"
		}
	];

	var womensWhatsNewData = [
		{
			title: "The Edit",
			description: "A carefully curated collection of cutting-edge designers like Anine Bing, Preen Line and Ksenia Schnaider.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-1.jpg"
		},
		{
			title: "a buzzworthy bar opening",
			description: "Our chic, sleek cocktail lounge will be your new favorite place to grab a drink.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-2.jpg"
		},
		{
			title: "The one-stop jean shop",
			description: "The most comprehensive denim selection in the city is stocked with more than 20 in-demand designers.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-3.jpg"
		},
		{
			title: "STYLE ADVISORS",
			description: "Equipped with new mobile carts, our expert stylists can shop the entire store with you and curate racks of styles tailored to your needs.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-4.jpg"
		},
		{
			title: "ALL THINGS ATHLEISURE",
			description: "Our amped-up selection of athletic wear includes a dedicated Alo Yoga space plus six new labels, including LNDR and Varley.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-5.jpg"
		},
		{
			title: "JUICE BAR",
			description: "Quench your thirst at our newest hydration station featuring fresh-pressed juices, smoothies and more.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-6.jpg"
		},
		{
			title: "THE VACATION SHOP",
			description: "Going somewhere? You’ll find everything you need for your next getaway in our curated edit of resort-ready styles.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-7.jpg"
		},
		{
			title: "AT YOUR SERVICE",
			description: "Get one-on-one attention from our personal shoppers in a new, luxurious private consultation space.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-8.jpg"
		},
		{
			title: "TEES, PLEASE",
			description: "Stock up on T-shirts from the names you love, like Sundry and Splendid, as well as new labels like Knowlita. Look out for customization events offering embroidery and more.",
			image: "/b/fashion/campaigns/images/heart-of-ny/women/womens-whats-new-9.jpg"
		},
	]
	if($("#shoes-whats-new").length) {
		renderDom(shoesWhatsNewData, $("#shoes-whats-new"));
	}
	if($("#women-whats-new").length) {
		renderDom(womensWhatsNewData, $("#women-whats-new"));
	}
	if($("#women-highlights").length) {
		renderDom(womenHighlightsData, $("#women-highlights"));
	}
	if($("#beauty-whats-new").length) {
		renderDom(beautyWhatsNewData, $("#beauty-whats-new"));
	}
	//addBoxListener();
});