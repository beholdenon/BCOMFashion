(function() {
    'use strict';

    angular
        .module('services')
        .factory('AppGlobals', AppGlobals);

    function AppGlobals(CacheService) {
        var translationDATA = {
            ENG: {
                nav: [
                    'OUR HERITAGE',
                    'DESIGNER DESTINATION',
                    'VISIT OUR STORES',
                    'SHOP ONLINE'
                ],
                mobileSubHeader: 'INTERNATIONAL TOURISM',
                home: {
                    header: {
                        mobile: {
                            h1: 'Welcome',
                            h2: 'See All the Stylish Sights Starting <br/>' +
                                'with a Visit to Bloomingdale\'s',
                            p: 'Since 1872, Bloomingdale\'s has been <br/>' +
                                'at the center of style, carrying the <br/>' +
                                'most coveted designer fashions, shoes, <br/>' +
                                'handbags, cosmetics, fine jewelry and <br/>' +
                                'gifts in the world. When you visit our <br/>' +
                                'stores, you\'ll enjoy exclusive personal <br/>' +
                                'touches—like multilingual associates <br/>' +
                                'and special concierge services—that <br/>' +
                                'ensure you feel welcome, pampered <br/>' +
                                'and at home. These are just a few of <br/>' +
                                'the things that make Bloomingdale\'s <br/>' +
                                'like no other store in the world.'
                        },
                        desktop: {
                            h1: 'Welcome',
                            h2: 'See All the Stylish Sights  <br/>' +
                                'Starting with a Visit to Bloomingdale\'s',
                            p: 'Since 1872, Bloomingdale\'s has been at the center ' +
                                'of style, carrying the most coveted designer ' +
                                'fashions, shoes, handbags, cosmetics, fine jewelry ' +
                                'and gifts in the world. When you visit our stores, ' +
                                'you\'ll enjoy exclusive personal touches—like ' +
                                'multilingual associates and special concierge ' +
                                'services—that ensure you feel welcome, pampered ' +
                                'and at home. These are just a few of the things ' +
                                'that make Bloomingdale\'s like no other store in the world.'
                        }
                    },
                    cat: [
                        'Our Heritage',
                        'Designer Destination',
                        'Visit Our Stores'
                    ],
                    shop: {
                        title: 'Shop Online',
                        subtitle: 'Lorem Ipsum',
                        ctas: [
                            'WOMEN',
                            'HANDBAGS',
                            'SHOES',
                            'Jewelry & Accessories',
                            'Men',
                            'home',
                            'kids',
                            'What\'s New',
                            'sale'
                        ],
                        desktopLinks: {
                            women: 'http://www1.bloomingdales.com/shop/womens-apparel?id=2910',
                            handbags: 'http://www1.bloomingdales.com/shop/handbags?id=16958',
                            shoes: 'http://www1.bloomingdales.com/shop/shoes?id=16961',
                            jewelry: 'http://www1.bloomingdales.com/shop/jewelry-accessories?id=3376',
                            men: 'http://www1.bloomingdales.com/shop/mens?id=3864',
                            home: 'http://www1.bloomingdales.com/shop/home?id=3865',
                            kids: 'http://www1.bloomingdales.com/shop/kids?id=3866',
                            sale: 'http://www1.bloomingdales.com/shop/sale?id=3977'
                        },
                        mobileLinks: {
                            women: 'http://www1.bloomingdales.com/shop/womens-apparel/all-women?id=1003340',
                            handbags: 'http://www1.bloomingdales.com/shop/all-handbags-wallets-cases?id=1001396',
                            shoes: 'http://www1.bloomingdales.com/shop/shoes/all-shoes?id=17411',
                            jewelry: 'http://www1.bloomingdales.com/shop/all-jewelry-accessories?id=1003593',
                            men: 'http://www1.bloomingdales.com/shop/mens/all-men?id=1003601',
                            home: 'http://www1.bloomingdales.com/shop/home?id=1003615',
                            kids: 'http://www1.bloomingdales.com/shop/all-kids?id=1003623',
                            sale: 'http://www1.bloomingdales.com/shop/sale/all-sale-clearance?id=1003304'
                        }
                    },
                    pdf: {
                        span: 'Learn how to shop our site and get answers to frequently asked questions.',
                        a: 'download now',
                        link: '/fashion/assets/projects/international/china-brazil/guides/Tourism_Microsite_International_Shopping_Guide_English.pdf'
                    }
                },
                heritage: {
                    header: {
                        h1: 'The Story of Bloomingdale\'s',
                        h2: 'A Brief-ish History'
                    },
                    article: {
                        y1880: [{
                            h3: '1872–A GREAT EAST SIDE BAZAAR',
                            p: 'The Bloomingdale Brothers coin the phrase, "Location, location, location," and open their first store at 938 Third Avenue. Attention-grabbing window displays feature the latest Paris fashions. Soon, window shopping becomes a popular New York pastime.'
                        }, {
                            h3: 'BLOOMINGDALE\'S PREDICTS THE FUTURE',
                            p: 'Poised at the "retail crossroads" of New York, the new store at 59th Street and Third Avenue boasts a sky carriage, (i.e., an elevator). Thirteen years later, Lyman Bloomingdale finances a young inventor\'s idea of an "inclined elevator" and the escalator is born.'
                        }],
                        y1900: [{
                            h3: 'A Slogan Known Around the World',
                            p: 'The IRT Third Avenue El, or elevated train, is the transportation method of choice for turn-of-the-century Bloomingdale\'s shoppers, so much so that billboards, beach umbrellas and comic strips all over the city (and the world) boast the popular slogan, "All Cars Transfer to Bloomingdale\'s." Gold footprints were embedded into the sidewalk so people would follow them off the train and into Bloomingdale\'s.'
                        }, {
                            h3: '1910–To a (Model) T',
                            p: 'Bloomingdale\'s becomes the first store in New York City to use Henry Ford\'s Model T for deliveries.'
                        }],
                        y1920: [{
                            h3: 'Bloomingdale\'s Gets a Glamorous Makeover',
                            p: 'Bloomingdale\'s anchors itself on Lexington Avenue and adds eleven new stories, capturing the new craze for Art Deco glamour with of-the-moment materials like black granite, limestone and terracotta. It occupies the entire block from Lexington to Third Avenue and from 59th to 60th Street. It is actually 10 buildings that are interconnected.'
                        }],
                        y1940: [{
                            h3: 'Bloomingdale\'s Turns 75 and Parties Like a Teenager',
                            p: 'To mark her Diamond Jubilee, Bloomingdale\'s invites America\'s hottest 26 designers—including luminaries Claire McCardell, Pauline Trigere and Jo Copeland—to create a couture outfit for the store windows. The store also launches the first-ever home furnishings showroom.'
                        }],
                        y1960: [{
                            h3: 'Fashion Explodes',
                            p: 'Men on the moon. The Mustang. Mod shops. And more. Bloomingdale\'s is the first store to give an admiring American audience to European visionaries like Yves Saint Laurent and Courrèges.'
                        }, {
                            h3: 'Get Groovy, Baby',
                            p: 'Starting in the fall of \'63, Bloomingdale\'s is the first store to commission the era\'s grooviest artists to illustrate the shopping bag. Artists like Jonah Kinigstein and Michael Vollbracht revolutionize the Bloomingdale\'s bag, making them instant art collectibles. Shopping bags would never be the same.'
                        }],
                        y1970: [{
                            h3: 'Bloomingdale\'s Goes Hollywood',
                            p: 'The decade of decadence starts off with a bang as Bloomingdale\'s partners with Hollywood and Broadway. Major movies are filmed in the 59th Street store. Woody Allen\'s <i>Manhattan</i>, <i>Starting Over</i> and <i>The Electric Horseman</i> are just the beginning, with <i>Splash</i> and <i>Moscow on the Hudson</i> following in the \'80s.'
                        }, {
                            h3: 'Bloomingdale\'s Launches the Big 3',
                            p: 'Ralph Lauren, Donna Karan and Calvin Klein get their big starts at Bloomingdale\'s, proving yet again that the store champions youth, newness and fresh outlooks.'
                        }, {
                            h3: 'Iconic',
                            p: 'Bloomingdale\'s iconic Big Brown Bag first hit the streets in 1973. The Little Brown Bag followed a year later and the Medium Brown Bag was the final addition. Bloomingdale\'s has commissioned the most recognizable shopping bags in history and they can be seen in museum collections around the world.'
                        }],
                        y1980: [{
                            h3: 'Bloomingdale\'s sells the "sizzle."',
                            p: 'Warhol calls Bloomingdale\'s "the new kind of museum for the \'80s." And, each day, the store transforms itself into a cutting-edge gallery of the latest and greatest. Bloomingdale\'s jumps aboard the decade of gala glamour. Star fashion figures like Karl Lagerfeld, Diane von Furstenberg, Liza Minnelli and Oscar de la Renta jet in for glamorous store openings.'
                        }, {
                            h3: '1988–Year of the Dragon',
                            p: 'A year before President Nixon traveled to China, Bloomingdale\'s was already making strides in rekindling a trade relationship with mainland China. Fifteen years later, in 1988, following up on the popular success of its first China campaign, the 59th Street flagship offers a 7-week epic panorama of fashion and design from the Orient, celebrating 10 years of trade with the People\'s Republic. Decked out accordingly, the store shines like a jewel from the Forbidden City.'
                        }],
                        y1990: [{
                            h3: 'The New Gold Rush',
                            p: 'Four new California stores in four days: Century City, Stanford, Sherman Oaks and Newport Beach. And one year later, Beverly Center. Bloomingdale\'s is now the only upscale, full-selection department store with a national presence. Californians celebrate by shopping—and then going to the beach.'
                        }],
                        y2000: [{
                            h3: 'Bloomingdale\'s Gets Downtown Fashion Cred',
                            p: 'All good things get better when they move downtown. Bloomingdale\'s opens in SoHo. A historic cast-iron façade building on Broadway transforms into a polished gem of 21st century fashion.'
                        }, {
                            h3: 'Going Digital',
                            p: 'bloomingdales.com is born. From designer clothing and luxury beauty products to handbags and statement shoes, the site gives customers around the globe world-class fashion at their fingertips.'
                        }, {
                            h3: 'Beauty Revamp',
                            p: 'The main B-way floor at 59th Street gets "the biggest makeover in NYC," with an array of state-of-the-art kiosks from top beauty brands.'
                        }],
                        y2010: [{
                            h3: '2011–A Gleaming New Space for Fine Jewelry',
                            p: 'Designed to showcase every facet of the world\'s best designers, including David Yurman, the fine jewelry department at 59th Street—visited by over 400,000 people from over 230 countries and all 50 states—is an NYC Concierge Choice Award–winner five years running.'
                        }, {
                            h3: 'No Limit to Being Like No Other',
                            p: 'Today, there\'s no stopping where Bloomingdale\'s can go. The type of innovation synonymous with the brand since its first days continues to be central to its mission of luxury. By looking back at the triumphs of the past, Bloomingdale\'s beholds the future. It\'s a future like no other.'
                        }]
                    }
                },
                designer: {
                    header: {
                        h1: 'So Many Names in Just One Store',
                        h2: 'We Handpick the Best Designers in Fashion, Beauty and Beyond'
                    },
                    article: [
                        'Bloomingdale\'s carries an unrivaled selection of designer brands including CHANEL, Dior, Michael Kors, MCM, Tory Burch, MARC JACOBS, Armani and Ralph Lauren.',
                        'Searching for the latest (and most coveted) beauty products? Find all of your favorite skin care, makeup and fragrance brands including La Mer, Estée Lauder, Gucci, Chloé, Clinique, Lancôme and kate spade new york.'
                    ]
                },
                stores: {
                    header: {
                        h1: 'Choose Your Destination',
                        h2: 'We\'ll meet you at the Visitor\'s Center'
                    },
                    dropdown: {
                        default: 'Please Select a Store',
                        list: [
                            {id: 'null', name: 'NEW YORK',                              disabled: 'true'},
                            {id: '0',    name: '59th Street Flagship, New York City',   disabled: 'false'},
                            {id: '1',    name: 'SoHo, New York City',                   disabled: 'false'},
                            {id: 'null', name: 'HAWAII',                                disabled: 'true'},
                            {id: '2',    name: 'Ala Moana, Honolulu',                   disabled: 'false'},
                            {id: 'null', name: 'ILLINOIS',                              disabled: 'true'},
                            {id: '3',    name: 'North Michigan Avenue, Chicago',        disabled: 'false'},
                            {id: '4',    name: 'Medinah Home, Chicago',                 disabled: 'false'},
                            {id: 'null', name: 'CALIFORNIA',                            disabled: 'true'},
                            {id: '5',    name: 'San Francisco Centre, San Francisco',   disabled: 'false'},
                            {id: '6',    name: 'South Coast Plaza, Costa Mesa',         disabled: 'false'},
                            {id: '7',    name: 'Southern California Stores',            disabled: 'false'},
                            {id: 'null', name: 'FLORIDA',                               disabled: 'true'},
                            {id: '8',    name: 'Aventura',                              disabled: 'false'},
                            {id: '9',    name: 'Orlando',                               disabled: 'false'}
                        ],
                        copy: 'Bloomingdale\'s has stores all over the U.S. Our Visitor\'s Centers in <b>New York</b>, <b>Hawaii</b>, <b>Chicago</b>, <b>Miami</b> and <b>San Francisco</b> offer a full range of amenities for international customers. Multilingual associates can help you plan the ultimate shopping experience. They\'ll give you a store directory in your chosen language and special events information, as well as arrange complimentary personal stylist appointments, package delivery to your hotel, restaurant reservations (including those located within our stores) and much more. Beach bound? Our many outposts in Southern California—including South Coast Plaza in Ocean County, San Diego and Los Angeles—plus Honolulu, mean you\'ll never be far from the top fashions.'
                    },
                    storeData: {
                        storeHours: 'Store Hours',
                        directions: 'Directions',
                        designers: 'Featured Designers',
                        dining: 'In-Store Dining',
                        services: 'Services',
                        servicesSubHead: 'Our associates will show you why Bloomingdale\'s is like no other store in the world. Look for us wearing flag pins from your country. We can help you find the fashion you love and assist with a range of personalized services.',
                        loyalty: 'Join the International Loyalty Club',
                        loyaltySubHead: 'Our special rewards program was created for international shoppers.* For every dollar you spend, you\'ll earn one point toward gift cards, services and exceptional experiences. Right now, you can enroll in the program at Bloomingdale \'  s Ala Moana, but points can be earned and redeemed at any full-line Bloomingdale \'  s location in the United States.**',
                        id: [
                            {
                                name: '59th Street Flagship',
                                addr: '1000 Third Avenue  New York, NY 10022<br/>+1 212-705-2000',
                                hours: 'Monday–Saturday: Store Opens 10AM <span>|</span> Sunday: Store Opens 11AM',
                                descr: 'Discover Bloomingdale\'s iconic heritage and award-winning hospitality. Begin your day at our flagship store with a stop at our first floor balcony Visitor\'s Center. Our multilingual directory will provide a road map to your shopping trip. Looking for a more personal experience? Learn about our in-store services, from stylist appointments to alterations to restaurant reservations. We\'ll help you arrange all that and more.',
                                dTile: 'VISITING NEW YORK?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-59ST_02.jpg',
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   7th floor <span>|</span>   212-705-3085',
                                        sched: 'Open Daily <span>|</span>   Dine In: 10:30AM–1 hour before store closing <br/>Takeout: 10AM–1/2 hour before store closing',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt. You\'ll also find freshly made salads, sandwiches, soups, a fresh juice bar and selection of Tavalon premium teas. Counter, table service and takeout available.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    },
                                    {
                                        name: '<b>FL!P</b> <span>|</span>   Mid-Level <span>|</span>   212-705-3085',
                                        sched: 'Open Daily <span>|</span>   Dine In: 11AM–1 hour before store closing ',
                                        description: 'Enjoy the "haute couture" of American hamburgers, as well as salads, microbrew beers, a full bar and a variety of French fries, at this laid-back spot in our Men\'s Store.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_02.jpg'
                                    },
                                    {
                                        name: '<b>DAVID BURKE AT BLOOMINGDALE\'S </b> <span>|</span>   Street Level <br />   212-705-3800',
                                        sched: 'Open Daily <span>|</span>   In the Box (to go) 10AM–9PM <span>|</span>   In the Bar (to stay) 11AM–9 PM ',
                                        description: 'Chef David Burke, one of the leading pioneers of American cooking, brings together delicious fare and top service in a lively atmosphere.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_04.jpg'
                                    },
                                    {
                                        name: '<b>MAGNOLIA BAKERY</b> <span>|</span>   Street Level <span>|</span>   212-265-5320',
                                        sched: 'Monday–Friday 7AM–10PM <br/> Saturday 8AM–10PM <span>|</span>   Sunday 8AM–9PM',
                                        description: 'A classic American bakery cherished for its old-fashioned desserts and vintage décor, Magnolia serves a range of handmade baked goods, including pies, cakes, cheesecakes, banana pudding, cupcakes and muffins. Here early? Magnolia opens even before the store does.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_03.jpg'
                                    },
                                    {
                                        name: '<b>LE TRAIN BLEU </b> <span>|</span>   6th floor <span>|</span>   212-705-2100',
                                        sched: 'Monday–Wednesday, Friday–Saturday 10:30AM–5PM <span>|</span>  Thursday 10:30AM–7PM <span>|</span>  Sunday 11:30AM–4:30PM',
                                        description: '<i>Reservations recommended</i><br/>A romantic replica of a turn-of-the-century railway dining car, Le Train Bleu offers the finest American-Continental fare, including daily brunch, lunch and a prix-fixe dinner menu.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_05.jpg'
                                    },
                                    {
                                        name: '<b>B CAFÉ </b> <span>|</span>   6th floor <span>|</span>   212-705-2073',
                                        sched: 'Open Daily <span>|</span>   10AM–store closing',
                                        description: 'Stop by this coffee and snack bar for quick and healthy treats, or to enjoy a light lunch or dinner featuring on-the-go versions of many Le Train Bleu favorites.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    } 
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 212-705-2359 or 212-705-3488 <br/> Email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select wardrobe and home décor options to your taste—all for free. <br/> At Your Service (For Her) 212-705-3135 <br/> At His Service 212-705-3030 '
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'
                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your Manhattan hotel—for free. Just drop them off at our first floor balcony Visitor\'s Center.'
                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home at our gift wrapping station on the sixth floor. '
                                    }
                                ]
                            },
                            {
                                name: 'SoHo',
                                addr: '504 Broadway  New York, NY 10012<br/>+1 212-729-5900',
                                hours: 'Monday–Saturday: Store Opens 10AM <span>|</span> Sunday: Opens 12PM',
                                descr: 'Explore our downtown store in SoHo, the city\'s most fashionable neighborhood. You\'ll find all the stylish energy of our uptown flagship but with the feel of a fashion boutique. Check out our bustling beauty floor, then peruse our latest designer arrivals. As always, multilingual associates are available to help make your visit a memorable one.',
                                dTile: 'VISITING NEW YORK?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SOHO.jpg',                                
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   2nd floor  <span>|</span>   212-729-5900',
                                        sched: 'Monday–Friday 10AM–8PM <span>|</span>   Saturday 10AM–7PM  <span>|</span> Sunday 12PM–7PM',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt. You\'ll also find freshly made salads, sandwiches, soups, a fresh juice bar and selection of Tavalon premium teas. Counter, table service and takeout available.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 212-705-2098 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'
                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your Manhattan hotel—for free. Just drop them off with any sales associate.'
                                    }
                                ]                               
                            },
                            {
                                name: 'Ala Moana',
                                addr: '1450 Ala Moana Blvd  Honolulu, HI 96814<br/>+1 808-644-7511',
                                hours: 'Monday–Saturday: 10AM–8PM | Sunday: 11AM–7PM',
                                descr: 'Say aloha to our newest outpost in tropical Honolulu. Located in the Ala Moana Center, Hawaii\'s premier shopping destination, this three-story store boasts a range of amenities tailored to the overseas shopper. Stop by our International Welcome Center and speak with one of our multilingual associates. We offer international style advisor appointments, on-site alterations, restaurant reservations and much more.</p><p style="margin-top: 10px;">Planning a return visit? Sign up for our International Loyalty Club and earn points toward gift cards, special services and authentic Hawaiian adventures.',
                                dTile: 'VISITING HAWAII?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Hawaii_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-ALA-MOANA.jpg',                                  
                                designers: [
                                    'Burberry',
                                    'Chloé',
                                    'Clinique',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Longchamp ',
                                    'Jimmy Choo',
                                    'Jo Malone London',
                                    'Lancôme',
                                    'La Mer',
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rebecca Minkoff',
                                    'Tory Burch',
                                    'Villeroy & Boch'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   3rd floor  ',
                                        sched: 'Open Daily 11:30AM–1 hour before store closing',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'FULL-SERVICE WELCOME CENTER AND CONCIERGE DESK',
                                        description: 'At the Welcome Center, we\'ll greet you with a complimentary coat and bag check, plus a multilingual store directory. Should you need it, our associates can arrange personal stylist appointments and free package delivery to your hotel. Stop by our concierge desk for alterations and pick-ups or to learn more about Hawaii\'s amenities and attractions.'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS AND BEAUTY ADVISORS ON CALL ',
                                        description: 'Our stylists are available to shop the store with you, or select wardrobe options to your taste—all for free. Interested in a beauty consultation? Our experienced advisors will find you perfect products from the most coveted brands.'
                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'
                                    },
                                    {
                                        title: 'CURRENCY CONVERSION ',
                                        description: 'Steps away from Bloomingdale\'s, you\'ll find a currency exchange located conveniently within the Ala Moana Center.'
                                    },
                                    {
                                        title: 'KICK BACK IN OUR VIP ROOM',
                                        description: 'The first in the Bloomingdale\'s fleet, our limited-access lounge is located within the Welcome Center. Select tourists can indulge in amenities, including: light food and beverage, a TV, private bathroom, charging stations, a Bluetooth printer for boarding passes and iPads® preloaded with the Bloomingdale\'s app and helpful travel guides in nearly every language. One-day access to the lounge is available to tourists with receipts of $500 or more.',
                                    }
                                ],
                                loyalty: [
                                    {
                                        title: 'EARN A GIFT CARD',
                                        description: '500 points = $25 gift card, good for any merchandise at Bloomingdale\'s Ala Moana.'
                                    },
                                    {
                                        title: 'ENJOY STORE SERVICES',
                                        description: 'Your points can earn you complimentary package delivery back to your hotel, lunch or a car service to your next destination. For more information, see an associate at the Welcome Center on the first floor.'
                                    },
                                    {
                                        title: 'INDULGE IN AN EXPERIENCE YOU\'LL NEVER FORGET',
                                        description: 'Redeem your points for authentic Hawaiian adventures! For more information, see an associate at the Welcome Center on the first floor.'
                                    },
                                    {
                                        title: '',
                                        description: '*Proof of international address required.<br/>**Points cannot be redeemed at Bloomingdale\'s outlet stores or on bloomingdales.com. Points can only be redeemed for services or experiences at Bloomingdale\'s Ala Moana.'
                                    }                                      
                                ]                                    
                            },
                            {
                                name: 'North Michigan Avenue',
                                addr: '900 North Michigan Avenue  Chicago, IL 60611<br/>+1 312-440-4460 ',
                                hours: 'Monday–Saturday: 10AM–8PM | Sunday: 11AM–7PM',
                                descr: 'Planning a trip to the Windy City? Let Bloomingdale\'s be your fashion guide. Fill out your wardrobe with our vast collection of designer names, or stock up on your favorite beauty products. Our multilingual associates can help tailor your shopping trip to your every need.',
                                dTile: 'VISITING CHICAGO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-NORTH-MICHIGAN-AVENUE.jpg',                                                                  
                                designers: [
                                    'Burberry',
                                    'Canada Goose',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Gucci',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Moncler',
                                    'Ralph Lauren',
                                    'Ray-Ban',
                                    'Salvatore Ferragamo',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'UGG® Australia '
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> 6th floor <span>|</span> 312-440-4861',
                                        sched: 'Monday–Saturday 11AM–6PM',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 312-440-4596 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select wardrobe and home decor options to your taste—all for free. <br/> At Your Service 312-440-4887 '

                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your downtown hotel—for free. Just drop them off at our third floor Visitor\'s Center. '

                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Visit the fifth floor Customer Service desk. '

                                    }
                                ]  
                            },
                            {
                                name: 'Medinah Home',
                                addr: '600 North Wabash Avenue  Chicago, IL 60611<br/>+1 312-324-7500',
                                hours: 'Monday–Saturday: Store Opens 10AM <span>|</span> Sunday: Opens 12PM',
                                descr: 'Deck out your home with a trip to Chicago\'s Medinah Home store. Here you\'ll find luxurious bedding, designer kitchen appliances, plush bathroom accessories and more. Experience our award-winning hospitality first hand with a full range of in-store services.',
                                dTile: 'VISITING CHICAGO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-MEDINAH-HOME.jpg',                                                                                                  
                                designers: [
                                    'Nespresso',
                                    'Rimowa',
                                    'Tumi',
                                    'Victorinox'
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 312-440-4596 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select home décor options to your taste—all for free.<br/> At Your Service 312-324-7633 '

                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'

                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Visit our second floor Gift Wrap station.'

                                    }
                                ] 
                            },
                            {
                                name: 'San Francisco Centre',
                                addr: '845 Market Street  San Francisco, CA<br/>+1 415-856-5402',
                                hours: 'Monday–Saturday: 10AM–9PM | Sunday: 11AM–8PM',
                                descr: 'Discover the best of San Francisco shopping. First stop, Bloomingdale\'s. Head to our Visitor\'s Center for a multilingual directory, or speak to our multilingual associates to tailor your experience to your needs. Learn more about our in-store amenities below.',
                                dTile: 'VISITING SAN FRANCISCO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SanFran_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SAN-FRANCISCO-CENTRE.jpg',
                                designers: [
                                    'Alice + Olivia',
                                    'BCBGMAXAZRIA',
                                    'Burberry', 
                                    'Calvin Klein',
                                    'CHANEL',
                                    'COACH',
                                    'Clinique', 
                                    'Dior', 
                                    'DIANE von FURSTENBERG',
                                    'Elie Tahari', 
                                    'Escada',
                                    'Estée Lauder',
                                    'Giorgio Armani',
                                    'Helmut Lang',
                                    'kate spade new york',
                                    'La Mer',
                                    'Lancôme',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Ralph Lauren',
                                    'Rebecca Taylor',
                                    'Salvatore Ferragamo',
                                    'TAG Heuer', 
                                    'Tory Burch', 
                                    'Trina Turk'
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 415-856-5477 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select wardrobe and home decor options to your taste—all for free. <br/> At Your Service 415-856-5538 '

                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your downtown hotel—for free. Just drop them off at our first floor balcony Visitor\'s Center.'

                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home at the Visitor\'s Center.'

                                    }
                                ]                               
                            },
                            {
                                name: 'South Coast Plaza',
                                addr: '3333 Bristol St  Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                hours: 'Monday–Saturday: 10AM–9PM | Sunday: 11AM–7PM',
                                descr: 'With the best designer selection, edited specifically for Southern California, South Coast Plaza is a must-go shopping destination. New to the Golden State? Multilingual associates will make your stay that much better. Start with a store directory in your chosen language or add to your shopping trip with our in-store amenities below.',
                                dTile: 'VISITING COSTA MESA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthCoastPlaza_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SOUTH-COAST-PLAZA.jpg',
                                designers: [
                                    'Burberry',
                                    'Calvin Klein',
                                    'Canada Goose',
                                    'CHANEL',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani Beauty',
                                    'Gucci',
                                    'Hugo Boss',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'La Prairie',
                                    'Longchamp',
                                    'Longines Watches',
                                    'Louis Vuitton',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Miu Miu',
                                    'Moncler',
                                    'Montblanc',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rimowa',
                                    'Salvatore Ferragamo',
                                    'Stuart Weitzman',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'Tumi',
                                    'UGG® Australia',
                                    'Yves Saint Laurent Beauty'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>AnQi by Crustacean Gourmet Bistro & Noodle Bar</b> <br/>  Ground Floor <span>|</span> 714-557-5679',
                                        sched: 'Lunch: Open Daily 11:30AM–2:30PM <br/> Noodle Bar: Open Daily 11:30AM–5:30PM <br/> Dinner: Sunday–Thursday 5:30PM–10:30PM <br/>Friday–Saturday 5:30PM–11:00PM <br/> Red Happy Hour: Monday–Friday 4PM–7PM',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_08.jpg'
                                    },
                                    {
                                        name: '<b>Holsteins</b> <span>|</span> Ground Floor <span>|</span> 714-352-2525',
                                        sched: 'Monday - Thursday: 11AM–12AM <br/> Friday & Saturday: 11AM–2AM  <br/> Sunday: 11AM–12AM ',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_09.jpg'
                                    }                                    
                                ],
                                services: [
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting. '
                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Find it all on the lower level.'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept all forms of China UnionPay.<div class="unionpay">'
                                    }
                                ]                                    
                            },
                            {
                                name: 'Southern California Stores',
                                addr: '',
                                hours: '',
                                descr: 'With outposts across Los Angeles, Orange County and San Diego, Bloomingdale\'s has left its iconic mark on SoCal. Shop the fashion, accessories, shoes and beauty brands you love in any one of our stores. Learn more about our in-store amenities below.',
                                dTile: 'VISITING SOUTHERN CALIFORNIA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthernCalifornia_EN.pdf',
                                designersImg: '',                                
                                stores: [
                                    {
                                        area: 'Orange County',
                                        list: [
                                            {
                                                name: 'South Coast Plaza',
                                                addr: '3333 South Bristol Street, Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                                hours: 'Hours:<br/>Monday–Tuesday 10AM–9PM <br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 10AM–8PM'
                                            },
                                            {
                                                name: 'Newport Fashion Island',
                                                addr: '701 Newport Center Drive, Newport Beach, CA 92660<br/>+1 949-729-6600',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–8PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            }     
                                        ]                                   
                                    },
                                    {
                                        area: 'Los Angeles',
                                        list: [
                                            {
                                                name: 'Century City',
                                                addr: '10250 Santa Monica Boulevard, Los Angeles, CA 90067<br/>+1 310-772-2100',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            },
                                            {
                                                name: 'Beverly Center',
                                                addr: '8500 Beverly Boulevard, Los Angeles, CA 90048<br/>+1 310-360-2700',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 12PM–8PM'
                                            },
                                            {
                                                name: 'Santa Monica Place',
                                                addr: '315 Colorado Avenue, Santa Monica, CA 90401<br/>+1 310-985-6400',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            },
                                            {
                                                name: 'Glendale Galleria',
                                                addr: '103 South Brand Blvd., Glendale, CA 91210<br/>+1 818-638-4100',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–9PM'
                                            },
                                            {
                                                name: 'Sherman Oaks Fashion Square',
                                                addr: '14060 Riverside Drive, Sherman Oaks, CA 91423<br/>+1 818-325-2200',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–9PM'
                                            }     
                                        ]                                   
                                    }, 
                                    {
                                        area: 'San Diego',
                                        list: [
                                            {
                                                name: 'Fashion Valley',
                                                addr: '7057 Friars Road, San Diego, CA 92108<br/>+1 619-610-6400',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–8PM<br/>Wednesday 10AM–8PM<br/>Thursday–Saturday 10AM–10PM<br/>Sunday 12PM–8PM'
                                            }   
                                        ]                                   
                                    }                                                                       
                                ],
                                services: [
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting. Available at select locations.'
                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Available at select locations.'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select home décor options to your taste—all for free. Available at select locations.'
                                    }
                                ]  
                            },
                            {
                                name: 'AVENTURA',
                                addr: '19555 Biscayne Boulevard  Aventura, FL 33180<br/>+1 305-792-1246',
                                hours: 'Monday–Saturday: 10AM–10PM <span>|</span> Sunday: 12PM–9PM',
                                descr: 'Planning your vacation itinerary? Start with a trip to Florida\'s Aventura store. Explore our extensive selection of designer fashions, beauty brands, luxurious accessories and more. Get shopping with a store directory in your chosen language and be sure to make the most of your experience with our in-store amenities listed below.',
                                dTile: 'VISITING AVENTURA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Aventura_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-AVENTURA.jpg',
                                designers: [
                                    'Baccarat',
                                    'Bernardaud',
                                    'BVLGARI',
                                    'Burberry',
                                    'Calvin Klein ',
                                    'Canali ',
                                    'CHANEL ',
                                    'Christofle ',
                                    'David Yurman ',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel ',
                                    'Dior ',
                                    'Fendi ',
                                    'Furla ',
                                    'Giorgio Armani',
                                    'Gucci ',
                                    'HUGO BOSS ',
                                    'Jimmy Choo ',
                                    'John Varvatos', 
                                    'La Mer ',
                                    'Lalique',
                                    'Longchamp', 
                                    'Louis Vuitton ',
                                    'M·A·C ',
                                    'MARC BY MARC JACOBS ',
                                    'Michael Kors ',
                                    'Miki House ',
                                    'Montblanc ',
                                    'Movado ',
                                    'PANDORA',
                                    'Prada ',
                                    'Pratesi ',
                                    'Ralph Lauren ',
                                    'Roberto Coin ',
                                    'Salvatore Ferragamo ',
                                    'Sferra ',
                                    'Shiseido ',
                                    'TAG Heuer ',
                                    'Tory Burch ',
                                    'Villeroy & Boch ',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>59TH & LEX CAFE</b> <span>|</span> 2nd floor <span>|</span> 305-792-1180',
                                        sched: 'Monday–Saturday 10AM–7:30PM <span>|</span> Sunday 12PM–5PM',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 305-792-1175 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    }
                                ]     
                            },
                            {
                                name: 'ORLANDO',
                                addr: '4152 Conroy Road  Orlando, FL 32839<br/>+1 407-264-2514',
                                hours: 'Monday–Saturday: 10AM–9PM | Sunday: 11AM–7PM',
                                descr: 'Stocked with the best designers and beauty brands, Bloomingdale\'s Orlando is your ticket to world-class shopping. Stop in on your next trip to the Sunshine State for an experience tailored to you. Pick up a store directory in your chosen language, then take advantage of the many in-store amenities listed below.',
                                dTile: 'VISITING ORLANDO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Orlando_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-ORLANDO.jpg',
                                designers: [
                                    'Burberry',
                                    'Canali ',
                                    'COACH',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel Jeans',
                                    'Dior ',
                                    'Fendi ',
                                    'Frankie B Jeans ',
                                    'John Varvatos ',
                                    'Joie ',
                                    'La Mer ',
                                    'Longchamp', 
                                    'Montblanc ',
                                    'Movado ',
                                    'Ralph Lauren ',
                                    'Salvatore Ferragamo ',
                                    'Sandro ',
                                    'Shiseido ',
                                    'Ted Baker ',
                                    'Tory Burch ',
                                    'Vince'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> Level 1 <span>|</span> 407-264-2683',
                                        sched: 'Monday–Saturday 10AM–9PM <span>|</span> Sunday 11AM–7PM',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 305-792-1175 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    }
                                ]       
                            }                                
                        ]
                    }
                },                
                socialshare: {
                    fb: {
                        name: 'International Tourism | bloomingdales.com',
                        description: 'From designer clothing to the most-coveted beauty brands, explore all that Bloomingdale\'s has to offer on their updated international site.'
                    },
                    pinterest: {
                        description: 'International Tourism | bloomingdales.com'
                    },
                    twitter: {
                        text: 'Love to shop @bloomingdales? Check out their international site for new designer clothing, accessories & beauty. http://bit.ly/1M3fLiB'
                    },
                    weibo: {
                        url: 'http://weibo.com/bloomingdalesusa',
                        title: 'Discover Bloomingdale\'s luxury fashions, storied history and world-class hospitality on their updated international site.'
                    },
                    weixin: {
                        text: 'Scan the QR code to receive push notifications from Bloomingdale\'s.'
                    }
                },
                contactUs: {
                    formTitle: 'Contact Us',
                    left: {
                        title: 'notify us of your trip',
                        p1: 'Please let us know which Bloomingdale\'s store you\'d like to visit and the planned dates of your trip.',
                        p2: 'Simply submit this form, and one of our multilingual associates will be in touch.'
                    },
                    right: {
                        name: 'Name:',
                        nameErr: 'Please tell us your name',
                        email: 'Email:',
                        emailErr1: 'Please tell us your email',
                        emailErr2: 'Invalid email address',
                        phone: 'Mobile # (optional):',
                        phoneErr: 'Invalid phone number',
                        party: 'Number of people in my party:',
                        partyErr: 'Please tell us your party size',
                        dates: 'Planned date(s) of my trip to the U.S.:',
                        arriving: 'Arriving:',
                        departing: 'Departing:',
                        datesErr: 'Select date',
                        storesH: 'I would like to visit:',
                        storesM: 'Please Select a Store',
                        storesErr: 'Please select a store',
                        stores: [
                            {id: 'New York', name: 'New York', disabled: 'true'},
                            {id: '59th Street Flagship, New York City', name: '59th Street Flagship, New York City', disabled: 'false'},
                            {id: 'SoHo, New York City', name: 'SoHo, New York City', disabled: 'false'},
                            {id: 'Hawaii', name: 'Hawaii', disabled: 'true'},
                            {id: 'Ala Moana, Honolulu', name: 'Ala Moana, Honolulu', disabled: 'false'},
                            {id: 'Illinois', name: 'Illinois', disabled: 'true'},
                            {id: 'North Michigan Avenue, Chicago', name: 'North Michigan Avenue, Chicago', disabled: 'false'},
                            {id: 'Medinah Home, Chicago', name: 'Medinah Home, Chicago', disabled: 'false'},
                            {id: 'California', name: 'California', disabled: 'true'},
                            {id: 'Beverly Center, Los Angeles', name: 'Beverly Center, Los Angeles', disabled: 'false'},
                            {id: 'Century City, Los Angeles', name: 'Century City, Los Angeles', disabled: 'false'},
                            {id: 'Fashion Valley, San Diego', name: 'Fashion Valley, San Diego', disabled: 'false'},
                            {id: 'Glendale Galleria, Glendale', name: 'Glendale Galleria, Glendale', disabled: 'false'},
                            {id: 'Newport Fashion Island, Newport Beach', name: 'Newport Fashion Island, Newport Beach', disabled: 'false'},
                            {id: 'San Francisco Centre, San Francisco', name: 'San Francisco Centre, San Francisco', disabled: 'false'},
                            {id: 'Santa Monica Place, Santa Monica', name: 'Santa Monica Place, Santa Monica', disabled: 'false'},
                            {id: 'Sherman Oaks Fashion Square, Sherman Oaks', name: 'Sherman Oaks Fashion Square, Sherman Oaks', disabled: 'false'},
                            {id: 'South Coast Plaza, Costa Mesa', name: 'South Coast Plaza, Costa Mesa', disabled: 'false'},
                            {id: 'Florida', name: 'Florida', disabled: 'true'},
                            {id: 'Aventura', name: 'Aventura', disabled: 'false'},
                            {id: 'Orlando', name: 'Orlando', disabled: 'false'}
                        ],
                        submit: 'submit',
                        submitHead: 'thank you for<br/>your submission',
                        submitBody: 'A member of our tourism team will contact you shortly.'
                    }
                },                
                footer: [
                    'SAVE 10%—<b><u>SIGN UP</u></b> FOR EMAILS',
                    'Like no other store in the world'
                ]
            },
            POR: {
                nav: [
                    'nosso Legado',
                    'Conheça As Marcas',
                    'Visite Nossas Lojas',
                    'Compre Online'
                ],
                mobileSubHeader: 'TURISMO INTERNACIONAL',
                home: {
                    header: {
                        mobile: {
                            h1: 'Bem-vindo',
                            h2: 'Confira Todos Os Visuais Estilosos <br/>' +
                                'Começando Com Uma Visita À Bloomingdale\'s',
                            p:  'Desde 1872, a Bloomingdale\'s esteve no centro da moda, trazendo as mais cobiçadas roupas de marca, sapatos, bolsas, cosméticos, joias finas e presentes de marca do mundo. ' +
                                'Ao visitar nossas lojas, você vai desfrutar de mimos exclusivos personalizados, tais como atendentes multilíngues e serviços especiais de concierge, que certamente farão você se sentir acolhido, mimado e como se estivesse em casa.' +
                                'Estes são apenas alguns dos detalhes que fazem da Bloomingdale\'s uma loja como nenhuma outra no mundo.'
                        },
                        desktop: {
                            h1: 'Bem-vindo',
                            h2: 'Confira Todos Os Visuais Estilosos <br/>' +
                                'Começando Com Uma Visita À Bloomingdale\'s ',
                            p:  'Desde 1872, a Bloomingdale\'s esteve no centro da moda, ' + 
                                'trazendo as mais cobiçadas roupas de marca, sapatos, bolsas, ' + 
                                'cosméticos, joias finas e presentes de marca do mundo. Ao ' + 
                                'visitar nossas lojas, você vai desfrutar de mimos exclusivos ' + 
                                'personalizados, tais como atendentes multilíngues e serviços ' + 
                                'especiais de concierge, que certamente farão você se sentir ' +
                                'acolhido, mimado e como se estivesse em casa. Estes são ' + 
                                'apenas alguns dos detalhes que fazem da Bloomingdale\'s ' +
                                'uma loja como nenhuma outra no mundo.'                                
                        }
                    },
                    cat: [
                        'Nosso Legado',
                        'Conheça As Marcas',
                        'Visite Nossas Lojas'
                    ],
                    shop: {
                        title: 'Compre on-line',
                        subtitle: 'Aceitamos',
                        ctas: [
                            'Feminino',
                            'Bolsas',
                            'Sapatos',
                            'Joias & Acessórios',
                            'Masculino',
                            'Casa',
                            'Infantil',
                            'Novidades',
                            'Liquidação'
                        ]
                    }
                },
                heritage: {
                    header: {
                        h1: 'A História da Bloomingdale\'s',
                        h2: 'Um Breve Histórico'
                    },
                    article: {
                        y1880: [{
                            h3: '1872 - Um grande bazar na região leste',
                            p: 'Os irmãos Bloomingdale inventam a frase, "Localização, localização e localização" e abrem sua primeira loja na 938 Third Avenue. Vitrines chamativas mostram a última moda em Paris. Em pouco tempo, as vitrines tornam-se um popular passatempo em Nova York.'
                        }, {
                            h3: 'A Bloomingdale\'s prevê o futuro',
                            p: 'Localizada no "cruzamento do varejo" de Nova York, a nova loja na esquina da 59th Street com a Third Avenue ostenta um transporte para o céu, (ou seja, um elevador). Treze anos mais tarde, Lyman Bloomingdale financia a ideia de um jovem inventor de um "elevador inclinado", e nasce a escada rolante.'
                        }],
                        y1900: [{
                            h3: 'Um slogan conhecido em todo o mundo',
                            p: 'O elevado IRT Third Avenue, ou trem elevado, torna-se o meio de transporte escolhido pelos clientes da Bloomingdale\'s na virada do século, tanto assim que os outdoors, guarda-sóis de praia e histórias em quadrinhos por toda a cidade (e todo o mundo) exibem o popular slogan "Todos os carros levam à Bloomingdale\'s". Pegadas douradas foram colocadas na calçada para que as pessoas as seguissem ao sair do trem e chegassem à Bloomingdale\'s.'
                        }, {
                            h3: '1910 - Um Ford (modelo) T',
                            p: 'A Bloomingdale\'s passa a ser a primeira loja em Nova York a usar o carro modelo T de Henry Ford para fazer entregas.'
                        }],
                        y1920: [{
                            h3: 'A Bloomingdale\'s inicia uma glamorosa reformulação',
                            p: 'A Bloomingdale\'s se fixa na Lexington Avenue e constrói onze novos andares, utilizando-se da nova fixação pelo glamour da Art Déco com os materiais do momento, como granito preto, calcário e terracota. Ela ocupa o quarteirão inteiro da Lexington até a Third Avenue e da 59th até a 60th Street. São, na verdade, 10 edifícios interconectados entre si.'
                        }],
                        y1940: [{
                            h3: 'A Bloomingdale\'s faz 75 anos e comemora como um adolescente',
                            p: 'Para marcar suas bodas de diamante, a Bloomingdale\'s convida os 26 maiores estilistas dos EUA - incluindo os astros Claire McCardell, Pauline Trigere e Jo Copeland - para criar uma coleção de alta costura para as vitrines da loja. A loja lança também o primeiro showroom da história de móveis e decoração para o lar.'
                        }],
                        y1960: [{
                            h3: 'A explosão da moda',
                            p: 'O homem chega à lua. O Mustang. As lojas modernistas. E mais. A Bloomingdale\'s é a primeira loja a oferecer um admirável público americano aos visionários europeus como Yves Saint Laurent e Courrèges.'
                        }, {
                            h3: 'Entre na moda, baby!',
                            p: 'Desde o outono de 63, a Bloomingdale\'s passa a ser a primeira loja a contratar os artistas mais em alta à época para ilustrarem a sacola de compras. Artistas como Jonah Kinigstein e Michael Vollbracht revolucionam a sacola da Bloomingdale\'s, transformando-as em artigos de arte colecionável. As sacolas de compras nunca mais seriam as mesmas.'
                        }],
                        y1970: [{
                            h3: 'A Bloomingdale\'s chega a Hollywood',
                            p: 'A década de decadência começa com uma notícia bombástica: a Bloomingdale\'s fecha parcerias com Hollywood e com a Broadway. Os filmes principais são rodados na loja da 59th Street. "Manhattan", de Woody Allen, "Encontros e Desencontros" e "O Cavaleiro Elétrico" foram apenas o começo, com "Splash - Uma sereia em minha vida" e "Moscou em Nova York" em seguida nos anos 80.'
                        }, {
                            h3: 'A Bloomingdale\'s lança 3 gigantes',
                            p: 'Ralph Lauren, Donna Karan e Calvin Klein estreiam em grande estilo na Bloomingdale\'s, provando mais uma vez que a loja exala juventude, novidade e mentalidade inovadora.'
                        }, {
                            h3: 'Um ícone',
                            p: 'A icônica sacola marrom de compras "Big Brown Bag" da Bloomingdale\'s chega às ruas em 1973. A "Little Brown Bag" veio um ano depois, e a "Medium Brown Bag" foi a última a ser lançada. A Bloomingdale\'s encomendou as sacolas de compras mais conhecidas da história; elas podem ser vistas em acervos de museus ao redor de todo o mundo.'
                        }],
                        y1980: [{
                            h3: 'A Bloomingdale\'s vende o "frenesi"',
                            p: 'Warhol diz que a Bloomingdale\'s é "um novo tipo de museu dos anos 80". E, a cada dia, a loja transforma-se em uma galeria de última geração, com o que há de mais recente e mais grandioso. A Bloomingdale\'s embarca na década do glamour de gala. Figuras estreladas da moda como Karl Lagerfeld, Diane von Furstenberg, Liza Minnelli e Oscar de la Renta decolam em glamurosas aberturas de lojas.'
                        }, {
                            h3: '1988–Ano do Dragão',
                            p: 'Um ano antes de o presidente Nixon viajar à China, a Bloomingdale\'s já tinha evoluído no sentido de reatar relações comerciais com a China continental. Quinze anos depois, em 1988, após o sucesso popular de sua primeira campanha na China, a emblemática 59th Street oferece um panorama épico de 7 semanas sobre a moda e o design do Oriente, comemorando 10 anos de comércio com a República Popular. Adequadamente decorada, a loja brilha como uma joia da Cidade Proibida.'
                        }],
                        y1990: [{
                            h3: 'A nova corrida pelo ouro',
                            p: 'Quatro novas lojas na Califórnia em quatro dias: Century City, Stanford, Sherman Oaks e Newport Beach. E um ano depois, Beverly Center. A Bloomingdale\'s passa a ser a única loja de departamento de alto padrão com todas as opções e com presença nacional. Os californianos comemoram fazendo compras - e depois indo à praia.'
                        }],
                        y2000: [{
                            h3: 'A Bloomingdale\'s ganha a credibilidade de uma loja de moda no centro da cidade',
                            p: 'Tudo que já é bom fica ainda melhor quando se muda para o centro comercial da cidade. A Bloomingdale\'s chega ao SoHo. Um prédio histórico com fachada de ferro fundido na Broadway transforma-se em uma joia lapidada da moda do século XXI.'
                        }, {
                            h3: 'Entrando na era digital',
                            p: 'Nasce a bloomingdales.com. Desde roupas de grife e produtos de beleza de luxo até bolsas e sapatos de salto alto, o site oferece moda de nível mundial na ponta dos dedos de clientes de todo o mundo.'
                        }, {
                            h3: 'Reformulação da beleza',
                            p: 'O piso principal da Broadway na 59th Street passa pela "maior reforma de Nova York", com uma série de quiosques do mais alto padrão das melhores marcas de beleza.'
                        }],
                        y2010: [{
                            h3: '2011–Um novo e brilhante espaço para joias finas',
                            p: 'Projetado para mostrar todas as facetas dos melhores designers do mundo, incluindo David Yurman, o departamento de joias finas na 59th Street - visitado por mais de 400.000 pessoas vindas de mais de 230 países e de todos os 50 Estados dos EUA - vence o NYC Concierge Choice Award - por cinco anos consecutivos.'
                        }, {
                            h3: 'Não há limite para ser diferente de todos',
                            p: 'Hoje, não há limites que a Bloomingdale\'s não possa alcançar. O tipo de inovação, sinônimo da marca desde os seus primeiros dias, continua a ser central para a sua missão de proporcionar luxo. Olhando para trás, vendo os triunfos do passado, a Bloomingdale\'s antecipa o futuro. É um futuro como nenhum outro.'
                        }]
                    }
                },
                stores: {
                    header: {
                        h1: 'Escolha Seu Destino',
                        h2: 'Nós Nos Encontraremos No Centro Do Visitante'
                    },
                    dropdown: {
                        default: 'Escolha Uma Loja',
                        list: [
                            {id: 'null', name: 'NOVA YORK',                             disabled: 'true'},
                            {id: '0',    name: '59th Street Flagship, New York City',   disabled: 'false'},
                            {id: '1',    name: 'SoHo, New York City',                   disabled: 'false'},
                            {id: 'null', name: 'HAVAÍ',                                 disabled: 'true'},
                            {id: '2',    name: 'Ala Moana, Honolulu',                   disabled: 'false'},
                            {id: 'null', name: 'ILLINOIS',                              disabled: 'true'},
                            {id: '3',    name: 'North Michigan Avenue, Chicago',        disabled: 'false'},
                            {id: '4',    name: 'Medinah Home, Chicago',                 disabled: 'false'},
                            {id: 'null', name: 'CALIFÓRNIA',                            disabled: 'true'},
                            {id: '5',    name: 'San Francisco Centre, São Francisco',   disabled: 'false'},
                            {id: '6',    name: 'South Coast Plaza, Costa Mesa',         disabled: 'false'},
                            {id: '7',    name: 'Lojas da Califórnia do Sul',            disabled: 'false'},
                            {id: 'null', name: 'FLÓRIDA',                               disabled: 'true'},
                            {id: '8',    name: 'Aventura',                              disabled: 'false'},
                            {id: '9',    name: 'Orlando',                               disabled: 'false'}
                        ],
                        copy: 'A Bloomingdale\'s possui lojas por todo os Estados Unidos. Nossos Centros do Visitante, em <b>Nova York</b>, no <b>Havaí</b>, em <b>Chicago</b>, <b>Miami</b> e <b>São Francisco</b> oferecem as mais variadas e completas comodidades para clientes internacionais. Os atendentes multilíngues vão ajudá-lo a planejar a sua maior e melhor experiência de compras. Eles vão fornecer um catálogo da loja no idioma que você escolher, informações sobre eventos especiais, além de agendar consultorias com personal stylist de cortesia, entrega gratuita de compras diretamente em seu hotel, reservas em restaurantes (incluindo aqueles localizados dentro de nossas lojas) e muito mais. Você é o típico "rato de praia"? Nossas filiais na Califórnia do Sul - incluindo South Coast Plaza em Ocean County, San Diego e Los Angeles - além de Honolulu, significam que você nunca estará longe do melhor da moda.'
                    },
                    storeData: {
                        storeHours: 'Horário da loja',
                        directions: 'Como Chegar',
                        designers: 'Marcas em Destaque',
                        dining: 'Gastronomia Em Nossa Loja',
                        services: 'Serviços',
                        servicesSubHead: 'Nossos atendentes vão mostrar porque não há nenhuma outra loja no mundo como a Bloomingdale\'s. Procure por nossos atendentes usando o broche com a bandeira de seu país. Nós podemos ajudá-lo a encontrar o estilo que você adora e auxiliar com uma série de serviços personalizados.',
                        loyalty: 'Inscreva-se Em Nosso International Loyalty Club',
                        loyaltySubHead: 'Nosso programa especial de recompensas foi criado para os clientes internacionais.* Para cada dólar que você gasta, você ganha um ponto em cartões de presente, serviços e experiências incríveis. Atualmente, você pode resgatar os pontos somente na Bloomingdale\'s do Ala Moana, mas pode ganhar pontos em qualquer uma das lojas de toda a rede Bloomingdale\'s nos Estados Unidos.**',
                        id: [
                            {
                                name: 'Loja matriz na 59th Street',
                                addr: '1000 Third Avenue  New York, NY 10022<br/>+1 212-705-2000',
                                hours: 'Segunda-feira - Sábado: Abertura da loja 10:00h <span>|</span>  Domingo: Abertura da loja 11:00h',
                                descr: 'Venha conhecer o icônico patrimônio e a premiada hospitalidade da Bloomingdale\'s. Comece seu dia em nossa loja matriz sendo recebido no balcão do nosso Centro do Visitante, no primeiro andar. Nosso catálogo multilíngue vai oferecer um mapa para sua viagem de compras. Quer uma experiência mais personalizada? Conheça os serviços internos de nossas lojas, desde consultoria em estilo até alterações em reservas de restaurante. Nós o ajudaremos a providenciar tudo isso e muito mais.',
                                dTile: 'VISITANDO NOVA YORK?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_PT.pdf',
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   7º. andar  <span>|</span>   212-705-3085',
                                        sched: 'Aberto todos os dias <span>|</span>   Refeições a partir das: 10:30h-1 hora antes da loja fechar  <br/>Para viagem: 10:00h-30 min antes da loja fechar',
                                        description: 'Sua visita só estará completa após experimentar nosso famoso iogurte frozen. Você também vai se deliciar com saladas feitas na hora, sanduíches, sopas, um bar de sucos de frutas naturais e uma seleção primorosa de chás Tavalon. Atendimento no balcão, na mesa e para viagem.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    },
                                    {
                                        name: '<b>FL!P</b> <span>|</span>   Mezanino  <span>|</span>   212-705-3085',
                                        sched: 'Aberto todos os dias  <span>|</span>   Refeições a partir das: 11:00h-1 hora antes da loja fechar ',
                                        description: 'Desfrute da "alta costura" dos hambúrgueres americanos, além de saladas, cervejas artesanais, um bar completo e diversos tipos de batatas fritas, em um ambiente descontraído na loja masculina.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_02.jpg'
                                    },
                                    {
                                        name: '<b>MAGNOLIA BAKERY</b> <span>|</span>  Piso Térreo  <span>|</span>   212-265-5320',
                                        sched: 'Segunda-feira – Sexta-feira  7:00h-22:00h  <br/> Sábado  8:00h-22:00h <span>|</span>   Domingo 8:00h-21:00h',
                                        description: 'Uma padaria americana clássica famosa por seus tradicionais doces e sobremesas e decoração vintage, a Magnolia serve uma infinidade de produtos de panificação artesanal, incluindo tortas, bolos, cheesecakes, pudim de banana, cupcakes e muffins. Vai chegar cedo? A Magnolia abre antes mesmo da própria loja.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_03.jpg'
                                    },
                                    {
                                        name: '<b>DAVID BURKE AT BLOOMINGDALE\'S </b> <span>|</span>   Piso Térreo  <br />   212-705-3800',
                                        sched: 'Aberto Diariamente  <span>|</span>   Na caixa (para levar) 10:00h–21:00h <span>|</span>   No bar (para ficar) 11:00h–21:00h ',
                                        description: 'Chef David Burke, um dos maiores pioneiros da culinária americana, reúne pratos deliciosos e serviço top em uma atmosfera animada.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_04.jpg'
                                    },
                                    {
                                        name: '<b>LE TRAIN BLEU </b> <span>|</span>   6º. andar  <span>|</span>   212-705-2100',
                                        sched: 'Segunda-feira–Quarta-feira, Sexta-feira–Sábado 10:30h–17:00h <span>|</span> Quinta-feira 10:30h–19:00h <span>|</span> Domingo 11:30h–16:30h',
                                        description: '<i>Recomendamos fazer reserva </i><br/>Uma réplica de um jantar romântico no vagão de trem na virada do século passado, o Le Train Bleu oferece os melhores preços de todos os EUA, incluindo brunch, almoço e um menu de jantar com preços fixos.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_05.jpg'
                                    },
                                    {
                                        name: '<b>B CAFÉ </b> <span>|</span>   6º. andar  <span>|</span>   212-705-2073',
                                        sched: 'Aberto todos os dias <span>|</span> 10:00h até a loja fechar ',
                                        description: 'Faça uma parada neste café e lanchonete para delícias rápidas e saudáveis, ou para saborear um almoço ou jantar leve com versões para viagem de muitas das opções favoritas do Le Train Bleu.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    } 
                                ],
                                services: [
                                    {
                                        title: 'NÓS FAZEMOS SUA LISTA DE PRESENTES',
                                        description: 'Comprar presentes é muito fácil na Bloomingdale\'s. Basta enviar sua lista a nossos especialistas multilíngues antes de sua visita, e você já vai encontrar seus itens esperando por você quando chegar.<br/> Ligue +1 212-705-2359 ou +1 212-705-3488 <br/> E-mail <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS E CONSULTORES DE BELEZA DE PLANTÃO',
                                        description: 'Nossos personal stylists estão disponíveis para acompanhá-lo em suas compras na loja, ou selecionar opções para seu guarda-roupa e de decoração de acordo com seu gosto - tudo gratuito.<br/> Para elas +1 212-705-3135 <br/> Para eles +1 212-705-3030'
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card e todas as formas de pagamento da China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'
                                    },
                                    {
                                        title: 'ENTREGA EM SEU HOTEL',
                                        description: 'Nós entregaremos com prazer suas comprar a partir de US$ 300 no seu hotel em Manhattan — gratuitamente.'
                                    },
                                    {
                                        title: 'CARTÕES E EMBALAGENS PARA PRESENTE',
                                        description: 'Nós podemos embrulhar suas compras, ou você pode pegar cartões, caixas, papel de embrulho e fita para levar para casa em nossa estação de embrulho para presente no sexto andar.'
                                    }
                                ]
                            },
                            {
                                name: 'SoHo',
                                addr: '504 Broadway  New York, NY 10012<br/>+1 212-729-5900',
                                hours: 'Segunda-feira - Sábado: Abre às 10:00h <span>|</span> Domingo: Abre às 12:00h',
                                descr: 'Conheça nossa loja do centro, no SoHo, o bairro mais elegante da cidade. Você encontrará toda a elegante energia de nossa matriz da Upper Manhattan, mas com a sensação de uma boutique de moda. Confira nosso movimentado andar de beleza e depois conheça nossas últimas novidades de grifes. Como sempre, os atendentes multilíngues estão disponíveis para ajudar a tornar sua visita inesquecível.',
                                dTile: 'VISITANDO NOVA YORK?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_PT.pdf',
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   2º. andar  <span>|</span>   +1 212-729-5900',
                                        sched: 'Segunda-feira - Sexta-feira 10:00h-20:00h <br/>Sábado 10:00h–19:00h<br/>Domingo 12:00h–19:00h',
                                        description: 'Sua visita só estará completa após experimentar nosso famoso iogurte frozen. Você também vai se deliciar com saladas feitas na hora, sanduíches, sopas, um bar de sucos de frutas naturais e uma seleção primorosa de chás Tavalon. Atendimento no balcão, na mesa e para viagem.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'NÓS FAZEMOS SUA LISTA DE PRESENTES',
                                        description: 'Comprar presentes é muito fácil na Bloomingdale\'s. Basta enviar sua lista a nossos especialistas multilíngues antes de sua visita, e você já vai encontrar seus itens esperando por você quando chegar.<br/> Ligue +1 212-705-2098  ou envie e-mail para <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card e todas as formas de pagamento da China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'
                                    },
                                    {
                                        title: 'ENTREGA EM SEU HOTEL',
                                        description: 'Nós entregaremos com prazer suas comprar a partir de US$ 250 no seu hotel em Manhattan — gratuitamente. É só deixá-las com qualquer atendente de vendas.'
                                    }
                                ]                               
                            },
                            {
                                name: 'Ala Moana',
                                addr: '1450 Ala Moana Blvd  Honolulu, HI 96814<br/>+1 808-644-7511',
                                hours: 'Segunda-feira - Sábado: 10:00h-20:00h <span>|</span> Domingo: 11:00h-19:00h',                                
                                descr: 'Diga "Aloha" para nossa mais nova filial na tropical Honolulu. Localizada no Ala Moana Center, atração e principal local de compras no Havaí, esta loja de três andares oferece uma variedade de comodidades sob medida para o cliente no além-mar. Passe em nosso Centro Internacional de Visitantes e fale com um dos nossos atendentes multilíngues. Nós oferecemos consultoria com personal stylist, ajustes no próprio local, reservas em restaurantes e muito mais.</p><p style="margin-top: 10px;">Está pensando em nos visitar de novo? Inscreva-se em nosso International Loyalty Club e ganhe pontos em cartões de presente, serviços especiais e em aventuras havaianas autênticas.',
                                dTile: 'VISITANDO O HAVAÍ?',
                                dInfo: 'Baixe nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Hawaii_EN.pdf',
                                designers: [
                                    'Burberry',
                                    'Chloé',
                                    'Clinique',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Longchamp ',
                                    'Jimmy Choo',
                                    'Jo Malone London',
                                    'Lancôme',
                                    'La Mer',
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rebecca Minkoff',
                                    'Tory Burch',
                                    'Villeroy & Boch'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   3º. andar ',
                                        sched: 'Aberto todos os dias <span>|</span>  11:30h – 1 hora antes da loja fechar',
                                        description: 'Sua visita só estará completa após experimentar nosso famoso iogurte frozen.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'CENTRO DO VISITANTE E BALCÃO DE CONCIERGE COM TODOS OS SERVIÇOS ',
                                        description: 'No Centro de Visitantes, vamos recebê-lo com um guarda volumes e casaco de cortesia, além de um catálogo multilíngue da loja. Caso precise, nossos atendentes podem providenciar consultoria com personal stylist e entrega gratuita em seu hotel. Passe em nosso balcão de concierge para ajustes e retiradas ou para saber mais sobre os encantos e atrações do Havaí. '
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS E CONSULTORES DE BELEZA DE PLANTÃO ',
                                        description: 'Nossos personal stylists estão disponíveis para acompanhá-lo em suas compras na loja, ou selecionar opções de guarda-roupa de acordo com seu gosto - tudo gratuito. Está interessado em uma consultoria em beleza? Nossos experientes consultores vão encontrar produtos perfeitos para você, das marcas mais cobiçadas.'
                                    },
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'
                                    },
                                    {
                                        title: 'CÂMBIO',
                                        description: 'A apenas poucos passos da Bloomingdale\'s, você encontra uma casa de câmbio localizada convenientemente dentro do Ala Moana Center.'
                                    },
                                    {
                                        title: 'RELAXE EM NOSSA SALA VIP',
                                        description: 'A primeira da rede Bloomingdale\'s, nossa sala de acesso restrito fica no Centro do Visitante. Um seleto grupo de turistas pode desfrutar de comodidades, incluindo: petiscos e bebidas, uma TV, banheiro privativo, tomadas de energia elétrica, uma impressora Bluetooth para cartões de embarque e iPads® com o aplicativo da Bloomingdale\'s pré-instalado e guias de viagem muito úteis em quase todos os idiomas. O acesso por um dia ao lounge está disponível aos visitantes mediante recibo de US$ 500 ou mais em compras.',
                                    }
                                ],
                                loyalty: [
                                    {
                                        title: 'GANHE UM CARTÃO DE PRESENTE',
                                        description: '500 pontos = cartão de presente de US$ 25, válido para qualquer mercadoria na Bloomingdale\'s do Ala Moana.'
                                    },
                                    {
                                        title: 'APROVEITE OS SERVIÇOS DA LOJA',
                                        description: 'Você pode usar seus pontos para ganhar a entrega de suas compras como cortesia em seu hotel, um almoço ou um táxi para o seu próximo destino. Para mais informações, consulte um atendente no Centro do Visitante no primeiro piso.'
                                    },
                                    {
                                        title: 'DELEITE-SE EM UMA EXPERIÊNCIA QUE VOCÊ NUNCA VAI ESQUECER',
                                        description: 'Resgate seus pontos para conhecer as autênticas aventuras do Havaí! Para mais informações, consulte um atendente no Centro do Visitante no primeiro piso.'
                                    },
                                    {
                                        title: '',
                                        description: '*Necessário comprovante do endereço internacional.<br/>**Pontos não podem ser resgatados nas lojas de Outlet da Bloomingdale\'s ou pelo site bloomingdales.com. Pontos podem somente ser resgatados por serviços ou experiências em Bloomingdale\'s Ala Moana.'
                                    }                                      
                                ]                                    
                            },
                            {
                                name: 'North Michigan Avenue',
                                addr: '900 North Michigan Avenue  Chicago, IL 60611<br/>+1 312-440-4460 ',
                                hours: 'Segunda-feira - Sábado: 10:00h-20:00h <span>|</span> Domingo: 11:00h-19:00h',                                         
                                descr: 'Planejando uma viagem à Cidade dos Ventos? Deixe que a Bloomingdale\'s seja seu guia de moda. Preencha o seu guarda-roupa com a nossa ampla coleção de nomes de grife, ou estoque seus produtos de beleza favoritos. Nossos atendentes multilíngues podem ajudá-lo a personalizar sua viagem de compras de acordo com todas as suas necessidades.',
                                dTile: 'VISITANDO CHICAGO?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designers: [
                                    'Burberry',
                                    'Canada Goose',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Gucci',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Moncler',
                                    'Ralph Lauren',
                                    'Ray-Ban',
                                    'Salvatore Ferragamo',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'UGG® Australia '
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   6º. andar <span>|</span> +1 312-440-4861',
                                        sched: 'Segunda-feira – Sábado 11:00h – 18:00h',
                                        description: 'Sua visita só estará completa após experimentar nosso famoso iogurte frozen.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'NÓS FAZEMOS SUA LISTA DE PRESENTES',
                                        description: 'Comprar presentes é muito fácil na Bloomingdale\'s. Basta enviar sua lista a nossos especialistas multilíngues antes de sua visita, e você já vai encontrar seus itens esperando por você quando chegar.<br/> Ligue +1 312-440-4596  ou envie e-mail para <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS E CONSULTORES DE BELEZA DE PLANTÃO',
                                        description: 'Nossos personal stylists estão disponíveis para acompanhá-lo em suas compras na loja, ou selecionar opções para seu guarda-roupa e de decoração de acordo com seu gosto - tudo gratuito.<br/> À sua disposição no +1 312-440-4887'
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card e todas as formas de pagamento da China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'ENTREGA EM SEU HOTEL',
                                        description: 'Nós entregaremos com prazer suas comprar a partir de US$ 250 no seu hotel no centro da cidade — gratuitamente. Basta deixá-las no Centro do Visitante no terceiro andar.'
                                    },
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'
                                    },
                                    {
                                        title: 'CARTÕES E EMBALAGENS PARA PRESENTE',
                                        description: 'Nós podemos embrulhar suas compras, ou você pode pegar cartões, caixas, papel de embrulho e fita para levar para casa em nossa estação de embrulho para presente no sexto andar.'
                                    }
                                ]  
                            },
                            {
                                name: 'Medinah Home',
                                addr: '600 North Wabash Avenue  Chicago, IL 60611<br/>+1 312-324-7500',
                                hours: 'Segunda-feira - Sábado: Abertura da loja 10:00h  <span>|</span>  Domingo: Abre às 12:00h',                                         
                                descr: 'Decore sua casa com uma viagem à loja Medinah Home em Chicago. Aqui você vai encontrar roupas de cama de luxo, utensílios de cozinha feitos por designers, finos acessórios de casa e banho e muito mais. Experimente em primeira mão nossa premiada hospitalidade com uma infinidade de serviços no interior da loja.',
                                dTile: 'VISITANDO CHICAGO?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designers: [
                                    'Nespresso',
                                    'Rimowa',
                                    'Tumi',
                                    'Victorinox'
                                ],
                                services: [
                                    {
                                        title: 'NÓS FAZEMOS SUA LISTA DE PRESENTES',
                                        description: 'Comprar presentes é muito fácil na Bloomingdale\'s. Basta enviar sua lista a nossos especialistas multilíngues antes de sua visita, e você já vai encontrar seus itens esperando por você quando chegar.<br/> Ligue +1 312-440-4596  ou envie e-mail para <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS E CONSULTORES DE BELEZA DE PLANTÃO',
                                        description: 'Nossos personal stylists estão disponíveis para acompanhá-lo em suas compras na loja, ou selecionar opções de decoração de acordo com seu gosto - tudo gratuito.<br/> À sua disposição no +1 312-324-7633'
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card e todas as formas de pagamento da China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'CARTÕES E EMBALAGENS PARA PRESENTE',
                                        description: 'Nós podemos embrulhar suas compras, ou você pode pegar cartões, caixas, papel de embrulho e fita para levar para casa. Visite nossa estação de Embrulho de Presentes no segundo andar.'
                                    }
                                ] 
                            },
                            {
                                name: 'San Francisco Centre',
                                addr: '845 Market Street  San Francisco, CA<br/>+1 415-856-5402',
                                hours: 'Segunda-feira - Sábado: 10:00h-21:00h <span>|</span> Domingo: 11:00h-20:00h',                                   
                                descr: 'Descubra o melhor das compras em São Francisco. Primeira parada, Bloomingdale\'s. Dirija-se ao Centro do Visitante para um catálogo multilíngue ou fale com nossos atendentes multilíngues para personalizar a sua experiência de acordo com suas necessidades. Saiba mais sobre nossos serviços e comodidades internos da loja abaixo.',
                                dTile: 'VISITANDO SÃO FRANCISCO?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SanFran_EN.pdf',
                                designers: [
                                    'Alice + Olivia',
                                    'BCBGMAXAZRIA',
                                    'Burberry', 
                                    'Calvin Klein',
                                    'CHANEL',
                                    'COACH',
                                    'Clinique', 
                                    'Dior', 
                                    'DIANE von FURSTENBERG',
                                    'Elie Tahari', 
                                    'Escada',
                                    'Estée Lauder',
                                    'Giorgio Armani',
                                    'Helmut Lang',
                                    'kate spade new york',
                                    'La Mer',
                                    'Lancôme',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Ralph Lauren',
                                    'Rebecca Taylor',
                                    'Salvatore Ferragamo',
                                    'TAG Heuer', 
                                    'Tory Burch', 
                                    'Trina Turk'
                                ],
                                services: [
                                    {
                                        title: 'NÓS FAZEMOS SUA LISTA DE PRESENTES',
                                        description: 'Comprar presentes é muito fácil na Bloomingdale\'s. Basta enviar sua lista a nossos especialistas multilíngues antes de sua visita, e você já vai encontrar seus itens esperando por você quando chegar.<br/> Ligue +1 415-856-5477 ou envie e-mail para <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS E CONSULTORES DE BELEZA DE PLANTÃO',
                                        description: 'Nossos personal stylists estão disponíveis para acompanhá-lo em suas compras na loja, ou selecionar opções para seu guarda-roupa e de decoração de acordo com seu gosto - tudo gratuito.<br/> À sua disposição no +1 415-856-5538 '
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card e todas as formas de pagamento da China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'ENTREGA EM SEU HOTEL',
                                        description: 'Nós entregaremos com prazer suas comprar a partir de US$ 250 no seu hotel no centro da cidade — gratuitamente. Basta deixá-las no Centro do Visitante no terceiro andar.'
                                    },
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'
                                    },
                                    {
                                        title: 'CARTÕES E EMBALAGENS PARA PRESENTE',
                                        description: 'Nós podemos embrulhar suas compras, ou você pode pegar cartões, caixas, papel de embrulho e fita para levar para casa no Centro do Visitante.'
                                    }
                                ]                               
                            },
                            {
                                name: 'South Coast Plaza',
                                addr: '3333 Bristol St  Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                hours: 'Segunda-feira - Sábado: 10:00h-21:00h <span>|</span> Domingo: 11:00h-19:00h',                                   
                                descr: 'Com a melhor seleção de estilistas, feita especialmente para a Califórnia do Sul, o South Coast Plaza é ponto de parada obrigatório quando o assunto é compras. Novo no "Estado Dourado"? Os atendentes multilíngues vão tornar sua estadia muito melhor. Comece com um catálogo da loja em seu idioma ou torne sua viagem de compras especial com os serviços internos de nossa loja.',
                                dTile: 'VISITANDO COSTA MESA?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthCoastPlaza_EN.pdf',
                                designers: [
                                    'Burberry',
                                    'Calvin Klein',
                                    'Canada Goose',
                                    'CHANEL',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani Beauty',
                                    'Gucci',
                                    'Hugo Boss',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'La Prairie',
                                    'Longchamp',
                                    'Longines Watches',
                                    'Louis Vuitton',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Miu Miu',
                                    'Moncler',
                                    'Montblanc',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rimowa',
                                    'Salvatore Ferragamo',
                                    'Stuart Weitzman',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'Tumi',
                                    'UGG® Australia',
                                    'Yves Saint Laurent Beauty'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>AnQi by Crustacean Gourmet Bistro & Noodle Bar</b> <br/>  Piso Térreo <span>|</span> +1 714-557-5679',
                                        sched: 'Piso Térreo Almoço: Aberto todos os dias 11:30h – 14:30h <br/>Noodle Bar: Aberto todos os dias 11:30h – 17:30h <br/>Jantar:   Domingo – Quinta-feira 17:30h – 20:30h <br/>Sexta-feira – Sábado 17:30h – 23:00h <br/>Red Happy Hour: Segunda-feira – Sexta-feira 16:00h – 19:00h',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_08.jpg'
                                    },
                                    {
                                        name: '<b>Holsteins</b> <span>|</span> Piso Térreo <span>|</span> 714-352-2525',
                                        sched: 'Segunda-feira – Quinta-feira 11:00h – 24:00h  <br/> Sexta-feira – Sábado: 11:00h - 2:00h  <br/>Domingo 11:00h – 24:00h ',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_09.jpg'
                                    }                                       
                                ],
                                services: [
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card e todas as formas de pagamento da China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'CARTÕES E EMBALAGENS PARA PRESENTE',
                                        description: 'Nós podemos embrulhar suas compras, ou você pode pegar cartões, caixas, papel de embrulho e fita para levar para casa. Todos disponíveis no piso inferior.'
                                    }
                                ]                                    
                            },
                            {
                                name: 'Lojas da Califórnia do Sul',
                                addr: '',
                                hours: '',
                                descr: 'Com filias por toda Los Angeles, Orange County e San Diego, a Bloomingdale\'s deixou sua marca registrada na Califórnia do Sul. Compre as marcas de roupas, acessórios, sapatos e beleza que você ama em qualquer uma de nossas lojas. Saiba mais sobre nossos serviços e comodidades internos da loja abaixo.',
                                dTile: 'VISITANDO A CALIFÓRNIA DO SUL?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthernCalifornia_EN.pdf',
                                stores: [
                                    {
                                        area: 'Orange County',
                                        list: [
                                            {
                                                name: 'South Coast Plaza',
                                                addr: '3333 South Bristol Street, Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                                hours: 'Horário:<br/>Segunda-feira-Terça-feira 10:00h-21:00h <br/>Quarta-feira-Sábado 10:00h-22:00h<br/>Domingo 10:00h-20:00h ',
                                            },
                                            {
                                                name: 'Newport Fashion Island',
                                                addr: '701 Newport Center Drive, Newport Beach, CA 92660 <br/>+1 949-729-6600',
                                                hours: 'Horário: <br/>Segunda-feira-Terça-feira 10:00h-20:00h<br/>Quarta-feira-Sábado 10:00h-22:00h<br/>Domingo 11:00h-20:00h ',
                                            }
                                        ]                                   
                                    },
                                    {
                                        area: 'Los Angeles',
                                        list: [
                                            {
                                                name: 'Century City',
                                                addr: '10250 Santa Monica Boulevard, Los Angeles, CA 90067 <br/>+1 310-772-2100',
                                                hours: 'Horário: <br/>Segunda-feira-Terça-feira 10:00h-21:00h<br/>Quarta-feira-Sábado 10:00h-22:00h<br/>Domingo 11:00h-20:00h ',
                                            },
                                            {
                                                name: 'Beverly Center',
                                                addr: '8500 Beverly Boulevard, Los Angeles, CA 90048 <br/>+1 310-360-2700',
                                                hours: 'Horário: <br/>Segunda-feira-Terça-feira 10:00h-21:00h<br/>Quarta-feira-Sábado 10:00h-22:00h<br/>Domingo 12:00h-20:00h ',
                                            },
                                            {
                                                name: 'Santa Monica Place',
                                                addr: '315 Colorado Avenue, Santa Monica, CA 90401 <br/>+1 310-985-6400',
                                                hours: 'Horário: <br/>Segunda-feira-Terça-feira 10:00h-21:00h<br/>Quarta-feira-Sábado 10:00h-22:00h<br/>Domingo 11:00h-20:00h ',
                                            },
                                            {
                                                name: 'Glendale Galleria',
                                                addr: '103 South Brand Blvd., Glendale, CA 91210 <br/>+1 818-638-4100',
                                                hours: 'Horário: <br/>Segunda-feira-Terça-feira 10:00h-21:00h<br/>Quarta-feira-Sábado 10:00h-22:00h<br/>Domingo 11AM-9PM ',
                                            },
                                            {
                                                name: 'Sherman Oaks Fashion Square',
                                                addr: '14060 Riverside Drive, Sherman Oaks, CA 91423 <br/>+1 818-325-2200',
                                                hours: 'Horário: <br/>Segunda-feira-Terça-feira 10:00h-21:00h<br/>Quarta-feira-Sábado 10:00h-22:00h<br/>Domingo 11AM-9PM ',
                                            }  
                                        ]                                   
                                    }, 
                                    {
                                        area: 'San Diego',
                                        list: [
                                            {
                                                name: '<b>San Diego</b><br/>Fashion Valley',
                                                addr: '7057 Friars Road, San Diego, CA 92108 <br/>+1 619-610-6400',
                                                hours: 'Horário: <br/>Segunda-feira-Terça-feira 10:00h-20:00h<br/>Quarta-feira 10:00h-20:00hbr/>Quinta-feira-Sábado 10:00h-22:00h<br/>Domingo 12:00h-20:00h',
                                            }
                                        ]                                   
                                    }                                                                       
                                ],
                                services: [
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas. Disponível em locais selecionados.'
                                    },
                                    {
                                        title: 'CARTÕES E EMBALAGENS PARA PRESENTE ',
                                        description: 'Nós podemos embrulhar suas compras, ou você pode pegar cartões, caixas, papel de embrulho e fita para levar para casa. Disponível em locais selecionados.'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS E CONSULTORES DE BELEZA DE PLANTÃO ',
                                        description: 'Nossos personal stylists estão disponíveis para acompanhá-lo em suas compras na loja, ou selecionar opções de decoração para casa de acordo com seu gosto - tudo gratuito. Disponível em locais selecionados.'
                                    }
                                ]  
                            },
                            {
                                name: 'AVENTURA',
                                addr: '19555 Biscayne Boulevard  Aventura, FL 33180<br/>+1 305-792-1246',
                                hours: 'Segunda-feira - Sábado: 10:00h-22:00h <span>|</span> Domingo: 12:00h-21:00h',                                  
                                descr: 'Planejando o roteiro das suas férias? Comece com uma parada na loja de Aventura, na Flórida. Explore a nossa ampla seleção de estilistas, marcas de beleza, acessórios de luxo e muito mais. Comece a comprar com um catálogo da loja no seu idioma escolhido e não se esqueça de aproveitar ao máximo sua experiência com nossos serviços nas lojas listadas abaixo.',
                                dTile: 'VISITANDO AVENTURA?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Aventura_PT.pdf',
                                designers: [
                                    'Baccarat',
                                    'Bernardaud',
                                    'BVLGARI',
                                    'Burberry',
                                    'Calvin Klein ',
                                    'Canali ',
                                    'CHANEL ',
                                    'Christofle ',
                                    'David Yurman ',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel ',
                                    'Dior ',
                                    'Fendi ',
                                    'Furla ',
                                    'Giorgio Armani',
                                    'Gucci ',
                                    'HUGO BOSS ',
                                    'Jimmy Choo ',
                                    'John Varvatos', 
                                    'La Mer ',
                                    'Lalique',
                                    'Longchamp', 
                                    'Louis Vuitton ',
                                    'M·A·C ',
                                    'MARC BY MARC JACOBS ',
                                    'Michael Kors ',
                                    'Miki House ',
                                    'Montblanc ',
                                    'Movado ',
                                    'PANDORA',
                                    'Prada ',
                                    'Pratesi ',
                                    'Ralph Lauren ',
                                    'Roberto Coin ',
                                    'Salvatore Ferragamo ',
                                    'Sferra ',
                                    'Shiseido ',
                                    'TAG Heuer ',
                                    'Tory Burch ',
                                    'Villeroy & Boch ',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>59TH & LEX CAFE</b> <span>|</span> 2º. piso <span>|</span>  +1 305-792-1180',
                                        sched: 'Segunda-feira–Sábado 10:00h–19:30h <span>|</span> Domingo 12:00h–17:00h',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'NÓS FAZEMOS SUA LISTA DE PRESENTES ',
                                        description: 'Comprar presentes é muito fácil na Bloomingdale\'s. Basta enviar sua lista a nossos especialistas multilíngues antes de sua visita, e você já vai encontrar seus itens esperando por você quando chegar.<br /> Ligue +1 305-792-1175 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'

                                    }
                                ]     
                            },
                            {
                                name: 'ORLANDO',
                                addr: '4152 Conroy Road  Orlando, FL 32839<br/>+1 407-264-2514',
                                hours: 'Segunda-feira - Sábado: 10:00h-21:00h <span>|</span> Domingo: 11:00h-19:00h',                                
                                descr: 'Abastecido com os melhores estilistas e marcas de beleza, a Bloomingdale\'s de Orlando é seu passaporte para as compras de nível mundial. Faça uma parada em sua próxima viagem ao "Estado Ensolarado" para uma experiência feita sob medida para você. Pegue um catálogo da loja no seu idioma e então tire o máximo proveito dos serviços e comodidades listados abaixo.',
                                dTile: 'VISITANDO ORLANDO?',
                                dInfo: 'Baixe o nosso guia de boas-vindas antes de chegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Orlando_PT.pdf',
                                designers: [
                                    'Burberry',
                                    'Canali ',
                                    'COACH',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel Jeans',
                                    'Dior ',
                                    'Fendi ',
                                    'Frankie B Jeans ',
                                    'John Varvatos ',
                                    'Joie ',
                                    'La Mer ',
                                    'Longchamp', 
                                    'Montblanc ',
                                    'Movado ',
                                    'Ralph Lauren ',
                                    'Salvatore Ferragamo ',
                                    'Sandro ',
                                    'Shiseido ',
                                    'Ted Baker ',
                                    'Tory Burch ',
                                    'Vince'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> 1º. andar <span>|</span> +1 407-264-2683',
                                        sched: 'Segunda-feira – Sábado 10:00h – 21:00h <span>|</span> Domingo 11:00h – 19:00h',
                                        description: 'Sua visita só estará completa após experimentar nosso famoso iogurte frozen.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'NÓS FAZEMOS SUA LISTA DE PRESENTES ',
                                        description: 'Comprar presentes é muito fácil na Bloomingdale\'s. Basta enviar sua lista a nossos especialistas multilíngues antes de sua visita, e você já vai encontrar seus itens esperando por você quando chegar.<br /> Ligue +1 305-792-1175 ou envie e-mail para <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'FACILIDADE DE PAGAMENTO ',
                                        description: 'Nós aceitamos o cartão American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'AJUSTES RÁPIDOS',
                                        description: 'Realizamos personalização profissional e serviços de ajuste no próprio local, conforme for solicitado. Os preços são informados no momento do ajuste das medidas.'

                                    }
                                ]       
                            }                                
                        ]
                    }
                },                                 
                designer: {
                    header: {
                        h1: 'São Muitos Nomes Em Apenas Uma Loja',
                        h2: 'Escolhemos A Dedo Os Melhores Designers De Moda, Beleza E Cia.'
                    },
                    article: [
                        'A Bloomingdale\'s traz uma seleção incomparável de marcas de grife incluindo CHANEL, Dior, Michael Kors, MCM, Tory Burch, MARC JACOBS, Armani e Ralph Lauren.',
                        'Procura os produtos de beleza mais novos (e mais cobiçados)? Encontre todos os seus produtos favoritos para cuidados da pele, maquiagem e marcas de fragrâncias como La Mer, Estée Lauder, Gucci, Chloé, Clinique, Lancôme e Kate Spade New York.'
                    ]
                },                
                socialshare: {
                    fb: {
                        name: 'Turismo Internacional | bloomingdales.com',
                        description: 'Desde designers de roupas até as marcas de beleza mais cobiçadas, explore tudo o que a Bloomingdale\'s tem para oferecer em seu site atualizado.'
                    },
                    pinterest: {
                        description: 'Turismo Internacional | bloomingdales.com'
                    },
                    twitter: {
                        text: 'Ama comprar na @bloomingdales? Veja o site Internacional para novos designers de roupas, acessórios e beleza. http://bit.ly/1M3fLiB'
                    },
                    weibo: {
                        url: '',
                        title: ''
                    },
                    weixin: {
                        text: ''
                    }
                },
                contactUs: {
                    formTitle: 'Entre Em Contato Conosco',
                    left: {
                        title: 'Avise-nos de sua viagem',
                        p1: 'Diga-nos qual loja da Bloomingdale\'s você gostaria de visitar e as datas planejadas de sua viagem. ',
                        p2: 'Basta preencher este formulário, e um de nossos atendentes irá entrar em contato. '
                    },
                    right: {
                        name: 'Nome:',
                        nameErr: 'Por favor, diga-nos o seu nome',
                        email: 'E-mail:',
                        emailErr1: 'Por favor, diga -nos o seu e-mail',
                        emailErr2: 'Endereço de email invalido',
                        phone: 'Nº. de celular (opcional): ',
                        phoneErr: 'Número de telefone inválido',
                        party: 'Número de pessoas no meu grupo:',
                        partyErr: 'Por favor, conte-nos o tamanho de seu grupo',
                        dates: 'Datas planejadas de minha viagem aos EUA:',
                        arriving: 'Chegada:',
                        departing: 'Partida:',
                        datesErr: 'Selecione a data',
                        storesH: 'Eu gostaria de visitar:',
                        storesM: 'Escolha uma loja',
                        storesErr: 'Escolha uma loja',
                        stores: [
                            {id: 'null', name: 'Nova York', disabled: 'true'},
                            {id: '59th Street Flagship, New York City', name: 'Matriz, 59th Street, New York City', disabled: 'false'},
                            {id: 'SoHo, New York City', name: 'SoHo, New York City', disabled: 'false'},
                            {id: 'null', name: 'Havaí', disabled: 'true'},
                            {id: 'Ala Moana, Honolulu', name: 'Ala Moana, Honolulu', disabled: 'false'},
                            {id: 'null', name: 'Illinois', disabled: 'true'},
                            {id: 'North Michigan Avenue, Chicago', name: 'North Michigan Avenue, Chicago', disabled: 'false'},
                            {id: 'Medinah Home, Chicago', name: 'Medinah Home, Chicago', disabled: 'false'},
                            {id: 'null', name: 'Califórnia', disabled: 'true'},
                            {id: 'Beverly Center, Los Angeles', name: 'Beverly Center, Los Angeles', disabled: 'false'},
                            {id: 'Century City, Los Angeles', name: 'Century City, Los Angeles', disabled: 'false'},
                            {id: 'Fashion Valley, San Diego', name: 'Fashion Valley, San Diego', disabled: 'false'},
                            {id: 'Glendale Galleria, Glendale', name: 'Glendale Galleria, Glendale', disabled: 'false'},
                            {id: 'Newport Fashion Island, Newport Beach', name: 'Newport Fashion Island, Newport Beach', disabled: 'false'},
                            {id: 'San Francisco Centre, San Francisco', name: 'San Francisco Centre, São Francisco', disabled: 'false'},
                            {id: 'Santa Monica Place, Santa Monica', name: 'Santa Monica Place, Santa Monica', disabled: 'false'},
                            {id: 'Sherman Oaks Fashion Square, Sherman Oaks', name: 'Sherman Oaks Fashion Square, Sherman Oaks', disabled: 'false'},
                            {id: 'South Coast Plaza, Costa Mesa', name: 'South Coast Plaza, Costa Mesa', disabled: 'false'},
                            {id: 'null', name: 'Flórida', disabled: 'true'},
                            {id: 'Aventura', name: 'Aventura', disabled: 'false'},
                            {id: 'Orlando', name: 'Orlando', disabled: 'false'}
                        ],
                        submit: 'enviar',
                        submitHead: 'Muito obrigado <br/>por mandar o formulario.',
                        submitBody: 'Uma pessoa encarregada da area de turismo ira entrar em contato com voce em breve.'
                    }
                },
                footer: [
                    'DESCONTO DE 10% - <b><u>CADASTRE-SE</u></b> PARA RECEBER E-MAILS',
                    'like no other store in the world'
                ]                                          
            },
            CN: {
                nav: [
                    '百年历史',
                    '设计师品牌',
                    '亲临门店',
                    '线上购物'
                ],
                mobileSubHeader: 'INTERNATIONAL TOURISM',
                home: {
                    header: {
                        mobile: {
                            h1: '欢迎光临',
                            h2: '饱览时尚精品 <br/>' +
                                '从造访 Bloomingdale\'s 开始',
                            p:  '自 1872 年以来，Bloomingdale\'s 一直雄踞于时尚潮流的中 ' +
                                '心，汇集了人们梦寐以求的世界名牌时装、鞋包、化妆品、精品首饰和礼品。' +
                                '在光临本店时，您将会享受到专人接待，例如多语 ' +
                                '种工作人员和特殊的礼宾服务，让您感到宾至如归、备受欢迎、' +
                                '轻松自在。而这些只不过是 Bloomingdale\'s 赢得“世界上独一' +
                                '无二的百货店”这一美誉的众多原因之一。'
                        },
                        desktop: {
                            h1: '欢迎光临',
                            h2: '饱览时尚精品 <br/>' +
                                '从造访 Bloomingdale\'s 开始',
                            p:  '自 1872 年以来，Bloomingdale\'s 一直雄踞于时尚潮流的中  <br/>' +
                                '心，汇集了人们梦寐以求的世界名牌时装、鞋包、化妆品、精品首饰和礼品。 <br/>' +
                                '在光临本店时，您将会享受到专人接待，例如多语  <br/>' +
                                '种工作人员和特殊的礼宾服务，让您感到宾至如归、备受欢迎、 <br/>' +
                                '轻松自在。而这些只不过是 Bloomingdale\'s 赢得“世界上独一 <br/>' +
                                '无二的百货店”这一美誉的众多原因之一。'
                        }
                    },
                    cat: [
                        '百年历史',
                        '设计师品牌',
                        '亲临门店'
                    ],
                    shop: {
                        title: '线上购物',
                        subtitle: '现已接受支付宝付款！',
                        ctas: [
                            '女装',
                            '手袋',
                            '鞋靴',
                            '珠宝饰品',
                            '男装',
                            '家居',
                            '童装',
                            '新品',
                            '促销'
                        ]
                    }
                },
                heritage: {
                    header: {
                        h1: 'Bloomingdale\'s 发展历程',
                        h2: '简介'
                    },
                    article: {
                        y1880: [{
                            h3: '1872 年–东区设立百货店',
                            p: 'Bloomingdale 兄弟有一句妙语：“地段，地段，还是地段！”他们在第三大道 938 号开设了第一家店。  吸引眼球的橱窗陈设展示了巴黎最新的时装。 很快，橱窗购物就成为纽约流行的休闲活动。'
                        }, {
                            h3: 'BLOOMINGDALE\'S 眼中的未来',
                            p: '位于纽约“零售十字路口”，即第 59 街与第三大道交界的新店，一直以店里的“天空马车”（即电梯）引以为豪。 十三年后，Lyman Bloomingdale 出资建造了由一位年轻发明家构思的“倾斜电梯”，自动扶梯就此诞生。'
                        }],
                        y1900: [{
                            h3: '世人皆知的响亮口号',
                            p: '第三大道列车，即高架铁路列车，是 Bloomingdale\'s 的顾客在世纪之交抵达 Bloomingdale\'s 百货店的主要交通工具。大量人潮使得全纽约（和世界）广告牌上、甚至沙滩遮阳伞和连环画都写着这么一句口号"每辆火车都可抵达 Bloomingdale\'s"。 车站附近的人行道上镶嵌了黄金足印，以便引领人潮前往 Bloomingdale\'s。'
                        }, {
                            h3: '1910 年– T 型送货车',
                            p: 'Bloomingdale\'s 是纽约第一家使用亨利福特的 T 型车送货的百货店。'
                        }],
                        y1920: [{
                            h3: 'Bloomingdale\'s 的华丽转身',
                            p: 'Bloomingdale\'s 将总部迁往莱克星顿大街，比原先增加了 11 层楼，并采用黑色花岗岩、石灰岩、赤陶土等时兴材料迎合当时装饰派艺术的新风潮。 占据了从莱克星顿到第三大道、第 59 到 60 街的整个街区。 总部由 10 座相互连接的建筑构成 '
                        }],
                        y1940: [{
                            h3: 'Bloomingdale\'s 迎接 75 周年华诞，办起派对仍年轻有活力',
                            p: '为庆祝成立 75 周年，Bloomingdale\'s 邀请了 Claire McCardell、Pauline Trigere 和 Jo Copeland 等 26 位全美最炙手可热的杰出设计师,来设计陈列在商店橱窗中的全套女士时装。 Bloomingdale\'s 还推出了首间家具展示厅。'
                        }],
                        y1960: [{
                            h3: '时尚大爆炸',
                            p: '六零年代，人类登陆月球。 福特推出经典车“野马”。 摩登时尚开始流行。 新鲜事物层出不穷。 Bloomingdale\'s 是首家将圣洛朗、库雷热等欧洲时尚名家介绍给美国时尚爱好者的百货店。'
                        }, {
                            h3: '靓起来，宝贝！',
                            p: '在 1963 年秋，Bloomingdale\'s 成为第一家邀请当时最优秀的艺术家设计购物袋的百货店。 Jonah Kinigstein 和 Michael Vollbracht 等艺术家对 Bloomingdale\'s 购物袋进行颠覆性的设计，立刻使其成为值得收藏的艺术品。 购物袋的设计从此改观。'
                        }],
                        y1970: [{
                            h3: 'Bloomingdale\'s 进军好莱坞',
                            p: '七零年代 Bloomingdale\'s 与好莱坞、百老汇合作，知名度陡然上升。 《曼哈顿》(Manhattan)、《不结婚的男人》(Starting Over) 和《电光骑士》(The Electric Horseman) 到 80 年代的《现代美人鱼》(Splash) 和《莫斯科先生》(Moscow on the Hudson)，第 59 街的 Bloomingdale\'s 门店成为诸多电影的拍摄场地。'
                        }, {
                            h3: '三大品牌入驻 Bloomingdale\'s',
                            p: 'Ralph Lauren、Donna Karan 和 Calvin Klein 隆重入驻 Bloomingdale\'s，再次凸显我们年轻、创新的形象。'
                        }, {
                            h3: '经典购物袋',
                            p: '1973 年，Bloomingdale\'s 经典的“大号棕色提包”首次亮相。 一年后推出“小号棕色提包”，与后来的“中号棕色提包”组成了整个购物袋系列。Bloomingdale\'s 的购物袋绝对是百货店史上最有名的购物袋了。直到如今，我们还可以在世界各地的博物馆里观赏到这些经典的购物袋。 '
                        }],
                        y1980: [{
                            h3: 'Bloomingdale\'s 精彩逼人',
                            p: 'Andy Warhol 称 Bloomingdale\'s 为"80 年代的新型博物馆"。 Bloomingdale\'s 每天都是最新最潮事物的展览馆。 在盛会时装流行的 80 年代，Bloomingdale\'s 将触角伸向海外。 Karl Lagerfeld、Diane von Furstenberg、Liza Minnelli 和 Oscar de la Renta 等时装界著名人士都亲自前来参加 Bloomingdale\'s 门店盛大的开业仪式。'
                        }, {
                            h3: '1988–龙年',
                            p: '1971 年，即尼克松总统访华的前一年，Bloomingdale\'s 就已经开始与中国大陆重新建立贸易联系。 十五年后的 1988 年，Bloomingdale\'s 延续之前成功的中国推广活动，在第 59 街旗舰店隆重推出为期 7 周的东方时尚和设计展，庆祝与中华人民共和国建立贸易关系 10 周年。 商店的中式布置使其宛如紫禁城上升起的璀璨明珠。'
                        }],
                        y1990: [{
                            h3: '新淘金潮',
                            p: 'Bloomingdale\'s 四天内在加州连开了四家新店： 世纪城、斯坦福、谢尔曼奥克斯和纽波特比奇店。 一年后又开设了比佛利中心店。 Bloomingdale\'s 成为美国唯一一家全国性的拥有全线商品的高档百货店。 加州人如今可以在去享受海滩生活前先来 Bloomingdale\'s 逛逛街。'
                        }],
                        y2000: [{
                            h3: 'Bloomingdale\'s 成功打造纽约市中心时尚新形象',
                            p: '进入市中心常能让人有耳目一新的感觉， Bloomingdale\'s 因此入驻纽约 SoHo 区。 21 世纪的前卫时尚取代了百老汇大道上古老的铸铁建筑。 '
                        }, {
                            h3: '迈向数字化',
                            p: '官方网站 bloomingdales.com 应运而生。 从名牌服装和奢华美容产品到手袋和鞋类，该网站为全球各地的顾客提供触手可及的顶级时尚。'
                        }, {
                            h3: '美的重构！',
                            p: 'Bloomingdale\'s 对纽约第 59 街旗舰店大厅进行了“全纽约最大规模的改造”，在店内开设众多顶级美容品牌的高端美容护理站。'
                        }],
                        y2010: [{
                            h3: '2011 年–珠宝精品的新天地',
                            p: 'Bloomingdale\'s 在纽约第 59 街的珠宝精品店旨在展现世界顶尖设计师的方方面面，其中包括 David Yurman。自开业以来，该店已接待来自 230 多个国家及全美 50 州的顾客 40 多万人次，并连续五年获得 NYC Concierge Choice Award（纽约最佳礼宾奖）。'
                        }, {
                            h3: '独一无二，永无止境',
                            p: '如今，Bloomingdale\'s 的发展势头不可阻挡。 自创立以来，这个品牌所具有的创新精神一直是其奢华理念的核心所在。 回顾辉煌的历史，Bloomingdale\'s 能够展望未来。 这将是独一无二的美好未来。'
                        }]
                    }
                },
                designer: {
                    header: {
                        h1: '大牌云集、聚集于此',
                        h2: '我们精心挑选最优质的时装、美容等设计师品牌'
                    },
                    article: [
                        'Bloomingdale\'s 为您带来 CHANEL、Dior、Michael Kors、MCM、Tory Burch、MARC JACOBS、Armani 和 Ralph Lauren 等一系列无与伦比的设计师品牌。',
                        '想要寻找最新和最炙手可热的美容产品？ 选购 La Mer、Estée Lauder、Gucci、Chloé、Clinique、Lancôme 和 kate spade new york 等众多您最喜爱的护肤品、化妆品和香水品牌。'
                    ]
                }, 
                stores: {
                    header: {
                        h1: '选择您的目的地',
                        h2: '我们将会在顾客服务中心接待您'
                    },
                    dropdown: {
                        default: '请选择一家门店',
                        list: [
                            {id: 'null', name: '纽约',                                  disabled: 'true'},
                            {id: '0',    name: '第 59 街旗舰店，纽约市',                   disabled: 'false'},
                            {id: '1',    name: 'SoHo 店，纽约市',                         disabled: 'false'},
                            {id: 'null', name: '夏威夷',                                 disabled: 'true'},
                            {id: '2',    name: '阿拉莫阿那购物中心店，檀香山',               disabled: 'false'},
                            {id: 'null', name: '伊利诺伊州',                              disabled: 'true'},
                            {id: '3',    name: '北密歇根大道店，芝加哥',                    disabled: 'false'},
                            {id: '4',    name: '麦地那之家，芝加哥',                        disabled: 'false'},
                            {id: 'null', name: '加利福尼亚州',                            disabled: 'true'},
                            {id: '5',    name: '旧金山中心店，旧金山',                      disabled: 'false'},
                            {id: '6',    name: '南海岸广场店，科斯塔梅萨',                  disabled: 'false'},
                            {id: '7',    name: 'S南加州店',                              disabled: 'false'},
                            {id: 'null', name: '佛罗里达州',                              disabled: 'true'},
                            {id: '8',    name: '阿文图拉购物中心店',                       disabled: 'false'},
                            {id: '9',    name: '奥兰多店',                               disabled: 'false'}
                        ],
                        copy: 'Bloomingdale\'s 的门店遍布全美，我们在纽约、夏威夷、芝加哥、迈阿密和旧金山设有顾客服务中心，为外国游客提供各类便利设施。我们的多语种工作人员可以帮助您策划最完美的购物体验。他们将为您提供中文门店指南和特别活动的信息，并为您安排免费的个人形象设计师会面、免费将您购买的商品送到酒店，并替您预订餐厅（包括本店内的餐厅）等等。想去海边？我们在南加州（包括橘郡南海岸广场、圣地亚哥和洛杉矶）及檀香山设有多家门店，让您始终紧跟最新时尚潮流。'
                    },
                    storeData: {
                        storeHours: '营业时间',
                        directions: '路线',
                        designers: '推荐设计师',
                        dining: '店内美食餐厅',
                        services: '客户服务',
                        servicesSubHead: '我们的工作人员将向您展示 Bloomingdale\'s 是“世界上独一无二的百货店”的原因。 <br/>请寻找我们佩戴您本国旗帜徽章的工作人员。我们会帮助您找到您喜爱的商品，<br/>并提供一系列个性化服务。',
                        loyalty: '加入国际会员俱乐部',
                        loyaltySubHead: '我们为国际顾客量身定制了特别的回馈计划。*您每消费一美元，将获得一点积分，积分可在日后兑换礼品卡，还可享受其他服务，更有独一无二的旅途等您体验。 目前，您仅可在 Bloomingdale\'s 阿拉莫阿那购物中心店进行积分兑换，但您可在美国境内任何一家全线运营的 Bloomingdale\'s 商店消费以获取积分。**',
                        id: [
                            {
                                name: '第 59 街旗舰店',
                                addr: '1000 Third Avenue  New York, NY 10022 <br/>+1 212-705-2000',
                                hours: '周一 – 周六： 上午 10:00 开始营业 <span>|</span> 周日： 上午 11:00 开始营业',
                                descr: '感受 Bloomingdale\'s 的悠久历史和备受赞誉的热情服务。在我们旗舰店开始您的一天，首先前往一楼楼厅处的顾客服务中心。我们的多语种指南将为您的购物之旅提供路线图。需要更加个性化的体验？了解我们的店内服务，包括预约形象设计师、改衣和预订餐厅等。我们会帮您安排一切。',
                                dTile: '来纽约观光？',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_CN.pdf',
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   7 层 <span>|</span>   212-705-3085',
                                        sched: '营业时间 <span>|</span>   店内用餐： 上午 10:30–关店前 1 小时  <br/>外卖：上午 10:00–关店前半小时',
                                        description: '只有品尝了我们著名的冷冻酸奶，才算不虚此行。在这里，您还能找到各式新鲜制作的沙拉、三明治、汤类、鲜榨果汁吧，以及精选上等 Tavalon 茶。提供柜台服务、餐桌服务和外卖服务。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    },
                                    {
                                        name: '<b>FL!P</b> <span>|</span> 中层 <span>|</span>   212-705-3085',
                                        sched: '营业时间 <span>|</span> 店内用餐： 上午 11:00–关店前 1 小时',
                                        description: '在男士用品店的这个闲适角落，您可以享用到“臻品”美国汉堡、各式沙拉、微酿啤酒、花样酒饮以及各种法式炸薯条。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_02.jpg'
                                    },
                                    {
                                        name: '<b>DAVID BURKE AT BLOOMINGDALE\'S </b> <span>|</span> 当街楼层 <br />   212-705-3800',
                                        sched: '营业时间 <span>|</span> 外带：上午 10:00–晚上 9:00 <span>|</span> 店内用餐：上午 11:00–晚上 9:00 ',
                                        description: '名厨 David Burke 是美国烹饪界最重要的先驱者之一，他将美味佳肴、一流服务和欢乐氛围融合在一起。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_04.jpg'
                                    },
                                    {
                                        name: '<b>MAGNOLIA BAKERY</b> <span>|</span> 当街楼层 <span>|</span>   212-265-5320',
                                        sched: '周一至周五上午 7:00–晚上 10:00<br/> 周六上午 8:00 <span>|</span>   Sunday 8AM–9PM',
                                        description: 'Magnolia 是一个拥有传统甜点和古老装饰风格的经典美式面包房，这里可供应一系列手工烘培食品，包括馅饼、蛋糕、乳酪蛋糕、香蕉布丁、纸杯蛋糕和松饼。来早了？Magnolia 的营业时间甚至比门店还早。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_03.jpg'
                                    },
                                    {
                                        name: '<b>LE TRAIN BLEU </b> <span>|</span> 6 层 <span>|</span>   212-705-2100',
                                        sched: '周一至周三，周五至周六上午 10:30–下午 5:00 <span>|</span> 周四上午 10:30–晚上 7:00 <span>|</span> 周日上午 11:30–下午 4:30 ',
                                        description: '<i>建议提前预订</i><br/>Le Train Bleu 重现了上世纪初浪漫的铁路餐车，为您提供最精美的美洲大陆饮食，包括每日早午餐、午餐和定价晚餐。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_05.jpg'
                                    },
                                    {
                                        name: '<b>B CAFÉ </b> <span>|</span>   6 层 <span>|</span>   212-705-2073',
                                        sched: '营业时间 <span>|</span> 上午 10:00–门店打烊',
                                        description: '在这咖啡小吃店稍作休息，品尝便捷健康的美食，或享用一份以多种外带版 Le Train Bleu 美食为特色的简单午餐或晚餐。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    } 
                                ],
                                services: [
                                    {
                                        title: '我们会为您准备好礼品清单上的物品',
                                        description: '我们会为您准备好礼品清单上的物品<br/>在Bloomingdale\'s，购买礼品是一件非常轻松的事。<br/>只要将您的愿望清单发送给我们的多语种专<br/>家，我们即可在您到达之前将一切准备就绪。<br/> 拨打 212-705-2359 或 212-705-3488 <br/>发送电子邮件至 <br/><a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: '个人形象设计师随传随到',
                                        description: '我们的个人形象设计师可免费伴您选购商品，或根据您的品味为您的全副行头和家居饰品提供选购建议。<br/> 女士导购专家212-705-3135  <br/> 男士导购专家212-705-3030 '
                                    },
                                    {
                                        title: '便捷的付款方式 ',
                                        description: '我们接受美国运通®环球旅行卡和各种中国银联卡。<div class="unionpay">'
                                    },
                                    {
                                        title: '快速改衣',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。 您可在试穿衣服时再付费。'
                                    },
                                    {
                                        title: '送货至您入住的酒店',
                                        description: '若您购物满 300 美元或以上，我们很乐意将您所购商品免费送至您入住的曼哈顿酒店。 您只需将所购商品交给一楼楼厅处的顾客服务中心即可。'
                                    },
                                    {
                                        title: '精美礼品包装服务',
                                        description: '我们将为您精心包装所购商品，您也可以在六楼的礼品包装处挑选礼品卡、包装盒、包装纸和丝带，将它们带回家自行包装。'
                                    }
                                ]
                            },
                            {
                                name: 'SoHo 店',
                                addr: '504 Broadway  New York, NY 10012<br/>+1 212-729-5900',
                                hours: '周一 – 周六： 上午 10:00 开始营业 <span>|</span> 周日： 上午 12:00 开始营业',
                                descr: '参观我们位于 SoHo 的市中心门店，这里也是本市的时尚社区。在这里您不仅感受到我们上城区旗舰店的时尚活力，同时又具備了时尚精品店的氛围。到访我们热闹繁忙的美容商品楼层，然后细细品味我们的名牌新品。我们的多语种工作人员将一如既往地帮助您体验一次难忘的购物消闲之旅。',
                                dTile: '来纽约观光？',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_CN.pdf',
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   2 层  <span>|</span>   212-729-5900',
                                        sched: '周一至周五上午 10:00–晚上 8:00<span>|</span> 周六上午 10:00–晚上 7:00 <span>|</span> 周日中午 12:00–晚上 7:00',
                                        description: '只有品尝了我们著名的冷冻酸奶，才算不虚此行。在这里，您还能找到各式新鲜制作的沙拉、三明治、汤类、鲜榨果汁吧，以及精选上等 Tavalon 茶。提供柜台服务、餐桌服务和外卖服务。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: '我们会为您准备好礼品清单上的物品',
                                        description: '我们会为您准备好礼品清单上的物品<br/>在Bloomingdale\'s，购买礼品是一件非常轻松的事。只要将您的愿望清单发送给我们的多语种专家，我们即可在您到达之前将一切准备就绪。<br/> 拨打 212-705-2098 或发送电子邮件至 <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: '便捷的付款方式 ',
                                        description: '我们接受美国运通®环球旅行卡和各种中国银联卡。<div class="unionpay">'
                                    },
                                    {
                                        title: '快速改衣',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。 您可在试穿衣服时再付费。'
                                    },
                                    {
                                        title: '送货至您入住的酒店',
                                        description: '若您购物满 250 美元或以上，我们很乐意将您所购商品免费送至您入住的曼哈顿酒店。 您只需将所购商品交给一楼楼厅处的顾客服务中心即可。'
                                    }
                                ]                               
                            },
                            {
                                name: '阿拉莫阿那购物中心店',
                                addr: '1450 Ala Moana Blvd  Honolulu, HI 96814<br/>+1 808-644-7511',
                                hours: '周一 – 周六： 上午 10:00－晚上 8:00 <span>|</span> 周日： 上午 11:00－晚上 7:00',                                
                                descr: '跟我们在热带檀香山设立的最新商店打个招呼。这座三层楼高的商店位于夏威夷黄金购物地带阿拉莫阿那购物中心店，内部配备有各种便利设施，专为海外购物者量身打造。我们提供个人形象设计师会面、现场改衣、餐厅订位等等。',
                                dTile: '正在前往夏威夷的途中？',
                                dInfo: '在您到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Hawaii_CN.pdf',
                                designers: [
                                    'Burberry',
                                    'Chloé',
                                    'Clinique',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Longchamp ',
                                    'Jimmy Choo',
                                    'Jo Malone London',
                                    'Lancôme',
                                    'La Mer',
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rebecca Minkoff',
                                    'Tory Burch',
                                    'Villeroy & Boch'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   3 层',
                                        sched: '营业时间 上午 11:30 － 关店前 1 小时',
                                        description: '只有品尝了我们著名的冷冻酸奶，才算不虚此行。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }                                    
                                ],
                                services: [
                                    {
                                        title: '全天候顾客服务中心和服务台',
                                        description: '在顾客服务中心，我们将为您免费提供外套和物品寄存服务，另有多语种门店指南。如您有需要，我们的工作人员可为您安排个人形象设计师会面，并将您购得的商品免费打包送至您所在的酒店。您可前往我们的服务台进行现场改衣及取回您购买的商品，或了解更多有关夏威夷的便利设施和景点信息。'
                                    },
                                    {
                                        title: '在我们的贵宾室里休息',
                                        description: '这是 Bloomingdale\'s 连锁商店中的首个贵宾室，我们的封闭式休息室位于顾客服务中心内部。游客们可在便利设施里尊享的服务包括：低热量食物及饮品、电视、私人卫生间、充电站、可用于打印登机牌的蓝牙打印机、预装了 Bloomingdale\'s 应用的 iPad® 以及几乎涵盖所有语言版本的旅游指南。在店内消费满 500 美元的顾客凭收据可于当天进入休息室休息。'
                                    },
                                    {
                                        title: '快速改衣',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。您可在试穿衣服时再付费。'
                                    },
                                    {
                                        title: '货币兑换 ',
                                        description: '您可在离 Bloomingdale\'s 几步之遥的位置找到货币兑换点，就在阿拉莫阿那购物中心店内，非常方便。'
                                    },
                                    {
                                        title: '个人形象设计师及美容顾问随传随到',
                                        description: '我们的个人形象设计师可免费伴您选购商品，或根据您的品味为您的全副行头提供选购建议。对美容咨询感兴趣？我们拥有经验丰富的顾问，能够从最受欢迎的诸多品牌中为您挑选最合适的商品。',
                                    }
                                ],
                                loyalty: [
                                    {
                                        title: '赢取礼品卡',
                                        description: '500 积分＝价值 25 美元的礼品卡，可用于在 Bloomingdale\'s 阿拉莫阿那购物中心店消费。'
                                    },
                                    {
                                        title: '享受商店的服务',
                                        description: '您的积分还可为您赢取商品免费打包送货服务，以及为您的下一站旅途提供餐饮或汽车服务。 要了解更多信息，请在一楼顾客服务中心咨询工作人员。'
                                    },
                                    {
                                        title: '享受一次难忘的旅程',
                                        description: '您可兑换积分，享受纯正的夏威夷风情游！ 要了解更多信息，请在一楼顾客服务中心咨询工作人员。'
                                    },
                                    {
                                        title: '',
                                        description: '*需提供国际地址证明。<br/>**点数不可在 Bloomingdale\'s 的直销店或网站上获得。点数只可在Bloomingdale\'s Ala Moana 店内的消费及服务获得。'
                                    }                                      
                                ]                                    
                            },
                            {
                                name: '北密歇根大道店',
                                addr: '900 North Michigan Avenue  Chicago, IL 60611<br/>+1 312-440-4460 ',
                                hours: '周一 － 周六： 上午 10:00 － 晚上 8:00 <span>|</span> 周日： 上午 11:00 － 晚上 7:00',
                                descr: '计划游览风之城？让 Bloomingdale\'s 做您的时尚导游。选购我们的各种名牌商品来填满您的衣柜，或是囤积您最喜欢的美容产品。我们的多语种工作人员可以帮您专门策划安排购物之旅，以满足您的各种需求。来密歇根观光？在到达之前下载我们的欢迎手册。',
                                dTile: '来密歇根观光？',
                                dInfo: '在您到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_CN.pdf',
                                designers: [
                                    'Burberry',
                                    'Canada Goose',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Gucci',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Moncler',
                                    'Ralph Lauren',
                                    'Ray-Ban',
                                    'Salvatore Ferragamo',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'UGG® Australia '
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> 6 层 <span>|</span>  312-440-4861',
                                        sched: '周一 – 周六 上午 11:00 – 晚上 6:00',
                                        description: '只有品尝了我们著名的冷冻酸奶，才算不虚此行。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }                                        
                                ],
                                services: [
                                    {
                                        title: '我们会为您准备好礼品清单上的物品',
                                        description: '在Bloomingdale\'s，购买礼品是一件非常轻松的事。<br/>只要将您的愿望清单发送给我们的多语种专家，<br/>我们即可在您到达之前将一切准备就绪。<br/>拨打 312-440-4596 或发送电子邮件至 <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: '个人形象设计师随传随到',
                                        description: '我们的个人形象设计师可免费伴您选购商品，或根<br/>据您的品味为您的全副行头和家居饰品提供选购<br/>建议。随时为您服务：312-440-4887。'

                                    },
                                    {
                                        title: '便捷的付款方式',
                                        description: '我们接受美国运通®环球旅行卡和各种中国银联卡。<div class="unionpay">'

                                    },
                                    {
                                        title: '送货至您入住的酒店',
                                        description: '若您购物达 250 美元或以上，我们很乐意将您所购商品免费送至您入住的酒店。您只需将所购商品交至三楼的顾客服务中心即可。 '

                                    },
                                    {
                                        title: '快速改衣 ',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣<br/>服务。您可在试穿衣服时再付费。'

                                    },
                                    {
                                        title: '精美礼品包装服务',
                                        description: '我们将为您精心包装所购商品，您也可以挑选礼品卡、包装盒、包装纸和丝带，将它们带回家自行包装。请光临五楼的顾客服务台。'

                                    }
                                ]  
                            },
                            {
                                name: '麦地那之家',
                                addr: '600 North Wabash Avenue  Chicago, IL 60611<br/>+1 312-324-7500',
                                hours: '周一–周六：上午 10:00 开始营业 <span>|</span> 周日：中午 12:00 开始营业',
                                descr: '前往芝加哥的麦地那之家，将您的房子装饰一新。在这里，您可以选购高档床上用品、名牌厨具、豪华浴室配件等。亲自体验我们备受赞誉的热情服务和全方位的店内服务。',
                                dTile: '来密歇根观光？',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_CN.pdf',
                                designers: [
                                    'Nespresso',
                                    'Rimowa',
                                    'Tumi',
                                    'Victorinox'
                                ],
                                services: [
                                    {
                                        title: '我们会为您准备好礼品清单上的物品',
                                        description: '在 Bloomingdale\'s，购买礼品是一件非常轻松的事，只要将您的愿望清单发送给我们的多语种专家，我们即可在您到达之前将一切准备就绪。<br /> 拨打 312-440-4596 或发送电子邮件至 <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: '个人形象设计师随传随到',
                                        description: '我们的个人形象设计师可免费伴您选购商品，或根据您的品味为您的家居饰品提供选购建议。 <br/> 随时为您服务：312-324-7633 '

                                    },
                                    {
                                        title: '便捷的付款方式',
                                        description: '我们接受美国运通®环球旅行卡和各种中国银联卡。<div class="unionpay">'

                                    },
                                    {
                                        title: '精美礼品包装服务',
                                        description: '我们将为您精心包装所购商品，您也可以挑选礼品卡、包装盒、包装纸和丝带，将它们带回家自行包装。 请前往二楼的礼品包装处。'

                                    }
                                ] 
                            },
                            {
                                name: '旧金山中心店',
                                addr: '845 Market Street  San Francisco, CA<br/>+1 415-856-5402',
                                hours: '周一 － 周六： 上午 10:00 － 晚上 9:00 <span>|</span> 周日： 上午 11:00 － 晚上 8:00',                                
                                descr: '享受旧金山最佳的购物体验。第一站，Bloomingdale\'s。前往我们的顾客服务中心获取多语种指南，或咨询我们的多语种工作人员，他们将为您量身定制满足您需求的体验。在下方了解更多关于我们店内设施的信息。',
                                dTile: '来旧金山观光？',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SanFran_CN.pdf',
                                designers: [
                                    'Alice + Olivia',
                                    'BCBGMAXAZRIA',
                                    'Burberry', 
                                    'Calvin Klein',
                                    'CHANEL',
                                    'COACH',
                                    'Clinique', 
                                    'Dior', 
                                    'DIANE von FURSTENBERG',
                                    'Elie Tahari', 
                                    'Escada',
                                    'Estée Lauder',
                                    'Giorgio Armani',
                                    'Helmut Lang',
                                    'kate spade new york',
                                    'La Mer',
                                    'Lancôme',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Ralph Lauren',
                                    'Rebecca Taylor',
                                    'Salvatore Ferragamo',
                                    'TAG Heuer', 
                                    'Tory Burch', 
                                    'Trina Turk'
                                ],
                                services: [
                                    {
                                        title: '我们会为您准备好礼品清单上的物品',
                                        description: '在 Bloomingdale\'s，购买礼品是一件非常轻松的事。只要将您的愿望清单发送给我们的多语种专家，我们即可在您到达之前将一切准备就绪。<br/>拨打 415-856-5477 或发送电子邮件至 <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: '个人形象设计师随传随到',
                                        description: '我们的个人形象设计师可免费伴您选购商品，或根<br/>据您的品味为您的全副行头和家居饰品提供选购<br/>建议。随时为您服务：415-856-5538'

                                    },
                                    {
                                        title: '便捷的付款方式',
                                        description: '我们接受美国运通®环球旅行卡和各种中国银联卡。<div class="unionpay">'

                                    },
                                    {
                                        title: '送货至您入住的酒店',
                                        description: '若您购物达 250 美元，我们很乐意将您所购商品免费送至您入住的酒店。您只需将所购商品交给一楼楼厅处的顾客服务中心即可。'

                                    },
                                    {
                                        title: '精美礼品包装服务 ',
                                        description: '我们将为您精心包装所购商品，您也可以在顾客服务中心挑选礼品卡、包装盒、包装纸和丝带，将它们带回家自行包装。 '

                                    },
                                    {
                                        title: '快速改衣 ',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。<br/>您可在试穿衣服时再付费。'

                                    }
                                ]                               
                            },
                            {
                                name: '南海岸广场店',
                                addr: '3333 Bristol St  Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                hours: '周一 － 周六： 上午 10:00 － 晚上 9:00 <span>|</span> 周日： 上午 11:00 － 晚上 7:00',                                
                                descr: '南海岸广场店拥有顶尖设计师品牌，特为南加利福尼亚州量身打造，是不可错过的购物天堂。第一次来金州？多语种工作人员将帮助您解决诸多难题。您可依据中文门店指南或在您购物时到下方的店内设施处寻求帮助。',
                                dTile: 'VISITING COSTA MESA?',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthCoastPlaza_CN.pdf',
                                designers: [
                                    'Burberry',
                                    'Calvin Klein',
                                    'Canada Goose',
                                    'CHANEL',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani Beauty',
                                    'Gucci',
                                    'Hugo Boss',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'La Prairie',
                                    'Longchamp',
                                    'Longines Watches',
                                    'Louis Vuitton',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Miu Miu',
                                    'Moncler',
                                    'Montblanc',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rimowa',
                                    'Salvatore Ferragamo',
                                    'Stuart Weitzman',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'Tumi',
                                    'UGG® Australia',
                                    'Yves Saint Laurent Beauty'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>AnQi by Crustacean Gourmet Bistro & Noodle Bar</b> <br/>  1 层 <span>|</span> 714-557-5679',
                                        sched: '午餐： 营业时间 上午 11:30 － 下午 2:30  Noodle Bar： 营业时间 上午 11:30 － 下午 5:30  晚餐： 周日 － 周四 下午 5:30 － 晚上 10:30  周五 － 周六下午5:30 － 晚上 11:00  红酒优惠时间： 周一 － 周五下午 4:00 － 晚上 7:00',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_08.jpg'
                                    },
                                    {
                                        name: '<b>Holsteins</b> <span>|</span> 1 层 <span>|</span> 714-352-2525',
                                        sched: '周一 - 周四： 营业时间 上午 11：00 - 12:00 <br/> 周五 - 周六： 营业时间 上午 11：00 - 2:00  <br/> 周日： 营业时间 上午 11：00 - 12:00',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_09.jpg'
                                    }                                      
                                ],
                                services: [
                                    {
                                        title: '快速改衣',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。<br/>您可在试穿衣服时再付费。'
                                    },
                                    {
                                        title: '精美礼品包装服务',
                                        description: '我们将为您精心包装所购商品，您也可以挑选礼品卡、包装盒、包装纸和丝带，将它们带回家自行包装。<br/>上述服务全部位于底层。'
                                    },
                                    {
                                        title: '便捷的付款方式',
                                        description: '我们接受美国运通®环球旅行卡和各种中国银联卡。<div class="unionpay">'
                                    }
                                ]                                    
                            },
                            {
                                name: '南加州店',
                                addr: '',
                                hours: '',
                                descr: '继在洛杉矶、橘郡及圣地亚哥开设的店铺后，Bloomingdale\'s 又在南加州留下了自己的足迹。您可在我们任意一家店铺中购买您喜爱的时尚、饰品、鞋类以及美容品牌的商品。在下方了解更多关于我们店内设施的信息。',
                                dTile: '参观南加州?',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthernCalifornia_CN.pdf',
                                stores: [
                                    {
                                        area: '橘郡',
                                        list: [
                                            {
                                                name: '南海岸广场店',
                                                addr: '3333 South Bristol Street, Costa Mesa, CA 92626 <br/> +1 714-824-4600',
                                                hours: '营业时间：<br/>周一－周二上午 10:00－晚上 9:00 <br/>周三－周六上午 10:00－晚上 10:00<br/>周日上午 10:00－晚上 8:00'
                                            },
                                            {
                                                name: '纽波特时尚岛店',
                                                addr: '701 Newport Center Drive, Newport Beach, CA 92660<br/> +1 949-729-6600',
                                                hours: '营业时间： <br/>周一－周二上午 10:00－晚上 8:00<br/>周三－周六上午 10:00－晚上 10:00<br/>周日上午 11:00－晚上 8:00'
                                            }     
                                        ]                                   
                                    },
                                    {
                                        area: '洛杉矶',
                                        list: [
                                            {
                                                name: '世纪城店',
                                                addr: '10250 Santa Monica Boulevard, Los Angeles, CA 90067 <br/>+1 310-772-2100',
                                                hours: '营业时间：<br/>周一－周二上午 10:00－晚上 9:00 <br/>周三－周六上午 10:00－晚上 10:00 <br/>周日上午 11:00－晚上 8:00 <br/>'
                                            },
                                            {
                                                name: '比佛利中心店',
                                                addr: '8500 Beverly Boulevard, Los Angeles, CA 90048 <br/>+1 310-360-2700',
                                                hours: '营业时间：<br/>周一－周二上午 10:00－晚上 9:00 <br/>周三－周六上午 10:00－晚上 10:00 <br/>周日中午 12:00－晚上 8:00'
                                            },
                                            {
                                                name: '圣莫尼卡广场店',
                                                addr: '315 Colorado Avenue, Santa Monica, CA 90401 <br/>+1 310-985-6400',
                                                hours: '营业时间：<br/>周一－周二上午 10:00－晚上 9:00 <br/>周三－周六上午 10:00－晚上 10:00 <br/>周日上午 11:00－晚上 8:00'
                                            },
                                            {
                                                name: '格伦代尔广场店',
                                                addr: '103 South Brand Blvd., Glendale, CA 91210 <br/>+1 818-638-4100',
                                                hours: '营业时间：<br/>周一－周二上午 10:00－晚上 9:00<br/>周三－周六上午 10:00－晚上 10:00<br/>周日上午 11:00－晚上 9:00'
                                            },
                                            {
                                                name: '谢尔曼奥克斯时尚广场店',
                                                addr: '14060 Riverside Drive, Sherman Oaks, CA 91423 <br/>+1 818-325-2200',
                                                hours: '营业时间：<br/>周一－周二上午 10:00－晚上 9:00<br/>周三－周六上午 10:00－晚上 10:00<br/>周日上午 11:00－晚上 9:00'
                                            }     
                                        ]                                   
                                    }, 
                                    {
                                        area: '圣地亚哥',
                                        list: [
                                            {
                                                name: '时尚谷店',
                                                addr: '7057 Friars Road, San Diego, CA 92108<br/> +1 619-610-6400',
                                                hours: '营业时间：<br/>周一－周二上午 10:00－晚上 8:00<br/>周三上午 10:00－晚上 8:00<br/>周四－周六上午 10:00－晚上 10:00<br/>周日中午 12:00－晚上 8:00'
                                            }   
                                        ]                                   
                                    }                                                                       
                                ],
                                services: [
                                    {
                                        title: '快速改衣',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。您可在试穿衣服时再付费。本服务仅在指定店铺提供。'
                                    },
                                    {
                                        title: '精美礼品包装服务',
                                        description: '我们将为您精心包装所购商品，您也可以挑选礼品卡、包装盒、包装纸和丝带，将它们带回家自行包装。本服务仅在指定店铺提供。'
                                    },
                                    {
                                        title: '个人形象设计师随传随到',
                                        description: '我们的个人形象设计师可免费伴您选购商品，或根据您的品味为您的家居饰品提供选购建议。本服务仅在指定店铺提供。'
                                    }                                    
                                ]  
                            },
                            {
                                name: '阿文图拉购物中心店',
                                addr: '19555 Biscayne Boulevard  Aventura, FL 33180 <br/>+1 305-792-1246',
                                hours: '营业时间 周一 － 周六： 上午 10:00 － 晚上 10:00  <span>|</span>  周日： 中午 12:00 － 晚上 9:00  正',
                                descr: '正在规划您的假日旅程？从佛罗里达州阿文图拉购物中心店启程吧。在此我们提供种类繁多的设计时尚、美容品牌、奢侈饰品及其他商品供您选择。根据中文门店指南进行购物，同时我们邀您尽可能多地进入下方列示的店内设施进行体验。',
                                dTile: '来阿文图拉购物中心店观光？',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Aventura_EN.pdf',
                                designers: [
                                    'Baccarat',
                                    'Bernardaud',
                                    'BVLGARI',
                                    'Burberry',
                                    'Calvin Klein ',
                                    'Canali ',
                                    'CHANEL ',
                                    'Christofle ',
                                    'David Yurman ',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel ',
                                    'Dior ',
                                    'Fendi ',
                                    'Furla ',
                                    'Giorgio Armani',
                                    'Gucci ',
                                    'HUGO BOSS ',
                                    'Jimmy Choo ',
                                    'John Varvatos', 
                                    'La Mer ',
                                    'Lalique',
                                    'Longchamp', 
                                    'Louis Vuitton ',
                                    'M·A·C ',
                                    'MARC BY MARC JACOBS ',
                                    'Michael Kors ',
                                    'Miki House ',
                                    'Montblanc ',
                                    'Movado ',
                                    'PANDORA',
                                    'Prada ',
                                    'Pratesi ',
                                    'Ralph Lauren ',
                                    'Roberto Coin ',
                                    'Salvatore Ferragamo ',
                                    'Sferra ',
                                    'Shiseido ',
                                    'TAG Heuer ',
                                    'Tory Burch ',
                                    'Villeroy & Boch ',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>59TH & LEX CAFE</b> <span>|</span>  二楼 <span>|</span> 305-792-1180',
                                        sched: '周一 － 周六 上午  10:00 － 晚上  7:30 <span>|</span> 周日中午 12:00－下午  5:00',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: '我们会为您准备好礼品清单上的物品',
                                        description: '在 Bloomingdale\'s，购买礼品是一件非常轻松的事。只要将您的愿望清单发送给我们的多语种专家，我们即可在您到达之前将一切准备就绪。<br/>拨打 305-792-1175 或发送电子邮件至  <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: '便捷的付款方式',
                                        description: '我们接受美国运通®环球旅行卡。'

                                    },
                                    {
                                        title: '快速改衣',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。<br/>您可在试穿衣服时再付费。'

                                    }
                                ]     
                            },
                            {
                                name: '奥兰多店',
                                addr: '4152 Conroy Road  Orlando, FL 32839<br/>+1 407-264-2514',
                                hours: '营业时间 周一 － 周六： 上午 10:00 － 晚上 9:00  <span>|</span>  周日： 中午 11:00 － 晚上 7:00  正',                                
                                descr: 'Bloomingdale\'s 奥兰多店有着最棒的设计师和美容品牌，您可在此享受世界级的购物体验。在您下一站前往佛罗里达州的旅途中顺道进来商店看看，我们为您量身打造了尊享购物体验。根据您的语言选择一份门店指南，并享受下方列示的诸多店内设施为您带来的便利。',
                                dTile: 'V来奥兰多观光？',
                                dInfo: '在到达之前下载我们的欢迎手册。',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Orlando_EN.pdf',
                                designers: [
                                    'Burberry',
                                    'Canali ',
                                    'COACH',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel Jeans',
                                    'Dior ',
                                    'Fendi ',
                                    'Frankie B Jeans ',
                                    'John Varvatos ',
                                    'Joie ',
                                    'La Mer ',
                                    'Longchamp', 
                                    'Montblanc ',
                                    'Movado ',
                                    'Ralph Lauren ',
                                    'Salvatore Ferragamo ',
                                    'Sandro ',
                                    'Shiseido ',
                                    'Ted Baker ',
                                    'Tory Burch ',
                                    'Vince'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> 一楼 <span>|</span> +1 407-264-2683',
                                        sched: '周一 － 周六 上午 10:00 － 晚上 9:00 <span>|</span> 周日上午 11:00 － 晚上 7:00',
                                        description: '只有品尝了我们著名的冷冻酸奶，才算不虚此行。在这里，您还能找到各式新鲜制作的沙拉、三明治、汤类、鲜榨果汁吧，以及精选上等 Tavalon 茶。提供柜台服务、餐桌服务和外卖服务。',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: '我们会为您准备好礼品清单上的物品',
                                        description: '在 Bloomingdale\'s，购买礼品是一件非常轻松的事。只要将您的愿望清单发送给我们的多语种专家，我们即可在您到达之前将一切准备就绪。<br/>拨打 305-792-1175 或发送电子邮件至 <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: '便捷的付款方式',
                                        description: '我们接受美国运通®环球旅行卡。'

                                    },
                                    {
                                        title: '快速改衣',
                                        description: '我们可根据您的要求当场提供专业的剪裁和改衣服务。<br/>您可在试穿衣服时再付费。'

                                    }
                                ]       
                            }                                
                        ]
                    }
                },                                 
                socialshare: {
                    fb: {
                        name: '国际旅行 丨 bloomingdales.com',
                        description: '从全球知名设计师服装到倍受欢迎的美妆品牌，了解更多品牌信息，欢迎访问Bloomingdale\'s国际官方网站。'
                    },
                    pinterest: {
                        description: '国际旅行 丨 bloomingdales.com'
                    },
                    twitter: {
                        text: '享受在@bloomingdales的消费体验？别忘了查看Bloomingdale\'s国际官方网站上最新设计师服装、饰品以及美妆产品的更新。 http://bit.ly/1M3fLiB'
                    },
                    weibo: {
                        url: 'http://weibo.com/bloomingdalesusa',
                        title: '探索更多Bloomingdale\'s奢华时尚、品牌历史以及世界级的服务品质，欢迎访问Bloomingdale\'s国际官方网站。'
                    },
                    weixin: {
                        text: '扫描二维码关注Bloomingdale\'s官方微信，第一时间获取品牌资讯。'
                    }
                },
                contactUs: {
                    formTitle: '联系我们',
                    left: {
                        title: '请告知我们您的行程',
                        p1: '请告诉我们，您想造访哪家 Bloomingdale\'s 门店以及您的计划出行日期。',
                        p2: '只需提交这份表格，我们的多语种工作人员将会与您联系。'
                    },
                    right: {
                        name: '姓名：',
                        nameErr: '请告诉我们你的名字',
                        email: '电子邮件:',
                        emailErr1: '请告诉我们您的电子邮件',
                        emailErr2: '无效的邮件地址',
                        phone: '手机号码（可选）：',
                        phoneErr: '无效的电话号码',
                        party: '出行人数：',
                        partyErr: '请告诉我们您的组大小',
                        dates: '计划在美国游玩的日期',
                        arriving: '抵达日期:',
                        departing: '回程日期:',
                        datesErr: '选择日期',
                        storesH: '我想要造访的门店：',
                        storesM: '请选择一家门店',
                        storesErr: '请选择一家门店',
                        stores: [
                            {id: 'New York', name: '纽约', disabled: 'true'},
                            {id: '59th Street Flagship, New York City', name: '第 59 街旗舰店，纽约市', disabled: 'false'},
                            {id: 'SoHo, New York City', name: 'SoHo 店，纽约市', disabled: 'false'},
                            {id: 'Hawaii', name: '夏威夷', disabled: 'true'},
                            {id: 'Ala Moana, Honolulu', name: '阿拉莫阿那购物中心店，檀香山', disabled: 'false'},
                            {id: 'Illinois', name: '伊利诺伊州', disabled: 'true'},
                            {id: 'North Michigan Avenue, Chicago', name: '北密歇根大道店，芝加哥', disabled: 'false'},
                            {id: 'Medinah Home, Chicago', name: '麦地那之家，芝加哥', disabled: 'false'},
                            {id: 'California', name: '加利福尼亚州', disabled: 'true'},
                            {id: 'Beverly Center, Los Angeles', name: '比佛利中心店，洛杉矶', disabled: 'false'},
                            {id: 'Century City, Los Angeles', name: '世纪城店，洛杉矶', disabled: 'false'},
                            {id: 'Fashion Valley, San Diego', name: '时尚谷店，圣地亚哥', disabled: 'false'},
                            {id: 'Glendale Galleria, Glendale', name: '格伦代尔广场店，格伦代尔', disabled: 'false'},
                            {id: 'Newport Fashion Island, Newport Beach', name: '纽波特时尚岛店，纽波特比奇', disabled: 'false'},
                            {id: 'San Francisco Centre, San Francisco', name: '旧金山中心店，旧金山', disabled: 'false'},
                            {id: 'Santa Monica Place, Santa Monica', name: '圣莫尼卡广场店，圣莫尼卡', disabled: 'false'},
                            {id: 'Sherman Oaks Fashion Square, Sherman Oaks', name: '谢尔曼奥克斯时尚广场店，谢尔曼奥克斯', disabled: 'false'},
                            {id: 'South Coast Plaza, Costa Mesa', name: '南海岸广场店，科斯塔梅萨', disabled: 'false'},
                            {id: 'Florida', name: '佛罗里达州', disabled: 'true'},
                            {id: 'Aventura', name: '阿文图拉购物中心店', disabled: 'false'},
                            {id: 'Orlando', name: '奥兰多店', disabled: 'false'}
                        ],
                        submit: '提交',
                        submitHead: '谢谢你提交的表单。',
                        submitBody: '我们旅游部专门人员会儘快与你联系。'
                    }
                },                   
                footer: [
                    '<b><u>订阅</u></b>电子邮件，立省 10%',
                    'like no other store in the world'
                ]                                                             
            },
            ESP: {
                nav: [
                    'NUESTRO LEGADO',
                    'CENTRO DEL DISEÑADOR',
                    'VISITE NUESTRAS TIENDAS',
                    'TIENDA EN LÍNEA'
                ],
                mobileSubHeader: 'INTERNATIONAL TOURISM',
                home: {
                    header: {
                        mobile: {
                            h1: 'Bienvenido',
                            h2: 'Conozca todos los lugares con estilo <br/>' +
                                'comenzando por una visita a Bloomingdale\'s',
                            p: 'Desde 1872, Bloomingdale\'s se encuentra en el centro del estilo al ofrecer la vestimenta, los zapatos, los bolsos de mano, el maquillaje, la joyería fina y los regalos de los diseñadores más codiciados del mundo. Cuando nuestros clientes visitan nuestras tiendas, disfrutan de toques personales exclusivos&mdash;como asociados políglotos y servicios especiales de conserjería&mdash;que los hacen sentirse bienvenidos y cuidados como en casa. Estas son solo algunas de las cosas que hacen que Bloomingdale\'s no tenga comparación en todo el mundo.'
                        },
                        desktop: {
                            h1: 'Bienvenido',
                            h2: 'Conozca todos los lugares con estilo <br/>' +
                                'comenzando por una visita a Bloomingdale\'s',
                            p: 'Desde 1872, Bloomingdale\'s se encuentra en el centro del estilo al ofrecer la vestimenta, los zapatos, los bolsos de mano, el maquillaje, la joyería fina y los regalos de los diseñadores más codiciados del mundo. Cuando nuestros clientes visitan nuestras tiendas, disfrutan de toques personales exclusivos&mdash;como asociados políglotos y servicios especiales de conserjería&mdash;que los hacen sentirse bienvenidos y cuidados como en casa. Estas son solo algunas de las cosas que hacen que Bloomingdale\'s no tenga comparación en todo el mundo.'
                        }
                    },
                    cat: [
                        'Nuestro Legado',
                        'Centro del Diseñador',
                        'Visite Nuestras Tiendas'
                    ],
                    shop: {
                        title: 'TIENDA EN LÍNEA',
                        subtitle: 'Aceptamos pagos por',
                        ctas: [
                            'Ropa Para Damas',
                            'Bolsos de Mano',
                            'Calzado',
                            'Joyería y Accesorios',
                            'Ropa Para Caballeros',
                            'Hogar',
                            'Ropa Para Niños',
                            'Lo Nuevo',
                            'Liquidación'
                        ],
                        desktopLinks: {
                            women: 'http://www1.bloomingdales.com/shop/womens-apparel?id=2910',
                            handbags: 'http://www1.bloomingdales.com/shop/handbags?id=16958',
                            shoes: 'http://www1.bloomingdales.com/shop/shoes?id=16961',
                            jewelry: 'http://www1.bloomingdales.com/shop/jewelry-accessories?id=3376',
                            men: 'http://www1.bloomingdales.com/shop/mens?id=3864',
                            home: 'http://www1.bloomingdales.com/shop/home?id=3865',
                            kids: 'http://www1.bloomingdales.com/shop/kids?id=3866',
                            sale: 'http://www1.bloomingdales.com/shop/sale?id=3977'
                        },
                        mobileLinks: {
                            women: 'http://www1.bloomingdales.com/shop/womens-apparel/all-women?id=1003340',
                            handbags: 'http://www1.bloomingdales.com/shop/all-handbags-wallets-cases?id=1001396',
                            shoes: 'http://www1.bloomingdales.com/shop/shoes/all-shoes?id=17411',
                            jewelry: 'http://www1.bloomingdales.com/shop/all-jewelry-accessories?id=1003593',
                            men: 'http://www1.bloomingdales.com/shop/mens/all-men?id=1003601',
                            home: 'http://www1.bloomingdales.com/shop/home?id=1003615',
                            kids: 'http://www1.bloomingdales.com/shop/all-kids?id=1003623',
                            sale: 'http://www1.bloomingdales.com/shop/sale/all-sale-clearance?id=1003304'
                        }
                    },
                    pdf: {
                        span: 'Conozca cómo comprar en nuestra tienda y obtenga respuestas a las preguntas frecuentes.',
                        a: 'DESCARGAR AHORA',
                        link: '/fashion/assets/projects/international/china-brazil/guides/Tourism_Microsite_International_Shopping_Guide_Spanish.pdf'
                    }
                },
                heritage: {
                    header: {
                        h1: 'La historia de Bloomingdale\'s',
                        h2: 'Una historia abreviada'
                    },
                    article: {
                        y1880: [{
                            h3: '1872 - Un gran bazar en el East Side',
                            p: 'Los hermanos Bloomingdale idearon la frase "Ubicación, ubicación, ubicación" y abrieron su primera tienda en el número 938 de la Tercera Avenida. Llamativos escaparates exhiben las últimas tendencias de París. En poco tiempo, mirar escaparates se convierte en un pasatiempo popular en Nueva York.'
                        }, {
                            h3: 'Bloomingdales\'s predice el futuro',
                            p: 'Ubicada en la "intersección de las ventas al por menor" de Nueva York, la nueva tienda localizada en la Calle 59 y Tercera Avenida cuenta con un carruaje hacia el cielo (es decir, un ascensor). Trece años más tarde, Lyman Bloomingdale financia la idea de un joven inventor de un "ascensor inclinado" y nace la escalera eléctrica.'
                        }],
                        y1900: [{
                            h3: 'Un eslogan conocido en todo el mundo',
                            p: 'La línea de la Tercera Avenida de IRT, o tren elevado, es el método de transporte de elección para los clientes de Bloomingdales\'s a fines de siglo, tanto así que hay anuncios espectaculares, sombrillas de playa y tiras cómicas por toda la ciudad (y el mundo) con el popular eslogan "Todos los vagones trasbordan en Bloomingdales\'s". Se incrustaron huellas de oro en la acera para que la gente las siguiera al bajar del tren para llegar a Bloomingdales\'s.'
                        }, {
                            h3: '1910–Todo marcha sobre ruedas',
                            p: 'Bloomingdales\'s se convierte en la primera tienda de la ciudad de Nueva York en usar el Modelo T de Henry Ford para hacer entregas.'
                        }],
                        y1920: [{
                            h3: 'Bloomingdales\'s es objeto de una glamorosa remodelación',
                            p: 'Bloomingdales\'s se establece en la Avenida Lexington y añade once pisos nuevos, capturando la nueva popularidad del glamour del Art Deco con los materiales del momento, como granito negro, piedra caliza y terracota. Ocupa toda la manzana desde Lexington hasta la Tercera Avenida y de la Calle 59 a la Calle 60. De hecho, se compone de 10 edificios que están interconectados.'
                        }],
                        y1940: [{
                            h3: 'Bloomingdales\'s cumple 75 años y festeja como un adolescente',
                            p: 'Con motivo de su aniversario de diamante, Bloomingdales\'s invita a los 26 diseñadores más populares de Estados Unidos, incluyendo a las celebridades Claire McCardell, Pauline Trigere y Jo Copeland, para crear un atuendo de alta costura para los escaparates de la tienda. Además, la tienda lanza el primer piso de ventas de muebles y accesorios para el hogar.'
                        }],
                        y1960: [{
                            h3: 'La moda explota',
                            p: 'El hombre en la luna. El Mustang. Tiendas mod. Y más. Bloomingdales\'s es la primera tienda en proporcionar un público americano admirador a visionarios europeos como Yves Saint Laurent y Courrèges.'
                        }, {
                            h3: 'A ponerse en onda',
                            p: 'A partir del otoño de 1963, Bloomingdales\'s es la primera tienda en contratar a los artistas más en onda de la época para ilustrar la bolsa de compras. Artistas como Jonah Kinigstein y Michael Vollbracht revolucionan las bolsas de Bloomingdales\'s, convirtiéndolas en obras de arte coleccionables de manera instantánea. Las bolsas de compras jamás volverían a ser lo mismo.'
                        }],
                        y1970: [{
                            h3: 'Bloomingdales\'s se asocia con Hollywood',
                            p: 'La década de la decadencia comienza en grande al tiempo que Bloomingdales\'s se asocia con Hollywood y Broadway. Importantes películas se filman en la tienda de la Calle 59. Cintas como Manhattan, de Woody Allen, Comenzar de nuevo y El jinete eléctrico son solo el comienzo, seguidas por Splash y Moscú en Nueva York en la década de 1980.'
                        }, {
                            h3: 'Bloomingdales\'s lanza a los 3 grandes diseñadores',
                            p: 'Ralph Lauren, Donna Karan y Calvin Klein logran sus grandes comienzos en Bloomingdales\'s, probando una vez más que la tienda favorece las perspectivas jóvenes, nuevas y frescas.'
                        }, {
                            h3: 'Íconos',
                            p: 'La icónica Big Brown Bag de Bloomingdales\'s llegó al mundo por primera vez en 1973. La Little Brown Bag le siguió un año después y la Medium Brown Bag fue la última incorporación. Bloomingdales\'s ha creado las bolsas de compras más identificables de la historia y se pueden apreciar en colecciones de museos alrededor del mundo.'
                        }],
                        y1980: [{
                            h3: 'Bloomingdales\'s pone a la venta "lo vibrante".',
                            p: 'Wharhol llama a Bloomingdales\'s "el nuevo tipo de museo para la década de 1980". Y, cada día, la tienda se transforma en una galería de vanguardia de lo más reciente y novedoso. Bloomingdales\'s se une a la década del glamour de gala. Celebridades de la moda como Karl Lagerfeld, Diane von Furstenberg, Liza Minnelli y Oscar de la Renta viajan exclusivamente para asistir a las glamorosas inauguraciones de las tiendas.'
                        }, {
                            h3: '1988–El año del dragón',
                            p: 'Un año antes de que el presidente Nixon viajara a China, Bloomingdales\'s ya se encontraba haciendo esfuerzos para reavivar una relación comercial con China continental. Quince años después, en 1988, dando seguimiento al gran éxito de su primera campaña en China, la tienda insignia de la Calle 59 ofrece un panorama épico de 7 semanas sobre moda y el diseño del Oriente, en celebración de sus 10 años de comercio con la República Popular. Engalanada de manera acorde, la tienda brilla como una joya de la Ciudad Prohibida.'
                        }],
                        y1990: [{
                            h3: 'La nueva fiebre del oro',
                            p: 'Cuatro nuevas tiendas en California en cuatro días: Century City, Stanford, Sherman Oaks y Newport Beach. Y un año después, Beverly Center. Ahora Bloomingdales\'s es la única tienda departamental de lujo con una variedad completa que tiene presencia a nivel nacional. Los californianos van de compras para celebrar, y luego se dirigen a la playa.'
                        }],
                        y2000: [{
                            h3: 'Bloomingdales\'s adquiere prestigio en el centro de la ciudad',
                            p: 'Todo lo bueno se vuelve mejor al llegar al centro de la ciudad. Bloomingdales\'s abre una tienda en SoHo. Un histórico edificio con fachada de hierro fundido en Broadway se transforma en una gema brillante de la moda del siglo XXI.'
                        }, {
                            h3: 'El cambio a medios digitales',
                            p: 'Nace bloomingdales.com. Desde ropa de diseñador y lujosos productos de belleza hasta bolsos de mano y zapatos de moda, el sitio web le brinda moda de clase mundial a sus clientes, todo al alcance de sus manos.'
                        }, {
                            h3: 'Belleza renovada',
                            p: 'El piso principal B-way de la Calle 59 recibe "la más extensa renovación en la ciudad de Nueva York", con una variedad de modernos quioscos de las principales marcas de belleza.'
                        }],
                        y2010: [{
                            h3: '22011–Un nuevo y reluciente espacio para la joyería fina',
                            p: 'El departamento de joyería fina de la Calle 59, diseñado para hacer lucir cada faceta de los mejores diseñadores del mundo, incluyendo a David Yurman, y visitado por más de 400,000 personas de más de 230 países y los 50 estados del país, ha sido el ganador del galardón NYC Concierge Choice Award durante cinco años consecutivos.'
                        }, {
                            h3: 'No hay límites para ser excepcional',
                            p: 'En la actualidad, nada puede detener a Bloomingdales\'s. La clase de innovación que ha sido sinónimo de la marca desde su comienzo continúa siendo una parte central de su misión de lujo. Al mirar atrás y ver los triunfos del pasado, Bloomingdales\'s contempla el futuro. Es un futuro inigualable.'
                        }]
                    }
                },
                designer: {
                    header: {
                        h1: 'Muchísimas marcas en una sola tienda',
                        h2: 'Seleccionamos a los mejores diseñadores del mundo de la moda, belleza y más'
                    },
                    article: [
                        'Bloomingdale’s tiene una selección sin igual de marcas de diseñador incluyendo CHANEL, Dior, Michael Kors, MCM, Tory, Burch, MARC JACOBS, Armani y Ralph Lauren.',
                        '¿Busca los más novedosos (y codiciados) productos de belleza? Encuentre todas sus marcas favoritas de cuidado de la piel, maquillaje y fragancias incluyendo La Mer, Estée Lauder, Gucci, Chloé, Clinique, Lancôme y Kate Spade New York.'
                    ]
                },
                stores: {
                    header: {
                        h1: 'Choose Your Destination',
                        h2: 'We\'ll meet you at the Visitor\'s Center'
                    },
                    dropdown: {
                        default: 'Please Select a Store',
                        list: [
                            {id: 'null', name: 'Nueva York',                              disabled: 'true'},
                            {id: '0',    name: '59th Street Flagship, Nueva York City',   disabled: 'false'},
                            {id: '1',    name: 'SoHo, New York City',                   disabled: 'false'},
                            {id: 'null', name: 'HAWAII',                                disabled: 'true'},
                            {id: '2',    name: 'Ala Moana, Honolulu',                   disabled: 'false'},
                            {id: 'null', name: 'ILLINOIS',                              disabled: 'true'},
                            {id: '3',    name: 'North Michigan Avenue, Chicago',        disabled: 'false'},
                            {id: '4',    name: 'Medinah Home, Chicago',                 disabled: 'false'},
                            {id: 'null', name: 'CALIFORNIA',                            disabled: 'true'},
                            {id: '5',    name: 'San Francisco Centre, San Francisco',   disabled: 'false'},
                            {id: '6',    name: 'South Coast Plaza, Costa Mesa',         disabled: 'false'},
                            {id: '7',    name: 'Southern California Stores',            disabled: 'false'},
                            {id: 'null', name: 'FLORIDA',                               disabled: 'true'},
                            {id: '8',    name: 'Aventura',                              disabled: 'false'},
                            {id: '9',    name: 'Orlando',                               disabled: 'false'}
                        ],
                        copy: 'Bloomingdale\'s has stores all over the U.S. Our Visitor\'s Centers in <b>New York</b>, <b>Hawaii</b>, <b>Chicago</b>, <b>Miami</b> and <b>San Francisco</b> offer a full range of amenities for international customers. Multilingual associates can help you plan the ultimate shopping experience. They\'ll give you a store directory in your chosen language and special events information, as well as arrange complimentary personal stylist appointments, package delivery to your hotel, restaurant reservations (including those located within our stores) and much more. Beach bound? Our many outposts in Southern California—including South Coast Plaza in Ocean County, San Diego and Los Angeles—plus Honolulu, mean you\'ll never be far from the top fashions.'
                    },
                    storeData: {
                        storeHours: 'Horario de atención',
                        directions: 'Directions',
                        designers: 'DISEÑADORES QUE ENCONTRARÁ',
                        dining: 'RESTAURANTES EN LA TIENDA',
                        services: 'SERVICIOS',
                        servicesSubHead: 'Nuestros asociados le mostrarán por qué Bloomingdale’s no tiene comparación en todo el mundo. Nos podrá identificar por los prendedores con la bandera de su país. Podemos ayudarle a encontrar su vestimenta favorita y brindarle una amplia gama de servicios personalizados.',
                        loyalty: 'Súmese al Club de Fidelidad para Clientes Internacionales',
                        loyaltySubHead: 'Nuestro programa especial de recompensas fue creado para los compradores internacionales*. Por cada dólar que gaste, sumará puntos para obtener tarjetas de regalo, servicios y experiencias extraordinarias. Puede inscribirse en el programa ahora mismo, en la tienda de Bloomingdale’s de Ala Moana, y sumar y canjear puntos en cualquier tienda de línea completa de Bloomingdale’s de los Estados Unidos**.',
                        id: [
                            {
                                name: '59th Street Flagship',
                                addr: '1000 Third Avenue Nueva York, NY 10022<br/>+1 212-705-2000',
                                hours: 'De lunes a sábados: la tienda abre a las 10:00 a.m.<span>|</span> Domingos: la tienda abre a las 11:00 a.m.',
                                descr: 'Descubra el legado emblemático y la galardonada hospitalidad de Bloomingdale\'s. Inicie su día en nuestra tienda insignia visitando nuestro Centro de Visitantes, ubicado en el balcón del primer piso. Nuestro directorio en varios idiomas le permitirá armar el recorrido de su excursión de compras. ¿Está buscando una experiencia más personalizada? Conozca los servicios brindados en nuestra tienda, que van desde citas con estilistas y alteraciones de ropa hasta reservas en restaurantes. Le ayudaremos a organizar todo esto y mucho más.',
                                dTile: '¿DE VISITA EN NUEVA YORK?',
                                dInfo: 'Descargue nuestro folleto de bienvenida antes de llegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-59ST_02.jpg',
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   7.° piso <span>|</span>   212-705-3085',
                                        sched: 'Abierto todos los días <span>|</span>  Para comer en el restaurante: de 10:30 a. m. a una hora antes del cierre de la tienda <br/>Para llevar: de 10:00 a. m. a media hora antes del cierre de la tienda',
                                        description: 'Su visita no estará completa sin nuestro famoso yogur helado. También podrá encontrar ensaladas recién preparadas, sándwiches, sopas, un bar de jugos frescos y una selección de tés Tavalon de la más alta calidad. Servicio disponible en la barra, en mesas y para llevar.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    },
                                    {
                                        name: '<b>FL!P</b> <span>|</span>   Nivel medio <span>|</span>   212-705-3085',
                                        sched: 'Abierto todos los días <span>|</span>   Para comer en el restaurante: de 11:00 a. m. a una hora antes del cierre de la tienda ',
                                        description: 'En este lugar relajado dentro de nuestra Tienda para Caballeros, disfrute de unas hamburguesas de “alta costura” al estilo estadounidense, ensaladas, cervezas artesanales, servicio de bar completo y una variedad de papas fritas.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_02.jpg'
                                    },
                                    {
                                        name: '<b>DAVID BURKE AT BLOOMINGDALE\'S </b> <span>|</span>   Nivel exterior <br />   212-705-3800',
                                        sched: 'Abierto todos los días <span>|</span> In the Box (para llevar): de 10:00 a.m. a 9:00 p.m. <span>|</span> In the Bar (para comer en el restaurante): de 11:00 a.m. a 9:00 p.m. ',
                                        description: 'El chef David Burke, uno de los principales precursores de la cocina estadounidense, nos trae una comida deliciosa y el mejor servicio en un ambiente alegre.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_04.jpg'
                                    },
                                    {
                                        name: '<b>MAGNOLIA BAKERY</b> <span>|</span>   Nivel exterior <span>|</span>   212-265-5320',
                                        sched: 'De lunes a viernes, de 7:00 a.m. a 10:00 p.m.  <br/> Sábados, de 8:00 a.m. a 10:00 p.m. <span>|</span>   Domingos, de 8:00 a.m. a 9:00 p.m.',
                                        description: 'A classic American bakery cherished for its old-fashioned desserts and vintage décor, Magnolia serves a range of handmade baked goods, including pies, cakes, cheesecakes, banana pudding, cupcakes and muffins. Here early? Magnolia opens even before the store does.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_03.jpg'
                                    },
                                    {
                                        name: '<b>LE TRAIN BLEU </b> <span>|</span>  6.° piso <span>|</span>   212-705-2100',
                                        sched: 'Monday–Wednesday, Friday–Saturday 10:30AM–5PM <span>|</span>  Thursday 10:30AM–7PM <span>|</span>  Sunday 11:30AM–4:30PM',
                                        description: '<i>Se recomienda hacer reservaciones</i><br/>Le Train Bleu, una romántica réplica de un vagón restaurante de ferrocarril de fines de siglo, ofrece la mejor comida estadounidense y europea, ya sea en el brunch, el almuerzo o la cena de menú fijo, que se sirven todos los días.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_05.jpg'
                                    },
                                    {
                                        name: '<b>B CAFÉ </b> <span>|</span>   6.° piso  <span>|</span>   212-705-2073',
                                        sched: 'Abierto todos los días <span>|</span>   De 10:00 a. m. hasta el cierre de la tienda ',
                                        description: 'Visite este café y bar de comidas livianas para darse un gusto rápido y saludable o para disfrutar de un almuerzo o una cena ligera, donde podrá saborear versiones para llevar de muchos de los platos favoritos de Le Train Bleu.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    } 
                                ],
                                services: [
                                    {
                                        title: 'PODEMOS ENCARGARNOS DE SU LISTA DE REGALOS',
                                        description: 'Comprar regalos es muy fácil en Bloomingdale’s. Simplemente envíe su lista de deseos a uno de nuestros especialistas políglotos antes de su visita y encontrará todos los artículos listos a su llegada.<br /> Llame al 212-705-2359 o al 212-705-3488 <br/> Envíe un correo electrónico a <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PESTILISTAS PERSONALES DISPONIBLES ',
                                        description: 'Nuestros estilistas personales están disponibles para recorrer la tienda con usted o para elegir opciones de guardarropa y de decoración para el hogar acorde a sus gustos, sin cargo adicional. <br/> A Sus Órdenes (Para ella) 212-705-3135 <br/> A Sus Órdenes (Para él) 212-705-3030 '
                                    },
                                    {
                                        title: 'PAGO SIMPLIFICADO ',
                                        description: 'Aceptamos La Tarjeta de Viajes Global American Express&reg;'
                                    },
                                    {
                                        title: 'ALTERACIONES DE ROPA RÁPIDAS ',
                                        description: 'Brindamos servicios de sastrería profesional y alteraciones de ropa en la tienda, por solicitud. Los precios están disponibles en el momento de la prueba.'
                                    },
                                    {
                                        title: 'DENVÍO A SU HOTEL ',
                                        description: 'Con gusto enviaremos sus compras de USD 250 o más a su hotel en Manhattan, sin cargo adicional. Tan solo déjelas en nuestro Centro de Visitantes, ubicado en el balcón del primer piso.'
                                    },
                                    {
                                        title: 'TARJETAS Y MOÑOS PARA LLEVAR ',
                                        description: 'Envolveremos sus compras para regalo, o puede elegir sus tarjetas, cajas, papel de regalo y moños para llevarse a casa, en nuestro puesto de envoltura de regalos, ubicado en el sexto piso.'
                                    }
                                ]
                            },
                            {
                                name: 'SoHo',
                                addr: '504 Broadway  Nueva York, NY 10012<br/>+1 212-729-5900',
                                hours: 'De lunes a sábados: la tienda abre a las 10:00 a.m. <span>|</span> Domingos: la tienda abre a las 12:00 p.m.',
                                descr: 'Explore nuestra tienda del centro en SoHo, la zona que está más a la moda de la ciudad. Encontrará toda la energía y el estilo de nuestra tienda insignia de la parte alta de la ciudad, pero con el aspecto de una boutique de alta costura. Visite nuestro animado piso de belleza y explore las últimas novedades de los diseñadores. Como siempre, nuestros asociados políglotos están disponibles para ayudarle a que su visita sea memorable.',
                                dTile: '¿DE VISITA EN NUEVA YORK?',
                                dInfo: 'Descargue nuestro folleto de bienvenida antes de llegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SOHO.jpg',                                
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   2.° piso  <span>|</span>   212-729-5900',
                                        sched: 'De lunes a viernes, de 10:00 a.m. a 8:00 p.m. <span>|</span>   Sábados, de 10:00 a.m. a 7:00 p.m.  <span>|</span> Domingos, de 12:00 p.m. a 7:00 p.m.',
                                        description: 'Su visita no estará completa sin nuestro famoso yogur helado.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'PODEMOS ENCARGARNOS DE SU LISTA DE REGALOS ',
                                        description: 'Comprar regalos es muy fácil en Bloomingdale’s. Simplemente envíe su lista de deseos a uno de nuestros especialistas políglotos antes de su visita y encontrará todos los artículos listos a su llegada.<br /> Llame al 212-705-2098 o envíe un correo electrónico a <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAGO SIMPLIFICADO ',
                                        description: 'Aceptamos La Tarjeta de Viajes Global American Express&reg;'
                                    },
                                    {
                                        title: 'ALTERACIONES DE ROPA RÁPIDAS ',
                                        description: 'Brindamos servicios de sastrería profesional y alteraciones de ropa en la tienda, por solicitud. Los precios están disponibles en el momento de la prueba.'
                                    },
                                    {
                                        title: 'ENVÍO A SU HOTEL ',
                                        description: 'Con gusto enviaremos sus compras de USD 250 o más a su hotel en Manhattan, sin cargo adicional. Tan solo entrégueselas a cualquier asociado de ventas.'
                                    }
                                ]                               
                            },
                            {
                                name: 'Ala Moana',
                                addr: '1450 Ala Moana Blvd  Honolulu, HI 96814<br/>+1 808-644-7511',
                                hours: 'De lunes a sábados: de 9:30 a.m. a 9:00 p.m. | Domingos: de 10:00 a.m. a 7:00 p.m.',
                                descr: 'Dígale aloha a nuestra nueva tienda en la tropical Honolulu. Ubicada en el centro comercial Ala Moana Center, el principal destino de compras de Hawái, esta tienda de tres pisos cuenta con una gama de servicios adecuados para el comprador extranjero. Visite nuestro Centro de Visitantes Internacionales y hable con uno de nuestros asociados políglotos. Ofrecemos citas con un asesor estilístico internacional, alteraciones de ropa, reservas en restaurantes y mucho más.</p><p style="margin-top: 10px;">¿Tiene previsto regresar? Inscríbase en nuestro Club de Fidelidad para Clientes Internacionales y junte puntos para obtener tarjetas de regalo, servicios especiales y auténticas aventuras hawaianas.</p>',
                                dTile: '¿DE VISITA EN HAWÁI?',
                                dInfo: 'Descargue nuestro folleto de bienvenida antes de llegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Hawaii_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-ALA-MOANA.jpg',                                  
                                designers: [
                                    'Burberry',
                                    'Chloé',
                                    'Clinique',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Longchamp ',
                                    'Jimmy Choo',
                                    'Jo Malone London',
                                    'Lancôme',
                                    'La Mer',
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rebecca Minkoff',
                                    'Tory Burch',
                                    'Villeroy & Boch'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   3.° piso ',
                                        sched: 'Abierto todos los días Desde las 11:00 a. m.',
                                        description: 'Su visita no estará completa sin nuestro famoso yogur helado.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'CENTRO DE VISITANTES Y MOSTRADOR DE CONSERJERÍA DE SERVICIO COMPLETO',
                                        description: 'En el Centro de Visitantes, le brindaremos un servicio de guardarropa gratuito y un directorio de la tienda en varios idiomas. Si lo necesita, nuestros asociados pueden organizar citas con un estilista personal y un servicio gratuito de envíos de paquetes a su hotel. Visite nuestro mostrador de conserjería para realizar alteraciones de ropa y retiros, o para conocer más sobre las actividades recreativas y las atracciones turísticas de Hawái.'
                                    },
                                    {
                                        title: 'ESTILISTAS PERSONALES Y ASESORES DE BELLEZA DISPONIBLES ',
                                        description: 'Nuestros estilistas están disponibles para recorrer la tienda con usted o para elegir opciones de guardarropa acorde a sus gustos, sin cargo adicional. ¿Le interesa realizar una consulta de belleza? Nuestros asesores experimentados hallarán los productos perfectos para usted, de las marcas más codiciadas.'
                                    },
                                    {
                                        title: 'ALTERACIONES DE ROPA RÁPIDAS ',
                                        description: 'Brindamos servicios de sastrería profesional y alteraciones de ropa en la tienda, por solicitud. Los precios están disponibles en el momento de la prueba.'
                                    },
                                    {
                                        title: 'CONVERSIÓN DE DIVISAS',
                                        description: 'Brindamos servicios de sastrería profesional y alteraciones de ropa en la tienda, por solicitud. Los precios están disponibles en el momento de la prueba.'
                                    },
                                    {
                                        title: 'RELÁJESE EN NUESTRA SALA VIP',
                                        description: 'Nuestro salón de acceso restringido, el primero de las tiendas de Bloomingdale’s, está ubicado dentro del Centro de Visitantes. Algunos turistas selectos pueden disfrutar de diversos servicios, que incluyen comidas ligeras y bebidas, televisión, baño privado, puestos de carga de dispositivos móviles, una impresora Bluetooth para imprimir tarjetas de embarque y iPads® precargadas con la aplicación de Bloomingdale’s y con útiles guías de viajes en casi todos los idiomas. El acceso por un día al salón está disponible para turistas con recibos de compras por USD 500 o más.',
                                    }
                                ],
                                loyalty: [
                                    {
                                        title: 'OBTENGA UNA TARJETA DE REGALO',
                                        description: '500 puntos = una tarjeta de regalo por USD 25, que puede utilizar para comprar cualquier artículo en la tienda de Bloomingdale’s de Ala Moana.'
                                    },
                                    {
                                        title: 'DISFRUTE DE LOS SERVICIOS DE LA TIENDA',
                                        description: 'Con sus puntos, podrá obtener servicios de envío gratuito de paquetes a su hotel, almuerzos o servicios de transporte a su siguiente destino. Para obtener más información, hable con un asociado en el Centro de Visitantes, ubicado en el primer piso.'
                                    },
                                    {
                                        title: 'DESE EL GUSTO DE VIVIR UNA EXPERIENCIA QUE NUNCA OLVIDARÁ',
                                        description: '¡Puede canjear sus puntos por auténticas aventuras hawaianas! Para obtener más información, hable con un asociado en el Centro de Visitantes, ubicado en el primer piso.'
                                    },
                                    {
                                        title: '',
                                        description: '*Es necesario demostrar un domicilio internacional.<br/>**No es posible canjear los puntos en tiendas de descuento de Bloomingdale’s o en bloomingdales.com. Los puntos solo pueden ser canjeados por servicios o experiencias en Bloomingdale’s de Ala Moana.'
                                    }                                      
                                ]                                    
                            },
                            {
                                name: 'North Michigan Avenue',
                                addr: '900 North Michigan Avenue  Chicago, IL 60611<br/>+1 312-440-4460 ',
                                hours: 'De lunes a sábados: de 10:00 a.m. a 8:00 p.m. | Domingos: de 11:00 a.m. a 7:00 p.m.',
                                descr: '¿Tiene previsto un viaje a la Ciudad de los Vientos? Permita que Bloomingdale’s sea su guía de moda. Complete su guardarropa con nuestra amplia colección de marcas de diseño o encuentre sus productos de belleza favoritos. Nuestros asociados políglotos pueden ayudarle a adecuar su excursión de compras para satisfacer todas sus necesidades.',
                                dTile: '¿DE VISITA EN CHICAGO?',
                                dInfo: 'Descargue nuestro folleto de bienvenida antes de llegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-NORTH-MICHIGAN-AVENUE.jpg',                                                                  
                                designers: [
                                    'Burberry',
                                    'Canada Goose',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Gucci',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Moncler',
                                    'Ralph Lauren',
                                    'Ray-Ban',
                                    'Salvatore Ferragamo',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'UGG® Australia '
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> 6.° piso <span>|</span> 312-440-4861',
                                        sched: 'De lunes a sábados, de 11:00 a.m. a 6:00 p.m.',
                                        description: 'Su visita no estará completa sin nuestro famoso yogur helado.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'PODEMOS ENCARGARNOS DE SU LISTA DE REGALOS ',
                                        description: 'Comprar regalos es muy fácil en Bloomingdale’s. Simplemente envíe su lista de deseos a uno de nuestros especialistas políglotos antes de su visita y encontrará todos los artículos listos a su llegada.<br /> Llame al 312-440-4596 o envíe un correo electrónico a <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'ESTILISTAS PERSONALES DISPONIBLES',
                                        description: 'Nuestros estilistas personales están disponibles para recorrer la tienda con usted o para elegir opciones de guardarropa y de decoración para el hogar acorde a sus gustos, sin cargo adicional.<br/> A Sus Órdenes (Para ella) 312-440-4887 '

                                    },
                                    {
                                        title: 'PAGO SIMPLIFICADO',
                                        description: 'Aceptamos La Tarjeta de Viajes Global American Express&reg;'

                                    },
                                    {
                                        title: 'ALTERACIONES DE ROPA RÁPIDAS ',
                                        description: 'Brindamos servicios de sastrería profesional y alteraciones de ropa en la tienda, por solicitud. Los precios están disponibles en el momento de la prueba.'

                                    },
                                    {
                                        title: 'ALTERACIONES DE ROPA RÁPIDAS ',
                                        description: 'Con gusto enviaremos sus compras de USD 250 o más a su hotel en el centro, sin cargo adicional. Tan solo déjelas en nuestro Centro de Visitantes, ubicado en el tercer piso.'

                                    },
                                    {
                                        title: 'TARJETAS Y MOÑOS PARA LLEVAR',
                                        description: 'Envolveremos sus compras para regalo, o puede elegir sus tarjetas, cajas, papel de regalo y moños para llevarse a casa. Visite la mesa de Servicio al Cliente, ubicada en el quinto piso.'

                                    }
                                ]  
                            },
                            {
                                name: 'Medinah Home',
                                addr: '600 North Wabash Avenue  Chicago, IL 60611<br/>+1 312-324-7500',
                                hours: 'Monday–Saturday: Store Opens 10AM <span>|</span> Sunday: Opens 12PM',
                                descr: 'Deck out your home with a trip to Chicago\'s Medinah Home store. Here you\'ll find luxurious bedding, designer kitchen appliances, plush bathroom accessories and more. Experience our award-winning hospitality first hand with a full range of in-store services.',
                                dTile: 'VISITING CHICAGO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-MEDINAH-HOME.jpg',                                                                                                  
                                designers: [
                                    'Nespresso',
                                    'Rimowa',
                                    'Tumi',
                                    'Victorinox'
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 312-440-4596 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select home décor options to your taste—all for free.<br/> At Your Service 312-324-7633 '

                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'

                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Visit our second floor Gift Wrap station.'

                                    }
                                ] 
                            },
                            {
                                name: 'San Francisco Centre',
                                addr: '845 Market Street  San Francisco, CA<br/>+1 415-856-5402',
                                hours: 'De lunes a sábados: de 10:00 a.m. a 9:00 p.m. | Domingos: de 11:00 a.m. a 8:00 p.m.',
                                descr: 'Descubra la mejor forma de hacer compras en San Francisco. Su primera parada: Bloomingdale’s. En nuestro Centro de Visitantes podrá obtener un directorio en varios idiomas o hablar con nuestros asociados políglotos para adecuar su experiencia a la medida de sus necesidades. A continuación, podrá conocer más sobre los servicios brindados en nuestra tienda.',
                                dTile: '¿DE VISITA EN SAN FRANCISCO?',
                                dInfo: 'Descargue nuestro folleto de bienvenida antes de llegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SanFran_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SAN-FRANCISCO-CENTRE.jpg',
                                designers: [
                                    'Alice + Olivia',
                                    'BCBGMAXAZRIA',
                                    'Burberry', 
                                    'Calvin Klein',
                                    'CHANEL',
                                    'COACH',
                                    'Clinique', 
                                    'Dior', 
                                    'DIANE von FURSTENBERG',
                                    'Elie Tahari', 
                                    'Escada',
                                    'Estée Lauder',
                                    'Giorgio Armani',
                                    'Helmut Lang',
                                    'kate spade new york',
                                    'La Mer',
                                    'Lancôme',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Ralph Lauren',
                                    'Rebecca Taylor',
                                    'Salvatore Ferragamo',
                                    'TAG Heuer', 
                                    'Tory Burch', 
                                    'Trina Turk'
                                ],
                                services: [
                                    {
                                        title: 'PODEMOS ENCARGARNOS DE SU LISTA DE REGALOS ',
                                        description: 'Comprar regalos es muy fácil en Bloomingdale’s. Simplemente envíe su lista de deseos a uno de nuestros especialistas políglotos antes de su visita y encontrará todos los artículos listos a su llegada.<br /> Llame al 415-856-5477 o envíe un correo electrónico a <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'ESTILISTAS PERSONALES DISPONIBLES ',
                                        description: 'Nuestros estilistas personales están disponibles para recorrer la tienda con usted o para elegir opciones de guardarropa y de decoración para el hogar acorde a sus gustos, sin cargo adicional. <br/> A Sus Órdenes (Para ella) 415-856-5538 '

                                    },
                                    {
                                        title: 'PAGO SIMPLIFICADO ',
                                        description: 'Aceptamos La Tarjeta de Viajes Global American Express&reg;'

                                    },
                                    {
                                        title: 'ALTERACIONES DE ROPA RÁPIDAS',
                                        description: 'Brindamos servicios de sastrería profesional y alteraciones de ropa en la tienda, por solicitud. Los precios están disponibles en el momento de la prueba.'

                                    },
                                    {
                                        title: 'ENVÍO A SU HOTEL ',
                                        description: 'Con gusto enviaremos sus compras de USD 250 a su hotel en el centro, sin cargo adicional. Tan solo déjelas en nuestro Centro de Visitantes, ubicado en el balcón del primer piso.'

                                    },
                                    {
                                        title: 'TARJETAS Y MOÑOS PARA LLEVAR ',
                                        description: 'En el Centro de Visitantes, envolveremos sus compras para regalo, o puede elegir sus tarjetas, cajas, papel de regalo y moños para llevarse a casa.'

                                    }
                                ]                               
                            },
                            {
                                name: 'South Coast Plaza',
                                addr: '3333 Bristol St  Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                hours: 'De lunes a sábados: de 10:00 a.m. a 9:00 p.m. | Domingos: de 11:00 a.m. a 7:00 p.m.',
                                descr: 'Con la mejor selección de diseñadores, adaptados específicamente para el sur de California, South Coast Plaza es un destino de compras imperdible. ¿Primera vez en el Estado Dorado? Nuestros asociados políglotos le ayudarán a que su estadía sea fantástica. Comience por obtener un directorio de la tienda en su idioma y agregue a su excursión de compras los servicios brindados en nuestra tienda, que figuran a continuación.',
                                dTile: '¿DE VISITA EN COSTA MESA?',
                                dInfo: 'Descargue nuestro folleto de bienvenida antes de llegar.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthCoastPlaza_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SOUTH-COAST-PLAZA.jpg',
                                designers: [
                                    'Burberry',
                                    'Calvin Klein',
                                    'Canada Goose',
                                    'CHANEL',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani Beauty',
                                    'Gucci',
                                    'Hugo Boss',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'La Prairie',
                                    'Longchamp',
                                    'Longines Watches',
                                    'Louis Vuitton',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Miu Miu',
                                    'Moncler',
                                    'Montblanc',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rimowa',
                                    'Salvatore Ferragamo',
                                    'Stuart Weitzman',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'Tumi',
                                    'UGG® Australia',
                                    'Yves Saint Laurent Beauty'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>AnQi by Crustacean Bistró Gourmet y Bar de Noodles</b> <br/>  Planta baja <span>|</span> 714-557-5679',
                                        sched: 'Almuerzo: Abierto todos los días, de 11:30 a.m. a 2:30 p.m.<br/> Bar de Noodles: Abierto todos los días, de 11:30 a.m. a 5:30 p.m.<br/> Cena: De domingos a jueves, de 5:30 p.m. a 10:30 p.m. <br/>Viernes y sábados, de 5:30 p.m. a 11:00 p.m. <br/> Red Happy Hour (Hora feliz): De lunes a viernes, de 4:00 p.m. a 7:00 p.m.',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_08.jpg'
                                    },
                                    {
                                        name: '<b>Holsteins</b> <span>|</span> Ground Floor <span>|</span> 714-352-2525',
                                        sched: 'Monday - Thursday: 11AM–12AM <br/> Friday & Saturday: 11AM–2AM  <br/> Sunday: 11AM–12AM ',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_09.jpg'
                                    }                                    
                                ],
                                services: [
                                    {
                                        title: 'ALTERACIONES DE ROPA RÁPIDAS ',
                                        description: 'Brindamos servicios de sastrería profesional y alteraciones de ropa en la tienda, por solicitud. Los precios están disponibles en el momento de la prueba.'
                                    },
                                    {
                                        title: 'TARJETAS Y MOÑOS PARA LLEVAR',
                                        description: 'Envolveremos sus compras para regalo, o puede elegir sus tarjetas, cajas, papel de regalo y moños para llevarse a casa. Podrá encontrar todo esto en el nivel inferior.'
                                    },
                                    {
                                        title: 'PAGO SIMPLIFICADO ',
                                        description: 'Aceptamos La Tarjeta de Viajes Global American Express&reg;'
                                    }
                                ]                                    
                            },
                            {
                                name: 'Southern California Stores',
                                addr: '',
                                hours: '',
                                descr: 'With outposts across Los Angeles, Orange County and San Diego, Bloomingdale\'s has left its iconic mark on SoCal. Shop the fashion, accessories, shoes and beauty brands you love in any one of our stores. Learn more about our in-store amenities below.',
                                dTile: 'VISITING SOUTHERN CALIFORNIA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthernCalifornia_EN.pdf',
                                designersImg: '',                                
                                stores: [
                                    {
                                        area: 'Orange County',
                                        list: [
                                            {
                                                name: 'South Coast Plaza',
                                                addr: '3333 South Bristol Street, Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                                hours: 'Hours:<br/>Monday–Tuesday 10AM–9PM <br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 10AM–8PM'
                                            },
                                            {
                                                name: 'Newport Fashion Island',
                                                addr: '701 Newport Center Drive, Newport Beach, CA 92660<br/>+1 949-729-6600',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–8PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            }     
                                        ]                                   
                                    },
                                    {
                                        area: 'Los Angeles',
                                        list: [
                                            {
                                                name: 'Century City',
                                                addr: '10250 Santa Monica Boulevard, Los Angeles, CA 90067<br/>+1 310-772-2100',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            },
                                            {
                                                name: 'Beverly Center',
                                                addr: '8500 Beverly Boulevard, Los Angeles, CA 90048<br/>+1 310-360-2700',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 12PM–8PM'
                                            },
                                            {
                                                name: 'Santa Monica Place',
                                                addr: '315 Colorado Avenue, Santa Monica, CA 90401<br/>+1 310-985-6400',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            },
                                            {
                                                name: 'Glendale Galleria',
                                                addr: '103 South Brand Blvd., Glendale, CA 91210<br/>+1 818-638-4100',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–9PM'
                                            },
                                            {
                                                name: 'Sherman Oaks Fashion Square',
                                                addr: '14060 Riverside Drive, Sherman Oaks, CA 91423<br/>+1 818-325-2200',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–9PM'
                                            }     
                                        ]                                   
                                    }, 
                                    {
                                        area: 'San Diego',
                                        list: [
                                            {
                                                name: 'Fashion Valley',
                                                addr: '7057 Friars Road, San Diego, CA 92108<br/>+1 619-610-6400',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–8PM<br/>Wednesday 10AM–8PM<br/>Thursday–Saturday 10AM–10PM<br/>Sunday 12PM–8PM'
                                            }   
                                        ]                                   
                                    }                                                                       
                                ],
                                services: [
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting. Available at select locations.'
                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Available at select locations.'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select home décor options to your taste—all for free. Available at select locations.'
                                    }
                                ]  
                            },
                            {
                                name: 'AVENTURA',
                                addr: '19555 Biscayne Boulevard  Aventura, FL 33180<br/>+1 305-792-1246',
                                hours: 'Monday–Saturday: 10AM–10PM <span>|</span> Sunday: 12PM–9PM',
                                descr: 'Planning your vacation itinerary? Start with a trip to Florida\'s Aventura store. Explore our extensive selection of designer fashions, beauty brands, luxurious accessories and more. Get shopping with a store directory in your chosen language and be sure to make the most of your experience with our in-store amenities listed below.',
                                dTile: 'VISITING AVENTURA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Aventura_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-AVENTURA.jpg',
                                designers: [
                                    'Baccarat',
                                    'Bernardaud',
                                    'BVLGARI',
                                    'Burberry',
                                    'Calvin Klein ',
                                    'Canali ',
                                    'CHANEL ',
                                    'Christofle ',
                                    'David Yurman ',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel ',
                                    'Dior ',
                                    'Fendi ',
                                    'Furla ',
                                    'Giorgio Armani',
                                    'Gucci ',
                                    'HUGO BOSS ',
                                    'Jimmy Choo ',
                                    'John Varvatos', 
                                    'La Mer ',
                                    'Lalique',
                                    'Longchamp', 
                                    'Louis Vuitton ',
                                    'M·A·C ',
                                    'MARC BY MARC JACOBS ',
                                    'Michael Kors ',
                                    'Miki House ',
                                    'Montblanc ',
                                    'Movado ',
                                    'PANDORA',
                                    'Prada ',
                                    'Pratesi ',
                                    'Ralph Lauren ',
                                    'Roberto Coin ',
                                    'Salvatore Ferragamo ',
                                    'Sferra ',
                                    'Shiseido ',
                                    'TAG Heuer ',
                                    'Tory Burch ',
                                    'Villeroy & Boch ',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>59TH & LEX CAFE</b> <span>|</span> 2nd floor <span>|</span> 305-792-1180',
                                        sched: 'Monday–Saturday 10AM–7:30PM <span>|</span> Sunday 12PM–5PM',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 305-792-1175 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    }
                                ]     
                            },
                            {
                                name: 'ORLANDO',
                                addr: '4152 Conroy Road  Orlando, FL 32839<br/>+1 407-264-2514',
                                hours: 'Monday–Saturday: 10AM–9PM | Sunday: 11AM–7PM',
                                descr: 'Stocked with the best designers and beauty brands, Bloomingdale\'s Orlando is your ticket to world-class shopping. Stop in on your next trip to the Sunshine State for an experience tailored to you. Pick up a store directory in your chosen language, then take advantage of the many in-store amenities listed below.',
                                dTile: 'VISITING ORLANDO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Orlando_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-ORLANDO.jpg',
                                designers: [
                                    'Burberry',
                                    'Canali ',
                                    'COACH',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel Jeans',
                                    'Dior ',
                                    'Fendi ',
                                    'Frankie B Jeans ',
                                    'John Varvatos ',
                                    'Joie ',
                                    'La Mer ',
                                    'Longchamp', 
                                    'Montblanc ',
                                    'Movado ',
                                    'Ralph Lauren ',
                                    'Salvatore Ferragamo ',
                                    'Sandro ',
                                    'Shiseido ',
                                    'Ted Baker ',
                                    'Tory Burch ',
                                    'Vince'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> Level 1 <span>|</span> 407-264-2683',
                                        sched: 'Monday–Saturday 10AM–9PM <span>|</span> Sunday 11AM–7PM',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 305-792-1175 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    }
                                ]       
                            }                                
                        ]
                    }
                },                
                socialshare: {
                    fb: {
                        name: 'International Tourism | bloomingdales.com',
                        description: 'From designer clothing to the most-coveted beauty brands, explore all that Bloomingdale\'s has to offer on their updated international site.'
                    },
                    pinterest: {
                        description: 'International Tourism | bloomingdales.com'
                    },
                    twitter: {
                        text: 'Love to shop @bloomingdales? Check out their international site for new designer clothing, accessories & beauty. http://bit.ly/1M3fLiB'
                    },
                    weibo: {
                        url: 'http://weibo.com/bloomingdalesusa',
                        title: 'Discover Bloomingdale\'s luxury fashions, storied history and world-class hospitality on their updated international site.'
                    },
                    weixin: {
                        text: 'Scan the QR code to receive push notifications from Bloomingdale\'s.'
                    }
                },
                contactUs: {
                    formTitle: 'CONTACTO',
                    left: {
                        title: 'Avísenos sobre su viaje',
                        p1: 'Díganos qué tienda de Bloomingdale\'s desea visitar y las fechas en que tiene previsto viajar.',
                        p2: 'Tan solo envíe este formulario y uno de nuestros asociados políglotos se pondrá en contacto con usted.'
                    },
                    right: {
                        name: 'Nombre:',
                        nameErr: 'Por favor díganos su nombre',
                        email: 'Correo electrónico:',
                        emailErr1: 'Proporcione su correo electrónico',
                        emailErr2: 'Dirección de correo electrónico no válida',
                        phone: 'N.° de teléfono móvil (opcional):',
                        phoneErr: 'Numero de telefono invalido',
                        party: 'Cantidad de personas que viajarán conmigo:',
                        partyErr: 'Díganos el número de personas en su grupo',
                        dates: 'Fechas en las que tengo previsto viajar a EE. UU.:',
                        arriving: 'Arribo:',
                        departing: 'Partida:',
                        datesErr: 'Seleccione una fecha ',
                        storesH: 'Me gustaría visitar:',
                        storesM: 'Seleccione una tienda',
                        storesErr: 'Seleccione una tienda',
                        stores: [
                            {id: 'New York', name: 'Nueva York', disabled: 'true'},
                            {id: '59th Street Flagship, New York City', name: '59th Street Flagship, New York City', disabled: 'false'},
                            {id: 'SoHo, New York City', name: 'SoHo, New York City', disabled: 'false'},
                            {id: 'Hawaii', name: 'Hawái', disabled: 'true'},
                            {id: 'Ala Moana, Honolulu', name: 'Ala Moana, Honolulu', disabled: 'false'},
                            {id: 'Illinois', name: 'Illinois', disabled: 'true'},
                            {id: 'North Michigan Avenue, Chicago', name: 'North Michigan Avenue, Chicago', disabled: 'false'},
                            {id: 'Medinah Home, Chicago', name: 'Medinah Home, Chicago', disabled: 'false'},
                            {id: 'California', name: 'California', disabled: 'true'},
                            {id: 'Beverly Center, Los Angeles', name: 'Beverly Center, Los Angeles', disabled: 'false'},
                            {id: 'Century City, Los Angeles', name: 'Century City, Los Angeles', disabled: 'false'},
                            {id: 'Fashion Valley, San Diego', name: 'Fashion Valley, San Diego', disabled: 'false'},
                            {id: 'Glendale Galleria, Glendale', name: 'Glendale Galleria, Glendale', disabled: 'false'},
                            {id: 'Newport Fashion Island, Newport Beach', name: 'Newport Fashion Island, Newport Beach', disabled: 'false'},
                            {id: 'San Francisco Centre, San Francisco', name: 'San Francisco Centre, San Francisco', disabled: 'false'},
                            {id: 'Santa Monica Place, Santa Monica', name: 'Santa Monica Place, Santa Monica', disabled: 'false'},
                            {id: 'Sherman Oaks Fashion Square, Sherman Oaks', name: 'Sherman Oaks Fashion Square, Sherman Oaks', disabled: 'false'},
                            {id: 'South Coast Plaza, Costa Mesa', name: 'South Coast Plaza, Costa Mesa', disabled: 'false'},
                            {id: 'Florida', name: 'Florida', disabled: 'true'},
                            {id: 'Aventura', name: 'Aventura', disabled: 'false'},
                            {id: 'Orlando', name: 'Orlando', disabled: 'false'}
                        ],
                        submit: 'Enviar',
                        submitHead: 'thank you for<br/>your submission',
                        submitBody: 'A member of our tourism team will contact you shortly.'
                    }
                },                
                footer: [
                    'OBTENGA UN 10 % DE AHORRO: <b><u>INSCRÍBASE</u></b> PARA RECIBIR CORREOS ELECTRÓNICOSSAVE',
                    'Like no other store in the world'
                ]
            },
            JP: {
                nav: [
                    '当店の伝統',
                    'デザイナーズ・ショップ',
                    '各店舗のご案内',
                    'オンライン・ショッピング'
                ],
                mobileSubHeader: 'INTERNATIONAL TOURISM',
                home: {
                    header: {
                        mobile: {
                            h1: 'ようこそ',
                            h2: 'オシャレなものをすべて見ましょう。 <br/>' +
                                'それにはまず Bloomingdale\'s へお越しください。',
                            p: '1872年以来、Bloomingdale\'s はオシャレの中心地であり、世界中で今一番人気のあるブランドのファッション、靴、ハンドバッグ、化粧品、高級宝飾品、贈答品が揃っています。当店独特の心のこもったおもてなし（多言語スタッフ、スペシャル・コンシェルジュ・サービスなど）でお客様をお迎えいたしますので、ご希望は叶えられ、くつろぎながらお買い物をお楽しみいただけるでしょう。これは、Bloomingdale\'s が世界に名だたる存在である理由のほんの一端です。'
                        },
                        desktop: {
                            h1: 'ようこそ',
                            h2: 'オシャレなものをすべて見ましょう。 <br/>' +
                                'それにはまず Bloomingdale\'s へお越しください。',
                            p: '1872年以来、Bloomingdale\'s はオシャレの中心地であり、世界中で今一番人気のあるブランドのファッション、靴、ハンドバッグ、化粧品、高級宝飾品、贈答品が揃っています。当店独特の心のこもったおもてなし（多言語スタッフ、スペシャル・コンシェルジュ・サービスなど）でお客様をお迎えいたしますので、ご希望は叶えられ、くつろぎながらお買い物をお楽しみいただけるでしょう。これは、Bloomingdale\'s が世界に名だたる存在である理由のほんの一端です。'
                        }
                    },
                    cat: [
                        '当店の伝統',
                        'デザイナーズ・ショップ',
                        '各店舗のご案内'
                    ],
                    shop: {
                        title: 'オンライン・ショッピング',
                        subtitle: 'もご利用いただけます',
                        ctas: [
                            '婦人用品',
                            'ハンドバッグ',
                            '靴',
                            '宝石・アクセサリ',
                            '紳士用品',
                            '家庭用品',
                            '子供用品',
                            '新着情報',
                            'セール'
                        ],
                        desktopLinks: {
                            women: 'http://www1.bloomingdales.com/shop/womens-apparel?id=2910',
                            handbags: 'http://www1.bloomingdales.com/shop/handbags?id=16958',
                            shoes: 'http://www1.bloomingdales.com/shop/shoes?id=16961',
                            jewelry: 'http://www1.bloomingdales.com/shop/jewelry-accessories?id=3376',
                            men: 'http://www1.bloomingdales.com/shop/mens?id=3864',
                            home: 'http://www1.bloomingdales.com/shop/home?id=3865',
                            kids: 'http://www1.bloomingdales.com/shop/kids?id=3866',
                            sale: 'http://www1.bloomingdales.com/shop/sale?id=3977'
                        },
                        mobileLinks: {
                            women: 'http://www1.bloomingdales.com/shop/womens-apparel/all-women?id=1003340',
                            handbags: 'http://www1.bloomingdales.com/shop/all-handbags-wallets-cases?id=1001396',
                            shoes: 'http://www1.bloomingdales.com/shop/shoes/all-shoes?id=17411',
                            jewelry: 'http://www1.bloomingdales.com/shop/all-jewelry-accessories?id=1003593',
                            men: 'http://www1.bloomingdales.com/shop/mens/all-men?id=1003601',
                            home: 'http://www1.bloomingdales.com/shop/home?id=1003615',
                            kids: 'http://www1.bloomingdales.com/shop/all-kids?id=1003623',
                            sale: 'http://www1.bloomingdales.com/shop/sale/all-sale-clearance?id=1003304'
                        }
                    },
                    pdf: {
                        span: '当サイトでのお買い物の仕方および「よくある質問」をご参照いただけます。',
                        a: '今すぐダウンロード',
                        link: '/fashion/assets/projects/international/china-brazil/guides/Tourism_Microsite_International_Shopping_Guide_Japanese.pdf'
                    }
                },
                heritage: {
                    header: {
                        h1: 'Bloomingdale\'s ストーリー',
                        h2: '沿革'
                    },
                    article: {
                        y1880: [{
                            h3: '1872年 – グレート・イースト・サイド・バザール',
                            p: 'Bloomingdale兄弟「場所、場所、場所は,（商売は場所が重要の意）」というフレーズの生みの親であり、最初の店を938 Third Avenueにオープンしました。最新のパリモードがディスプレイされたウィンドウは注目を集め、レジャーとしてはウィンドウショッピングをするのが、ニューヨークでたちまち人気となりました。'
                        }, {
                            h3: '未来を予見したBloomingdale\'s',
                            p: '59丁目と3番街というニューヨーク小売業のクロスロードに構えられた新しいショップは、「スカイ・キャリッジ（エレベーター）」が自慢の種でした。13年後、Lyman Bloomingdaleは「傾斜させたエレベーター」というアイディアを持つ若い発明家を資金援助し、エスカレーターの誕生を見ました。'
                        }],
                        y1900: [{
                            h3: '世界的に著名となったスローガン',
                            p: '20世紀初め頃のBloomingdale\'sのお客様が最も利用した交通手段はIRTのThird Avenue El（3番街高架鉄道）であったため、ニューヨーク（そして世界）中のビルボード、ビーチパラソル、漫画に「All Cars Transfer to Bloomingdale\'s（全車両Bloomingdale\'s行き）」という有名なスローガンが載りました。駅からBloomingdale\'sまでの歩道には金色の足跡が埋め込まれ、人々はそれをたどって行ったのです。'
                        }, {
                            h3: '1910年 – ぴったりなT型フォード',
                            p: 'Bloomingdale\'sは、ニューヨークで初めてフォード社のT型フォードを配達に使用したショップです。'
                        }],
                        y1920: [{
                            h3: 'Bloomingdale\'s 魅力的に変身',
                            p: 'Bloomingdale\'sはレキシントン街に腰を落ち着け、フロアをさらに11階増やし、黒花崗岩、石灰岩、テラコッタなどの流行の素材を使用して、当時一世を風靡したアールデコのスタイルを取り入れました。レキシントン街から3番街、59丁目から60丁目の1ブロック全体を占め、実に10もの建物がつながれたのです。'
                        }],
                        y1940: [{
                            h3: '75歳になったBloomingdale\'s ティーンエージャーのようにパーティでお祝い',
                            p: 'ダイヤモンド・ジュビリー（75周年）を記念して、Bloomingdale\'sはショップのウィンドウを飾るオートクチュール衣装を制作してもらうため、著名なClaire McCardell、Pauline Trigere、Jo Copelandなどのアメリカで最も熱い26人のデザイナーを招聘しました。また、初のホーム用品のショールームも設けられました。'
                        }],
                        y1960: [{
                            h3: 'ファッション爆発',
                            p: '人類の月面着陸。マスタング。モッズ・ショップ。その他いろいろ。Bloomingdale\'sは、ショップとして初めてYves Saint LaurentやCourrègesなどのヨーロッパの先進的デザイナーを紹介し、アメリカの人々を魅了しました。'
                        }, {
                            h3: 'かっこよくなろうよ',
                            p: 'ショップとして初めて、その時代で一番かっこいいアーティストにショッピングバッグのデザインを依頼することをBloomingdale\'sが始めたのは、1963年秋のことでした。Jonah KinigsteinやMichael Vollbrachtなどのアーティストによって革命的に変わったBloomingdale\'sのバッグは、瞬く間にコレクターズ・アート・アイテムとなりました。これはショッピングバッグの歴史を変えたのです。'
                        }],
                        y1970: [{
                            h3: 'Bloomingdale\'s ハリウッドへ進出',
                            p: 'デカダンスの10年は、Bloomingdale\'sがハリウッドとブロードウェーのパートナーとなった大事件で幕を開けました。著名な映画が59th Street店で撮影され、「マンハッタン」（Woody Allen監督）、「結婚ゲーム」、「出逢い」などの作品はほんの始まりに過ぎず、その後「スプラッシュ」、「ハドソン河のモスコー」と80年代にも続きました。'
                        }, {
                            h3: 'Bloomingdale\'sにビッグ3登場',
                            p: 'Ralph Lauren、Donna Karan、Calvin KleinがBloomingdale\'sでビッグなスタートを切り、当店が若者、新しいこと、フレッシュな展望をサポートする存在であることを、またしても証明しました。'
                        }, {
                            h3: 'ショップの象徴',
                            p: 'Bloomingdale\'sを象徴するBig Brown Bagは、1973年に初めて登場しました。次の年にはLittle Brown Bagが続き、Medium Brown Bagは最後に仲間入りしました。Bloomingdale\'sの歴史上最も認知度の高いショッピングバッグは、世界の美術館で収蔵品として展示されています。'
                        }],
                        y1980: [{
                            h3: '「イメージ」を売るBloomingdale\'s',
                            p: 'Andy WarholはBloomingdale\'sのことを「80年代の新しいタイプのミュージアム」と呼びました。毎日、ショップは最も新しく、最も素晴らしいものをディスプレイする最先端のギャラリーとなるのです。Bloomingdale\'sはガラ・グラマーの時代もすぐ取り入れました。Karl Lagerfeld、Diane von Furstenberg、Liza Minnelli、Oscar de la Rentaなどのファッション界のスターたちが、ショップの華やかなオープニングにジェット機で駆けつけて来ました。 '
                        }, {
                            h3: '1988年 – イヤー・オブ・ザ・ドラゴン',
                            p: 'ニクソン大統領が中国を訪問する1年前に、Bloomingdale\'sはすでに中国本土との通商関係再開を進めていました。その15年後の1988年、初めての中国キャンペーンの大成功に続き、中国との10年の取引を祝って、59th Street flagship店は東洋からのファッションとデザインを7週間にわたって壮大に紹介しました。このテーマで飾りあげられたショップは紫禁城の宝石のように輝きました。'
                        }],
                        y1990: [{
                            h3: 'ニュー・ゴールド・ラッシュ',
                            p: 'カリフォルニアに新しいショップが4日間に4店（Century City、Stanford、Sherman Oaks、Newport Beach）オープンしました。その1年後にはBeverly Centerも加わりました。Bloomingdale\'sは、今や全国規模の幅広い品の揃った高級デパートとして唯一の存在となりました。カリフォルニアの人々はオープンをショッピングで祝い、その後はもちろんビーチへ行っていました。'
                        }],
                        y2000: [{
                            h3: 'Bloomingdale\'s ダウンタウンのファッションクレド獲得',
                            p: 'ダウンタウンへ移れば、いいものはもっと良くなるものです。Bloomingdale\'sはSoHo店をオープンし、ブロードウェーにあるキャスト・アイアンのファサードを持つ歴史建築は、21世紀ファッションの殿堂として輝きを取り戻しました。'
                        }, {
                            h3: 'デジタル時代へ',
                            p: 'bloomingdales.comが誕生しました。このサイトで、デザイナーズ・ブランドの服や豪華なビューティ用品から、ハンドバッグやステートメント・シューズまで揃った世界トップクラスのファッションを、世界中のお客様が指先操作だけで手に入れることができます。 '
                        }, {
                            h3: 'ビューティ刷新',
                            p: '59th Street店のメインフロアは「ニューヨーク最大のメークオーバー」を受け、トップクラスのビューティ・ブランドの最先端のキオスクが並ぶ場所となりました。'
                        }],
                        y2010: [{
                            h3: '2011年 – 新しい宝飾品コーナーのきらめき',
                            p: '59th Street店 – 230か国および50の州から40万を超える人が訪れ、5年連続で「NYCコンシェルジュ・チョイス・アワード」を受賞したショップ – には、David Yurmanなどの世界最高のジュエリー・デザイナーの様々な面が表れた作品を紹介するため、高級宝飾品コーナーが設けられました。'
                        }, {
                            h3: '世界に名だたる存在に限界はありません',
                            p: '現在、Bloomingdale\'sの行く手を遮るものは何もありません。創立の日から当店ブランドと同義であるイノベーションは、これからもラグジュアリー追及という使命の中心であり続けるでしょう。Bloomingdale\'sは、輝かしい歴史を振り返り、そこに未来を見ます。それは世界に名だたる存在である未来です。'
                        }]
                    }
                },
                designer: {
                    header: {
                        h1: '1つの店舗に膨大な数のブランド',
                        h2: '当店はファッション、ビューティをはじめとする最高のデザイナーズ・ブランドを選び抜きます'
                    },
                    article: [
                        'CHANEL、Dior、Michael Kors、MCM、Tory Burch、MARC JACOBS、Armani、Ralph Laurenなど、デザイナーズ・ブランドがBloomingdale\'sほど揃っているところは他にありません。',
                        '最新（そして一番人気）のビューティ用品をお探しですか？La Mer、Estée Lauder、Gucci、Chloé、Clinique、Lancôme、kate spade new yorkなど、当店に揃っているスキンケア、コスメ、香水のブランドから、お気に入りのものはすべて見つかるでしょう。'
                    ]
                },
                stores: {
                    header: {
                        h1: 'Choose Your Destination',
                        h2: 'We\'ll meet you at the Visitor\'s Center'
                    },
                    dropdown: {
                        default: 'Please Select a Store',
                        list: [
                            {id: 'null', name: 'NEW YORK',                              disabled: 'true'},
                            {id: '0',    name: '59th Street Flagship, New York City',   disabled: 'false'},
                            {id: '1',    name: 'SoHo, New York City',                   disabled: 'false'},
                            {id: 'null', name: 'HAWAII',                                disabled: 'true'},
                            {id: '2',    name: 'Ala Moana, Honolulu',                   disabled: 'false'},
                            {id: 'null', name: 'ILLINOIS',                              disabled: 'true'},
                            {id: '3',    name: 'North Michigan Avenue, Chicago',        disabled: 'false'},
                            {id: '4',    name: 'Medinah Home, Chicago',                 disabled: 'false'},
                            {id: 'null', name: 'CALIFORNIA',                            disabled: 'true'},
                            {id: '5',    name: 'San Francisco Centre, San Francisco',   disabled: 'false'},
                            {id: '6',    name: 'South Coast Plaza, Costa Mesa',         disabled: 'false'},
                            {id: '7',    name: 'Southern California Stores',            disabled: 'false'},
                            {id: 'null', name: 'FLORIDA',                               disabled: 'true'},
                            {id: '8',    name: 'Aventura',                              disabled: 'false'},
                            {id: '9',    name: 'Orlando',                               disabled: 'false'}
                        ],
                        copy: 'Bloomingdale\'s has stores all over the U.S. Our Visitor\'s Centers in <b>New York</b>, <b>Hawaii</b>, <b>Chicago</b>, <b>Miami</b> and <b>San Francisco</b> offer a full range of amenities for international customers. Multilingual associates can help you plan the ultimate shopping experience. They\'ll give you a store directory in your chosen language and special events information, as well as arrange complimentary personal stylist appointments, package delivery to your hotel, restaurant reservations (including those located within our stores) and much more. Beach bound? Our many outposts in Southern California—including South Coast Plaza in Ocean County, San Diego and Los Angeles—plus Honolulu, mean you\'ll never be far from the top fashions.'
                    },
                    storeData: {
                        storeHours: 'Store Hours',
                        directions: 'Directions',
                        designers: 'Featured Designers',
                        dining: 'In-Store Dining',
                        services: 'Services',
                        servicesSubHead: 'Our associates will show you why Bloomingdale\'s is like no other store in the world. Look for us wearing flag pins from your country. We can help you find the fashion you love and assist with a range of personalized services.',
                        loyalty: 'Join the International Loyalty Club',
                        loyaltySubHead: 'Our special rewards program was created for international shoppers.* For every dollar you spend, you\'ll earn one point toward gift cards, services and exceptional experiences. Right now, you can enroll in the program at Bloomingdale \'  s Ala Moana, but points can be earned and redeemed at any full-line Bloomingdale \'  s location in the United States.**',
                        id: [
                            {
                                name: '59th Street Flagship',
                                addr: '1000 Third Avenue  New York, NY 10022<br/>+1 212-705-2000',
                                hours: 'Monday–Saturday: Store Opens 10AM <span>|</span> Sunday: Store Opens 11AM',
                                descr: 'Discover Bloomingdale\'s iconic heritage and award-winning hospitality. Begin your day at our flagship store with a stop at our first floor balcony Visitor\'s Center. Our multilingual directory will provide a road map to your shopping trip. Looking for a more personal experience? Learn about our in-store services, from stylist appointments to alterations to restaurant reservations. We\'ll help you arrange all that and more.',
                                dTile: 'VISITING NEW YORK?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-59ST_02.jpg',
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   7th floor <span>|</span>   212-705-3085',
                                        sched: 'Open Daily <span>|</span>   Dine In: 10:30AM–1 hour before store closing <br/>Takeout: 10AM–1/2 hour before store closing',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt. You\'ll also find freshly made salads, sandwiches, soups, a fresh juice bar and selection of Tavalon premium teas. Counter, table service and takeout available.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    },
                                    {
                                        name: '<b>FL!P</b> <span>|</span>   Mid-Level <span>|</span>   212-705-3085',
                                        sched: 'Open Daily <span>|</span>   Dine In: 11AM–1 hour before store closing ',
                                        description: 'Enjoy the "haute couture" of American hamburgers, as well as salads, microbrew beers, a full bar and a variety of French fries, at this laid-back spot in our Men\'s Store.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_02.jpg'
                                    },
                                    {
                                        name: '<b>DAVID BURKE AT BLOOMINGDALE\'S </b> <span>|</span>   Street Level <br />   212-705-3800',
                                        sched: 'Open Daily <span>|</span>   In the Box (to go) 10AM–9PM <span>|</span>   In the Bar (to stay) 11AM–9 PM ',
                                        description: 'Chef David Burke, one of the leading pioneers of American cooking, brings together delicious fare and top service in a lively atmosphere.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_04.jpg'
                                    },
                                    {
                                        name: '<b>MAGNOLIA BAKERY</b> <span>|</span>   Street Level <span>|</span>   212-265-5320',
                                        sched: 'Monday–Friday 7AM–10PM <br/> Saturday 8AM–10PM <span>|</span>   Sunday 8AM–9PM',
                                        description: 'A classic American bakery cherished for its old-fashioned desserts and vintage décor, Magnolia serves a range of handmade baked goods, including pies, cakes, cheesecakes, banana pudding, cupcakes and muffins. Here early? Magnolia opens even before the store does.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_03.jpg'
                                    },
                                    {
                                        name: '<b>LE TRAIN BLEU </b> <span>|</span>   6th floor <span>|</span>   212-705-2100',
                                        sched: 'Monday–Wednesday, Friday–Saturday 10:30AM–5PM <span>|</span>  Thursday 10:30AM–7PM <span>|</span>  Sunday 11:30AM–4:30PM',
                                        description: '<i>Reservations recommended</i><br/>A romantic replica of a turn-of-the-century railway dining car, Le Train Bleu offers the finest American-Continental fare, including daily brunch, lunch and a prix-fixe dinner menu.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_05.jpg'
                                    },
                                    {
                                        name: '<b>B CAFÉ </b> <span>|</span>   6th floor <span>|</span>   212-705-2073',
                                        sched: 'Open Daily <span>|</span>   10AM–store closing',
                                        description: 'Stop by this coffee and snack bar for quick and healthy treats, or to enjoy a light lunch or dinner featuring on-the-go versions of many Le Train Bleu favorites.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    } 
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 212-705-2359 or 212-705-3488 <br/> Email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select wardrobe and home décor options to your taste—all for free. <br/> At Your Service (For Her) 212-705-3135 <br/> At His Service 212-705-3030 '
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'
                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your Manhattan hotel—for free. Just drop them off at our first floor balcony Visitor\'s Center.'
                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home at our gift wrapping station on the sixth floor. '
                                    }
                                ]
                            },
                            {
                                name: 'SoHo',
                                addr: '504 Broadway  New York, NY 10012<br/>+1 212-729-5900',
                                hours: 'Monday–Saturday: Store Opens 10AM <span>|</span> Sunday: Opens 12PM',
                                descr: 'Explore our downtown store in SoHo, the city\'s most fashionable neighborhood. You\'ll find all the stylish energy of our uptown flagship but with the feel of a fashion boutique. Check out our bustling beauty floor, then peruse our latest designer arrivals. As always, multilingual associates are available to help make your visit a memorable one.',
                                dTile: 'VISITING NEW YORK?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_NewYork_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SOHO.jpg',                                
                                designers: [
                                    'BVLGARI',
                                    'Burberry',
                                    'Canali',
                                    'CHANEL', 
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Donna Karan',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Jimmy Choo',
                                    'La Mer',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC JACOBS',
                                    'Michael Kors', 
                                    'Montblanc', 
                                    'Movado', 
                                    'Prada', 
                                    'Ralph Lauren', 
                                    'Salvatore Ferragamo', 
                                    'Sandro',
                                    'Shiseido', 
                                    'Tory Burch', 
                                    'Vera Wang',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   2nd floor  <span>|</span>   212-729-5900',
                                        sched: 'Monday–Friday 10AM–8PM <span>|</span>   Saturday 10AM–7PM  <span>|</span> Sunday 12PM–7PM',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt. You\'ll also find freshly made salads, sandwiches, soups, a fresh juice bar and selection of Tavalon premium teas. Counter, table service and takeout available.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 212-705-2098 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'
                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'
                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your Manhattan hotel—for free. Just drop them off with any sales associate.'
                                    }
                                ]                               
                            },
                            {
                                name: 'Ala Moana',
                                addr: '1450 Ala Moana Blvd  Honolulu, HI 96814<br/>+1 808-644-7511',
                                hours: 'Monday–Saturday: 10AM–8PM | Sunday: 11AM–7PM',
                                descr: 'Say aloha to our newest outpost in tropical Honolulu. Located in the Ala Moana Center, Hawaii\'s premier shopping destination, this three-story store boasts a range of amenities tailored to the overseas shopper. Stop by our International Welcome Center and speak with one of our multilingual associates. We offer international style advisor appointments, on-site alterations, restaurant reservations and much more.</p><p style="margin-top: 10px;">Planning a return visit? Sign up for our International Loyalty Club and earn points toward gift cards, special services and authentic Hawaiian adventures.',
                                dTile: 'VISITING HAWAII?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Hawaii_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-ALA-MOANA.jpg',                                  
                                designers: [
                                    'Burberry',
                                    'Chloé',
                                    'Clinique',
                                    'Fendi',
                                    'Giorgio Armani',
                                    'Longchamp ',
                                    'Jimmy Choo',
                                    'Jo Malone London',
                                    'Lancôme',
                                    'La Mer',
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rebecca Minkoff',
                                    'Tory Burch',
                                    'Villeroy & Boch'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span>   3rd floor  ',
                                        sched: 'Open Daily 11:30AM–1 hour before store closing',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'FULL-SERVICE WELCOME CENTER AND CONCIERGE DESK',
                                        description: 'At the Welcome Center, we\'ll greet you with a complimentary coat and bag check, plus a multilingual store directory. Should you need it, our associates can arrange personal stylist appointments and free package delivery to your hotel. Stop by our concierge desk for alterations and pick-ups or to learn more about Hawaii\'s amenities and attractions.'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS AND BEAUTY ADVISORS ON CALL ',
                                        description: 'Our stylists are available to shop the store with you, or select wardrobe options to your taste—all for free. Interested in a beauty consultation? Our experienced advisors will find you perfect products from the most coveted brands.'
                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'
                                    },
                                    {
                                        title: 'CURRENCY CONVERSION ',
                                        description: 'Steps away from Bloomingdale\'s, you\'ll find a currency exchange located conveniently within the Ala Moana Center.'
                                    },
                                    {
                                        title: 'KICK BACK IN OUR VIP ROOM',
                                        description: 'The first in the Bloomingdale\'s fleet, our limited-access lounge is located within the Welcome Center. Select tourists can indulge in amenities, including: light food and beverage, a TV, private bathroom, charging stations, a Bluetooth printer for boarding passes and iPads® preloaded with the Bloomingdale\'s app and helpful travel guides in nearly every language. One-day access to the lounge is available to tourists with receipts of $500 or more.',
                                    }
                                ],
                                loyalty: [
                                    {
                                        title: 'EARN A GIFT CARD',
                                        description: '500 points = $25 gift card, good for any merchandise at Bloomingdale\'s Ala Moana.'
                                    },
                                    {
                                        title: 'ENJOY STORE SERVICES',
                                        description: 'Your points can earn you complimentary package delivery back to your hotel, lunch or a car service to your next destination. For more information, see an associate at the Welcome Center on the first floor.'
                                    },
                                    {
                                        title: 'INDULGE IN AN EXPERIENCE YOU\'LL NEVER FORGET',
                                        description: 'Redeem your points for authentic Hawaiian adventures! For more information, see an associate at the Welcome Center on the first floor.'
                                    },
                                    {
                                        title: '',
                                        description: '*Proof of international address required.<br/>**Points cannot be redeemed at Bloomingdale\'s outlet stores or on bloomingdales.com. Points can only be redeemed for services or experiences at Bloomingdale\'s Ala Moana.'
                                    }                                      
                                ]                                    
                            },
                            {
                                name: 'North Michigan Avenue',
                                addr: '900 North Michigan Avenue  Chicago, IL 60611<br/>+1 312-440-4460 ',
                                hours: 'Monday–Saturday: 10AM–8PM | Sunday: 11AM–7PM',
                                descr: 'Planning a trip to the Windy City? Let Bloomingdale\'s be your fashion guide. Fill out your wardrobe with our vast collection of designer names, or stock up on your favorite beauty products. Our multilingual associates can help tailor your shopping trip to your every need.',
                                dTile: 'VISITING CHICAGO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-NORTH-MICHIGAN-AVENUE.jpg',                                                                  
                                designers: [
                                    'Burberry',
                                    'Canada Goose',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Gucci',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Moncler',
                                    'Ralph Lauren',
                                    'Ray-Ban',
                                    'Salvatore Ferragamo',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'UGG® Australia '
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> 6th floor <span>|</span> 312-440-4861',
                                        sched: 'Monday–Saturday 11AM–6PM',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 312-440-4596 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select wardrobe and home decor options to your taste—all for free. <br/> At Your Service 312-440-4887 '

                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your downtown hotel—for free. Just drop them off at our third floor Visitor\'s Center. '

                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Visit the fifth floor Customer Service desk. '

                                    }
                                ]  
                            },
                            {
                                name: 'Medinah Home',
                                addr: '600 North Wabash Avenue  Chicago, IL 60611<br/>+1 312-324-7500',
                                hours: 'Monday–Saturday: Store Opens 10AM <span>|</span> Sunday: Opens 12PM',
                                descr: 'Deck out your home with a trip to Chicago\'s Medinah Home store. Here you\'ll find luxurious bedding, designer kitchen appliances, plush bathroom accessories and more. Experience our award-winning hospitality first hand with a full range of in-store services.',
                                dTile: 'VISITING CHICAGO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Chicago_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-MEDINAH-HOME.jpg',                                                                                                  
                                designers: [
                                    'Nespresso',
                                    'Rimowa',
                                    'Tumi',
                                    'Victorinox'
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 312-440-4596 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select home décor options to your taste—all for free.<br/> At Your Service 312-324-7633 '

                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'

                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Visit our second floor Gift Wrap station.'

                                    }
                                ] 
                            },
                            {
                                name: 'San Francisco Centre',
                                addr: '845 Market Street  San Francisco, CA<br/>+1 415-856-5402',
                                hours: 'Monday–Saturday: 10AM–9PM | Sunday: 11AM–8PM',
                                descr: 'Discover the best of San Francisco shopping. First stop, Bloomingdale\'s. Head to our Visitor\'s Center for a multilingual directory, or speak to our multilingual associates to tailor your experience to your needs. Learn more about our in-store amenities below.',
                                dTile: 'VISITING SAN FRANCISCO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SanFran_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SAN-FRANCISCO-CENTRE.jpg',
                                designers: [
                                    'Alice + Olivia',
                                    'BCBGMAXAZRIA',
                                    'Burberry', 
                                    'Calvin Klein',
                                    'CHANEL',
                                    'COACH',
                                    'Clinique', 
                                    'Dior', 
                                    'DIANE von FURSTENBERG',
                                    'Elie Tahari', 
                                    'Escada',
                                    'Estée Lauder',
                                    'Giorgio Armani',
                                    'Helmut Lang',
                                    'kate spade new york',
                                    'La Mer',
                                    'Lancôme',
                                    'Longchamp', 
                                    'Louis Vuitton', 
                                    'MARC BY MARC JACOBS',
                                    'Michael Kors',
                                    'Ralph Lauren',
                                    'Rebecca Taylor',
                                    'Salvatore Ferragamo',
                                    'TAG Heuer', 
                                    'Tory Burch', 
                                    'Trina Turk'
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 415-856-5477 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select wardrobe and home decor options to your taste—all for free. <br/> At Your Service 415-856-5538 '

                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card and all forms of China UnionPay.<div class="unionpay">'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    },
                                    {
                                        title: 'DELIVERY TO YOUR HOTEL ',
                                        description: 'We will gladly deliver your purchases of $250 USD or more to your downtown hotel—for free. Just drop them off at our first floor balcony Visitor\'s Center.'

                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home at the Visitor\'s Center.'

                                    }
                                ]                               
                            },
                            {
                                name: 'South Coast Plaza',
                                addr: '3333 Bristol St  Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                hours: 'Monday–Saturday: 10AM–9PM | Sunday: 11AM–7PM',
                                descr: 'With the best designer selection, edited specifically for Southern California, South Coast Plaza is a must-go shopping destination. New to the Golden State? Multilingual associates will make your stay that much better. Start with a store directory in your chosen language or add to your shopping trip with our in-store amenities below.',
                                dTile: 'VISITING COSTA MESA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthCoastPlaza_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-SOUTH-COAST-PLAZA.jpg',
                                designers: [
                                    'Burberry',
                                    'Calvin Klein',
                                    'Canada Goose',
                                    'CHANEL',
                                    'Chloé',
                                    'COACH',
                                    'DIANE von FURSTENBERG',
                                    'Dior',
                                    'Estée Lauder',
                                    'Fendi',
                                    'Giorgio Armani Beauty',
                                    'Gucci',
                                    'Hugo Boss',
                                    'Kiehl\'s Since 1851',
                                    'La Mer',
                                    'La Prairie',
                                    'Longchamp',
                                    'Longines Watches',
                                    'Louis Vuitton',
                                    'MARC JACOBS',
                                    'MCM',
                                    'Michael Kors',
                                    'Miu Miu',
                                    'Moncler',
                                    'Montblanc',
                                    'Prada',
                                    'Ralph Lauren',
                                    'Rimowa',
                                    'Salvatore Ferragamo',
                                    'Stuart Weitzman',
                                    'Ted Baker',
                                    'Tory Burch',
                                    'Tumi',
                                    'UGG® Australia',
                                    'Yves Saint Laurent Beauty'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>AnQi by Crustacean Gourmet Bistro & Noodle Bar</b> <br/>  Ground Floor <span>|</span> 714-557-5679',
                                        sched: 'Lunch: Open Daily 11:30AM–2:30PM <br/> Noodle Bar: Open Daily 11:30AM–5:30PM <br/> Dinner: Sunday–Thursday 5:30PM–10:30PM <br/>Friday–Saturday 5:30PM–11:00PM <br/> Red Happy Hour: Monday–Friday 4PM–7PM',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_08.jpg'
                                    },
                                    {
                                        name: '<b>Holsteins</b> <span>|</span> Ground Floor <span>|</span> 714-352-2525',
                                        sched: 'Monday - Thursday: 11AM–12AM <br/> Friday & Saturday: 11AM–2AM  <br/> Sunday: 11AM–12AM ',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_09.jpg'
                                    }                                    
                                ],
                                services: [
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting. '
                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Find it all on the lower level.'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept all forms of China UnionPay.<div class="unionpay">'
                                    }
                                ]                                    
                            },
                            {
                                name: 'Southern California Stores',
                                addr: '',
                                hours: '',
                                descr: 'With outposts across Los Angeles, Orange County and San Diego, Bloomingdale\'s has left its iconic mark on SoCal. Shop the fashion, accessories, shoes and beauty brands you love in any one of our stores. Learn more about our in-store amenities below.',
                                dTile: 'VISITING SOUTHERN CALIFORNIA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_SouthernCalifornia_EN.pdf',
                                designersImg: '',                                
                                stores: [
                                    {
                                        area: 'Orange County',
                                        list: [
                                            {
                                                name: 'South Coast Plaza',
                                                addr: '3333 South Bristol Street, Costa Mesa, CA 92626<br/>+1 714-824-4600',
                                                hours: 'Hours:<br/>Monday–Tuesday 10AM–9PM <br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 10AM–8PM'
                                            },
                                            {
                                                name: 'Newport Fashion Island',
                                                addr: '701 Newport Center Drive, Newport Beach, CA 92660<br/>+1 949-729-6600',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–8PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            }     
                                        ]                                   
                                    },
                                    {
                                        area: 'Los Angeles',
                                        list: [
                                            {
                                                name: 'Century City',
                                                addr: '10250 Santa Monica Boulevard, Los Angeles, CA 90067<br/>+1 310-772-2100',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            },
                                            {
                                                name: 'Beverly Center',
                                                addr: '8500 Beverly Boulevard, Los Angeles, CA 90048<br/>+1 310-360-2700',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 12PM–8PM'
                                            },
                                            {
                                                name: 'Santa Monica Place',
                                                addr: '315 Colorado Avenue, Santa Monica, CA 90401<br/>+1 310-985-6400',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–8PM'
                                            },
                                            {
                                                name: 'Glendale Galleria',
                                                addr: '103 South Brand Blvd., Glendale, CA 91210<br/>+1 818-638-4100',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–9PM'
                                            },
                                            {
                                                name: 'Sherman Oaks Fashion Square',
                                                addr: '14060 Riverside Drive, Sherman Oaks, CA 91423<br/>+1 818-325-2200',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–9PM<br/>Wednesday–Saturday 10AM–10PM<br/>Sunday 11AM–9PM'
                                            }     
                                        ]                                   
                                    }, 
                                    {
                                        area: 'San Diego',
                                        list: [
                                            {
                                                name: 'Fashion Valley',
                                                addr: '7057 Friars Road, San Diego, CA 92108<br/>+1 619-610-6400',
                                                hours: 'Hours: <br/>Monday–Tuesday 10AM–8PM<br/>Wednesday 10AM–8PM<br/>Thursday–Saturday 10AM–10PM<br/>Sunday 12PM–8PM'
                                            }   
                                        ]                                   
                                    }                                                                       
                                ],
                                services: [
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting. Available at select locations.'
                                    },
                                    {
                                        title: 'CARDS & RIBBON TO TAKE HOME ',
                                        description: 'We will gift wrap your purchases, or you can pick up cards, boxes, wrapping paper and ribbon to take home. Available at select locations.'
                                    },
                                    {
                                        title: 'PERSONAL STYLISTS ON CALL',
                                        description: 'Our personal stylists are available to shop the store with you, or select home décor options to your taste—all for free. Available at select locations.'
                                    }
                                ]  
                            },
                            {
                                name: 'AVENTURA',
                                addr: '19555 Biscayne Boulevard  Aventura, FL 33180<br/>+1 305-792-1246',
                                hours: 'Monday–Saturday: 10AM–10PM <span>|</span> Sunday: 12PM–9PM',
                                descr: 'Planning your vacation itinerary? Start with a trip to Florida\'s Aventura store. Explore our extensive selection of designer fashions, beauty brands, luxurious accessories and more. Get shopping with a store directory in your chosen language and be sure to make the most of your experience with our in-store amenities listed below.',
                                dTile: 'VISITING AVENTURA?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Aventura_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-AVENTURA.jpg',
                                designers: [
                                    'Baccarat',
                                    'Bernardaud',
                                    'BVLGARI',
                                    'Burberry',
                                    'Calvin Klein ',
                                    'Canali ',
                                    'CHANEL ',
                                    'Christofle ',
                                    'David Yurman ',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel ',
                                    'Dior ',
                                    'Fendi ',
                                    'Furla ',
                                    'Giorgio Armani',
                                    'Gucci ',
                                    'HUGO BOSS ',
                                    'Jimmy Choo ',
                                    'John Varvatos', 
                                    'La Mer ',
                                    'Lalique',
                                    'Longchamp', 
                                    'Louis Vuitton ',
                                    'M·A·C ',
                                    'MARC BY MARC JACOBS ',
                                    'Michael Kors ',
                                    'Miki House ',
                                    'Montblanc ',
                                    'Movado ',
                                    'PANDORA',
                                    'Prada ',
                                    'Pratesi ',
                                    'Ralph Lauren ',
                                    'Roberto Coin ',
                                    'Salvatore Ferragamo ',
                                    'Sferra ',
                                    'Shiseido ',
                                    'TAG Heuer ',
                                    'Tory Burch ',
                                    'Villeroy & Boch ',
                                    'Z Zegna'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>59TH & LEX CAFE</b> <span>|</span> 2nd floor <span>|</span> 305-792-1180',
                                        sched: 'Monday–Saturday 10AM–7:30PM <span>|</span> Sunday 12PM–5PM',
                                        description: '',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_06.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 305-792-1175 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    }
                                ]     
                            },
                            {
                                name: 'ORLANDO',
                                addr: '4152 Conroy Road  Orlando, FL 32839<br/>+1 407-264-2514',
                                hours: 'Monday–Saturday: 10AM–9PM | Sunday: 11AM–7PM',
                                descr: 'Stocked with the best designers and beauty brands, Bloomingdale\'s Orlando is your ticket to world-class shopping. Stop in on your next trip to the Sunshine State for an experience tailored to you. Pick up a store directory in your chosen language, then take advantage of the many in-store amenities listed below.',
                                dTile: 'VISITING ORLANDO?',
                                dInfo: 'Download our welcome booklet before you arrive.',
                                dFile: '/fashion/assets/projects/international/china-brazil/booklets/Bloomingdales_Orlando_EN.pdf',
                                designersImg: '/fashion/images/projects/international/china-brazil/VisitStores_featuredDesigners-ORLANDO.jpg',
                                designers: [
                                    'Burberry',
                                    'Canali ',
                                    'COACH',
                                    'DIANE von FURSTENBERG ',
                                    'Diesel Jeans',
                                    'Dior ',
                                    'Fendi ',
                                    'Frankie B Jeans ',
                                    'John Varvatos ',
                                    'Joie ',
                                    'La Mer ',
                                    'Longchamp', 
                                    'Montblanc ',
                                    'Movado ',
                                    'Ralph Lauren ',
                                    'Salvatore Ferragamo ',
                                    'Sandro ',
                                    'Shiseido ',
                                    'Ted Baker ',
                                    'Tory Burch ',
                                    'Vince'
                                ],
                                restaurants: [
                                    {
                                        name: '<b>FORTY CARROTS</b> <span>|</span> Level 1 <span>|</span> 407-264-2683',
                                        sched: 'Monday–Saturday 10AM–9PM <span>|</span> Sunday 11AM–7PM',
                                        description: 'A visit isn\'t complete without our famous frozen yogurt.',
                                        imgURL: '/fashion/images/projects/international/china-brazil/VisitStores_Dining_01.jpg'
                                    }
                                ],
                                services: [
                                    {
                                        title: 'WE\'LL GATHER YOUR GIFT LIST ',
                                        description: 'Shopping for gifts is so easy at Bloomingdale\'s. Just send our multilingual specialist your wish list before you visit and you\'ll find all your items waiting when you arrive.<br /> Call 305-792-1175 or email <a class="fucsia" href="mailto:international_visitors@bloomingdales.com">international_visitors@bloomingdales.com</a>'
                                    },
                                    {
                                        title: 'PAYMENT MADE EASY ',
                                        description: 'We accept the American Express® Global Travel Card.'

                                    },
                                    {
                                        title: 'QUICK ALTERATIONS ',
                                        description: 'We perform professional tailoring and alteration services on site by request. Prices are available at the time of your fitting.'

                                    }
                                ]       
                            }                                
                        ]
                    }
                },                
                socialshare: {
                    fb: {
                        name: 'International Tourism | bloomingdales.com',
                        description: 'From designer clothing to the most-coveted beauty brands, explore all that Bloomingdale\'s has to offer on their updated international site.'
                    },
                    pinterest: {
                        description: 'International Tourism | bloomingdales.com'
                    },
                    twitter: {
                        text: 'Love to shop @bloomingdales? Check out their international site for new designer clothing, accessories & beauty. http://bit.ly/1M3fLiB'
                    },
                    weibo: {
                        url: 'http://weibo.com/bloomingdalesusa',
                        title: 'Discover Bloomingdale\'s luxury fashions, storied history and world-class hospitality on their updated international site.'
                    },
                    weixin: {
                        text: 'Scan the QR code to receive push notifications from Bloomingdale\'s.'
                    }
                },
                contactUs: {
                    formTitle: 'ご連絡ください',
                    left: {
                        title: 'ご来店をお知らせください',
                        p1: 'どのBloomingdale\'s 店舗へのご来店がご希望か、そしてご旅行の日程について、どうぞお知らせください。',
                        p2: 'このフォームに記入して送信いただけば、当店の多言語スタッフが後ほどご連絡いたします。'
                    },
                    right: {
                        name: '名前:',
                        nameErr: '私達にあなたの名前を教えてください',
                        email: 'Eメール:',
                        emailErr1: '私達にあなたの電子メールを教えてください',
                        emailErr2: '無効なメールアドレス',
                        phone: '携帯電話番号（任意）:',
                        phoneErr: '無効な電話番号',
                        party: 'お越しいただくお客様の人数:',
                        partyErr: '全員の人数を教えてください',
                        dates: 'アメリカ旅行の日程:',
                        arriving: '到着日:',
                        departing: '出発日:',
                        datesErr: '日にちを選択',
                        storesH: 'ご来店希望店舗:',
                        storesM: '店舗をお選びください',
                        storesErr: '店舗をお選びください',
                        stores: [
                            {id: 'New York', name: 'ニューヨーク', disabled: 'true'},
                            {id: '59th Street Flagship, New York City', name: '59th Street Flagship, New York City', disabled: 'false'},
                            {id: 'SoHo, New York City', name: 'SoHo, New York City', disabled: 'false'},
                            {id: 'Hawaii', name: 'ハワイ', disabled: 'true'},
                            {id: 'Ala Moana, Honolulu', name: 'Ala Moana, Honolulu', disabled: 'false'},
                            {id: 'Illinois', name: 'イリノイ', disabled: 'true'},
                            {id: 'North Michigan Avenue, Chicago', name: 'North Michigan Avenue, Chicago', disabled: 'false'},
                            {id: 'Medinah Home, Chicago', name: 'Medinah Home, Chicago', disabled: 'false'},
                            {id: 'California', name: 'カリフォルニア', disabled: 'true'},
                            {id: 'Beverly Center, Los Angeles', name: 'Beverly Center, Los Angeles', disabled: 'false'},
                            {id: 'Century City, Los Angeles', name: 'Century City, Los Angeles', disabled: 'false'},
                            {id: 'Fashion Valley, San Diego', name: 'Fashion Valley, San Diego', disabled: 'false'},
                            {id: 'Glendale Galleria, Glendale', name: 'Glendale Galleria, Glendale', disabled: 'false'},
                            {id: 'Newport Fashion Island, Newport Beach', name: 'Newport Fashion Island, Newport Beach', disabled: 'false'},
                            {id: 'San Francisco Centre, San Francisco', name: 'San Francisco Centre, San Francisco', disabled: 'false'},
                            {id: 'Santa Monica Place, Santa Monica', name: 'Santa Monica Place, Santa Monica', disabled: 'false'},
                            {id: 'Sherman Oaks Fashion Square, Sherman Oaks', name: 'Sherman Oaks Fashion Square, Sherman Oaks', disabled: 'false'},
                            {id: 'South Coast Plaza, Costa Mesa', name: 'South Coast Plaza, Costa Mesa', disabled: 'false'},
                            {id: 'Florida', name: 'フロリダ', disabled: 'true'},
                            {id: 'Aventura', name: 'Aventura', disabled: 'false'},
                            {id: 'Orlando', name: 'Orlando', disabled: 'false'}
                        ],
                        submit: 'submit',
                        submitHead: 'thank you for<br/>your submission',
                        submitBody: 'A member of our tourism team will contact you shortly.'
                    }
                },                
                footer: [
                    '10%オフになります—メールサービスに<b><u>サインアップ</u></b>',
                    'like no other store in the world'
                ]
            },
        };
        
        var services = {
                init: init,
                getAttr: getAttr,
                setAttr: setAttr,
                clearAttr: clearAttr
            };

        return services;

        ////////////////////////////////
        
        function init() {
            CacheService.put('copy', translationDATA);
        }

        function getAttr(key) {
            var attr = CacheService.get(key);

            if (attr) {
                return attr;
            }

            return null;
        }
        
        function setAttr(key, value) {
            CacheService.put(key, value);
        }

        function clearAttr(key) {
            CacheService.put(key, '');
        }
    }
})();
