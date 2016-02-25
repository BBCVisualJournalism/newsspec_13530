define(['lib/news_special/bootstrap', 'data/civilians', 'data/mapper'], function (news, civilians, mapper) {
    
    // @param showDelay - how long to show the text for
    // @param hideDelay - how long to hide the text for
    // @param fadeDuration - how long it takes to fade the text in/out
    // all params optional, defaults used if not specified
    var Ticker = function (showDelay, hideDelay, fadeDuration) {
        this.showDelay = showDelay || 3000;
        this.hideDelay = hideDelay || 500;
        this.fadeDuration = fadeDuration || 400;
        this.init();
    };

    Ticker.prototype = {
        init: function () {
            this.$tickerText = news.$('#death-ticker-text');
            this.$name = news.$('#death-ticker-name');
            this.$ageGender = news.$('#death-ticker-agegender');
            this.$location = news.$('#death-ticker-location');
            this.$cause = news.$('#death-ticker-cause');
            this.$date = news.$('#death-ticker-date');

            this.index = 0;
            this.updateText();
            var self = this;
            this.tickerInterval = setInterval(function () {
                self.$tickerText.fadeOut(self.fadeDuration, function () {
                    self.$tickerText.delay(self.hideDelay);
                    self.updateText();
                    self.$tickerText.fadeIn(self.fadeDuration);
                });
            }, this.showDelay);
        },

        updateText: function () {
            var civilian = this.getNextCivilian();
            var name = civilian[mapper.columns.name];
            var ageGender = mapper.ageGender[civilian[mapper.columns.ageGender]];
            var location = mapper.locations[civilian[mapper.columns.location]];
            var cause = mapper.causes[civilian[mapper.columns.cause]];
            var date = this.makeDate(civilian[mapper.columns.date]);

            console.log(name, ageGender, location, cause, date);

            if (name.match(/unidentified/i)) {
                this.$name.text('');
                this.$ageGender.text('An unidentified ' + ageGender);
            } else {
                this.$name.text(name);
                this.$ageGender.text(', a ' + ageGender);
            }
            this.$location.text(location);
            this.$cause.text(cause);
            this.$date.text(date);
        },

        getNextCivilian: function () {
            if (this.index <= civilians.length) {
                var civilian = civilians[this.index];
                this.index++;
                return civilian;
            } else {
                this.index = 0;
                return this.getNextItem();
            }
        },

        // @param dateString - format: d/m/yyyy
        // (d and m have no leading zeroes if it is a single digit number)
        makeDate: function (dateString) {
            var dateArray = dateString.split('/');
            var day = dateArray[0];
            var month = mapper.months[parseInt(dateArray[1], 10) - 1];
            var year = dateArray[2];
            return [day, month, year].join(' ');
        }
    };

    return Ticker;
});