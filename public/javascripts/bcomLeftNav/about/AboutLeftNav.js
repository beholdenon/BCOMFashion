define( [ "LeftNav" ], function ( LeftNav ) {
    var data = {
        currPageLinkId: "link3",
        nav: [
            [
                {
                    type: 'header',
                    text: 'ABOUT US',
                    label: 'About Us',
                    href: 'http://www1.bloomingdales.com/media/about/index.jsp?cm_sp=FOOTER-_-BOTTOM_NAV-_-ABOUT_US',
                    //href: '/media/about/directory/',
                    id: 'about_aboutUs',
                    secure: false
                }
            ],
            [
                {
                    type: 'header',
                    text: 'WAYS TO SHOP',
                    label: 'Ways To Shop',
                    //href: 'http://www1.bloomingdales.com/ways-to-shop/index.jsp',
                    href: '/about-us/store-events-ways-to-shop/',
                    id: 'about_waysToShop',
                    secure: false
                },
                {
                    text: 'Bloomingdale\'s App',
                    //href: '/about-us/mobile-shopping-online',
                    href: '//www1.bloomingdales.com/media/about/mobile.jsp',
                    id: 'about_onlineMobile',
                    secure: false
                },
                {
                    text: 'Store Locations & Events',
                    //href: '/about/new-store-openings/',
                    href: '//locations.bloomingdales.com/store-locator?cm_sp=NAVIGATION-_-TOP_NAV-_-STORES_EVENTS-n-n&EFCKEY=%7B%22EXPERIMENT%22%3A%5B1536%2C1926%5D%7D&SEED=-1958664720940199450',
                    id: 'about_storeLocationsEvents',
                    secure: false
                },
                {
                    text: 'Pick Up In Store',
                    //href: '/about/newstores/',
                    href: '/about-us/buy-online-pickup-in-store/?cm_sp=ways_to_shop-_-bops',
                    id: 'about_pickUpInStore',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'SHOPPING SERVICES',
                    label: 'Shopping Services',
                    href: 'http://www1.bloomingdales.com/about/shopping/index.jsp',
                    //href: '/about-us/shopping/shopping-services/',
                    id: 'about_shoppingServices',
                    secure: false
                },
                {
                    text: 'Size Charts',
                    href: '/about-us/shopping/sizecharts/womens-petite-plus/',
                    id: 'about_sizeCharts',
                    secure: false
                },
                [
                    {
                        text: 'Size Charts',
                        id: null,
                        display:'hidden'
                    },
                    {
                        text: 'Women',
                        //href: '/about/shopping/',
                        href: '/about-us/shopping/sizecharts/womens-petite-plus/',
                        //href: '//www1.bloomingdales.com/about/shopping/sizecharts/women.jsp',
                        id: 'about_women',
                        secure: false
                    },
                    {
                        text: 'Men',
                        //href: '/about/shopping/',
                        //href: '//www1.bloomingdales.com/about/shopping/sizecharts/women.jsp',
                        href: '/about-us/shopping/sizecharts/mens-shirt-suit-clothing/',
                        id: 'about_men',
                        secure: false
                    },
                    {
                        text: 'Kids',
                        //href: '/about/shopping/',
                        //href: '//www1.bloomingdales.com/about/shopping/sizecharts/women.jsp',
                        href: '/about-us/shopping/sizecharts/kids-boys-girls-clothing/',
                        id: 'about_kids',
                        secure: false
                    },
                    {
                        text: 'Shoes',
                        //href: '/about/shopping/',
                        //href: '//www1.bloomingdales.com/about/shopping/sizecharts/women.jsp',
                        href: '/about-us/shopping/sizecharts/mens-womens-kids-shoes/',
                        id: 'about_shoes',
                        secure: false
                    }
                ],
                {
                    text: 'Check Gift Card Balance',
                    //href: '/about/shopping/',
                    href: 'https://www.bloomingdales.com/account/giftcardbalance',
                    id: 'about_checkGiftCardBalance',
                    secure: false
                },
                {
                    text: 'Business Gifts',
                    href: '/about-us/shopping/corporate-business-gifts/',
                    id: 'about_businessGifts',
                    secure: false
                },
                {
                    text: 'Personal Shoppers',
                    href: '/about-us/shopping/personal-shopper-complimentary-service/',
                    id: 'about_personalShoppers',
                    secure: false
                },
                {
                    text: 'Studio Services',
                    href: '/about-us/shopping/fashion-studio-styling-services/',
                    id: 'about_studioServices',
                    secure: false
                },
                {
                    text: 'Find A Wish List',
                    //href: '/about/shopping/',
                    href: '//www.bloomingdales.com/wishlist/find',
                    id: 'about_findAWishList',
                    secure: false
                },
                {
                    text: 'Visitor Services',
                    //href: '/about/shopping/',
                    href: 'https://www.bloomingdales.com/about/shopping/international.jsp',
                    id: 'about_visitorServices',
                    secure: true
                },
                {
                    text: 'Safety Recall Notice',
                    //href: '/about/shopping/',
                    href: '//www.customerservice-bloomingdales.com/app/answers/detail/a_id/355',
                    id: 'about_safetyRecallNotice',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'B.CAUSE',
                    label: 'b.cause',
                    href: '/about-us/philanthropy/',
                    id: 'about_bCause'
                },
                {
                    text: 'amfAR',
                    href: '/about-us/amfar-b-cause-philanthropy/',
                    id: 'about_amfAr'
                },
                {
                    text: 'BCRF',
                    href: '/about-us/breast-cancer-research-foundation-b-cause-philanthropy/',
                    id: 'about_bcrf'
                },
                {
                    text: 'Child Mind Institute',
                    href: '/about-us/child-mind-institute-b-cause-philanthropy/',
                    id: 'about_childMindInstitute'
                },
                {
                    text: 'Help USA',
                    href: '/about-us/help-usa-b-cause-philanthropy/',
                    id: 'about_helpUsa'
                },
                {
                    text: 'JDRF',
                    href: '/about-us/jdrf-b-cause-philanthropy/',
                    id: 'about_jdrf'
                }

            ],
            [
                {
                    type:'header',
                    text: 'NEW STORES',
                    label: 'New Stores',
                    href: '/about-us/new-store-openings/',
                    //href: '//www1.bloomingdales.com/about/newstores.jsp',
                    id: 'about_newStores',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'OUR HISTORY',
                    label: 'Our History',
                    href: '/media/about/history/',
                    id: 'about_ourHistory',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'PRESS RELEASES',
                    label: 'Press Releases',
                    //href: '/about/newstores/',
                    href: '//www1.bloomingdales.com/about/company/press/index.ognc',
                    id: 'about_pressReleases',
                    secure: false
                }
            ],
            [

                {
                    type:'header',
                    text: 'CAREERS',
                    label: 'Careers',
                    //href: '/about/newstores/',
                    href: '//www.bloomingdalesjobs.com/',
                    target: '_blank',
                    id: 'about_careers',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'DIVERSITY',
                    label: 'Diversity',
                    //href: '/about/newstores/',
                    href: 'http://www.macysdiversityleadership.com/',
                    id: 'about_diversity',
                    target: '_blank',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'AFFILIATE PROGRAM',
                    label: 'Affiliate Program',
                    //href: '/about/newstores/',
                    href: '/about-us/affiliate-program-network-partner/?cm_sp=about_us-_-left_nav-_-affiliate',
                    id: 'about_affiliateProgram',
                    secure: false
                }

            ]

        ]
    };

    data.nav.push.apply( data.nav );
    return new LeftNav( data );

} );
