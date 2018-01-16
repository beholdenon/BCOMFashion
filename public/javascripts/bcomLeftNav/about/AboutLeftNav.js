define( [ "LeftNav" ], function ( LeftNav ) {
    var data = {
        currPageLinkId: "link3",
        nav: [
            [
                {
                    type: 'header',
                    text: 'ABOUT US',
                    label: 'About Us',
                    href: '/b/about-us/directory/',
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
                    href: '/b/about-us/store-events-ways-to-shop/',
                    id: 'about_waysToShop',
                    secure: false
                },
                {
                    text: 'Bloomingdale\'s App',
                    href: '/b/about-us/mobile-shopping-online',
                    //href: '//www1.bloomingdales.com/media/about/mobile.jsp',
                    id: 'about_bloomingdalesApp',
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
                    href: '/b/about-us/buy-online-pickup-in-store/?cm_sp=ways_to_shop-_-bops',
                    id: 'about_pickUpInStore',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'SHOPPING SERVICES',
                    label: 'Shopping Services',
                    href: '/b/about-us/shopping/shopping-services/',
                    id: 'about_shoppingServices',
                    secure: false
                },
                {
                    text: 'Book an Appointment',
                    href: '/b/about-us/appointment-scheduling-in-store-services/',
                    id: 'about_bookAnAppointment',
                    secure: false
                },
                {
                    text: 'Personal Shoppers',
                    href: '/b/about-us/shopping/personal-shopper-complimentary-service/',
                    id: 'about_personalShoppers',
                    secure: false
                },
                {
                    text: 'Visitor Services',
                    href: '/b/about-us/shopping/international-visitor-services/',
                    id: 'about_visitorServices',
                    secure: true
                },
                {
                    text: 'Business Gifts',
                    href: '/b/about-us/shopping/corporate-business-gifts/',
                    id: 'about_businessGifts',
                    secure: false
                },
                {
                    text: 'Studio Services',
                    href: '/b/about-us/shopping/fashion-studio-styling-services/',
                    id: 'about_studioServices',
                    secure: false
                },
                {
                    text: 'Check Gift Card Balance',
                    //href: '/about/shopping/',
                    href: 'https://www.bloomingdales.com/account/giftcardbalance',
                    id: 'about_checkGiftCardBalance',
                    secure: false
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
                    href: '/b/about-us/philanthropy/',
                    id: 'about_bCause'
                },
                {
                    text: 'amfAR',
                    href: '/b/about-us/amfar-b-cause-philanthropy/',
                    id: 'about_amfAr'
                },
                {
                    text: 'Pink Campaign',
                    href: '/b/about-us/pink-campaign-b-cause-philanthropy/',
                    id: 'about_pinkCampaign'
                },
                {
                    text: 'Child Mind Institute',
                    href: '/b/about-us/child-mind-institute-b-cause-philanthropy/',
                    id: 'about_childMindInstitute'
                },
                {
                    text: 'HELP USA & Mentoring USA',
                    href: '/b/about-us/help-usa-b-cause-philanthropy/',
                    id: 'about_helpUsa'
                },
                {
                    text: 'JDRF',
                    href: '/b/about-us/jdrf-b-cause-philanthropy/',
                    id: 'about_jdrf'
                }

            ],
            [
                {
                    type:'header',
                    text: 'EMPLOYEE GIVING & VOLUNTEERISM',
                    label: 'Employee Giving & Volunteerism',
                    href: '/b/about-us/giving-back-to-community/',
                    id: 'about_employeeGiving',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'DIVERSITY & INCLUSION',
                    label: 'Diversity & Inclusion',
                    href: '/b/about-us/diversity-inclusion/',
                    id: 'about_diversityInclusion',
                    secure: false
                }
            ],
            [
                {
                    type:'header',
                    text: 'NEW STORES',
                    label: 'New Stores',
                    href: '/b/about-us/new-store-openings/',
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
                    href: '/b/about-us/history/',
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
                    href: '/b/about-us/company/press/index/',
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
                    text: 'AFFILIATE PROGRAM',
                    label: 'Affiliate Program',
                    //href: '/about/newstores/',
                    href: '/b/about-us/affiliate-program-network-partner/?cm_sp=about_us-_-left_nav-_-affiliate',
                    id: 'about_affiliateProgram',
                    secure: false
                }

            ]

        ]
    };

    data.nav.push.apply( data.nav );
    return new LeftNav( data );

} );
