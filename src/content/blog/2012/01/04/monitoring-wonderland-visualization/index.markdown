---
title: Monitoring Wonderland Survey - Visualization
created_at: 2012-01-04 19:35:34.199577 +02:00
tags:
- devops
- monitoringsucks
- graphite
- nagios
- javascript
- metrics
- timeseries
blog_post: true
related:
- desc: Monitoring Wonderland Survey - Metrics - API - Gateways
  url: /blog/2012/01/03/monitoring-wonderland-metrics-api-gateways/
- desc: Monitoring Wonderland Survey - Introduction
  url: /blog/2012/01/03/monitoring-wonderland-survey-introduction/
- desc: Monitoring Wonderland Survey - Nagios the Mighty Beast
  url: /blog/2012/01/03/monitoring-wonderland-nagios-the-mighty-beast/
- desc: Monitoring Wonderland Survey - Moving up the Stack - Application and User Metrics
  url: /blog/2012/01/04/monitoring-wonderland-moving-up-the-stack-application-user-metrics/
---
## A picture tells more than a ...
Now that you've collected [all the metrics you wanted or even more](http://sysadvent.blogspot.com/2011/12/day-23-all-metrics-or-how-you-too-can.html) , it's time to make them useful by visualizing them. Every respecting metrics tool provides a visualization of the data collected. Older tools tended to revolve around creating RRD graphics from the data. Newer application are leveraging javascript or flash frameworks to have the data updated in realtime and rendered by the browser. People are exploring new ways of visualizing large amounts of data efficiently. [A good example is Visualizing Device Utilization by Brendan Gregg.](http://dtrace.org/blogs/brendan/2011/12/18/visualizing-device-utilization/) or [Multi User - Realtime heatmap using Nodejs](http://onesandzeros.posterous.com/multi-user-realtime-heatmap-using-nodejs)

Several interesting books have been written about visualization:

- [Designing with Data](http://www.designingwithdata.com/)
- [Visualize this](http://www.amazon.com/Visualize-This-FlowingData-Visualization-Statistics/dp/0470944889/)
- [Information Dashboard Design - Effective Communication](http://www.amazon.com/Information-Dashboard-Design-Effective-Communication/dp/0596100167)
- [Design by Nature](http://www.amazon.com/Design-Nature-Wiley-Sustainable/dp/047111460X)
- [Data Visualizations](http://www.amazon.com/Designing-Data-Visualizations-Julie-Steele/dp/1449312284/)
- [Chapter on visualization in Big Data Glossary Book](http://my.safaribooksonline.com/book/-/9781449315085/visualization/_ulink_url_http_vis_stanford_edu_protovis_protovis_ulink)
- [The visual Display of Quantative Information](http://www.amazon.com/Visual-Display-Quantitative-Information/dp/0961392142/ref=pd_sim_b_8)
- [Envisioning Information](http://www.amazon.com/Envisioning-Information-Edward-R-Tufte/dp/0961392118/ref=pd_bxgy_b_text_b)
- [Visual and Statistical Thinking](http://www.amazon.com/Visual-Statistical-Thinking-Displays-Decisions/dp/0961392134/ref=pd_sim_b_5)

## Dashboard written for specific metric tools
**Graphite**

Graphs are Graphite's killer feature, but there's always room for improvement: 

- Graphiti - <https://github.com/paperlesspost/graphiti> [an alternative well designed UI](http://dev.paperlesspost.com/blog/2011/12/16/introducing-graphiti-an-alternate-frontend-for-graphite/). To see it in action watch this presentation [Metrics And you](http://aq.iriscouch.com/swinger/_design/swinger/index.html#/preso/aq-mdd/display/1)
- Pencil - <https://github.com/fetep/pencil>
- RI Pienaar has created [Gdash - Graphite: version control, add graphs dsl, easy bookmarks](http://www.devco.net/archives/2011/10/08/gdash-graphite-dashboard.php)
- [Charcoal - Charcoal: Simple Graphite Templates ](https://github.com/cebailey59/charcoal)
- Graphite - Jquery - <https://github.com/prestontimmons/graphitejs> - if you want to do it all in Javascript 

[Grockets - Realtime streaming graphite data via socket.io and node.js](https://github.com/disqus/grockets/blob/master/grockets.js)

**Opentsdb**

Graphs in Opentsdb are based on Gnuplot

- Opentsdb- Dashboard in Nodejs - <https://github.com/clover/opentsdb-dashboard>
- Otus - <https://github.com/otus/otus> - Web Dashboard build on top of Hadoop/Opentsdb for monitoring hadoop cluster - 

**Ganglia**

- The New [Ganglia Web - 2](http://sourceforge.net/apps/trac/ganglia/wiki/ganglia-web-2) is pretty slick!

**Collectd**

- [Visage - Web Interface to collectd - RRD](http://auxesis.github.com/visage/)
- a CollectD viewer by John Bergmans usine Websockets - AMQP - Collectd - realtime view: <http://bergmans.com/WebSocket/collectdViewer.html>

**Nagios**

Nagios also has a way to visualize metrics in it's UI

- [PNP4Nagios](http://docs.pnp4nagios.org/pnp-0.6/start)
- [N2RRD](http://exchange.nagios.org/directory/Addons/Graphing-and-Trending/n2rrd/details)
- [RRD2Graph](http://n2rrd-wiki.diglinks.com/display/n2rrd/RRD2GRAPH+HowTo)

- [Visual Timeline - Nagios Vis - Simile](http://exchange.nagios.org/directory/image/951)

**Overall integration**

With all these different systems creating graphs, the nice folks from Etsy have provided a way to navigate the different systems easily via their dashboard - <https://github.com/etsy/dashboard>

I also like the Idea of Embeddable Graphs as <http://explainum.com> implements it

## Development frameworks for visualization
### Generic data visualization
There are many javascript graphing libraries. Depending on your need on how to visualize things, they provide you with different options. The first list is more a generic graphic library list

- Protovis-js : <http://code.google.com/p/protovis-js>
- Processing-js: <http://processingjs.org/>
- Raphael-js: <http://raphaeljs.com/>
- Flare: <http://flare.prefuse.org/>
- Google Fusion Tables : <http://www.google.com/fusiontables>
- Polymaps: <http://polymaps.org/ex/>
- Yahoo UI elements: <http://developer.yahoo.com/yui>
- Gephi: <http://gephi.org>
- Graphiz: <http://www.graphviz.org>

### Time related libraries
To plot things many people now use:

- Flot: <http://code.google.com/p/flot/>
- Ruby interface to Flot: <https://github.com/pbosetti/flotr>

For timeseries/timelines these libraries are useful:

- Simile Timeline - <http://www.simile-widgets.org/timeline/>
- Simile Timeline in Google Charts - <http://code.google.com/apis/chart/interactive/docs/gallery/annotatedtimeline.html>
- Dygraphs - <http://dygraphs.com/> - that produces produces interactive, zoomable charts of time serie
- Rickshaw - <https://github.com/shutterstock/rickshaw> : A JavaScript toolkit for creating interactive real-time graphs

- D3 - Data Driven Documents - <http://mbostock.github.com/d3> . To see it in action check out Cube -<https://github.com/square/cube/wiki>, a tool that uses D3, Redis for realtime visualizations.

And why not have Javascript generate/read some RRD graphs :

- Javascript RRD Graph - <https://github.com/manuelluis/jsrrdgraph>
- Javascript for reading/interpreting RRD files - <http://javascriptrrd.sourceforge.net>
- Pure javascript RRD file manipulation implementation - <https://github.com/tjfontaine/javascript-rrd>

## Annotations of events in timeseries:
On your graphs you often want event annotated. This could range from plotting [new puppet runs](http://www.devco.net/archives/2011/07/03/real_time_puppet_events_and_network_wide_callbacks.php) , [tracking your releases](http://codeascraft.etsy.com/2010/12/08/track-every-release/) to everything that you do in the proces of managing your servers. This is what John Allspaw calls [Ops-Metametrics](http://www.slideshare.net/jallspaw/ops-metametrics-the-currency-you-pay-for-change)

These events are usually marked as vertical lines. 

- RRD Vertical - works for Cacti, Munin, Collectd ... - <http://blog.vuksan.com/2010/06/28/overlay-deploy-timeline-on-your-ganglia-graphs>
- Ganglia - Overlay Events: <http://ganglia.info/?p=382>
- Graphite - Draws as infinite: <http://readthedocs.org/docs/graphite/en/latest/functions.html>
- Graphite - Events to facilitate this:  <https://github.com/agoddard/graphite-events>

- Opentsbd - [has a feature request for annotations but is not yet implemented](https://github.com/stumbleupon/opentsdb/issues/16)

## Dependencies graphs
One thing I was wondering is that with all the metrics we store in these tools, we store the relationships between them in our head.  I researched for tools that would link metrics or describe a dependency graph between them for navigation.

We could use [Depgraph - Ruby library to create dependencies - based n graphviz](http://depgraph.rubyforge.org/) to draw a dependency tree, but we obviously first have to define it. Something similar to the Nagios dependency model (without the strict host/service relationship of course)

### Conclusion
With all the libraries to get data in and out and the power of javascript graphing libraries we should be able to create awesome visualizations of our metrics. This inspired me and [@lusis](http://twitter.com/lusis) to start thinking about creating a book on Metrics/Monitoring graphing patterns. Who knows ...
