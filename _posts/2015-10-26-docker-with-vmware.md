---
title: "Docker with VMWare"
layout: "post"
description: 
categories: [virtualize]
author: "Yi Yang"
---

Boot2docker was deprecated in favour of [Docker Toolbox](https://www.docker.com/docker-toolbox), where the latter is much more convenient to kickstart on a vanilla machine. However, it's a pity that the bundle comes with VirtualBox by default, and I'm using VMWare Fusion for better performance on my dev box.

According to [Java Bain](http://blog.javabien.net/2015/08/20/better-docker-on-osx-with-docker-machine-boot2docker-and-vmware/), a docker machine (using a Mac box) could be easily deployed on VMWare Fusion via:

{% highlight bash %}
# removes VM created by default
docker-machine rm default
# creates machine powered by vmware fusion
docker-machine create --driver=vmwarefusion default
{% endhighlight %}

A even detailed configuration could be found here

{% highlight bash %}
docker-machine create --driver vmwarefusion --vmwarefusion-cpu-count 2 --vmwarefusion-disk-size 80000 --vmwarefusion-memory-size 4096 default
{% endhighlight %}



