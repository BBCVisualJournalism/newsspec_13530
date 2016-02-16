define(['lib/news_special/bootstrap'], function (news) {
    var Ticker = function ($tickerList, userPause, userSpeed) {
        this.$list = $tickerList;
        this.pause = userPause || 3000;
        this.speed = userSpeed || 50;
        this.typer = {};
    };

    Ticker.prototype = {
        init: function () {
            this.$list.addClass('ticker-active')
                .children().first().addClass('ticker_item-active');

            if (this.$list.find('li').length > 1) {
                this.initialTimeout = setTimeout(this.changeItem.bind(this), this.pause);
            }
        },

        changeItem: function () {
            var $currentItem = this.$list.children().first();
            var $currentCopy = $currentItem.clone();

            clearTimeout(this.initialTimeout);

            $currentCopy.removeClass('ticker_item-active').appendTo(this.$list);

            this.typer.untypeString = $currentItem.text();
            this.typer.untypeCount = 0;
            this.typer.untypeInterval = setInterval(this.untype.bind(this), this.speed);
        },

        type: function () {
            this.typer.typeCount++;

            var displayedText = this.typer.typeString.slice(0, this.typer.typeCount);

            if (this.typer.typeCount >= this.typer.typeString.length) {
                clearInterval(this.typer.typeInterval);
                setTimeout(this.changeItem.bind(this), this.pause);
            }

            this.$list.children().first().text(displayedText);
        },

        untype: function () {
            this.typer.untypeCount--;

            var displayedText = this.typer.untypeString.slice(0, this.typer.untypeCount);

            if (displayedText === '') {
                clearInterval(this.typer.untypeInterval);
                this.$list.children().first().remove();

                var $nextItem = this.$list.children().first();
                this.typer.typeString = $nextItem.text();
                $nextItem.text('').addClass('ticker_item-active');
                this.typer.typeCount = 0;
                this.typer.typeInterval = setInterval(this.type.bind(this), this.speed);
            }

            this.$list.children().first().text(displayedText);
        }
    };

    return Ticker;
});