---
title: Devops a Wicked problem
created_at: 2012-01-08 10:35:34.199577 +02:00
tags:
- devops
- symmetry of ignorance
- resilience
- complex
- snowden
blog_post: true
---
One of the strong pillars of devops (if not the strongest) is the collaboration/communication. For the talk about Devops Metrics for Velocity 2011, I researched how to prove collaboration is a good thing: while discussing devops to people it sometimes comes to believe that it makes sense to collaborate more or that all this collaboration is overkill. I think at time I came across Design Thinking and read [how it evolved from 1 person doing the design to listening to user requirements to participatory design](http://www.tandfonline.com/doi/pdf/10.1080/15710880701875068). In the book [Design Thinking - Understanding Designers Think](http://www.amazon.com/Design-Thinking-Understanding-Designers-Think/dp/1847886361/ref=pd_sim_b_6) Nigel Cross writes that design used to be collaborative thing (like guilds trying to push their craft forward).

#### Symmetry of Ignorance
One of the concepts introduced was the _symmetry of ignorance_ [PDF](http://l3d.cs.colorado.edu/~gerhard/papers/kbs2000.pdf)

> Complex design problems require more knowledge than any one single person can possess, and the knowledge relevant to a problem is often distributed and controversial. Rather than being a limiting factor, “symmetry of ignorance” can provide the foundation for social creativity. Bringing different points of view together and trying to create a shared understanding among all stakeholders can lead to new insights, new ideas, and new artifacts. Social creativity can be supported by new media that allow owners of problems to contribute to framing and solving these problems. These new media need to be designed from a meta-design perspective by creating environments in which stakeholders can act as designers and be more than consumers.

Sounds like systems thinking and reminded me of the knowledge divide within the devops problem space. When you spend time with each group/silo individually they would of think themselves superior to the other group: "ha those devs they don't know anything about the systems, ha those ops don't anything about coding". So it seems more about the _symmetry of arrogance_ . That arrogance symmetry reminded "We judge others by their behavior, we judge ourselves by our intentions". We might think we know more/can do better, but that often not visible in our actions.

This kind of got me intrigued and I wanted to explore the subject more for the next [Cutter Summit 2012](http://www.cutter.com/summit/2012.html).

#### Wicked Problem
Part of the designing thinking and this symmetry of ignorance is [related to the concept of _wicked problems_](http://thoughtclearing.blogspot.com/2008/09/symmetry-of-ignorance.html)

Rittel and Webber's (1973) formulation of wicked problems specifies ten characteristics:

1. There is no definitive formulation of a wicked problem (defining wicked problems is itself a wicked problem).
2. Wicked problems have no stopping rule.
3. Solutions to wicked problems are not true-or-false, but better or worse.
4. There is no immediate and no ultimate test of a solution to a wicked problem.
5. Every solution to a wicked problem is a "one-shot operation"; because there is no opportunity to learn by trial and error, every attempt counts significantly.
6. Wicked problems do not have an enumerable (or an exhaustively describable) set of potential solutions, nor is there a well-described set of permissible operations that may be incorporated into the plan.
7. Every wicked problem is essentially unique.
8. Every wicked problem can be considered to be a symptom of another problem.
9. The existence of a discrepancy representing a wicked problem can be explained in numerous ways. The choice of explanation determines the nature of the problem's resolution.
10. The planner has no right to be wrong (planners are liable for the consequences of the actions they generate).

I'll let you judge if you think devops (or even monitoring sucks :) is a wicked problem

More readings to explore:

- [Evaluating the Semantic Approach through Horst Rittel's Second-Generation System Analysis ](http://www.idemployee.id.tue.nl/g.w.m.rauterberg/conferences/CD_doNotOpen/ADC/final_paper/014.pdf)
- [Why Horst W.J. Rittel Matters](http://www.dubberly.com/articles/why-horst-wj-rittel-matters.html)
- [Lean Essays - Wicked Problems](http://www.leanessays.com/2002/01/wicked-problems.html)
- [Development is Inherently wicked](http://www.codinghorror.com/blog/2004/09/development-is-inherently-wicked.html)
- [Power and Interest in Developing Knowledge Societies](http://wiki.ikmemergent.net/files/IKM_Working_Paper-11-Robin_Mansell-July2010-final-pdf.pdf)
- [Please list out 3 most important Tactics for solving Wicked Problems?](http://www.linkedin.com/answers/business-operations/project-management/OPS_PRJ/640391-21068376)
- [Exploring ‘design thinking’ and organizational change: A Conversation](http://ctr-organizational-change.msloc.northwestern.edu/events/exploring-design-thinking/)
- [The Lost Operational Art: Invigorating Campaigning into the Australian Defence Force](http://www.army.gov.au/lwsc/docs/sp319.pdf)
- [Complexity, the “New Normal” 2: Leading to the Essence](http://thecrispianadvantage.com/2011/03/20/complexity-the-%E2%80%9Cnew-normal%E2%80%9D-2-leading-to-the-essence/)
- [Complexity the New Norm 3: Listen to your guts – Are they really on the same page?](http://thecrispianadvantage.com/2011/04/17/complexity-the-new-norm-3-listen-to-your-guts-%E2%80%93-are-they-really-on-the-same-page/)
- [Complexity the New Norm 4: Improving Sales Performance – Are you ready for the Challenge?](http://thecrispianadvantage.com/2011/05/17/complexity-the-new-norm-3-listen-to-your-guts-%E2%80%93-are-they-really-on-the-same-page-2/)
- [Transcending the Individual Human Mind](http://l3d.cs.colorado.edu/~gerhard/presentations/tutorial-ozchi-lec3-edc.pdf)
- [Bounding Wicked Problems: The C2 of Military Planning  Topic 3: Information Sharing and Collaboration Processes and Behaviors](http://www.dodccrp.org/events/14th_iccrts_2009/papers/049.pdf)
- [Dimensions of a Spiral](http://weblog.tomgraves.org/2009/04/22/spiral-dimensions/)

#### Cynefin
The whole discission on what is a wicked problem or not reminded me of a talk by Dave Snowden. He helped creating the [Cynefin](http://en.wikipedia.org/wiki/Cynefin) model.

The Cynefin framework has five domains.The first four domains are:

<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Cynefin_framework_Feb_2011.jpeg/280px-Cynefin_framework_Feb_2011.jpeg">

1.  Simple, in which the relationship between cause and effect is obvious to all, the approach is to Sense - Categorise - Respond and we can apply best practice.
2.  Complicated, in which the relationship between cause and effect requires analysis or some other form of investigation and/or the application of expert knowledge, the approach is to Sense - Analyze - Respond and we can apply good practice.
3. Complex, in which the relationship between cause and effect can only be perceived in retrospect, but not in advance, the approach is to Probe - Sense - Respond and we can sense emergent practice.
4.  Chaotic, in which there is no relationship between cause and effect at systems level, the approach is to Act - Sense - Respond and we can discover novel practice.
5. Disorder

Note this a sense making framework, not a ordering framework: it's not always that exact to put your problems in each of the spaces, but it gets you thinking about which solutions to apply to which problems. And it fits in nicely with other frameworks as explained in [A Tour of Adoption and Transformation models](http://agilitrix.com/2011/04/a-tour-of-agile-adoption-and-transformation-models/)

So devops in my opinion, falls into the complex problem space.

A great video explaining it was recorded at the ALE 2011:

<iframe width="560" height="315" src="http://www.youtube.com/embed/nTZKVlP2un8" frameborder="0" allowfullscreen></iframe>

He explains many things, but here a few things that resonated with me:

- why in some problem spaces there is no best practice but only good practice
- we have to create fail-safe environments
- providing a solution to the problems in complex problems can be done by probing
- the human factor makes the difference / we are not machines (automation)
- the solution is often easy once you have solved it but you need to go through the proces of discovery.

that last point reminded me of the [Debt Metaphor -  Ward Cunningham](http://www.youtube.com/watch?v=pqeJFYwnkjE). [@littleidea](http://twitter.com/littleidea)  explained that Ward was using a different concept for Technical Debt that most people use: he explains technical debt as the difference between the implementation and the ideal implementation on hinsight. Not because of bad implementation, or deliberate shortcuts, but because of new insights gathered during the discovery/problem solving process.

<iframe width="480" height="360" src="http://www.youtube.com/embed/pqeJFYwnkjE" frameborder="0" allowfullscreen></iframe>

More research can be found at:

- [More on Chaos and Cynefin- Tom Graves / Tetradian](http://www.cognitive-edge.com/blogs/dave/Graves%20Feb%202010.pdf)
- [Simple vs Complicated vs Complex vs Chaotic](http://www.noop.nl/2008/08/simple-vs-complicated-vs-complex-vs-chaotic.html)
- [Scan Agile 2009 - Snowden](http://cognitive-edge.com/ceresources/presentations/ScanAgile%20Oct%2009.pdf)
- [Finding the Simplicity Embedded in Complexity](http://groupaya.net/blog/2012/01/finding-the-simplicity-embedded-in-complexity/)
- [Cognitive Kanban](http://www.leanssc.org/files/201004/powerpoint/4.22%202.30pm%20Sivertsen%20CognitiveKanban.pdf)

The fact that problems don't always stay/match one of the locations on the diagram is greatly visualized by adding dimensions to the diagram (a thing that got lost in the initial publication)

- [The wisdom of Clouds - Cynthia F.Kurtz](http://www.cfkurtz.com/Kurtz%202009b%20Wisdom%20of%20Clouds.pdf)
- [Confluence - Sensemaking Framework](http://www.storycoloredglasses.com/p/confluence-sensemaking-framework.html)
- [Confluence explanation](http://www.storycoloredglasses.com/2010/06/confluence.html)

To tackle complex problems he suggests using three principles of complexity based management: 

1. Use fine grained objects: avoid "chunking"
2. Distributed Cognition: the wisdom but not the foolishness of crowds
3. Disintermediation: connecting decision makers with raw data

This could result in the [Resilient Organisation](http://www.cognitive-edge.com/blogs/dave/2011/03/the_resilient_organisation_int.php)

#### Resilience engineering
Because in complex systems it's hard to predict the exact behavior, Dave Snowden also talks about going [From Robustness to Resiliance](http://www.cognitive-edge.com/blogs/dave/2010/05/from_robustness_to_resiliance_1.php). It almost sounded like the difference between MTBF and MTTR like John Allspaw explains in [Outages Post-Mortems and Human Error 101](http://www.slideshare.net/jallspaw/etsy-codeascraft-allspaw1).

I came across those articles but never put them into the light of the Snowden perspective. More to explore so.

- [Why complex systems fail](http://www.ctlab.org/documents/How%20Complex%20Systems%20Fail.pdf)
- [How Complex systems fail - a webops perspective](http://www.kitchensoap.com/2009/11/12/how-complex-systems-fail-a-webops-perspective/)
- [How resilience engineering applies to the web world](http://radar.oreilly.com/2011/05/resilience-engineering-web-operations.html)
- [Resilience Engineering: Part 1](http://www.kitchensoap.com/2011/04/07/resilience-engineering-part-i/)
- [Why resilience is a term worth preserving](http://ilabra.org/blog/why-resilience-term-worth-preserving)
- [Beyond Resilience: Visionary Adaptation](http://vinay.howtolivewiki.com/blog/global/beyond-resilience-visionary-adaptation-1374)

#### Silos and Resilience
The final document I'd like to highlight is about [Reducing the impact of Organisational Silos on Resilience](http://www.resorgs.org.nz/pubs/Silos.pdf).

Stone quotes five questions suggested by Angela Drummond (a practitioner in the area of silo breaking and organisational change) to help executives identify and overcome silos.

- “does your organisation structure promote collaboration, or do silos exist?
- “do you have collaboration in your culture and as part of your value system?
- “do you have the IT infrastructure for effective collaboration?
- “do you believe in collaboration?  Do you model that belief?
- “do you have a reward system for collaboration?

Quoting from the article: 

> Resilience cannot be achieved in isolation of other units and organisations.  In summary, there is a need to recognise:

- the characteristics of silo formation, particularly in the creation of new organisational structures or as part of change management processes 
- a convergence of interests, taking account of the fact that “we are all in this together”.  Efforts are needed to achieve seamless internal relationships at the intraorganisational level and a commitment to work with others to advance community resilience (perhaps with a judicious contribution from government) at the broader societal level
- the case for collaboration.  Gains are often possible by pooling ideas and resources (the total is greater than the sum of the parts)
- the value of harnessing grass-root capability including through continuous knowledge-building and sharing learnings in a trusted environment 
- that cost-effectiveness calculations don’t easily take account of broad organisational or social needs and that the analysis may need supplementation if wide objectives are to be met

> Leadership is the key to bringing these elements together.  Leadership is needed to reduce and mitigate risks before crises occur.

It was fascinating to read the collaboration and resilience go hand in hand. And breaking the silos is really a must there and requires collaboration. Also the inter-company silos fits in nicely with [The Agile Executive - A new Context for Agile](http://theagileexecutive.com/2011/10/26/a-new-context-for-agile/) presentation on how we come to rely on external services in a SAAS model and this will be another silo to tackle.

#### Final note
This is all research in progress, but it's exciting to see a lot of different concepts fit in nicely. I apologize that this isn't yet a complete polished train of thought, but it might be useful to explore more on the subject.
