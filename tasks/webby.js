var nwebby = require('nwebby');
var async = require('async');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('webby', 'parse webby style',function() {

    var done = this.async();

    var files = this.files;
    //console.log(files);
    var nOptions = {
      baseDir: path.join(__dirname,'..','src/content'),
      templateDir: path.join(__dirname,'..','src/layout')
    };

    nwebby.readBlogs(nOptions, function(err, blogMetadata) {

      nwebby.rss(nOptions, function(err, rssMetadata) {

        nOptions.metadata = {};
        nOptions.metadata.rss = rssMetadata;
        nOptions.metadata.blogposts = blogMetadata;

        grunt.log.debug('rss', JSON.stringify(rssMetadata));

        async.eachSeries(files, function(file, callback) {
          var filename = file.src[0];

          if (grunt.file.isFile(filename)) {
            grunt.log.debug('Webby processing', filename);
            nwebby.hasMetadata(filename, function(err,metadataDetected){
              if (err) {
                grunt.log.debug('Error reading metadata',err);
                return callback(err);
              } else {
                grunt.log.debug('checking for metadata', filename);
                if (metadataDetected) {
                  grunt.log.debug('found metadata', filename);
                  nwebby.render(filename, nOptions, function(err, result, metadata) {
                    if (err) {
                      return callback(err);
                    } else {
                      var extension = metadata.page.extension;
                      var destFile = file.dest;
                      if (extension) {
                        destFile = path.join(path.dirname(destFile),path.basename(destFile, path.extname(destFile))+'.'+extension);
                      }
                      grunt.file.write(destFile, result);
                      return callback();
                    }
                  });
                } else {
                  grunt.log.debug('NOT found metadata', filename);
                  grunt.file.copy(file.src[0], file.dest);
                  return callback();
                }
              }
            })
          } else {
            grunt.log.debug('not a file', filename);
            return callback();
          }
        }), function(err) {
          console.log('aaa error', err);
          done();
        }
      })
    })

  });
};
