module.exports = function (grunt) {
    grunt.registerTask('html', ['sass:inline', 'jsonlint', 'performMultiLangSiteGenerator']);
};