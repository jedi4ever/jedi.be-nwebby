---
title: Monitoring URLs by the thousands in Nagios
created_at: 2012-05-06 10:35:34.199577 +02:00
tags:
- devops
- monitoringsucks
- nagios
blog_post: true
filter:
- erb
- markdown
---
### 10K websites x 5 URL's to monitor
For our [Atlassian Hosted Platform](https://my.atlassian.com/ondemand/signup), we have about 10K websites we need to monitor. Those sites are monitored from a remote location to measure responsetime and availability. Each server would have about 5 sub URLs on average to check, resulting in 50K URL checks.

Currently we employ Nagios with [check_http](https://my.atlassian.com/ondemand/signup) and require roughly about 14 Amazon Large Instances.
While the nagios servers are not fully overloaded, we make sure that all checks would complete within a 5 minutes check cycle. 

In a recent spike we investigated if we could do any optimizations to:

- use less server resources, not only to reduce costs but also avoiding the management of multiple nagios servers which don't dynamically rebalance checks across multiple nagios hosts.
- have all checks complete within a smaller window (say 1 minute), as this would increase our MTTD

While looking at this, we wanted the technology to be reusable with our future idea of a fully scalable and distributed monitoring in mind (think [Flapjack](https://github.com/auxesis/flapjack) or the new kid on the block [Sensu](http://joemiller.me/2012/01/19/getting-started-with-the-sensu-monitoring-framework/)). But for now, we wanted to focus on the checks only.

In the first blogpost of the series we look at the integration and options within Nagios. In a second blogpost we will provide proof of concept code for running an external process (ruby based) to execute and report back to nagios.
Even though Nagios isn't the most fun to work with, a lot of solutions that try to replace it, focus on replacing the checks section. But Nagios gives you more the reporting, escalation, dependency management. I'm not saying there aren't solutions out there, but we consider that to be for another phase.

#### Check HTTP
The canonical way in Nagios to run a check is to execute [Check_http](http://nagiosplugins.org/man/check_http).

F.i. to have it execute a check if confluence is working on https://somehost.atlassian.net/wiki , we would provide the options:

- -H (virtual hostname), -I (ipaddress) , -p (port)
- -u (path of url) , -S (ssl) , -f follow (follow redirects)
- -t (timeout)

    $ /usr/lib64/nagios/plugins/check_http -H somehost.atlassian.net -p 443 -u /wiki -f follow -S -v -t 2
    HTTP OK: HTTP/1.1 200 OK - 546 bytes in 0.734 second response time |time=0.734058s;;;0.000000 size=546B;;;0

Some observations:

1. For each check configure Nagios will fork twice and exec check_http, avoiding this would improve performance as fork is considered expensive.
2. If we were to have many URL's on the same host, we can't leverage connection reuse, making it less efficient
3. For status checking, we can configure it to use the -J HEAD if our check doens't rely on the content of the page (saving on transfer time and reduce check time)
4. Redirects: not an issue of Nagios, but we currently have quite a few redirects going from the login-page logic, reducing those would again improve check time.

We can reduce part of the forks by using the **[use_large_installation_tweaks=1](http://nagios.sourceforge.net/docs/3_0/configmain.html#use_large_installation_tweaks)** setting. [The benefits and caveats are explained in the docs](http://nagios.sourceforge.net/docs/3_0/largeinstalltweaks.html)

#### Check scheduling
Nagios itself tries to be smart to schedule the checks. It tries to spread the number of service checks within the check interval you configure. More information can be found in [older Nagios documentation](http://nagios.manubulon.com/traduction/docs14en/checkscheduling.html) .

Configuration options that influence the scheduling are:

- normal_check_interval : how long between re-executing the same check
- retry_check_interval : how fast to retry a check if it failed
- check_period: total time for a complete check cycle
- inter_check_delay_method: method to schedule checks (
- service_interleave_factor: time between checks to the same remote host
- max_concurrent_checks: obvious not ?
- service_reaper_frequency : frequency to check for rogue checks

Default for the inter_check_delay_method is to use smart, if we want to execute the checks as fast as possible 

- n = Don't use any delay - schedule all service checks to run immediately (i.e. at the same time!)
- d = Use a "dumb" delay of 1 second between service checks
- s = Use a "smart" delay calculation to spread service checks out evenly (default)
- x.xx = Use a user-supplied inter-check delay of x.xx seconds

#### Distributing checks
When one host can't cut it anymore, we have to scale eventually. Here are some solutions that live completely in the Nagios world:

- [Mod Gearman](http://labs.consol.de/lang/de/nagios/mod-gearman/)
- [DNX - Distributed Nagios Executor](http://dnx.sourceforge.net/)
- [OCSP Sweeper](http://exchange.nagios.org/directory/Addons/Passive-Checks/OCSP-Sweeper/details) - [Blogpost](http://olex.openlogic.com/wazi/2011/how-to-build-a-distributed-monitoring-solution-with-nagios/)

Our future solution would have a similar approach to dispatching the checks command and gathering the results back over queue, but we'd like it to be less dependent on the Nagios solution and be possible to be integrated with other monitoring solutions (Think Unix Toolchain philosophy)
A great example idea can be seen in the Velocityconf presentation [Asynchronous Real-time Monitoring with Mcollective](http://velocityconf.com/velocity2011/public/schedule/detail/17848)

#### Submitting check results back to Nagios
So with distribution we just split our problem again in smaller problems. So let's focus again on the single host running checks problem, after all, the more checks we can run on 1 host, the less we have to distribute.

[Nagios Passive Checks](http://exchange.nagios.org/directory/Addons/Passive-Checks) easily allow you to uncouple the checks from your main nagios loop and submit the check results later.
[NSCA](http://exchange.nagios.org/directory/Addons/Passive-Checks/NSCA--2D-Nagios-Service-Check-Acceptor/details)  (Nagios Service Check Acceptor) is the most used solution for this.

NSCA does have a few limitations:

[Opsview writes](http://blogs.techworld.com/monitoring-the-pulse-of-it/2011/01/next-generation-distributed-monitoring-the-opsview-way/index.htm):

- Only the first 511 bytes of plugin out was returned to the master, limiting the usefulness of the information you could display
- Only the 1st line of data was returned, meaning you had to cramp output together
- NSCA communication used fixed size packets which were inefficient
- While results were sent, Nagios would wait for completion, introducing a bottleneck
- If there was a communication problem with the master, results were dropped

This lead them to using [NRD (Nagios Result Distributor)](http://code.google.com/p/nrd/)

[Ryan Writes](http://madebyryan.blogspot.com/2011/12/high-performance-ncsa-alternative-for.html):

"What no one tells you when you are deploy NCSA is that it send service checks in series while nagios performs service checks in parallel"

This lead him to writing [A highperformance NSCA](http://madebyryan.blogspot.com/2011/12/high-performance-ncsa-alternative-for.html) replacement involving feeding the result direct into the livestatus pipe instead of over the NSCA protocol baked into nagios
On a similar note Jelle Smet has created [NSCAWEb Easily submit passive host and service checks to Nagios via external commands](https://github.com/smetj/nscaweb)

We would leverage the [Send NSCA Ruby Gem](http://exchange.nagios.org/directory/Addons/Passive-Checks/send_nsca-Ruby-Gem/details)

Why is this relevant to our solution? Without employing some of these optimizations, our bottleneck would shift from running the checks to accepting the check results.

Another solution could be run an NRPE server , and we could probably leverage some ruby logic from [Metis - a ruby NRPE server](https://github.com/krobertson/metis)

### Conclusion
Even after the following optimizations:

- using head vs get
- large installation tweaks
- tuning the inter_check_delay_method
- parallel NSCA submissions vs serial submissions

we can still optimize with:

- avoid the fork process by running all checks from the same process
- reusing the http connection across multiple requests for the same host (potentially even do [http pipelining](http://en.wikipedia.org/wiki/HTTP_pipelining)

In the next blogpost we will show the results of proof of concept code involving ruby/eventmachine/jruby and various httpclient libraries.
