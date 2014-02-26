module.exports = function transform(filename) {
  var fs = require('fs');

  var marked = require('marked');
  var yaml = require('js-yaml');
  var mustache = require('mustache');

  var eventConfig;

  // LOAD YAML FILES ALONG THE WAY
  // Get document, or throw exception on error
  try {
    eventConfig = yaml.safeLoad(fs.readFileSync(__dirname + '/../src/events/2014-austin/event.yaml', 'utf8'));
  } catch (e) {
    //console.log(e);
  }

  var content;
  var pageConfig;

  var fileContent = fs.readFileSync(filename, 'utf-8');
  var parts = fileContent.split(/---/);

  var output;

  if (parts.length > 2) {
    // We have a header
    pageConfig = yaml.safeLoad(parts[1]);
    content = parts[2];

    var config = {
      event: eventConfig,
      page: pageConfig
    };

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });

    var markdown = marked(content);

    var templateName = 'default' ;

    if (pageConfig.layout) {
      templateName = pageConfig.layout;
    };

    if (templateName === 'nil') {
      output = mustache.render(markdown, config );
    } else {
      var template = fs.readFileSync(__dirname + '/../templates/' + templateName + '.moustache', 'utf-8');

      output = mustache.render(template, config , {
        content: markdown
      });
    }
  }  else {
    output = fileContent
  }


  return output
};
