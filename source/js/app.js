define(['lib/news_special/bootstrap', 'ticker'], function (news, Ticker) {
    $.emit('init_images');

    var ticker = new Ticker(3500, 400, 500);

    news.sendMessageToremoveLoadingImage();
});