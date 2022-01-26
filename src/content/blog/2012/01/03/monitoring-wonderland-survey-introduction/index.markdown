---
title: Monitoring Wonderland Survey - Introduction
created_at: 2012-01-03 10:35:34.199577 +02:00
tags:
- devops
- monitoringsucks
- nagios
blog_post: true
---
### Introduction
While Automation is great to get you going and doing things faster and reproducible, Monitoring/Metrics are probably more valuable for learning and getting feedback from what's really going on. Matthias Meyer describes it as the [virtues of monitoring](http://www.paperplanes.de/2011/1/5/the_virtues_of_monitoring.html). Nothing new, if you have been listening to [John Allspaw](http://www.kitchensoap.com/) on [Metrics Driven Engineering (pdf)](http://assets.en.oreilly.com/1/event/65/Metrics-driven%20Engineering%20at%20Etsy%20Presentation.pdf), essentially putting the science back in IT as [Adam Fletcher](https://twitter.com/adamfblahblah) noted at the Boston devopsdays openspace session on [What does a sysadmin look like in 10 years](http://www.thesimplelogic.com/2011/03/22/what-does-a-sysadmin-look-like-in-10-years/) 

#### Eager to help
Over the years I've done my fair share of monitoring setups, but the last years I was more focused on Automation. I would automate the hell out of any monitoring system the customer had. But after a while, this felt like standing on the sideline too much for me. This feeling got amplified by the [Monitoring Sucks](https://github.com/monitoringsucks) initiative of [John Vincent](http://about.me/lusis): an initiative to improve the field where we can. The initiative has already spun some [very good blogpost](https://github.com/monitoringsucks/blog-posts) and one of the first blogposts [monitoring sucks watch your language](http://lusislog.blogspot.com/2011/07/monitoring-sucks-watch-your-language.html) where they try to create a common vocabulary , reminded me a lot of the early 'what is' devops postings. So after Jason Dixon said,  [Monitoring Sucks, Do something about It](http://obfuscurity.com/2011/07/Monitoring-Sucks-Do-Something-About-It) , I decided to  widen my focus again from automation to monitoring. And I found a great partner in [Atlassian](http://atlassian.com).

