module.exports = function (grunt) {
    grunt.config('sass', {
        main: {
            files: {
                './content/<%= config.services.default %>/css/main.css':      './source/scss/main.scss',
                './content/<%= config.services.default %>/css/legacy-ie.css': './source/scss/legacy-ie.scss',
                './content/<%= config.services.default %>/css/boilerplate.css': './source/scss/boilerplate.scss'
            }
        },
        inline: {
            options: {
                'sourcemap=none': ''
            },
            files: {
                './content/<%= config.services.default %>/css/inline.css': './source/scss/news_special/inline.scss'
            }
        }
    });
};
