define(['lib/news_special/bootstrap', 'ticker', 'population_chart'], function (news, Ticker, PopulationChart) {
    $.emit('init_images');

    var ticker = new Ticker(3500, 400, 500);

    new PopulationChart(news.$('#population-chart-city-1'));
    new PopulationChart(news.$('#population-chart-city-2'));
    new PopulationChart(news.$('#population-chart-city-3'));
    new PopulationChart(news.$('#population-chart-city-4'));
    new PopulationChart(news.$('#population-chart-city-5'));
    new PopulationChart(news.$('#population-chart-city-6'));

    news.sendMessageToremoveLoadingImage();
});