I'm certainly not the first person to do this, but I'm eager to help in the space. People like RI Pienaar have done some amazing ground work [thinking about Monitoring Frameworks](http://www.devco.net/archives/2011/03/19/thinking_about_monitoring_frameworks.php) and making them [Composable Architectures](http://www.devco.net/archives/2011/04/04/monitoring_framework_composable_architectures.php). One of the exiting areas, I'd like to focus on , is trying to make monitoring/metrics as easy as 'monitoring up' for developers and bring the traditionally operational tools in development land to better understand their application. We learned from configuration management that having common tools and a common language greatly helps overcome the devops divide.

Before jumping in the space, we decided to research the existing space extensively with its problems and solutions. This blogpost series is a summmary of these finding and will therefore will contain a lot of links. 

#### Non technical reading
This series of blogposts is tools focused, not monitoring approach oriented, more on that in later posts, but for now I'll refer you to :

- [Web Operations book](http://shop.oreilly.com/product/0636920000136.do) (where I have a chapter on Monitoring) 
- [The Art of Capacitity Planning](http://shop.oreilly.com/product/9780596518585.do)
- [Complete Web Monitoring: Watching your visitors, performance communities, and competitors](http://www.amazon.com/Complete-Web-Monitoring-Performance-Communities/dp/0596155131)

_Note:_

- You will find that some tools were more predominantly researched, that's because the research was done from the perspective of [Atlassian](http://www.atlassian.com)'s current and future metrics/monitoring environment. 
- Also you will notice a slant towards ruby libraries, that's mainly because I feel most productive in it and I'm thinking integration with chef/puppet/fog/vagrant etc.
- the main focus will be on Open Source Solutions, where available and commercially wherever there is a gap.

### Meet the players
For people new in the field, I'd like to give a quick overview on the current players in the field , together with their official links and where possible links to books available:

A good actual overview can be found in the presentation of [Jason Dixon's Trending with Purpose](http://obfuscurity.com/static/TrendingWithPurpose_20110318.pdf) and [Joshua Barratt - Getting more signal from your noise](http://serialized.net/2011/02/getting-more-signal-from-your-noise/)[PDF](http://serialized.net/images/Signal_Noise_With_Notes.pdf)  I especially liked his approach to look at these tools from the _Collect - Transport - Process - Store - Present_ perspectives.

#### Metrics
In the 'old' days, people first focused on the collect and transport problem. The standard for timeseries Storage was RRD [Round Robin Database](http://en.wikipedia.org/wiki/Round-Robin_Database), and people would choose their metrics tools based on the collection scripts that were available. (Similar to how people choose cloud or config management it seems)

- Cacti: <http://www.cacti.net/> - [[Cacti 0.8 Network Monitoring book](http://www.packtpub.com/cacti-08-network-monitoring/book)]
- Munin: <http://munin-monitoring.org/>
- Collectd: <http://collectd.org/>

As the number of servers started to grow, people wanted to have a [scalable way of collecting ,aggregating and transporting the data.](http://serverfault.com/questions/261077/i-need-to-replace-munin-with-something-more-scalable)

- Ganglia: <http://ganglia.sourceforge.net/>

Even with the help of [RRD cache](http://net.doit.wisc.edu/~dwcarder/rrdcache/), the storage of all these metrics was becoming the new bottleneck, so alternatives had be found. So Graphite introduced [Whisper](http://graphite.wikidot.com/whisper) and Opentsdb decided to build on top of [Hadoop](http://hadoop.apache.org/)
And as the volume of data was increasing, it was begging for a self servicing way for visualization of the data.

- Graphite: <http://graphite.wikidot.com/> - [[Chapter in The Architecture of Open Source Applications book](http://www.aosabook.org/en/graphite.html)]
- Opentsdb: <https://github.com/stumbleupon/opentsdb> - [[OpenTSDB chapter in Professional Nosql book](http://my.safaribooksonline.com/book/-/9781118167809/chapter-17-tools-and-utilities/opentsdb?reader=pf&readerfullscreen=&readerleftmenu=1)]

#### Alerting, notification, availability
All these metric tools kind of [ignore the alerting, notification and acknowlegement and rely on the real monitoring systems](http://www.serverfocus.org/nagios-vs-cacti-vs-zabbix-vs-zenoss). So you need to complement them with some warning system like the following:

- Nagios: <http://www.nagios.org/> - [[Nagios 3 - Enterprise Network Monitoring book](http://www.amazon.com/Nagios-Enterprise-Network-Monitoring-Including/dp/1597492671/)]
- Icinga: <https://www.icinga.org>
- Zabbix: <http://www.zabbix.com/> - [[Zabbix 1.8 Network Monitoring book](http://www.amazon.com/Zabbix-Network-Monitoring-Rihards-Olups/dp/184719768X)]
- Zenoss: <http://www.zenoss.com/> - [[Zenoss Core 3.x Network and System Monitoring book](http://www.amazon.com/Zenoss-Core-Network-System-Monitoring/dp/1849511586/)]
- Reconnoiter : <http://labs.omniti.com/labs/reconnoiter>

Note that most of them are suffering from the scaling perspective and flexibility and graphical overview.

#### Beyond servers , to applications , to business
Now that we have gotten better at monitoring and metrics of servers, we are seeing better integration with application and business metrics:

- New Relic: <http://newrelic.com/>
- Statsd/Etsy: <https://github.com/etsy/statsd>
- Jmxtrans: <http://code.google.com/p/jmxtrans/>

The next blogposts will contain *more meat* of tools surrounding, enhancing, bypassing these 'traditional players'. Stay tuned...
