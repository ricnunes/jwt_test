module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['scss']
      },
      dist: {
        options: {
          //outputStyle: 'compressed'
        },
        files: {
          'css/style-unprefixed.css': 'scss/style.scss'
        }
      }
    },

    autoprefixer: {
      global: {
        src: 'css/style-unprefixed.css',
        dest: 'css/style.css'
      },
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      css: {
        files: 'scss/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: [],
        options: {
          spawn: false,
        }
      },
      
      html: {
        files: ['*.html'],
        tasks: [],
        options: {
          spawn: false,
         }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '_images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },

    browserSync: {
      files: {
        src : ['css/style.css', '*.html']
      },
      
      options: {
        watchTask: true,
        ghostMode: {
          scroll: true,
          links: true,
          forms: true
        },
        server: {
            baseDir: "d:/development/_websites/jwt_test/"
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  
  grunt.registerTask('images', ['imagemin']);
  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('running', ["browserSync", "watch"]);
};