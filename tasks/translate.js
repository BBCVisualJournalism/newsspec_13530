module.exports = function (grunt) {

    grunt.registerTask('translate', [
        'clean:beforeTranslate',
        'newsBanner:buildAllOtherSites',
        'default',
        'copyRequiredJs',
        'images',
        'multi_lang_site_generator:buildAllOtherSites',
        'clean:inlineCss',
        'copy_source',
        'orbify:buildAllOtherSites',
        'newsBanner:replaceLanguageNewsBanners',
        'lang_font:others',
        'urlEncodeContent:languageServices'
    ]);
};
