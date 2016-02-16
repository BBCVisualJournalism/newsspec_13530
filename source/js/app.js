define(['lib/news_special/bootstrap', 'ticker'], function (news, Ticker) {
    $.emit('init_images');

    var $tickerList = news.$('.ticker');
    var ticker = new Ticker($tickerList);
    ticker.init();

    news.sendMessageToremoveLoadingImage();
});