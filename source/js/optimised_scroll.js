define(['lib/news_special/bootstrap', 'polyfills/requestAnimationFrame'], function (news) {

    var OptimisedScroll = function () {
        this.throttle('scroll', 'optimisedScroll');
    };

    OptimisedScroll.prototype = {
        throttle: function (type, eventName, object) {
            var obj = object || window;
            var $obj = news.$(obj);
            var running = false;
            var func = function () {
                if (running) { return; }
                running = true;
                requestAnimationFrame(function () {
                    $obj.trigger(eventName);
                    running = false;
                });
            };
            $obj.on(type, func);
        }
    };

    return OptimisedScroll;
});
