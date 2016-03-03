define(['lib/news_special/bootstrap'], function (news) {
    var isMobile = function () {
        if ($(window).width() < 600) {
            return true;
        } else {
            return false;
        }
    };

    // @param opts - object with the following properties:
    //     $element - a jquery object of the element being checked
    //     fully - a boolean indicating whether to check if the element is fully in the viewport or only partially
    var isElementInViewport = function ($element, fully) {
        var $window = news.$(window);

        var elementTop = $element.offset().top;
        var elementBottom = elementTop + $element.height();

        var windowTop = $window.scrollTop();
        var windowBottom = windowTop + $window.height();

        if (fully) {
            return ((elementBottom <= windowBottom) && (elementTop >= windowTop));
        } else {
            return ((elementTop <= windowBottom) && (elementBottom >= windowTop));
        }
    };

    var isTouchDevice = function () {
        return 'ontouchstart' in window ||  // most browsers
            'onmsgesturechange' in window;  // ie10
    };

    utils = {
        isMobile: isMobile,
        isElementInViewport: isElementInViewport,
        isTouchDevice: isTouchDevice
    };

    return utils;
});