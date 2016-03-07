define([
    'lib/news_special/bootstrap',
    'utils',
    'optimised_scroll',
    'scroll_handler',
    'video',
    'ticker',
    'population_chart',
    'health_attack_counter'
], function (news, utils, OptimisedScroll, scrollHandler, Video, Ticker, PopulationChart, HealthAttackCounter) {
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
        sameHeight(news.$('.threestages-chart-paragraph'));
        initPopulationCharts();
        new HealthAttackCounter(news.$('#health-attack-counter-list-facilities'));
        new HealthAttackCounter(news.$('#health-attack-counter-list-personnel'));
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
        
        function animateCharts() {
            setTimeout(function () {
                for (var i = 0; i < populationCharts.length; i++) {
                    populationCharts[i].updateBars();
                }
            }, 500);
        }

        news.pubsub.on('section-population-reached', animateCharts);
    }

    function sameHeight($elements) {
        var maxHeight = -1;
        $elements
            .each(function () {
                var elementHeight = $(this).height();
                if (elementHeight > maxHeight) {
                    maxHeight = elementHeight;
                }
            })
            .height(maxHeight);
    }

    init();
    news.sendMessageToremoveLoadingImage();
});