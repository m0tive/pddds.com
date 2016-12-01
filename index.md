---
title: index
---

<em>Latest things...</em>

{% for post in site.posts %}
{% unless forloop.index == 1 %}<hr/>{% endunless %}
{% include post.html post=post htag="h2" %}
{% endfor %}

