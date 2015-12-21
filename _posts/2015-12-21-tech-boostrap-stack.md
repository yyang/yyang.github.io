---
title: "Tech Project Bootstrap Stack"
layout: "post"
description: 
categories: [tools]
author: "Yi Yang"
---

Since a few years ago, we foresaw a vast number of new technologies allowing  more agile product development. Those technologies are enabled by a list of nicely-designed tools.

In this document, we are going to introduce a few management-related tools.

### Source Code Management + Agile Issue Tracking

Source code management and issue tracking must be connected closely otherwise we would not able to figure out the missing link between tasks and outcomes. A few options are here:

* Bitbucket / Github + Jira 
    - __Pros:__ This is the most sophisticated combination and it's tightly connected with the community. It's easy to use yet provides new possibility than traditional issue tracking. And it's not necessary to waste time on maintanance.
    - __Cons:__ Github is occationally blocked in China. Secondly, it's expensive, costs approximately 400 USD / mo for 50 seats team.
* Phabricator
    - __Pros:__ Used by Facebook and other startups, provides one-stop open-source solution towards all development management related issues, has all features integrated with great capability. Self-hosted.
    - __Cons:__ Agile board feature is still in beta and needs improvement. Phabricator's old-school technology makes it a bit hard to set up (but still one-stop).
* Github + Zenhub
    - __Pros:__ Fancy, trendy, easy to use. A cost-saving alternative than Jira.
    - __Cons:__ Neither Github nor Zenhub has office in China. Chances to get blocked.
* Gitlab CE + LeanLabs Kanban
    - __Pros:__ A user-friendly self-hosted plan, Gitlab CE is much more firendly than Phabricator and LeanLabs Kanban is more mature than Phabricator's integrated solution.
    - __Cons:__ Need to connect every service / open-source solution manually, man-power consuming maintanance.

Note that all those tools have code audit process integrated.

### Documentation Tools

Documentation is another necessary service to build up at the very beginning.

__General Documentation__

* Confluence, tightly integrated with Jira, purchased separately.
* Phabricator, is one of the component of Phabircator, self-hosted.
* Sphinx + readthedocs, is one of the most popular documentation tool available, using reStructuredText, the self-hosted open-source solution privides nicely rendered documentation based on a signle git repository.
* Github and Gitlab also provides wiki but they are all repository based.

__Inline Documentation__

* Javadoc, _de facto_ standard.
* JSDoc, a popular documentation tool for Javascript, similar to Javadoc.

__RESTful API Documentation__

* Swagger
* API Blueprint

### Development Guide (part of documentation)

Those are nice to have to make the tech team sustainable.

* _Getting Started_: How to set up the environment, including nesearry tools, databases & other security tokens.
* _Code Style Guide_: It's extremely important for node.js engineers to follow a single style guide. Google's *Javascript Style Guide* is a goold choice, and `gjslint` + `eslint` would ensure your code are well formatted before submission.
* _Workflow_: What kind of procedure are we going to assign / claim tasks and how to announce its *fixed*. Also if the team is using `git-flow` or other workflow controls.
* _Architecture_: :)

### Continuous Integration

* Jenkins is no doubt the winner.
