define(['lib/news_special/bootstrap', 'utils'], function (news, utils) {

    // @param $populationChart - a jquery object of a single element of the class 'population-chart'
    var PopulationChart = function ($populationChart) {
        this.$chart = $populationChart;
        this.$beforeBar = this.$chart.find('.population-chart-bar-before .population-chart-bar-value');
        this.$afterBar = this.$chart.find('.population-chart-bar-after .population-chart-bar-value');

        this.updateBars();

        $(window).on('resize', this.updateBars.bind(this));
    };

    var calcBarHeight = function ($bar) {
        var barHeightMultiplier = utils.isMobile() ? 0.5 : 0.75;
        var barValue = $bar.attr('data-population-value');
        var barHeight = (barValue * 100) * barHeightMultiplier;
        return barHeight;
    };

    var updateBarHeight = function ($bar) {
        var barHeight = calcBarHeight($bar);
        $bar.css('height', barHeight + 'px');
    };

    PopulationChart.prototype.updateBars = function () {
        updateBarHeight(this.$beforeBar);
        updateBarHeight(this.$afterBar);
    };

    return PopulationChart;
});