---
title: Monitoring Wonderland Survey - Nagios the Mighty Beast
created_at: 2012-01-03 19:35:34.199577 +02:00
tags:
- devops
- monitoringsucks
- nagios
blog_post: true
related:
- desc: Monitoring Wonderland Survey - Metrics - API - Gateways
  url: /blog/2012/01/03/monitoring-wonderland-metrics-api-gateways/
- desc: Monitoring Wonderland Survey - Introduction
  url: /blog/2012/01/03/monitoring-wonderland-survey-introduction/
---
### Controlling the tool everybody hates, but still uses
This blog post mainly contains my findings on getting data in and out of Nagios. That data can be status information, performance information and notifications.
At the end there are some pointers on ruby integration with [Pingdom](http://www.pingdom.com) and [Jira](http://www.atlassian.com/software/jira/overview)

The idea is similar to my previous blogposting [Monitoring Wonderland Survey - Metrics - API - Gateways](http://jedi.be/blog/2012/01/03/monitoring-wonderland-metrics-api-gateways/):
I want to share/open up this data for others to consume, preferably on a bus like system and using events instead of polling.

### Nagios - IN
#### Writing Checks in Ruby
If you want to get data into Nagios, you have to write a check. These are some options for doing this in ruby:

- Nagios Plugins in Ruby: <https://github.com/dusty/ruby_nagios>
- Ruby to create nagios probes : <https://github.com/hobodave/nagios-probe>
- A Ruby Gem to easily create Nagios Plugins : <https://github.com/jhstatewide/ruby-nagios-plugin>
- A Proxy to collect values for Nagios, JMX: <http://jrds.fr/nagios>

Projects that link testing and monitoring:

- Nagios Test Framework: <https://github.com/marineam/nagcat>
- Pager Unit, Nagios Alternative to look like unit tests: <https://github.com/rcrowley/pagerunit>
- Cucumber - Nagios : <http://auxesis.github.com/cucumber-nagios/>

#### Transporting check results
Nagios has [many ways to collect the results](http://nagios.sourceforge.net/docs/3_0/addons.html) of these checks:

- Using Send NSCA - Ruby gem: <https://github.com/kevinzen/send_nsca>
- Or using [NRPE - PDF](http://nagios.sourceforge.net/docs/nrpe/NRPE.pdf) if [enabled](http://www.thegeekstuff.com/2010/12/enable-nrpe-command-arguments/)

You can test NRPE with the [standalone NRPE runner](http://www.unixdaemon.net/tools/commandline/introducing-nrpe-runner.html)

- <http://www.unixdaemon.net/tools/commandline/introducing-nrpe-runner.html>

And maybe [schedule the Nagios NRPE checks with Rundeck](http://morethanseven.net/2011/09/11/Rundeck-and-nagios-nrpe-checks.html)

If you don't like the spawning of separate ruby processes for each check, you can leverage Metis:<https://github.com/krobertson/metis>

- [An implementation of the Nagios NRPE daemon in Ruby to provide a framework for easy, testable monitors](https://github.com/krobertson/metis)

#### Transport over a bus system
Instead of using the traditional provided interfaces, people are starting to send the check information over a bus for further handling:

- Krolyk is a daemon which consumes Nagios check results from RabbitMQ and writes these to the Nagios command pipe. <http://www.smetj.net/wiki/Krolyk>
- Moncli is a generic MONitoring CLIent which executes and processes requests on an external system in order to interact with the host's local information sources which are normally not available over the network. <http://www.smetj.net/wiki/Moncli>

- [Aggregating Nagios Checks With mcollective](http://www.devco.net/archives/2010/07/03/aggregating_nagios_checks_with_mcollective.php)
- Sensu - Uses RabbitMQ and Pub/Sub Redis to scale the checks collection <https://github.com/sonian/sensu>

#### Look ma, no Nagios Server needed
Some people have taken an alternative approach, re-using the checks libraries but reusing them in their own framework.

- Sensu : Framework that uses Nagios checks and Rabbitmq and Pub/Sub Redis: <https://github.com/sonian/sensu> and it's dashboard <https://github.com/sonian/sensu-dashboard>
- Sentry : a Nagios clone in Ruby <https://github.com/alexch/sentry>
- Eyes : a project to enable quick, simple, and API enabled monitoring and data collection. A mailing list for eyes is available at http://groups.google.com/group/eyes-monitoring Tracker at https://www.pivotaltracker.com/projects/274785
Wraps Nagios plugins, inside django <http://packages.python.org/eyes/>

### Nagios - OUT
#### Reading Status
As there is no official API to extract status information from Nagios, people have been implementing various ways of getting to the data:

**Scraping the UI**

Well if we really have to ...

- [Nagios Harder- Ruby API for Nagios Scraping](https://github.com/railsmachine/nagiosharder)

**Parsing status.dat file**

All status information from Nagios is stored in the .dat file, so several people have started writing parsers for it, and exposing it as an API

- A REST frontend in Sinatra - <https://github.com/ohookins/sinagios>
- Another REST API - <https://github.com/kerphi/RESTnag>
- Nagios API: incomplete but mostly state, downtime, results: <https://github.com/xb95/nagios-api>
- A CLI tool and Ruby library that parses your status log file and let you query it for information or create external commands: <https://github.com/ripienaar/ruby-nagios>
- Old Ruby Interface for Status-file data <http://rubyforge.org/projects/nag-ruby>
- Nagira - Nagios Restfull API - <https://github.com/dmytro/nagira/tree/master/lib>
- NagiosR - exposes nagios status via csv and json using sinatrarb: <https://github.com/discordianfish/nagiosr/blob/master/nagiosr.rb>

Nagios-Dashboard parses the nagios status.dat file & sends the current status to clients via an HTML5 WebSocket.  The dashboard monitors the status.dat file for changes, any modifications trigger client updates (push).  Nagios-Dashboard queries a Chef server or Opscode platform organization for additional host information.

- Nagios Dashboard - <https://github.com/portertech/nagios-dashboard>

**Parsing the log files**

- A Ruby Cli tool - to parse log file Nagios: <https://github.com/ripienaar/ruby-nagios>

**Using Checkmklivestatus**

A better option to get adhoc status is to query Nagios via CheckMK_Livestatus <http://mathias-kettner.de/checkmk_livestatus.html>
It is a [Nagios Event Broker](http://nagios.larsmichelsen.com/nagios-event-broker/) that hooks directly into the Nagios Core, allowing it direct acces [to all structures and commands](http://old.nagios.org/developerinfo/externalcommands/commandlist.php)
NEB's are very powerfull, and for more information look a the [Nagios book - event broker section](http://www.scribd.com/doc/58991647/23/CHAPTER-8-Nagios-Event-Broker-Interface-173#outer_page_198)

Tools that use this API :

- <https://github.com/RECIA/nagios_mklivestatus>
- <https://github.com/sni/Monitoring-Livestatus>
- <https://github.com/zenops/livestatus>
- Nagios CLI, Livestatus, Python: <https://github.com/ning/ngsh>
- Nagios SSH Command Pipe: <https://github.com/scy/nscp>
- Nagios Light Web Interface with a JSON API, writen in Ruby: <https://github.com/rhaamo/naglight>
- Nagios GUI Framework for Livestatus: <https://github.com/Bastian-Kuhn/NagUI>

**Quering the database/NDO**

An alternative NEB handler is [NDO Utils, NDO2DB](http://nagios.larsmichelsen.com/ndoutils-nagios-data-out/). It stores all the information into a database.
Or on using [NDO2FS - NDO in Json or filesystem](http://nagios.larsmichelsen.com/introducing-ndo2fs/) on a filesystem.

**Hooking into performancehandler**

RI Pienaar shows us how to hook into a process-service-perfdata handler and logs that information to a file:

- <https://github.com/ripienaar/typhon/tree/master/samples/nagios>

The advantage is that we can get the information evented instead of having to poll the status of information. In other words ready to be put on message bus for others to read.

**Listening in to events with NEB/Message queue**

In order to get the events as fast as possible, I looked into using a NEB to put information on a message queue directly.

I found the following sample code:

- [NEB to ActiveMQ](http://neb2activemq.googlecode.com/svn-history/r3/wiki/QuickStart.wiki)
- [Nagios Clients in C - Python - ZMQ](http://www.zeromq.org/code:nagios-clients-in-c-and-python)

Marius Sturm had Nagios-ZMQ <https://github.com/mariussturm/nagios-zmq> that allowed to get the events directly on the queue.
I extended to not only read the check results or performance data, but also the notifications.

It seems Icinga is taking a similar approach with the [Icinga - ZMQ - icingamq](https://github.com/gunnarbeutner/icingamq). 
This to enable [High performance Large Scale Monitoring](https://www.icinga.org/2011/10/10/feature-preview-icingamq-for-high-performance-large-scale-monitoring/)

An interesting difference is that is will also expose the CheckMklivestatus API directly over ZeroMQ

### Adding Hosts dynamically
A bit of side track, but one of the things a lot of people struggle with is dynamically adding hosts/servers to Nagios , without restarting it.
The following are links that kind of try to solve this problem, but none solves it completely. It seems most people solve this by some interaction with a Configuration Management system and a system inventory.

- [Adding hosts & Services to Nagios Daemon](http://osdir.com/ml/network.nagios.devel/2007-04/msg00125.html)
- [Inventory Check , via Check_mk](http://mathias-kettner.de/checkmk_inventory_checks.html)
- [Creating Check_mk nagios configurations with Puppet](http://weblog.etherized.com/posts/186)
- [Check_MK via OMD](https://geni-orca.renci.org/trac/wiki/OMDeventhandlers)
- [Nagios Automation - Sinatra- and Resque-based API endpoint for Chef Nagios automation. The recipe that generates the API calls can be found in the Cloudspace Ops repo.](https://github.com/cloudspace/nagios-automation)

To read the config and write the configs, people have writing various parsers:

- [Parsing Nagios Objects](http://lusislog.blogspot.com/2010/06/parsing-nagios-objects-in-ruby-redux.html)
- [Nagios config file parser](https://github.com/jbbarth/nagios_analyzer)
- [Nagios Config file generator](https://github.com/matsadler/nagios_config)
- [Nagios parser and generator - old](https://github.com/puppetlabs/Naginator)

The reload problem doesn't look like an easy one to solve: one could create NEB that manipulates the memory host/service structures but it will also need to persist that on disk.
If anyone has a good solution, please let us know!

### Notification handling
There a lot more problems with Nagios, but people still use it's notification and acknowledgement system. Some interesting things I found:

- Angelia - Tool to facilitate the development of nagios notification methods using many different protocols and delivery system : <https://github.com/ripienaar/angelia>
- Nagios Aggregate Notification System , to solve mass duplication of alerts: <https://github.com/bobpattersonjr/nans>

#### Pingdom
If pingdom is your game, here are some API to information to Pingdom, and read the status

- How to inject your own checks into pingdom - <http://jonsview.com/how-i-use-pingdoms-http-custom-feature>
- Pingdom Restful API Client: <https://github.com/mtodd/pingdom-client>

I could not find a way to make this evented , we'll have to create 

#### Jira Notificiation
I found 4 libraries to interact with Jira - from ruby:

- Jira4r - Jira for ruby: <http://jira4r.rubyhaus.org/>
- Nagios Jira Ticket Generator <https://github.com/MrPink/Nagios-Jira-ticket-generator>
- Jira Ruby: <https://github.com/trineo/jira-ruby>
- Jira Sample Client - JIRA soap interface/Ruby: <http://svn.atlassian.com/svn/public/contrib/jira/jira-rpc-samples/src/ruby/jira4rsample.rb>

### Conclusion:

- We can get a long way to automate getting data in and out of Nagios
- Exposing the API through the Livestatus works really well
- Using the NEB Nagios-ZMQ will allow us to get the information in an evented way
- Adding hosts dynamically still seems to be an issue

By listening in on the events over a queue, we could create a self-servicing for nagios events similar to Tattle, which does the same for Graphite:

- Tattle - Self servicing Alerts - Escape Conference - Draco2002:  <http://www.slideshare.net/Draco2002/graphite-tattle>

Next blogpost we'll move up the stack a bit and start investigating options for application and enduser usage metrics.
