module.exports = function (grunt) {

    // Load multiple grunt tasks using globbing patterns
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        checktextdomain: {
            options: {
                text_domain: 'twpstrap',
                correct_domain: true,
                keywords: [
                    '__:1,2d',
                    '_e:1,2d',
                    '_x:1,2c,3d',
                    'esc_html__:1,2d',
                    'esc_html_e:1,2d',
                    'esc_html_x:1,2c,3d',
                    'esc_attr__:1,2d',
                    'esc_attr_e:1,2d',
                    'esc_attr_x:1,2c,3d',
                    '_ex:1,2c,3d',
                    '_n:1,2,3,4d',
                    '_nx:1,2,4c,5d',
                    '_n_noop:1,2,3d',
                    '_nx_noop:1,2,3c,4d',
                    ' __ngettext:1,2,3d',
                    '__ngettext_noop:1,2,3d',
                    '_c:1,2d',
                    '_nc:1,2,4c,5d',
                ],
            },
            files: {
                src: [
                    '**/*.php', // Include all files
                    '!node_modules/**', // Exclude node_modules/
                    '!build/**', // Exclude build/
                ],
                expand: true,
            },
        },

        // Clean up build directory
        clean: {
            main: [ 'build/**' ],
            repo: [ 'build/<%= pkg.name %>/**' ],
        },

        // Copy the plugin into the build directory
        copy: {
            theme: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/@fortawesome/fontawesome-free/',
                        src: ['**/*'],
                        dest: 'src/assets/fonts/fontawesome/',
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/',
                        src: ['**/*'],
                        dest: 'assets/',
                    }
                ],
            },

            // build directory
            build: {
                src: [
                    '*.php', // Include all files php
                    '*.css', // Include all files css
                    './assets/**/*', // Exclude assets/
                    './inc/**/*', // Exclude inc/
                    './js/**/*', // Exclude js/
                    './languages/**/*', // Exclude languages/
                    './template-parts/**/*', // Exclude template-parts/
                    '!node_modules/**', // Exclude node_modules/
                    '!vendor/**', // Exclude vendor/
                    '!sass/**', // Exclude sass/
                    '!src/**', // Exclude src/
                    '!.github/**', // Exclude .github/
                    '!.idea/**', // Exclude .idea/
                    '!build/**', // Exclude build/
                ],
                dest: 'build/theme/<%= pkg.name %>-v<%= pkg.version %>/',
            },
        },

        concat: {
            dist: {
                src: [
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    'node_modules/jquery/dist/jquery.js'
                ],
                dest: 'src/js/main.js',
            },
        },

        uglify: {
            main: {
                files: {
                    'src/assets/js/main.js': ['src/js/main.js']
                }
            }
        },

        // Compress build directory into <name>.zip and <name>-<version>.zip
        compress: {
            build: {
                options: {
                    mode: 'zip',
                    archive: './build/theme/<%= pkg.name %>-v<%= pkg.version %>.zip',
                },
                expand: true,
                cwd: 'build/theme/<%= pkg.name %>-v<%= pkg.version %>/',
                src: ['**/*'],
                dest: '<%= pkg.name %>/',
            },
        },
    });

    // Build task(s).
    grunt.registerTask('theme', ['concat', 'uglify', 'copy:theme']);
    grunt.registerTask('build', ['copy:build', 'compress:build']);
};
