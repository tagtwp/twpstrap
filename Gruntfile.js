module.exports = function (grunt) {
    // Load multiple grunt tasks using globbing patterns
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy the front into the build directory
        copy: {
            front: {
                files: [
                    {
                        expand: true,
                        cwd: 'front/',
                        src: ['assets/**', '*.html'],
                        dest: 'build/<%= pkg.name %>/',
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/animate.css/animate.css'],
                        dest: 'front/assets/css/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/swiper/swiper-bundle.min.css'],
                        dest: 'front/assets/css/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/swiper/swiper-bundle.min.js'],
                        dest: 'front/assets/js/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/wow.js-juzi/dist/wow.min.js'],
                        dest: 'front/assets/js/',
                        filter: 'isFile',
                    },
                ],
            },
            theme: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/animate.css/animate.css'],
                        dest: 'theme/assets/css/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/swiper/swiper-bundle.min.css'],
                        dest: 'theme/assets/css/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/swiper/swiper-bundle.min.js'],
                        dest: 'theme/assets/js/',
                        filter: 'isFile',
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/wow.js-juzi/dist/wow.min.js'],
                        dest: 'theme/assets/js/',
                        filter: 'isFile',
                    },
                ],
            },
        },
        // Compress build directory into <name>.zip and <name>-<version>.zip
        compress: {
            front: {
                options: {
                    mode: 'zip',
                    archive: './build/<%= pkg.name %>-v<%= pkg.version %>.zip',
                },
                expand: true,
                cwd: 'build/<%= pkg.name %>/',
                src: ['**/*'],
                dest: '<%= pkg.name %>/',
            },
        },
    });

    // Build task(s).
    grunt.registerTask('front', ['copy:front:files']);
    grunt.registerTask('front-build', ['compress:front']);
    grunt.registerTask('theme', ['copy:theme']);
};