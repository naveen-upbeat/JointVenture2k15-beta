module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            beforeUglify: ['Gruntfile.js', 'public/modules/**/*.js'],
            afterUglify: ['public/assets/js/*.js'],
            options: {
                ignores: ['public/modules/**/jquery-ui.js'],
                reporter: require('jshint-stylish')
            }
        },

        uglify: {
            options2: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            options: {
                mangle: false,
                beautify: true
            },
            build: {
                expand: false,
                src: [
                    'public/modules/**/js/angular/submodule.js',
                    'public/modules/**/js/angular/**/*Svc.js',
                    'public/modules/**/js/angular/**/*Ctrl.js',
                    'public/modules/**/js/angular/**/*Dir.js',
                    'public/modules/0.0.applicationbase/js/angular/submodules.js',
                    'public/modules/0.0.applicationbase/js/angular/app.js'
                ],

                dest: 'public/assets/js/angApp.js'

            }
        },
        lesslint: {
            src: ['public/modules/**/*.less'],
            options: {

            }
        },
        sass: {
            dist: {
                options: {
                    loadPath: ['public/modules/0.0.applicationbase/_sass'],
                    sourcemap: "none"
                },
                files: [{
                    expand: true,
                    cwd: 'public/modules/',
                    src: ['*.scss'],
                    dest: 'public/assets/css/',
                    ext: '.css'
                }]
            }
        },
        less: {
            options: {
                paths: ['public/modules/0.0.applicationbase/less'],
                imports: {
                    reference: ['applicationbase.less'],
                }
            },
            components: {
                files: [{
                    expand: true,
                    cwd: 'public/modules/',
                    src: '*.less',
                    dest: 'public/assets/css/',
                    ext: '.css'
                }]
            }
        },
        execute: {
            target: {
                src: ['server.js'],
                options: {
                    args: ['--port 8080']
                }
            }
        },
        callback_sync: {
            // simple inline function call 
            call: function(grunt, options) {
                grunt.log.writeln('Hello!');
            }
        }
    });

    var arrDirNames = [];

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lesslint');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-execute');

    // Default task(s).
    grunt.registerTask('default', ['preparecss', 'jshint:beforeUglify', 'preparejs']);

    grunt.registerTask('start', ['execute']);

    grunt.registerTask('includeAllLessSass', function() {
        var fs = require('fs'),
            path = require('path');

        function getDirectories(srcpath) {
            return fs.readdirSync(srcpath).filter(function(file) {
                return fs.statSync(path.join(srcpath, file)).isDirectory();
            });
        }

        var path2 = require('path').resolve(__dirname) + "/public/modules/";
        var conf = grunt.config.get('less');
        var confSass = grunt.config.get('sass');

        conf.components.files = [];
        confSass.dist.files = [];

        arrDirNames = getDirectories(path2);

        for (var j = 0; j < arrDirNames.length; j++) {
            var newConf = {
                "expand": true,
                "cwd": 'public/modules/' + arrDirNames[j] + "/less/",
                "src": "*.less",
                "dest": "public/assets/css/",
                "ext": '.css'
            };
            var newSassConf = {
                "expand": true,
                "cwd": 'public/modules/' + arrDirNames[j] + "/saas/",
                "src": '*.scss',
                "dest": 'public/assets/css/',
                "ext": '.css'
            };
            var new_SassConf = {
                "expand": true,
                "cwd": 'public/modules/' + arrDirNames[j] + "/_sass/",
                "src": '*_.scss',
                "dest": 'public/assets/css/',
                "ext": '.css'
            };
            conf.components.files.push(newConf);
            confSass.dist.files.push(newSassConf);
            confSass.dist.files.push(new_SassConf);
        }
        grunt.config.set('less', conf);
        console.log(confSass);
        grunt.config.set('sass', confSass);
    });


    grunt.registerTask('createSingleCssFile', function() {
        var fs = require('fs'),
            path = require('path');

        function getFiles(srcpath) {
            return fs.readdirSync(srcpath).filter(function(file) {
                return fs.statSync(path.join(srcpath, file)).isFile();
            });
        }

        var path2 = require('path').resolve(__dirname) + "/public/assets/css/",
            cssString = "",
            arrFileNames = getFiles(path2);

        if (arrFileNames.length > 0) {

            for (var j = 1; j <= arrFileNames.length; j++) {
                cssString += "@import '../" + arrFileNames[j - 1] + "'; ";

                if (j === arrFileNames.length || j % 20 === 0) {
                    var appCSSfileName = path2 + 'compiled/app.' + Math.floor(j / 20) + '.css';
                    grunt.file.write(appCSSfileName, cssString);
                    cssString = '';
                }
            }
        }

    });

    grunt.registerTask('preparecss', ['includeAllLessSass', 'less', 'sass', 'createSingleCssFile']);
    grunt.registerTask('preparejs', ['uglify']);
};
