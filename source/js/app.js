define([
    'lib/news_special/bootstrap',
    'optimisedScroll',
    'video',
    'ticker',
    'population_chart'
], function (news, OptimisedScroll, Video, Ticker, PopulationChart) {
    $.emit('init_images');

    new OptimisedScroll();

    var heroVideo = new Video({
        selector: '.hero-video-container',
        vpid: 'p03knd3c',
        // holdingImage: '',
        product: 'background',
        autoplay: 'true'
    });

    var ticker = new Ticker(3500, 400, 500);

    var populationChart_city1 = new PopulationChart(news.$('#population-chart-city-1'));
    var populationChart_city2 = new PopulationChart(news.$('#population-chart-city-2'));
    var populationChart_city3 = new PopulationChart(news.$('#population-chart-city-3'));
    var populationChart_city4 = new PopulationChart(news.$('#population-chart-city-4'));
    var populationChart_city5 = new PopulationChart(news.$('#population-chart-city-5'));
    var populationChart_city6 = new PopulationChart(news.$('#population-chart-city-6'));

    news.sendMessageToremoveLoadingImage();
});