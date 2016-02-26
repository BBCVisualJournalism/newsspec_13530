define(['lib/news_special/bootstrap'], function (news) {
    var PopulationChart = function ($populationChart) {
        this.$chart = $populationChart;
        this.init();
    };

    PopulationChart.prototype.init = function () {
        this.$beforeBar = this.$chart.find('.population-chart-bar-before .population-chart-bar-value');
        var beforeBarValue = this.$beforeBar.attr('data-population-value');
        var beforeBarHeight = (beforeBarValue * 100) / 2;

        this.$afterBar = this.$chart.find('.population-chart-bar-after .population-chart-bar-value');
        var afterBarValue = this.$afterBar.attr('data-population-value');
        var afterBarHeight = (afterBarValue * 100) / 2;
        
        updateBarHeight(this.$beforeBar, beforeBarHeight);
        updateBarHeight(this.$afterBar, afterBarHeight);
    };

    var updateBarHeight = function ($bar, height) {
        $bar.css('height', height + 'px');
    };

    return PopulationChart;
});