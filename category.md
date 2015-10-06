---
layout: page
title: Archive
---

Archive
-------
We have the folloing categories of posts:

{% for category in site.categories %}
  - [{{ category | first }}](/categories/{{ category | first }}/)
{% endfor %}