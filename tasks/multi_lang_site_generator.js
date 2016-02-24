module.exports = function (grunt) {

    // *************************************************************************
    // PROJECT FILES
    // Make a list of templates you want converted to files
    // *************************************************************************

    var projectFiles = {
        'test.html': 'test.html.tmpl',
        'index.inc':  'index.inc.tmpl',

        'test-boilerplate.html': 'test-boilerplate.html.tmpl',
        'boilerplate.inc':  'boilerplate.inc.tmpl',
        
        'head_meta.inc':  'head_meta.inc.tmpl'
    };

    // *************************************************************************
    // GRUNT CONFIG
    // You shouldn't need to edit anything below here
    // *************************************************************************

    grunt.registerTask('performMultiLangSiteGenerator', function () {

        var config = grunt.config.get('config'),
            languageConfig = grunt.config.get('languageConfig'),
            orb = grunt.file.readJSON('tasks/orb.json'),
            inlineStyleElm = grunt.file.read("content/" + config.services.default + "/css/inline.css"),
            inlineLiteJs = '',
            multiLangSiteGeneratorData;

        inlineLiteJs   = '<script>' + inlineLiteJs + '</script>';
        inlineStyleElm = '<style>' + inlineStyleElm + '</style>';

        multiLangSiteGeneratorData = {
            version:             '<%= pkg.version %>',
            inlineLiteJs:        inlineLiteJs,
            inlineStyleElm:      inlineStyleElm,
            path:                '<%= env[config.whichEnv].domain %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
            pathStatic:          '<%= env[config.whichEnv].domainStatic %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content',
            projectNumber:       '<%= config.project_number %>',
            debug:               '<%= config.debug %>',
            amdModulePaths:      '<%= JSON.stringify(amdModulePaths) %>',
            panelname:           '<%= panelname %>',
            panelcontent:        '<%= panelcontent %>',
            defaultLang:         '<%= languageConfig.languageLookup[config.services.default].code %>',
            languageConfig:      '<%= languageConfig %>'
        };

        grunt.config('multiLangSiteGenerator', {
            default: {
                options: {
                    vocabs:             ['<%= config.services.default %>'],
                    vocab_directory:    'source/vocabs',
                    template_directory: 'source/tmpl/',
                    output_directory:   'content',
                    data:               multiLangSiteGeneratorData,
                    templatetoken: {
                         evaluate:      /\{\{(.+?)\}\}/g,
                         interpolate:   /\{\{=(.+?)\}\}/g,
                         escape:        /\{\{-(.+?)\}\}/g
                    }
                },
                files: projectFiles
            },
            buildAllOtherSites: {
                options: {
                    vocabs:             '<%= config.services.others %>',
                    vocab_directory:    'source/vocabs',
                    template_directory: 'source/tmpl/',
                    output_directory:   'content',
                    data:               multiLangSiteGeneratorData,
                    templatetoken: {
                         evaluate:      /\{\{(.+?)\}\}/g,
                         interpolate:   /\{\{=(.+?)\}\}/g,
                         escape:        /\{\{-(.+?)\}\}/g
                    }
                },
                files: projectFiles
            }
        });

        grunt.task.run('multiLangSiteGenerator:default');
    });
};
