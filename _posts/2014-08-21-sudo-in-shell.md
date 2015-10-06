---
title: "Sudo in a Shell"
layout: "post"
permalink: "/2014/08/sudo-in-shell.html"
uuid: "6258141028710912013"
guid: "tag:blogger.com,1999:blog-7751875784341660635.post-6258141028710912013"
date: "2014-08-21 01:32:00"
updated: "2014-08-21 01:32:48"
description: 
blogger:
    siteid: "7751875784341660635"
    postid: "6258141028710912013"
    comments: "0"
categories: 
author: 
    name: "Yi Yang"
    url: "https://www.blogger.com/profile/13529726289633825935?rel=author"
    image: "https://img2.blogblog.com/img/b16-rounded.gif"
---

While managing servers, it's necessary to use the proper account to manipulate the assets - and here's the example for updating assets on edX:

{% highlight bash %}
#!/bin/bash

# update theme svn
cd /edx/app/edxapp/themes/default
sudo -H -u edxapp svn update

# update lms assets
cd /edx/app/edxapp/edx-platform
sudo -u edxapp LANG="en_US.UTF-8" SKIP_WS_MIGRATIONS="1" GEM_PATH="/edx/app/edxapp/.gem" NO_PREREQ_INSTALL="1" PATH="/edx/app/edxapp/venvs/edxapp/bin:/edx/app/edxapp/edx-platform/bin:/edx/app/edxapp/.rbenv/bin:/edx/app/edxapp/.rbenv/shims:/edx/app/edxapp/.gem/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" GEM_HOME="/edx/app/edxapp/.gem" RBENV_ROOT="/edx/app/edxapp/.rbenv" /edx/app/edxapp/venvs/edxapp/bin/paver update_assets lms --settings=aws
cd ~

# reboot service
sudo /edx/bin/supervisorctl -c /edx/etc/supervisord.conf restart edxapp:
{% endhighlight %}
