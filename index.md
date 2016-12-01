---
title: index
---

{% for post in site.posts %}
<hr>
{% include post.html post=post htag="h2" %}
{% endfor %}

