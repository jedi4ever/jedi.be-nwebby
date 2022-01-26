---
title: Markdown to Confluence Convertor
created_at: 2011-12-15 14:35:34.199577 +02:00
tags:
- confluence
- markdown
blog_post: true
---
Recently in Confluence 4.0 the Wiki Markup Editor was removed for [various engineering reasons](http://blogs.atlassian.com/2011/11/why-we-removed-wiki-markup-editor-in-confluence-4/). I like to type my text in wiki style, and most of all using Markdown.

This code is a quick hack for converting markdown to [Atlassian confluence](http://atlassian.com/confluence) markup language. Which you can still insert via the menu.

It's not a 100% full conversion, but I find it rather usuable already. I will continue to improve where possible.

The gem is based on [Kramdown](https://github.com/gettalong/kramdown)

### Installation:

#### Via gem

    $ gem install markdown2confluence

#### From github:

    $ gem install bundler
    $ git clone git://github.com/jedi4ever/markdown2confluence.git
    $ bundle install vendor

### Usage:

If using Gem:

    $ markdown2confluence <inputfile>

If using bundler:

    $ bundle exec bin/markdown2confluence <inputfile>

### Extending/Improving it:

there is really one class to edit 

- see lib/markdown2confluence/convertor/confluence.rb
Feel free to enhance or improve tag handling.
