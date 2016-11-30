---
title: index
---

{% for post in site.posts %}
<hr>
{% include post.html post=post %}
{% endfor %}

