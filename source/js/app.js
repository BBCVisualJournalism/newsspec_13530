define([
    'lib/news_special/bootstrap',
    'utils',
    'optimised_scroll',
    'scroll_handler',
    'video',
    'ticker',
    'population_chart'
], function (news, utils, OptimisedScroll, scrollHandler, Video, Ticker, PopulationChart) {
    $.emit('init_images');

    function init() {
        new OptimisedScroll();
        scrollHandler.init();
        new Video({
            selector: '.hero-video-container',
            vpid: 'p03knd3c',
            // holdingImage: '',
            product: 'background',
            autoplay: 'true'
        });
        new Ticker(3500, 400, 500);
        initPopulationCharts();
    }

    var populationChartsPassed = false;
    function initPopulationCharts() {
        var populationCharts = [
            new PopulationChart(news.$('#population-chart-city-1')),
            new PopulationChart(news.$('#population-chart-city-2')),
            new PopulationChart(news.$('#population-chart-city-3')),
            new PopulationChart(news.$('#population-chart-city-4')),
            new PopulationChart(news.$('#population-chart-city-5')),
            new PopulationChart(news.$('#population-chart-city-6'))
        ];
    }

    init();
    news.sendMessageToremoveLoadingImage();
});