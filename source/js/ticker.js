define(['lib/news_special/bootstrap', 'mapper'], function (news, mapper) {
    
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
            this.tickerTextStructure = this.$tickerText.attr('data-ticker-sentence');
            this.tickerTextStructureAlt = this.$tickerText.attr('data-ticker-sentence-alt');
            this.locale = news.$('.main').attr('data-locale');

            this.index = 0;

            var dataPath;
            var dataFile;
            var isSimpleData = true;

            if (this.locale === 'en-GB' || this.locale === 'ar') {
                isSimpleData = false;
                dataPath = 'http://www.stage.bbc.co.uk/news/special/2016/newsspec_13530/data/';
                dataFile = this.locale === 'ar' ? 'arabic.js' : 'english.js';
            } else {
                dataPath = '../data/';
                dataFile = 'ticker_data';
            }

            var self = this;
            require([dataPath + dataFile], function (civilianData) {
                self.updateText(civilianData, isSimpleData);
                self.tickerInterval = setInterval(function () {
                    self.$tickerText.fadeOut(self.fadeDuration, function () {
                        self.$tickerText.delay(self.hideDelay);
                        self.updateText(civilianData, isSimpleData);
                        self.$tickerText.fadeIn(self.fadeDuration);
                    });
                }, self.showDelay);
            });
        },

        updateText: function (civilianData, isSimpleData) {
            var civilian = this.getNextCivilian(civilianData);
            if (isSimpleData) {
                this.$tickerText.text(civilian);
            } else {
                var dataLanguage = this.locale === 'ar' ? 'arabic' : 'english';
                var languageSpecificMapper = mapper[dataLanguage];
                var name = civilian[mapper.columns.name];
                var ageGender = languageSpecificMapper.ageGender[civilian[mapper.columns.ageGender]];
                var location = languageSpecificMapper.locations[civilian[mapper.columns.location]];
                var cause = languageSpecificMapper.causes[civilian[mapper.columns.cause]];
                var date = this.locale === 'en-GB' ? this.makeDate(civilian[mapper.columns.date]) : civilian[mapper.columns.date];

                var tickerHtml;
                if (this.locale === 'ar') {
                    if (civilian[mapper.columns.cause] === 6) {
                        tickerHtml = this.tickerTextStructureAlt;
                    } else {
                        tickerHtml = this.tickerTextStructure.replace('{{cause}}', '<strong>' + cause + '</strong>');
                    }
                    tickerHtml = tickerHtml.replace('{{name}}', '<strong>' + name + '</strong>');
                } else {
                    if (name.match(/unidentified/i) || name.match(/ of /i) || name.match(/family/i)) {
                        tickerHtml = this.tickerTextStructureAlt;
                    } else {
                        tickerHtml = this.tickerTextStructure.replace('{{name}}', '<strong>' + name + '</strong>');
                    }
                    tickerHtml = tickerHtml.replace('{{cause}}', '<strong>' + cause + '</strong>');
                }
                tickerHtml = tickerHtml
                    .replace('{{ageGender}}', ageGender)
                    .replace('{{location}}', location)
                    .replace('{{date}}', date);
                this.$tickerText.html(tickerHtml);
            }
        },

        getNextCivilian: function (civilianData) {
            if (this.index <= civilianData.length) {
                var civilian = civilianData[this.index];
                this.index++;
                return civilian;
            } else {
                this.index = 0;
                return this.getNextCivilian(civilianData);
            }
        },

        // @param dateString - format: d/m/yyyy
        // (d and m have no leading zeroes if it is a single digit number)
        makeDate: function (dateString) {
            var dateArray = dateString.split('/');
            var date = new Date(Date.UTC(dateArray[2], dateArray[1] - 1, dateArray[0]));
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return date.getUTCDate() + ' ' + monthNames[date.getUTCMonth()] + ' ' + date.getUTCFullYear();
        }
    };

    return Ticker;
});
