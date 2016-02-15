define(['lib/news_special/bootstrap'], function (news) {
    console.log('Full page!!!');
    $.emit('init_images');
    news.sendMessageToremoveLoadingImage();
});