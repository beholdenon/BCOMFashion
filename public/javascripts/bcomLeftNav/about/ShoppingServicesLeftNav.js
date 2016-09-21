define( [ "bcomLeftNav/about/AboutLeftNav", "iShip" ], function ( aboutLeftNav, iShip ) {
    var storeLeftNavData,
        shoppingServicesChildrenData = [ {
            text: 'Size Charts',
            href: '/about/shopping/sizecharts/women.jsp',
            id: 'ln_sizeCharts'
        }, {
            text: 'Check Gift Card Balance',
            href: '/service/gift/index.ognc',
            id: 'ln_chckGcBal'
        }, {
            text: 'Business Gifts',
            href: '/about/shopping/corporate.jsp',
            id: 'ln_bussinessGfts'
        }, {
            text: 'Personal Shoppers',
            href: '/about/shopping/personal.jsp',
            id: 'ln_personalShoppers'
        }, {
            text: 'Studio Services',
            href: '/about/shopping/studio.jsp',
            id: 'ln_studioServices'
        }, {
            text: 'Find a Wish List',
            href: '/myinfo/wishlist/search.ognc?action=search',
            id: 'ln_findsWishlist'
        }, {
            text: 'Visitor Services',
            href: '/about/shopping/international.jsp',
            id: 'ln_visitorServices'
        }, {
            text: 'Safety Recall Notice',
            href: '/about/shopping/product-recall.jsp',
            id: 'ln_safetyRecall'
        } ];
    storeLeftNavData = aboutLeftNav.data.nav[ 0 ];
    for ( var i = 0; i < storeLeftNavData.length; i++ ) {
        if ( storeLeftNavData[ i ].id === "about_shoppingServices" ) {
            if ( iShip.isInternationalMode() ) {
                shoppingServicesChildrenData.splice( 1, 5 );
                storeLeftNavData[ i ].children = shoppingServicesChildrenData;

            } else {
                storeLeftNavData[ i ].children = shoppingServicesChildrenData;
            }
        }
    }
    return aboutLeftNav;
} );
