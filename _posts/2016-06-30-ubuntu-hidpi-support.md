---
title: "Ubuntu HiDPI Support"
layout: "post"
description: 
categories: [tools]
author: "Yi Yang"
---

I have recently received my ThinkPad P50 mobile workstation and intended to use it for development. And I have used VMWare Workstation to host multiple guest operating systems (since that great machine has 64 GB of memory). However as I've installed Ubuntu I found it very hard to read the tiny text on screen - and it is hardly possible to do any proper adjustment through system settings.

After exploring I found the following resources:

- [HiDPI Support in Gnome](https://blogs.gnome.org/alexl/2013/06/28/hidpi-support-in-gnome/)
- [Scale Title Bars and Menu](http://askubuntu.com/questions/471425/scale-title-bars-and-menu-in-ubuntu-14-04-with-gnome)

And the final solution would be:

```lang=bash
gsettings set org.gnome.settings-daemon.plugins.xsettings overrides "{ 'Gdk/WindowScalingFactor':<2>, 'Gdk/UnscaledDPI':<92160> }"
gsettings set org.gnome.desktop.interface scaling-factor 2
```

Where the first line sets contents within an application window and the second line sets the Gnome interface.
