define(['lib/news_special/bootstrap', 'mapper'], function (news, mapper) {

    var Ticker = function (showDelay, hideDelay, fadeDuration) {
        this.showDelay = showDelay || 3000;
        this.hideDelay = hideDelay || 500;
        this.fadeDuration = fadeDuration || 400;
        this.init();
    };

    var getLanguage = function () {
        var locale = news.$('.main').attr('data-locale');
        if (locale === 'en-GB') {
            return 'english';
        } else if (locale === 'ar') {
            return 'arabic';
        } else {
            return 'other';
        }
    };

    var makeDate = function (dateString) {
        var dateArray = dateString.split('/');
        var date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    };

    Ticker.prototype = {
        init: function () {
            this.language = getLanguage();

            this.$tickerText = news.$('#death-ticker-text');
            this.tickerTextStructure = this.$tickerText.attr('data-ticker-sentence');
            this.tickerTextStructureAlt = this.$tickerText.attr('data-ticker-sentence-alt');

            this.fileIndex = 0;
            this.civilianIndex = 0;

            this.dataPath = this.language === 'other' ?
                '../data/' :
                'http://www.stage.bbc.co.uk/news/special/2016/newsspec_13530/data/' + this.language + '/';
            this.dataFilename = this.language === 'other' ? 'ticker_data' : this.fileIndex + '.js';

            this.processData(this.dataPath + this.dataFilename);
        },

        updateText: function (data) {
            var civilian = this.getNextCivilian(data);
            if (civilian) {
                if (this.language === 'other') {
                    this.$tickerText.text(civilian);
                } else {
                    var languageSpecificMapper = mapper[this.language];
                    var name = civilian[mapper.columns.name];
                    var ageGender = languageSpecificMapper.ageGender[civilian[mapper.columns.ageGender]];
                    var location = languageSpecificMapper.locations[civilian[mapper.columns.location]];
                    var cause = languageSpecificMapper.causes[civilian[mapper.columns.cause]];
                    var date = this.language === 'english' ? makeDate(civilian[mapper.columns.date]) : civilian[mapper.columns.date];

                    var tickerHtml;
                    if (this.language === 'arabic') {
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
            } else {
                clearInterval(this.tickerInterval);
                this.fileIndex++;
                // TODO: update to reflect all files uploaded
                var numberOfFiles = 2;
                if (this.fileIndex > numberOfFiles) {
                    this.fileIndex = 0;
                }
                this.dataFilename = this.language === 'other' ? 'ticker_data' : this.fileIndex + '.js';
                this.civilianIndex = 0;
                this.processData(this.dataPath + this.dataFilename);
            }
        },

        getNextCivilian: function (data) {
            if (this.civilianIndex < data.length) {
                var civilian = data[this.civilianIndex];
                this.civilianIndex++;
                return civilian;
            }
        },

        processData: function (dataFilePath) {
            var self = this;
            require([dataFilePath], function requireCallback(data) {
                self.updateText(data);
                self.tickerInterval = setInterval(function intervalCallback() {
                    self.$tickerText.fadeOut(self.fadeDuration, function fadeOutCallback() {
                        self.$tickerText.delay(self.hideDelay);
                        self.updateText(data);
                        self.$tickerText.fadeIn(self.fadeDuration);
                    });
                }, self.showDelay);
            });
        }
    };

    return Ticker;
});
