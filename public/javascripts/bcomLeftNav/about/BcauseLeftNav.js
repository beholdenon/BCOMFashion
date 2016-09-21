define( [ "bcomLeftNav/about/AboutLeftNav", "iShip" ], function ( aboutLeftNav, iShip ) {
    var storeLeftNavData;
    var shoppingServicesChildrenData = [ {
            text: 'amfAR',
            href: '/landingpages/amfar/',
            id: 'about_amfAr'
        }, {
            text: 'BCRF',
            href: '/landingpages/bcrf/',
            id: 'about_bcrf'
        }, {
            text: 'Child Mind Institute',
            href: '/landingpages/childmind/',
            id: 'about_childMindInstitute'
        }, {
            text: 'Help USA',
            href: '/landingpages/mentoringusa/',
            id: 'about_helpUsa'
        }, {
            text: 'JDRF',
            href: '/landingpages/jdrf/',
            id: 'about_jdrf'
        } ];
    storeLeftNavData = aboutLeftNav.data.nav[ 0 ];
    storeLeftNavData.forEach(function(item){
        if (item.id === "about_bCause" ) {
            item.children = shoppingServicesChildrenData;
        }
    });
    return aboutLeftNav;
} );
