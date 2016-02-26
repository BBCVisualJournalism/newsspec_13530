define(['lib/news_special/bootstrap'], function (news) {
    var isMobile = function () {
        if ($(window).width() < 600) {
            return true;
        } else {
            return false;
        }
    };

    utils = {
        isMobile: isMobile
    };

    return utils;
});