if try_require 'coderay'
require 'enumerator'

Loquacious.configuration_for(:webby) {
  desc <<-__
    Options for CodeRay syntax highlighting. See the CodeRay home page
    (http://coderay.rubychan.de/) for more information about the available
    options.
  __
  codify {
    desc 'The language being highlighted (given as a symbol).'
    lang :ruby

    desc 'The file you want to read instead of a string'
    lang :file

    desc 'Include line numbers in :table, :inline, :list or nil (no line numbers).'
    line_numbers nil

    desc 'Where to start line number counting.'
    line_number_start 1

    desc 'Make every N-th number appear bold.'
    bold_every 10

    desc 'Tabs will be converted into this number of space characters.'
    tab_width 8
  }
}

module Webby::Helpers
module CodifyHelper

  # The +codify+ method applies syntax highlighting to source code embedded
  # in a webpage. The CodeRay highlighting engine is used for the HTML
  # markup of the source code. The page sections to be highlighted are given
  # as blocks of text to the +coderay+ method.
  #
  # Options can be passed to the CodeRay engine via attributes in the
  # +codify+ method.
  #
  #    <% codify( :lang => "ruby", :line_numbers => "inline" ) do -%>
  #    # Initializer for the class.
  #    def initialize( string )
  #      @str = stirng
  #    end
  #    <% end -%>
  #    
  # The supported Codify options are the following:
  #
  #    :lang               : the language to highlight (ruby, c, html, ...)
  #    :file               : the file to highlight
  #    :line_numbers       : include line numbers in 'table', 'inline',
  #                          or 'list'
  #    :line_number_start  : where to start with line number counting
  #    :bold_every         : make every n-th number appear bold
  #    :tab_width          : convert tab characters to n spaces
  #
  
  def codify( *args, &block )
    opts = args.last.instance_of?(Hash) ? args.pop : {}

    parent=File.dirname(@page.path)
     file=opts[:file]
    text=""
    if (!file.nil?) 
      begin
        filename=parent+File::SEPARATOR+file
        file=File.open(filename,"rb")
        text=file.read
        syntax=guess_syntax(filename)
        if !syntax.nil? && opts[:lang].nil? then
          opts[:lang]=syntax
       end
      rescue
        puts "Error reading code file"+filename
      end
    else
      text = capture_erb(&block)
    end
    
    return if text.empty?

    defaults = ::Webby.site.coderay
    lang = opts.getopt(:lang, defaults.lang).to_sym

    cr_opts = {}
    %w(line_numbers       to_sym
       line_number_start  to_i
       bold_every         to_i
       tab_width          to_i).each_slice(2) do |key,convert|
      key = key.to_sym
      val = opts.getopt(key, defaults[key])
      next if val.nil?
      cr_opts[key] = val.send(convert)
    end

    #cr.swap(CodeRay.scan(text, lang).html(opts).div)
    out = %Q{<div class="CodeRay">\n<pre>}
    out << ::CodeRay.scan(text, lang).html(cr_opts)
    out << %Q{</pre>\n</div>}

    # put some guards around the output (specifically for textile)
    out = _guard(out)

    concat_erb(out, block.binding)
    return
  end

  def guess_syntax(filename)
    extension=case File.extname(filename).downcase
      when ".rb" then :ruby
      when ".html",".html" then :html
      when ".sh" then :sh
      when ".css" then :css
      when ".js" then :java_script
      when ".diff" then :diff
      when ".yaml" then :yaml
      when ".json" then :json
      when ".java" then :java
      when ".xml" then :xml
      when ".txt" then :plaintext
      when ".py" then :python
      when ".xml" then :xml
      when ".c" then :c
      when ".sql" then :sql
      else nil
    end
    return extension

  end

end  # module CodefyHelper

register(CodifyHelper)

end  # module Webby::Helpers
end  # try_require

# EOF