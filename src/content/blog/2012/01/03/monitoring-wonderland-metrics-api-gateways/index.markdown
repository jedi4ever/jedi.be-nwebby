---
title: Monitoring Wonderland Survey - Metrics - API - Gateways
created_at: 2012-01-03 15:35:34.199577 +02:00
tags:
- devops
- monitoringsucks
- nagios
- ganglia
- collectd
- graphite
- opentsdb
- amqp
- zeromq
- 0mq
- munin
related: 
- desc: Monitoring Wonderland Survey - Introduction
  url: /blog/2012/01/03/monitoring-wonderland-survey-introduction/
blog_post: true
---
*Update 4/01/2012: added ways to add metrics via logs, java pickle graphite feeder*

### One tool to rule them all? Not.
If you are working within an enterprise , chances are that you have different metric systems in place:
You might have some Cacti, Ganglia, Collectd, etc... due to historical reasons, different departments,

This reminded me of the situation while I was working in Identity Management: you might have an LDAP, Active Directory, local HR database etc.
There would be plans and discussions of using one over the other, and gateways would need to be written. I learned a few lessons there:

1. have as few sources/stores of information as possible
2. DON't try to chase the **one tool to rule them all**, aka don't use a tool for something it's not made for
3. make it self-servicing to user and automate processes

### 1 to 1 gateways
Take the new Metrics hotness Graphite as an example, it has some nice graphing advantages over other tools . So people wonder , should I migrate my Ganglia, Collectd to Graphite?
Graphite doesn't come with elaborate collection scripts for memory/disk/etc ... , so we have to rely on other tools like Cacti,Munin,Collectd,Ganglia to first collect the data.

So we start writing gateways to get data into Graphite:

