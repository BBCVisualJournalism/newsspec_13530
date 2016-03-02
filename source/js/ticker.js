define(['lib/news_special/bootstrap', 'mapper'], function (news, mapper) {
    
    // @param showDelay - how long to show the text for
    // @param hideDelay - how long to hide the text for
    // @param fadeDuration - how long it takes to fade the text in/out
    // all params optional, defaults used if not specified
    var Ticker = function (showDelay, hideDelay, fadeDuration) {
        this.showDelay = showDelay || 3000;
        this.hideDelay = hideDelay || 500;
        this.fadeDuration = fadeDuration || 400;
        this.dataPath = 'http://www.stage.bbc.co.uk/news/special/2016/newsspec_13530/data/';
        this.init();
    };

    Ticker.prototype = {
        init: function () {
            this.$tickerText = news.$('#death-ticker-text');
            this.tickerSentence = this.$tickerText.attr('data-ticker-sentence');
            this.tickerSentenceUnidentified = this.$tickerText.attr('data-ticker-sentence-unidentified');
            this.locale = news.$('.main').attr('data-locale');

            this.index = 0;

            var self = this;
            var dataFile = this.locale === 'ar' ? 'arabic/children.js' : 'english/children.js';
            require([this.dataPath + dataFile], function (civilianData) {
                self.updateText(civilianData);
                self.tickerInterval = setInterval(function () {
                    self.$tickerText.fadeOut(self.fadeDuration, function () {
                        self.$tickerText.delay(self.hideDelay);
                        self.updateText(civilianData);
                        self.$tickerText.fadeIn(self.fadeDuration);
                    });
                }, self.showDelay);
            });
        },

        updateText: function (civilianData) {
            var civilian = this.getNextCivilian(civilianData);
            console.log(civilian);
            var dataLanguage = this.locale === 'ar' ? 'arabic' : 'english';
            var languageSpecificMapper = mapper[dataLanguage];
            var name = civilian[mapper.columns.name];
            var ageGender = languageSpecificMapper.ageGender[civilian[mapper.columns.ageGender]];
            var location = languageSpecificMapper.locations[civilian[mapper.columns.location]];
            var cause = languageSpecificMapper.causes[civilian[mapper.columns.cause]];
            var date = this.makeDate(civilian[mapper.columns.date]);

            var tickerHtml;
            if (name.match(/unidentified/i) || name.match(/ of /i) || name.match(/family/i)) {
                tickerHtml = this.tickerSentenceUnidentified;
            } else {
                tickerHtml = this.tickerSentence.replace('{{name}}', '<strong>' + name + '</strong>');
            }
            tickerHtml = tickerHtml.replace('{{ageGender}}', ageGender)
                .replace('{{location}}', location)
                .replace('{{cause}}', '<strong>' + cause + '</strong>')
                .replace('{{date}}', date);
            this.$tickerText.html(tickerHtml);
        },

        getNextCivilian: function (civilianData) {
            if (this.index <= civilianData.length) {
                var civilian = civilianData[this.index];
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
            var date = new Date(dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0]);
            return date.toLocaleString(this.locale, { month: 'long', day: 'numeric', year: 'numeric' });
        }
    };

    return Ticker;
});
