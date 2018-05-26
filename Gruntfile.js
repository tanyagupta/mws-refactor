  module.exports = function(grunt) {

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
}
  })

  // Load the plugin
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['responsive_images']);
  grunt.registerTask('clean_images', ['clean']);

};
