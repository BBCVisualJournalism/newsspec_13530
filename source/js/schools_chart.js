define(['lib/news_special/bootstrap', 'utils'], function (news, utils) {
    var SchoolsChart = function ($chart) {
        this.$chart = $chart;
        this.init();
    };

    var calcBarHeight = function ($bar) {
        var barHeightMultiplier = utils.isMobile() ? 1 : 1.5;
        var barValue = $bar.attr('data-value');
        var barHeight = (barValue * 50) * barHeightMultiplier;
        return barHeight;
    };

    var updateBarHeight = function ($bar) {
        var barHeight = calcBarHeight($bar);
        $bar.css('height', barHeight + 'px');
    };

    SchoolsChart.prototype = {
        init: function () {
            this.$chartBars = this.$chart.find('.schools-chart-group-bar');
            this.updateBars();
        },

        updateBars: function () {
            this.$chartBars.each(function updateBarsCallback() {
                updateBarHeight(news.$(this));
            });
        }
    };

    return SchoolsChart;
});