- [Collectd -> Graphite plugin (using perl)](http://joemiller.me/2011/04/14/collectd-graphite-plugin/)
- [Collectd -> Graphite (Loggly - Nodejs) - proxy httpd](https://github.com/loggly/collectd-to-graphite)
- [Diamond-gmond - python - ganglia -> graphite](https://github.com/freemed/diamond-gmond)

But what happens if we also use Opentsdb for storing long term data ? We have to re-implement those gateways:

- [Collectd -> Opentsdb](https://github.com/auxesis/collectd-opentsdb/tree/master/org/collectd/java)

### Issue 1 : Effort duplication

This just seems like a waste of energy implementing the protocol in every tool.This sure isn't the first time this happens in history: the same thing happened for [Collectd -> Ganglia Plugin](http://collectd.org/wiki/index.php/Plugin:gmond)

If you look at the data that is transmitted it is actually pretty much the same:

__a metric name, value, timestamp, optionally hostname, some metadata tags__

So we could easily envision a 'universal' format that would be used to translate from and to.

    Ganglia  <-> Intermediate format <-> Graphite
    Collectd <-> Intermediate format <-> Opentsdb

With this intermedia format, we would only have to write one end of the equation once.

I started thinking of this like an **ffmpeg for monitoring**

### Issue 2: Difficult to hook in additional listeners
Let's add another system that wants to listen into the metrics, something like Esper, Nagios alerting, some Dataware house tools etc...
We could reuse the libraries from end to the other, but we'll have to add more gateways and put these in place everytime.

A better approach would be to use a message bus approach: every tools puts and listens on a bus and gets the data it needed. RI Pienaar has written about this approach extensively in his [Series on Common Messaging Patterns](http://www.devco.net/archives/2011/12/14/common-messaging-patterns-using-stomp-%E2%80%93-part-5.php). Aso John Bergmans has a great post on using [AMQP and Websockets to get realtime graphics](http://bergmans.com/WebSocket/Server_Monitoring.html).

Some of the tools already have Message queue integrations, but there seems to be a common intermediate format missing

- Graphite - Rabbit Mq integration: <http://www.somic.org/2009/05/21/graphite-rabbitmq-integration/>
- Graphite - AMQP integration: <https://code.launchpad.net/~lucio.torre/graphite/graphite-add-rabbitmq/+merge/16816>
- Graphilia - Graphite AMQP: <https://github.com/fetep/graphlia/blob/master/graphlia.py>

- Collectd - Plugin:AMQP - Transmit or receive value by collectd: <http://collectd.org/wiki/index.php/Plugin:AMQP>
- Collectd- ZeroMQ: <https://github.com/deactivated/collectd-write-zmq/>

As a proof of concept I've created :

- Ganglia-Zeromq gateway in Ruby: <https://github.com/jedi4ever/gmond-zmq>
- Collectd-Zeromq gateway in Ruby: <https://github.com/jedi4ever/collectd-zmq>

### Building blocks
In this section I'll look for API's (ruby oriented) to get data in and out of the different metrics systems:

#### Graphite - IN

Sending metrics from ruby to Graphite:

- Graphite Gem: <https://github.com/otherinbox/graphite>
- Simple graphite Gem: <https://github.com/imeyer/simple-graphite>

These both implement the [Simple Protocol, but for high performance we'd like to use the batching facility through the Pickle Format.](http://bazaar.launchpad.net/~graphite-dev/graphite/main/view/head:/docs/feeding-carbon.rst)
I could not find a Pickle gem for ruby, but his could work through Ruby-Python gateway <http://rubypython.rubyforge.org/>.

Faster - a Java Netty based graphite relay takes the same approach <https://github.com/markchadwick/graphite-relay>

Another way to get your data into graphite is using Etsy's Logster <https://github.com/etsy/logster>

Mike Brittain greatly explains it's use in Take my logs... Please! - A velocity Online Conference Session[Video](http://www.youtube.com/watch?v=EJb9Ogv3E8w)[PDF](http://www.slideshare.net/mikebrittain/take-my-logs-please)

#### Graphite - OUT
To get all the data out of Graphite is impossible through the standard API. You get a graph out as Raw data, but that hardly counts.

The best option seems to be to listen in to the [graphite - udp receiver](https://code.launchpad.net/~tmm1/graphite/udp-receiver/+merge/68622) and duplicate the information onto a message bus.

An alternative might be to directly read from the Whisper storage, inspiration for that can be found in:

- Whisper - Ruby gem: <https://github.com/eric/whisper-rb>
- Ruby interface to Graphite's Whisper file format : <https://github.com/mleinart/graphite_storage>
- Merging Whisper files : <https://github.com/damaex17/whisper-merge>
- Hoard - A Whisper alike for Nodejs: <https://github.com/cgbystrom/hoard>

#### Opentsdb - IN
I could not find any ruby gem that implements the Opentsdb protocol for sending data, but creating one should be trivial.
Opentsdb just use a [plain TCP socket to get the data in](http://opentsdb.net/getting-started.html)

#### Opentsdb - OUT
Getting data out of Opentsdb suffers the same problem as Graphite: you can do queries on specific graph data

- Ruby gem - opentsdb API: <https://github.com/j05h/continuum>

But you can't get it out, maybe if you directly interface with the Hbase/Java API. So again the best bet is to create a listener/proxy for the simple TCP protocol.

#### Ganglia - IN
Sending metrics to Ganglia is easy using the [gmetric shell command](http://ganglia.info/gmetric/). Early days code describing this can still be found at http://code.google.com/p/embeddedgmetric/

Igrigorik has written up nicely on [how to use the Gmetric Ruby gem to send metrics](http://www.igvita.com/2010/01/28/cluster-monitoring-with-ganglia-ruby/)

- Gmetric Ruby Gem - <https://github.com/igrigorik/gmetric>
- An HTTP Wrapper to send metrics: <https://github.com/garethr/gmetric-web>

If you want to feed in log files into ganglia Logtailer might be your thing
<https://bitbucket.org/maplebed/ganglia-logtailer>

#### Ganglia - OUT
Vladimir describes the options while he explains on [how to get Ganglia data to graphite](http://blog.vuksan.com/2010/09/29/integrating-graphite-with-ganglia/)

Option 1 is to poll the Gmond over TCP and get the XML from it's current data:

- [Poll Gmond from Java](http://wso2.org/repos/wso2/people/paul/GMondPoller/GMondPollerJob.java)

Options 2 is to listen into the UDP protocol as a additional receiver.

I implemented both approaches in the <https://github.com/jedi4ever/gmond-zmq>

Note: As a side effect I found that the metrics send to the UDP are actualy more acurate then the values when you query the XML.

#### Collectd - IN
So send metrics to Collectd, you can use ruby gem from Astro that implements most of the UDP protocol

- Collectd Ruby gem  by Astro - <https://github.com/astro/ruby-collectd/>

#### Collectd - OUT
I give Collectd for the price of best output.

It currently implements [different writers:](http://collectd.org/wiki/index.php/Table_of_Plugins)

- Network plugin
- UnixSock plugin
- Carbon plugin
- CSV
- RRDCacheD
- RRDtool
- Write HTTP plugin

And the deactived ZeroMQ - <https://github.com/deactivated/collectd-write-zmq>

The Binary Protocol <http://collectd.org/wiki/index.php/Binary_protocol> is pretty simple to listen into.

- [Jcollectd](https://github.com/hyperic/jcollectd/blob/master/src/main/java/org/collectd/protocol/UdpReceiver.java)

#### Munin
If you happen to use Munin, here's some inspiration, but I haven't researched it much

- API Client - <https://github.com/sosedoff/munin-ruby>
- Munin Network Protocol - <http://munin-monitoring.org/wiki/network-protocol>
- Rails Plugin that implements the munin-node protocol to allow Rails Internals to be graphed by Munin - <https://github.com/jamesotron/Muninator>
- Munin Node - Ruby: <http://www.devco.net/archives/2011/10/02/interact-with-munin-node-from-ruby.php>

#### Circonus
If you happen to use Circonus, here's some inspiration, but I haven't researched it much

- [Ruby Circonus](https://github.com/adamhjk/ruby-circonus)
- [Circonus - Munin](https://github.com/adamhjk/circonus-munin)

#### RRD interaction from ruby
For those who want to read and write directly from RRD's in ruby, please have fun:

- FFI -RRD - <https://github.com/morellon/rrd-ffi>
- RRD-RB Ruby - RRD - <http://code.google.com/p/rrd-rb/>
- RRD-graph-ruby - <https://github.com/ion1/rrd-graph-ruby>
- RRDtool - rrdruby - <http://oss.oetiker.ch/rrdtool/prog/rrdruby.en.html>

### Alert on metrics:
With all the tools in and out, and a unified intermediate format, it will be trivial to rewrite the traditional alert _check_ tools to listen into the bus for values.
This means you can listen into for your Nagios, your ticket system, your pager system etc.. from the same source.

**Graphite**

- <https://github.com/etsy/nagios_tools>
- <https://github.com/recoset/check_graphite>

**Opentsdb**

- Check_TSD - Opentsdb : <http://opentsdb.net/nagios.html>

**Ganglia**

- <http://blog.vuksan.com/2011/04/19/use-your-trending-data-for-alerting/>
- <https://github.com/mconigliaro/check_ganglia_metric>
- <https://github.com/daniyalzade/nagios-ganglia-plugin>
- <https://github.com/larsks/check_ganglia>

**New Relic**

 <https://github.com/kogent/check_newrelic>

### Conclusion
It should be feasible to create an intermediate format and reuse some of these libraries to implement both IN and OUT functionality.
Why not create a [Fog](http://fog.io) for monitoring information? Like implements metric receive, send, 

Next stop Nagios because it deserves a blogpost on it's own ...
