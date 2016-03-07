define(['lib/news_special/bootstrap'], function (news) {

    // @param $list - a jquery object of an empty list element, must have the attribute 'data-number' to indicate how many items are added
    var HealthAttackCounter = function ($list) {
        this.$list = $list;
        this.number = this.$list.attr('data-number');
        this.init();
    };

    var addListItems = function ($list, number) {
        for (var i = 0; i < number; i++) {
            var listItem = news.$('<li/>').addClass('health-attack-counter-list-item');
            var numberSpan = news.$('<span/>').text(number).appendTo(listItem);
            listItem.appendTo($list);
        }
    };

    HealthAttackCounter.prototype.init = function () {
        addListItems(this.$list, this.number);
    };

    return HealthAttackCounter;
});
