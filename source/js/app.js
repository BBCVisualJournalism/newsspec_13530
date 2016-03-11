define([
    'lib/news_special/bootstrap',
    'utils',
    'optimised_scroll',
    'scroll_handler',
    'video',
    'ticker',
    'population_chart',
    'health_attack_counter',
    'schools_chart'
], function (news, utils, OptimisedScroll, scrollHandler, Video, Ticker, PopulationChart, HealthAttackCounter, SchoolsChart) {
    $.emit('init_images');

    function init() {
        new OptimisedScroll();
        scrollHandler.init();
        new Video({
            selector: '.hero-video-container',
            vpid: 'p03m9r7p',
            holdingImage: 'http://www.stage.bbc.co.uk/news/special/2016/newsspec_13530/content/english/img/poster.jpg',
            product: 'background',
            autoplay: 'true'
        });
        new Ticker(3500, 400, 500);
        sameHeight(news.$('.threestages-chart-paragraph'));
        initPopulationCharts();
        initHealthAttackCounters();
        initSchoolsChart();
    }

    function initPopulationCharts() {
        var populationCharts = [
            new PopulationChart(news.$('#population-chart-city-1')),
            new PopulationChart(news.$('#population-chart-city-2')),
            new PopulationChart(news.$('#population-chart-city-3')),
            new PopulationChart(news.$('#population-chart-city-4')),
            new PopulationChart(news.$('#population-chart-city-5')),
            new PopulationChart(news.$('#population-chart-city-6'))
        ];
        
        function animatePopulationCharts() {
            setTimeout(function () {
                for (var i = 0; i < populationCharts.length; i++) {
                    populationCharts[i].updateBars();
                }
            }, 500);
        }

        news.pubsub.on('section-population-reached', animatePopulationCharts);
    }

    function initHealthAttackCounters() {
        new HealthAttackCounter(news.$('#health-attack-counter-list-facilities'));
        new HealthAttackCounter(news.$('#health-attack-counter-list-personnel'));
    }

    function initSchoolsChart() {
        var schoolsChart = new SchoolsChart(news.$('.schools-chart'));

        function animateSchoolsChart() {
            setTimeout(function () {
                schoolsChart.updateBars();
            }, 500);
        }

        news.pubsub.on('section-education-reached', animateSchoolsChart);
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
