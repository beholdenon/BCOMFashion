$(function () {
    
    // Prevent tabbing out of the nav items when nav is active
    var navItem = $('.spring-18-nav a'),
        navItemContent = $('.nav-item-content'),
        pageBody = $('body'),
        navActive = false,
        navSwitcher = $('#spring-18-nav-switcher'),
        lastTabbable = $('#last-nav-tabbable');
    
    toggleTabbable(navItem, navActive);
    toggleTabbable(navItemContent, navActive);

    navItem.on('keydown', function (event) {
        if (event.keyCode !== 9) {
            return;
        }
        if (event.target.id === lastTabbable.attr('id') && !event.shiftKey) {
            navSwitcher.focus();
            return false;
        }
    });

    // Nav switcher
    navSwitcher.on('click', function () {
        pageBody.toggleClass('spring-18-nav-is-active');
        navActive = pageBody.hasClass('spring-18-nav-is-active');
        toggleTabbable(navItem, navActive)
    });
    
    // Change header background on-scroll
    var stickyHeader = $('.spring-18-sticky-header');
    $(window).scroll(function () {
        var fromTop = $(this).scrollTop();
        if(fromTop > 120) {
            stickyHeader.addClass('bg-bold');
        } else {
            stickyHeader.removeClass('bg-bold');
        }
    });
    
    // Marquee animation
    $('.spring-18-marquee-animation').marquee({
        //speed in milliseconds of the marquee
        duration: 10000,
        //gap in pixels between the tickers
        gap: 20,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: 'left',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: true
    });
    $('.spring-18-marquee-container').on('click', function () {
       $('.js-marquee-wrapper').css({'transform':'none','animation':'unset'})
    });

    // Back to top
    $('.spring-18-back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


    // Mr. Mario position is related to scroll direction 
    var lastScrollTop = 0,
        delta = 5,
        mrMario = $('.spring-18-mr-mario');
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop){
            // downscroll code
            mrMario.removeClass('go-back');
        } else {
            // upscroll code
            mrMario.addClass('go-back');
        }
        lastScrollTop = st;
    });

    
    // console.log('spring-18-carousel-images: ' + $('.spring-18-carousel-images div').length);

    // Utils
    function toggleTabbable(item, flag) {
        if (flag) {
            item.each(function () {
                $(this).attr('tabindex', '0');
            });
        } else {
            item.each(function () {
                $(this).attr('tabindex', '-1');
            });
        }
    }
    
    
    
});
