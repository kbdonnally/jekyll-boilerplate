---
layout: page
title: Jekyll Boilerplate
nav: true
---

Custom configuration for Jekyll-based sites.

## Site map, sort of:
{% for page in site.pages %}
- [{{ page.title }}]({{ site.baseurl }}{{ page.url }})
{% endfor %}
