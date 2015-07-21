module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options2: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            options: {
                mangle: false
            },
            build: {

                expand: false,
                src: [
                    'public/js/angular/submodules.js',
                    'public/js/angular/**/submodule.js',
                    'public/js/angular/**/*Svc.js',
                    'public/js/angular/**/*Ctrl.js',
                    'public/js/angular/**/*Dir.js',
                    'public/js/angular/app.js'
                ],

                dest: 'public/js/dist/angApp.js'

            }
        },
        execute:{
            target:{
                src: ['server.js'],
                options:{
                    args:['--port 8080']
        }
    }},
    callback_sync: {
            // simple inline function call 
            call: function(grunt, options){
                grunt.log.writeln('Hello!');
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-execute');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

    grunt.registerTask('start',['execute']);

};
