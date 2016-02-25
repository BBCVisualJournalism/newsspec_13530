module.exports = function (grunt) {

    grunt.registerTask('newsBanner', function () {
        var pkg         = grunt.file.readJSON('package.json');
        var config      = grunt.config.get('config');
        var languageConfig      = grunt.config.get('languageConfig');
        var done        = this.async();
        var fs          = require('fs');
        var _           = require('lodash');
        var directory   = require('path');

            grunt.log.writeln('Adding news banner tmpl file');

            var bannerImgHost = 'http://news.bbcimg.co.uk/news/special/2015/newsspec_12021/';
            var defaultLanguageimgPath = bannerImgHost + 'news.png';
            var defaultLanguageBannerUrl = 'http://www.bbc.co.uk/news';
            if (languageConfig.languageLookup[config.services.default]) {
                defaultLanguageimgPath = bannerImgHost + languageConfig.languageLookup[config.services.default].bannerImgPath;
                defaultLanguageBannerUrl = languageConfig.languageLookup[config.services.default].url;
            }

            var rtlStyle = (languageConfig.languageLookup[config.services.default].direction == 'rtl') ? 'text-align:right; direction:rtl;' : '';
            var newsHeaderStyleStr = '<style type="text/css">.full-frame-scaffold-news-banner{' + rtlStyle + '-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;width:100%;padding:0 0 0 8px;background-color:#bb1919; height:38px;}.full-frame-scaffold-news-banner__logo{width:100%;max-width:976px;margin-left:auto;margin-right:auto;height:38px;}.full-frame-scaffold-news-banner__btn {text-decoration:none; position:relative;}.full-frame-scaffold-news-banner__img {position:absolute; height:20px; width:auto; margin-top:9px;}@media (min-width:400px){.full-frame-scaffold-news-banner{padding:0 0 0 16px;}}@media (min-width:1009px){.full-frame-scaffold-news-banner{padding:0}}</style>';

            var newsHeaderStr = '<div class="full-frame-scaffold-news-banner">' +
                                    '<div class="full-frame-scaffold-news-banner__logo">' +
                                        '<a href="' + defaultLanguageBannerUrl + '" class="full-frame-scaffold-news-banner__btn">' +
                                            '<img src="' + defaultLanguageimgPath + '" class="full-frame-scaffold-news-banner__img">' +
                                        '</a>' +
                                    '</div>' +
                                '</div>';

            var defaultLanguage = languageConfig.languageLookup[config.services.default].code || 'en-GB';

            fs.writeFileSync('source/tmpl/includes/news-banner-' + defaultLanguage + '.tmpl', newsHeaderStyleStr + newsHeaderStr);

            done();
        
    });

    grunt.registerTask('newsBanner:buildAllOtherSites', function () {
        var services = grunt.iframeScaffold.services;
        var pkg         = grunt.file.readJSON('package.json');
        var config      = grunt.config.get('config');
        var languageConfig      = grunt.config.get('languageConfig');
        var done        = this.async();
        var fs          = require('fs');
        var _           = require('lodash');
        var directory   = require('path');

        services.forEach(function (service) {

            grunt.log.writeln('Adding news banner tmpl file for ', service);

            var bannerImgHost = 'http://news.bbcimg.co.uk/news/special/2015/newsspec_12021/';
            var LanguageimgPath = bannerImgHost + 'news.png';
            var languageBannerUrl = 'http://www.bbc.co.uk/news';
            if (languageConfig.languageLookup[service]) {
                LanguageimgPath = bannerImgHost + languageConfig.languageLookup[service].bannerImgPath;
                languageBannerUrl = languageConfig.languageLookup[service].url;
            }

            var rtlStyle = (languageConfig.languageLookup[service].direction == 'rtl') ? 'text-align:right; direction:rtl;' : '';
            var newsHeaderStyleStr = '<style type="text/css">.full-frame-scaffold-news-banner{' + rtlStyle + '-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;width:100%;padding:0 0 0 8px;background-color:#bb1919; height:38px;}.full-frame-scaffold-news-banner__logo{width:100%;max-width:976px;margin-left:auto;margin-right:auto;height:38px;}.full-frame-scaffold-news-banner__btn {text-decoration:none; position:relative;}.full-frame-scaffold-news-banner__img {position:relative; height:20px; width:auto; margin-top:9px;}@media (min-width:400px){.full-frame-scaffold-news-banner{padding:0 0 0 16px;}}@media (min-width:1009px){.full-frame-scaffold-news-banner{padding:0}}</style>';

            var newsHeaderStr = '<div class="full-frame-scaffold-news-banner">' +
                                    '<div class="full-frame-scaffold-news-banner__logo">' +
                                        '<a href="' + languageBannerUrl + '" class="full-frame-scaffold-news-banner__btn">' +
                                            '<img src="' + LanguageimgPath + '" class="full-frame-scaffold-news-banner__img">' +
                                        '</a>' +
                                    '</div>' +
                                '</div>';

            var languageCode = languageConfig.languageLookup[service].code || 'en-GB';

            fs.writeFileSync('source/tmpl/includes/news_banner_' + languageCode + '.tmpl', newsHeaderStyleStr + newsHeaderStr);
        });

        done();
    });

    grunt.registerTask('newsBanner:replaceLanguageNewsBanners', function () {
        var services = grunt.iframeScaffold.services;
        var config      = grunt.config.get('config');
        var languageConfig      = grunt.config.get('languageConfig');
        var done        = this.async();
        var fs          = require('fs');

        var defaultLanguage = languageConfig.languageLookup[config.services.default].code || 'en-GB';

        var defaultBannerMarkup = fs.readFileSync('source/tmpl/includes/news_banner_' + defaultLanguage + '.tmpl', 'utf8');

        services.forEach(function (service) {
            
            var languageBannerMarkup = fs.readFileSync('source/tmpl/includes/news_banner_' + languageConfig.languageLookup[service].code + '.tmpl', 'utf8');

            var languageIndexIncContents = fs.readFileSync('content/' + service + '/index.inc', 'utf8');
            var languageTestHtmlContents = fs.readFileSync('content/' + service + '/test.html', 'utf8');

            languageIndexIncContents = languageIndexIncContents.replace(defaultBannerMarkup, languageBannerMarkup);
            languageTestHtmlContents = languageTestHtmlContents.replace(defaultBannerMarkup, languageBannerMarkup);

            fs.writeFileSync('content/' + service + '/index.inc', languageIndexIncContents);
            fs.writeFileSync('content/' + service + '/test.html', languageTestHtmlContents);

        });

        done();
    });
};
