---
title: How is Native App operations different from Web operations?
created_at: 2016-02-29 10:35:34.199577 +02:00
tags:
- devops
- mobile
- android
- analytics
- logging
- support
- ios
- continuous delivery
blog_post: true
filter:
- erb
- markdown
---
In the web world we take a few things for granted:

- we can instantly update any code on the server side making it easy to keep all clients on the same version and easily fixing bugs/issues
- thanks to frameworks like Jquery and other abstractions , we don't have to worry too much about the hardware running the browser

With Native apps we need to work harder to achieve the same assumptions.

> <a href="http://mobiledeliverydays.org"><img src="mobiledeliverydays-logo.png"></a>Interested in the topic? Mobile conferences tend to be more developer centric and really could use some ops love. That's why we're running [Mobile Delivery Days](http://mobiledeliverydays.org) on 21&22th at the Amazon Loft in SF. 

### Keeping all users on the same version:
Both iOS and Android have a mechanism to auto-update your app. These mechanisms are often disabled because of network usage to avoid extra costs. This means we need to notify the users there is a new version. If you build it into the app you can make a nice message that the user needs to update. Obviously you need to be gently and not force it or do it too often. Still this practice will keep version drift to a minimum so you don't have to keep supportingf different versions. The Siren library (https://github.com/ArtSabintsev/Siren) iOS does exactly that.

### Worry less about the hardware:
Android can run on so many different formfactors and devices it's hard to be sure it all works on all devices. Simulators like Genymotion (https://www.genymotion.com/) allow you test different devices/OS versions using virtualbox. Or if you want to get fancy check out [@tomwillfixit](http://twitter.com/tomwillfixit) 's blog on [running android inside docker containers](http://thshaw.blogspot.be/2015/07/running-android-apps-in-docker-using.html)

Still simulators are no substitution for the real thing. You could buy a set of test devices and [setup your own device lab](https://codeascraft.com/2013/08/09/mobile-device-lab/) or you could use one of the many real device testing tools (Amazon Device Farm, Testdroid, Testmunk). Compared to server farms they are still quite expensive though so use wisely. Google is soon providing an cloud testing service (as part of the playstore deploy service) that will check if your app at least starts on the most common android devices.

You could argue that this is something to be done in test & development. When you receive an issue of a user who says the app doesn't work on his device, how can you verify it? Well you could spin up a manual testing session for that device type (Device Anywhere), making it easy for you to debug without having to buy the device.

### Collect support context:
Often you see people complain on the appstore with items like "the app crashes" or "I constanly run out of memory". In particular the iOS appstore only relays the message but not any context on what type of device , what that user was doing.

It's crucial to integrate a good & easy support system in the app. Make sure there is a FAQ available that you can update remotely. And when the user opens an issue collect all his app history, the device logs, the memory usage and the device hardware info. This allows you to correlate it with your backend logs and issue. The same goes for crash report with services like Crashlytics. Add meta information to the crashreports so you can easily compare and search them.

If you don't want to wait for the user to create a ticket why not send all the mobile analytics and logs to your systems in a batched way. For example you can detect issues with your ads system or facebook login , things you can't check easily with just backend monitoring. Plugins like New Relic allow you to track memory , CPU and API errors as seen from on the mobile device and warn you even if your backend is all green. Many  logging services allow you directly stream mobile device logs to your logging service. This allows you to easily compare server and mobile device logs when debugging issues. Using feature flags you can increase the mobile device log level based so you can get more data from similar users in the wild to better debug the issue.

<img src="native-apps-support-workflow.png">

### Creative with updates:
Once you have detected an issue and have fixed it we're back to step one, how to distribute the fix to the users as fast as possible?
Well you can't update the app on iOS without Apple's approval. But hey we said creative updates so here's a couple of practices:

If you want to flexible , sync your content from the server: instead of hard compiling text or images in the app , provide a mechanism to update these assets from remote. You can store the assets on your local device after sync so you don't need fetch them all the time.

Some functionality doesn't require the native power can be pushed into a webview making remote updates easier. Apple actually loosened their statement on no changing code by making an exception for Javascript code that doesn't change the gist of the app. Reactive Native apps are using this mechanism to decrease development time. Note that Apple might reject your code if all your code is handled this way , it's meant to be used sparsely and not for replacing the whole app logic.

Even though you can't change the code , you can change the execution path. Using [the circuit breaker pattern](http://martinfowler.com/bliki/CircuitBreaker.html) you can change the execution path of the app shortcutting certain functionality in case of emergency.

Some services like [Rollout.io](http://rollout.io)  Apptimize allow you to change content and execution path from remote. They use introspection and method swizzling (http://nshipster.com/method-swizzling/)  to hook into all functions in the app and change the results/content based on remote settings. In this way you can patch & change parts of the app.
