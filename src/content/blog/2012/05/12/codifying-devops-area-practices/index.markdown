---
title: Devops Areas - Codifying devops practices
created_at: 2012-05-12 10:35:34.199577 +02:00
tags:
- devops
- maturity levels
- metrics
- areas
- people process tools
- layers
blog_post: true
---
While working on the [Devops Cookbook](http://itrevolution.com/books/the-devops-cookbook/) with my fellow authors [Gene Kim](http://twitter.com/realgenekim),[John Willis](http://twitter.com/botchagalupe),[Mike Orzen](http://twitter.com/mikeorzenleanit) we are gathering a lot of "devops" practices. For some time we struggled with structuring them in the book. I figured we were missing a mental model to relate the practices/stories to.

This blogpost is a first stab at providing a structure to **codify devops practices**. The wording, descriptions are pretty much work in progress, but I found them important enough to share to get your feedback.

### Devops in the right perspective
As you probably know by now, there are many definitions of devops. One thing that occasionally pops up is that people want to change the name to extend it to other groups within the IT area: star-ops, dev-qa-ops, sec-ops, ...
From the beginning I think people involved in the first devops thinking had the idea to expand the thought process beyond just dev and ops. (but a name bus-qa-sec-net-ops would be that catchy :).

I've started reffering to :

- __devops__ : collaboration,optimization across the whole organisation. Even beyond IT (HR, Finance...) and company borders (Suppliers)
- __devops 'lite'__ : when people zoom in on 'just' dev and ops collaboration.

[As rightly pointed out by Damon Edwards](http://dev2ops.org/blog/2010/11/7/devops-is-not-a-technology-problem-devops-is-a-business-prob.html) , **devops is not about a technology , devops is about a business problem**. [The theory of Contraints](http://nl.wikipedia.org/wiki/Theory_of_constraints) tells us to *optimize the whole* and not the individual 'silos'. For me that whole is the business to customer problem , or in lean speak, the whole value chain.
Bottlenecks and improvements could be happen anywhere and have a local impact on the dev and ops part of the company.

So even if your problem exists in dev or ops, or somewhere between, the optimization might need to be done in another part of the company. As a result describing pre-scriptive steps to solve the 'devops' problem (if there is such a problem) are impossible. The problems you're facing within your company could be vastly different and the solutions to your problem might have different effects/needs.

If not pre-scriptive, we can **gather practices** people have been doing to overcome similar situations. I've always encouraged people to share their stories so other people could learn from them. (one of the core reasons devopsdays exists) This helps in capturing practices, I'd leave it in the middle to say that they are good or best practices.

Currently a lot of the stories/practices are zooming in on areas like deployment, dev and ops collaboration, metrics etc.. (Devops Lite) . This is a natural evolution of having dev and ops in the term's name and given the background of people currently discussing the approaches. I hope that in the future this discussion expands itself to other company silos too: f.i. [synergize HR and Devops](http://www.spikelab.org/devops-job-title/)(Spike Morelli) or relate our metrics to financial reporting.

Another thing to be aware of is that a system/company is continously in flux: whenever something changes to the system it can have an impact; So you can't take for granted that problems,bottle-necks will not re-emerge after some time. It needs continuous attention. That will be easier if you get closer to a steady-state, but still, devops like security is a journey, not an end state.

<img src='{{ page.url }}/complete-devops.png'>

### Beyond just dev and ops
Let's zoom in on some of the practices that are commonly discussed: the direct field between 'dev' and 'ops'.

In most cases, 'dev' actually means 'project' and 'ops' presents 'production'. Within projects we have methodologies like (Scrum, Kanban, ...) and within operations (ITIL, Visble Ops, ...).
Both parts have been extending their project methodology over the years: from the dev perspective this has lead to 'Continous Delivery' and from the Ops side ITIL was extended with Application Life Cycle (ALM). They both worked hard on optimize the individual part of the company and less on integration with other parts. Those methodologies had a hard time solving a bottleneck that outside their 'authority'.  I think this where devops kicks in: it seeks the active collaboration between different silos so we can start seeing the complete system and optimize where needed, not just in individual silos.

<img src='{{ page.url }}/devops-lite.png'>

### Devops Areas
In my mental model of devops there are four 'key' areas:

- Area 1 : Extend delivery to production (Think Jez Humble) : this is where dev and ops collaborate to improve anything on delivering the project to production
- Area 2 : Extend Operation to project (Think John Allspaw) : all information from production is radiated back to the project
- Area 3 : Embed Project(Dev) into Operations : when the project takes co-ownership of everything that happens in production
- Area 4 : Embed Production(Ops) into Project : when operations are involved from the beginning of the project

In each of these areas there will be a bi-directonal interaction between dev and ops, resulting in knowledge exchange and feedback.

Depending on where your most pressing 'current' bottleneck manifests itself, you may want to address things in different areas. There is no need to first address things in area1 than area2. Think of them as pressure points that you can stress but requiring a balanced pressure.

Area 1 and Area2 tend to be heavier on the tools side , but not strictly tools focused. Area3 and Area4 will be more related to people and cultural changes as their 'reach' is further down the chain.

When visualized in a table this gives you:

<img src='{{ page.url}}/devops-areas-schematic.png'>


As you can see:

- the DEV and OPS part keep having their own internal processes specific to their job
- the two processes are becoming aligned and the areas extend both DEV and OPS to production and projects
- it's almost like a double loop with area1 and area2 as the first loop and area3 and area4 as the second loop

__Note 1__: these areas definitely need 'catchier' names to make them easier to remember.
__Note 2__: Ben Rockwoods post on ["The Three Aspects of Devops"](http://cuddletech.com/blog/?p=624) lists already 3 aspects but I think the areas make it more specific

<img src='{{ page.url}}/devops-areas.png'>

### Area Layers
In each of these areas, we can interact at the traditional 'layers' tools, process, people:

So whenever I hear story , I try to relate it's practice to one of these areas as described above and the layer it's adressing. Practices can have an impact at different layers so I see them as 'tags' to quickly label stories.
Another benefit is that whenever you look at an area, you can ask yourself what practices we  can do to improve each of these layers. To have a maximum impact on each of the layers, it's clear that the approach needs to be layered in all three.

The ultimate devops tools would support the whole people and process in all of these areas, not just in Area1 (deployment) or Area2 (monitoring/metrics). Therefore a devops toolchain with different tools interacting in each of the areas makes more sense. Also the tool by itself doesn't make it a devops tool: configuration mangement systems like chef and puppet are great, but when applied in Ops only don't help our problem much. Of course Ops gets infrastructure agilitity, but it isn't until it is applied to the delivery (f.i. to create test and development environments) that it becomes 'devops'. This shows that the mindset of the person applying the tool makes it a devops tool, not the tool by itself.

<img src='{{ page.url}}/devops-layers.png'>

### Area Maturity Levels
Now that we have the areas and layers identified, we want to track progress as we start solving our problems and are improving things.

[Adrian Cockroft](http://twitter.com/adrianco) [suggested using CMMI levels for devops](http://groups.google.com/group/devops/browse_frm/thread/f3de603a4cea493e?scoring=d):

CMMI levels allow you to quantify the 'maturity' of your process. That addresses only one layer (although an equally important one). In a nutshell CMMI describes the different levels as:

1. **Initial** : Unpredictable and poorly controlled process and reactive nature
2. **Managed** : Focused on project and still reactive nature
3. **Defined** : Focused on organization and proactive
4. **Quantively Managed** : Measured and controller approach
5. **Optimizing** : Focus on Improvement

All these levels could be applied to dev , ops or devops combined. It gives you an idea at what level process is in, while you are optimizing in an area.

An alternative way of expressing maturity levels is used by the [Continuous Integration Maturity Model](http://blogs.urbancode.com/continuous-integration/continuous-integration-maturity-model/).
It puts a set of practices in levels of maturity: (industry consensus)

1. **Intro** : using source control ...
2. **Novice** : builds trigger by commit ...
3. **Intermediate** : Automated deployment to testing ..
4. **Advanced** : Automated Functional testing ...
5. **Insane** : Continuous Deployment to Production ...

Instead of focusing on the proces only , it could be applied to a set of tools, process or people practices. What people consider the most advanced would get the highest maturity level.

### Practices, Patterns and principles
A practice could be anything from an anecdotal item to a systemic approach.  Similar practices can be **grouped into patterns** to elevate them to another level. Similar to the Software Design Patterns we can start grouping devops practices in devops patterns.

Practices and patterns will rely on principles and it's these underlying principles that will guide you when and you to apply the pattern or practice. These principles can be 'borrowed' from other fields like Lean, Systems Theory etc, Human Psychology. The principles are what the agile manifesto is about for example.

Slowly we will turn the practices -> patterns -> principles . 

__Note:__ I'm wondering if there will be new principles that will emerge from from devops itself or it will be apply existing principle to a new perspective.

### A few practical examples:
Below are a few example 'practices' codified in a standard template. The practices/patterns/principles are not yet very well described. The point is more that this can serve as a template to codify practices.

<img src='{{ page.url }}/practice-example-dev-test-prod.png'>
<img src='{{ page.url }}/practice-example-expose-information.png'>
<img src='{{ page.url }}/practice-example-dev-pagers.png'>
<img src='{{ page.url }}/practice-example-integrated-backlog.png'>


### Area Indicators
The idea is to list metrics/indicators that can tracked. The numbers as such might be not be too relevant but the rate of change would be. This is similar to tracking the velocity of storypoints or the tracking of mean time to recovery. 

__Note:__ I'm scared of presenting these as metrics to track, therefore I call them indicators to soften that.

Examples would be :

- Tools Layer : Deploys/Day
- Process Layer : Number of Change Requests/Day
- People Layer : People Involved per deploy

This is not yet fleshed out enough , I'm guessing it will be based on my research done for my [Velocity 2011 Presentation (Devops Metrics)]

### Devops Scorecard
To present progress during your 'devops' journey you can put all these things in a nice matrix, to get an overview on where you are at optimizing at the different layers and areas.

Obviously this only makes sense if you don't lie to yourself, your boss, your customers.

<img src='{{ page.url }}/devops-scorecard.png'>

### Project Teams, Product Teams and NOOPS
[Jez Humble](http://twitter.com/jezhumble) often talks about project teams evolving to product teams: largere silos will split of not by skill, but for product functionality they are delivering.
Splitting teams like that, has the potential danger of creating new silos. It's obvious these product teams need to collaborate again. You should treat other product teams are external dependencies, just like other Silos.
The areas of interaction will be very similar.

Also you can see the term NOOPS as working with product teams outside your company, like you rely on SAAS for certain functions. It's important not only to integrate in each of the areas on the tools layer, but also on the people and process layer. Something that is often forgotten. Automation and abstraction allows you to go faster but when things fail or even changes occur, synchronisation needs to happen.

### CAMS and areas
The [CAMS acronym](http://www.opscode.com/blog/2010/07/16/what-devops-means-to-me/) (Culture, Automation, Measurement, Sharing) could be loosely mapped onto the areas structure:

- **Automation** seems to map to Area1: the delivery process
- **Measurement** seems to map to Area2: the feedback process
- **Culture** to Area3 : embedded devs in Production
- **Sharing** to Area4: embedded ops in Projects

Of course automation, measurement, culture and sharing can happen in any of the areas, but some of the areas seem to have a stronger focus on each of these parts.

<img src='{{ page.url }}/devops-areas-cams.png'>

### Conclusion
Devops areas, layers and maturity levels, give us a framework to capture new practices stories and it can be used to identify areas of improvements related to the devops field. I'd love feedback on this.
If anyone wants to help, I'd like to bring up a website where people can enter their stories in this structure and make it easily available for anyone to learn. I don't have too much CPU cycles left currently , but I'm happy to get this going :)

P.S. @littleidea: [I do want to avoid the FSOP Cycle](http://www.techdarkside.com/FSOP.jpg)
