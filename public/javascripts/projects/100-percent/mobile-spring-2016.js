'use strict';

$(document).ready( function($) {

	var element = {
		'elementID': '',
		'elementCategory': 'spring16_100percent',
	}

	var social = {
		facebookTitle: '100% BLOOMINGDALE\'S',
		facebookDescription: '100% Bloomingdale\'s is back with a whole new series of designer capsule collections: 1000 exclusives. 100 designers. 1 store.',
		facebookImageFileName: 'S16_100Percent_FB.jpg',
		twitterTitle: '100% Bloomingdale’s is back with a new series of designer collections: 1000 exclusives. 100 designers. 1 store. http://fashion.bloomingdales.com/100-percent-2016/',
		pinterestTitle: '100% Bloomingdale\'s is back with a whole new series of designer capsule collections: 1000 exclusives. 100 designers. 1 store.',
		pinterestImageFileName: 'S16_100Percent_Pinterest.jpg',
		facebookURL: null,
		twitterURL: null,
		pinterestURL: null    
    }

    socialSetup();

	var find = '/';
	var re = new RegExp(find, 'g'),
		winPath = window.location.pathname.replace(re,'_');

	pageViewTag( 'mbl:fashion' + winPath.substring( 0, winPath.lastIndexOf('_') ), element.elementCategory);

	$('.top').on('click tap', function () {
		$(this).toggleClass('active');
		$(this).siblings().slideToggle(400);
	});

	//  COREMETRICS TAGS

	$('.subNav a').on("click tap", function () {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});

	$('#landing button, #landing a').on('click tap', function() {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});

	$('video').on('play', function () {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});


	function elementTag(element) {
        return window.cmCreatePageElementTag(element.elementID, element.elementCategory, element.attributes || null);
    }

     function pageViewTag (pageID, catID, attrID, attrData){
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

        var attr = parseInt(attrID);
        var dataAttr = {};
        dataAttr[attr] = attrData;

        window.BLOOMIES.coremetrics.pageViewExploreAttributes.append(dataAttr);

        window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, catID, '', '');        
    }

    function socialSetup () {
        var baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/fashion/images/projects/100-percent/';

        var facebookURL = 'https://www.facebook.com/dialog/feed';
        facebookURL += '?app_id=145634995501895';
        facebookURL += '&name=' + encodeURIComponent(social.facebookTitle);
        facebookURL += '&description=' + encodeURIComponent(social.facebookDescription);
        facebookURL += '&link=' + encodeURIComponent(baseURL);
        facebookURL += '&picture=' + encodeURIComponent(baseURLAssets + social.facebookImageFileName);
        facebookURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');
        $('#facebookLink').attr('href', facebookURL);

        var twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        twitterURL += encodeURIComponent(social.twitterTitle);
        $('#twitterLink').attr('href', twitterURL);

        var pinterestURL = 'http://pinterest.com/pin/create/button/?';
        pinterestURL += 'url=' + encodeURIComponent(baseURL);
        pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + social.pinterestImageFileName);
        pinterestURL += '&description=' + encodeURIComponent(social.pinterestTitle);
        $('#pinterestLink').attr('href', pinterestURL);
    }


});


