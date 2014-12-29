---
title: Compiling a nodejs projects as a single binary
created_at: 2013-05-14 07:35:34.199577 +02:00
tags:
- nodejs
- compile
- binary
- nexe
- package
- single
blog_post: true
filter:
- erb
- markdown
---
Let's face it, if you write software it's often hard to distribute it: you have the runtime , the modules you depend on and your software itself. Sure you can package that all but packages ofter require you to have root-privileges to install.

Therefore at times it's convenient to have a single file/binary distribution. Download the executable and run it.
For ruby project you can convert things into a single jar using Jruby. A good example is the [logstash](http://logstash.net) project: download 1 file , run it and you're in business.
But you'd still require the java runtime to be installed. (thanks Apple, NOT).

This is a extra of the GO language but I was looking for a similar thing for __nodejs__. 
And the following documentation is the closest I could it get: (it works!)

## Compiling plain javascript (no external modules)
Enter [nexe](https://github.com/crcn/nexe) a tool to compile nodejs projects to an executable binary.

The way it works is:
- it downloads the [nodejs source](http://nodejs.org/download/) of your choice
- it creates a single file nodejs source (using [sardines](https://github.com/crcn/sardines) )
- it monkey patches the nodejs code to include this single file in the binary (adding it to the lib/nexe.js directory)

Creating a binary is as simple as:

<pre>$ nexe -i myproject.js -o myproject.bin -r 0.10.3</pre>

Caveats:

- I had an issue with unicode chars that got converted: it uses uglify.js and this needs to be configured to leave them alone
[Sardines Patch Unichode](https://github.com/crcn/sardines/pull/13) . This was necessary to get [terminal.js](https://github.com/c3ks/terminal.js) to compile
- Next issue was to get [socket.io-client](https://github.com/LearnBoost/socket.io-client) to compile: the swfobject has document and navigator objects, so this had to be fixed as well - [Sardines Patch Document & Navigator](https://github.com/crcn/sardines/pull/14) 
- For now, you'll need to execute nexe inside the nxe directory and not in the project directory - I think it's because sardines looks at the package.json file for names

Alternatives:

- [Node-webkit](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps) to package nodejs apps that require UI interaction
- <http://tidesdk.multipart.net/docs/user-dev/generated/> - seems similar but could not really grasp it
- AppJS - <http://appjs.org/#why> - aims to create HTML5/Javascript native apps
- NPKG - <https://github.com/wearefractal/npkg> - old but interesting code

## Embedding a native module (in the nodejs binary)
Many of these single packaging tools, suffer from the problem of handline native modules.

[nexe](https://github.com/crcn/nexe) doesn't handle native modules (yet).

But with a little persistance and creativity, this is what I did to add the [pty.js](https://github.com/chjj/pty.js/) native module directly to the nodejs binary

<pre>
$ tar -xzvf node-v0.8.21.tar.gz
$ cd node-v0.8.21

# Copy the native code in the src directory
# If there is a header file copy/adapt it too
$ cp ~/dev/terminal.js/node_modules/pty.js/src/unix/pty.cc src/node_pty.cc

# Correct the export name of the module
# Add the node_ prefix to the node_module name
# Last line should read - NODE_MODULE(node_pty, init)

# add node_pty to src/node_extensions.h (f.e. right after node_zlib)
# NODE_EXT_LIST_ITEM(node_pty)

# Copy the pty.js file
$ cp ~/dev/pty.js/lib/pty.js lib/pty.js

# Add the pty.js to the node.gyp
# Somewhere in the library list add pty.js
# Somewhere in the source list add node_pty.cc

# Adapt the namings/bindings in lib/pty.js
# 1) replace: var pty = require('../build/Release/pty.node');
#    with: var binding = process.binding('pty');
# 2) replace all references to pty. to binding.

$ make clean
$ ./configure
$ make

</pre>

Now you have a custom build __node__ in __out/Release/node__ 
The filesize was about 10034856 , you can further strip it and 6971192 (6.6M)

Now you need to remove the native dependency from your package.json before you nexe build it

## Packaging the file

A single binary now makes it easy to to make a curl installer from it as it only requires you to download file. [Remember the caveat of this.](http://spin.atomicobject.com/2011/11/23/considered-harmful/)

And you can still package it up:

- create a rpm, deb, etc.. package from it using [fpm](https://github.com/jordansissel/fpm)
- or create a native MacOSX .app file from it as [Matthias Bynens](https://twitter.com/mathias) suggest in <http://mathiasbynens.be/notes/shell-script-mac-apps>
- <https://github.com/subtleGradient/Appify-UI>
- <http://blog.coolaj86.com/articles/how-to-create-an-osx-pkg-installer.html>
- build a DMG - <http://www.recital.com/index.php?option=com_content&view=article&id=108%3Ahowto-build-a-dmg-file-from-the-command-line-on-mac-os-x&Itemid=59>

## Extras
[Rant about why it's a good or bad Idea - Secure Nodejs distribution](https://groups.google.com/forum/#!topic/nodejs/mPIcq5mHihM)

More info on the process.binding:

- <http://blog.carbonfive.com/2011/03/14/node-js-part-ii-spelunking-in-the-code/>
- <https://groups.google.com/forum/?fromgroups#!topic/nodejs/R5fDzBr0eEk>


Convert nodejs projects to single file/beautifier:

- Npk - <https://github.com/cfsghost/npk>
- UglifyJS - <https://github.com/mishoo/UglifyJS/>
- RequireJS - <http://requirejs.org/>
- Browserify - <http://browserify.org/>
- OneJS - <https://github.com/azer/onejs>

Cross compiling:

- <https://github.com/felixge/node-cross-compiler>
- <http://n8.io/cross-compiling-nodejs-v0.8/>
