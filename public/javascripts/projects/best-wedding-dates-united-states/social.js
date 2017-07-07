(function($) {
    "use strict";
    var t = $("#embed");
    $(".embedLink").on("click", function(e) {
        e.preventDefault(), t.hasClass("visible") ? t.animate({
            bottom: "-200px"
        }, 200).fadeOut({
            queue: !1
        }, 200).removeClass("visible") : t.animate({
            bottom: "10px"
        }, 300).fadeIn({
            queue: !1
        }, 300).addClass("visible")
    })
})(jQuery);