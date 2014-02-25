module.exports = function(grunt) {
  grunt.registerMultiTask('webby', 'parse webby style',function() {

    var transform = require('../lib/transform.js');

    var files = this.files;

    files.forEach(function(file) {
      //console.log(transform(file.src[0]));
      grunt.file.write(file.dest, transform(file.src[0]));
    });
  });
};
