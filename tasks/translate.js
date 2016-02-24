module.exports = function (grunt) {

    grunt.registerTask('translate', [
        'clean:beforeTranslate',
        'newsBanner:buildAllOtherSites',
        'default',
        'copyRequiredJs',
        'images',
        'multiLangSiteGenerator:buildAllOtherSites',
        'clean:inlineCss',
        'copy_source',
        'orbify:buildAllOtherSites',
        'newsBanner:replaceLanguageNewsBanners',
        'urlEncodeContent:languageServices'
    ]);
};
