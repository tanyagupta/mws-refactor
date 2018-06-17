  module.exports = function(grunt) {
  const imageminJpegtran = require('imagemin-jpegtran');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    responsive_images:{
      myTask:{
      options:{
        sizes: [{
          width: 256,
        },
          {
          width: 320,
        },{
          width: 640,
        },{
          width: 1024,
        }]
      },
      files:[{
        expand:true,
        src: ['img/*.jpg'],
        dest: 'dest'

        //custom_dest:'dest/{%= width %}/'
      }]
    }
  },
  clean : {
    path : {
        src : [ "dest/img/*.jpg"]
    }
},
  imagemin: {
        static: {
            options: {
               optimizationLevel: 3,
//                svgoPlugins: [{removeViewBox: false}],

            },
            files: [
               {dest: 'destmin/img/1-256.jpg',src: 'dest/img/1-256.jpg'},
               {dest: 'destmin/img/2-256.jpg',src: 'dest/img/2-256.jpg'},
               {dest: 'destmin/img/3-256.jpg',src: 'dest/img/3-256.jpg'},
               {dest: 'destmin/img/4-256.jpg',src: 'dest/img/4-256.jpg'},
               {dest: 'destmin/img/5-256.jpg',src: 'dest/img/5-256.jpg'},
               {dest: 'destmin/img/6-256.jpg',src: 'dest/img/6-256.jpg'},
               {dest: 'destmin/img/7-256.jpg',src: 'dest/img/7-256.jpg'},
               {dest: 'destmin/img/8-256.jpg',src: 'dest/img/8-256.jpg'},
               {dest: 'destmin/img/9-256.jpg',src: 'dest/img/9-256.jpg'},
               {dest: 'destmin/img/10-256.jpg',src: 'dest/img/10-256.jpg'},

               {dest: 'destmin/img/1-320.jpg',src: 'dest/img/1-320.jpg'},
               {dest: 'destmin/img/2-320.jpg',src: 'dest/img/2-320.jpg'},
               {dest: 'destmin/img/3-320.jpg',src: 'dest/img/3-320.jpg'},
               {dest: 'destmin/img/4-320.jpg',src: 'dest/img/4-320.jpg'},
               {dest: 'destmin/img/5-320.jpg',src: 'dest/img/5-320.jpg'},
               {dest: 'destmin/img/6-320.jpg',src: 'dest/img/6-320.jpg'},
               {dest: 'destmin/img/7-320.jpg',src: 'dest/img/7-320.jpg'},
               {dest: 'destmin/img/8-320.jpg',src: 'dest/img/8-320.jpg'},
               {dest: 'destmin/img/9-320.jpg',src: 'dest/img/9-320.jpg'},
               {dest: 'destmin/img/10-320.jpg',src: 'dest/img/10-320.jpg'},

               {dest: 'destmin/img/1-640.jpg',src: 'dest/img/1-640.jpg'},
               {dest: 'destmin/img/2-640.jpg',src: 'dest/img/2-640.jpg'},
               {dest: 'destmin/img/3-640.jpg',src: 'dest/img/3-640.jpg'},
               {dest: 'destmin/img/4-640.jpg',src: 'dest/img/4-640.jpg'},
               {dest: 'destmin/img/5-640.jpg',src: 'dest/img/5-640.jpg'},
               {dest: 'destmin/img/6-640.jpg',src: 'dest/img/6-640.jpg'},
               {dest: 'destmin/img/7-640.jpg',src: 'dest/img/7-640.jpg'},
               {dest: 'destmin/img/8-640.jpg',src: 'dest/img/8-640.jpg'},
               {dest: 'destmin/img/9-640.jpg',src: 'dest/img/9-640.jpg'},
               {dest: 'destmin/img/10-640.jpg',src: 'dest/img/10-640.jpg'},

               {dest: 'destmin/img/1-1024.jpg',src: 'dest/img/1-1024.jpg'},
               {dest: 'destmin/img/2-1024.jpg',src: 'dest/img/2-1024.jpg'},
               {dest: 'destmin/img/3-1024.jpg',src: 'dest/img/3-1024.jpg'},
               {dest: 'destmin/img/4-1024.jpg',src: 'dest/img/4-1024.jpg'},
               {dest: 'destmin/img/5-1024.jpg',src: 'dest/img/5-1024.jpg'},
               {dest: 'destmin/img/6-1024.jpg',src: 'dest/img/6-1024.jpg'},
               {dest: 'destmin/img/7-1024.jpg',src: 'dest/img/7-1024.jpg'},
               {dest: 'destmin/img/8-1024.jpg',src: 'dest/img/8-1024.jpg'},
               {dest: 'destmin/img/9-1024.jpg',src: 'dest/img/9-1024.jpg'},
               {dest: 'destmin/img/10-1024.jpg',src: 'dest/img/10-1024.jpg'},

            ]
        },
/*        dynamic: {
            options: {
                interlaced: true,
                progressive: true,
                use:[imageminJpegtran()]

            },
            files: [

              {expand: true,
              cwd: '../',
               src: ['**//*.jpg'],
/*               dest:'destmin/'},
               // src: ['./dest/img/*.{png,jpg,gif}'],
//               cwd: 'dest/img',
//               src:['dest/img/*.*'],
                //dest: 'destmin/'
            //}
            ]
        }*/
    }
  })

  // Load the plugin
 // grunt.loadNpmTasks('grunt-responsive-images');
 // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // Default task(s).
  grunt.registerTask('default', ['imagemin']);
  //grunt.registerTask('clean_images', ['clean']);
 // grunt.registerTask('minimize', ['imagemin']);

};
