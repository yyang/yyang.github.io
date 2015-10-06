---
title: "Git submodule"
layout: "post"
permalink: "/2013/05/git-submodule.html"
uuid: "6430424379964670590"
guid: "tag:blogger.com,1999:blog-7751875784341660635.post-6430424379964670590"
date: "2013-05-03 03:06:00"
updated: "2013-11-19 16:02:49"
description: 
blogger:
    siteid: "7751875784341660635"
    postid: "6430424379964670590"
    comments: "0"
categories: [submodule, Git]
author: 
    name: "Yi Yang"
    url: "https://www.blogger.com/profile/13529726289633825935?rel=author"
    image: "https://img2.blogblog.com/img/b16-rounded.gif"
---

Git submodule is very useful and important when doing a huge project. However the mechanism is not clearly described in most of the online manuals:

### 1) Submodule Add

{% highlight bash %}
git submodule add git@github.com:yyang/repo submodule_path_here
{% endhighlight %}

This will log and register certain submodule in `.gitmodules` file. Registration is also triggered via `git submodule init`.

### 2) Submodule update

{% highlight bash %}
git submodule update
{% endhighlight %}

Such command will checkout certain version into the registered path.

However the version is locked through `.git/modules/submodule_path_here/FETCH_HEAD` during initial registration, and such update command will not fetch a new version, this command has similar effect as `git checkout $certain_version`.

### 3) Update version

We can either do:

{% highlight bash %}
cd submodule_path_here
git checkout master
git pull
{% endhighlight %}

Or do:

{% highlight bash %}
git submodule foreach git pull origin master
{% endhighlight %}

Both will update the version in `FETCH_HEAD` to the latest, and fetch the versions respectively. Such operation requires commit to update the repo.

### 4) Edits under submodules folder 

Git will search for the nearest git repo - so whenever there's a commit it will commit to submodule, very nice.