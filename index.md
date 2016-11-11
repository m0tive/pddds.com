---
layout: base
tab: home
---

# latest

{% for post in site.posts %}
## [{{ post.title }}]({{ post.url }})

{{ post.excerpt | remove: '<p>' | remove: '</p>' }}
{% endfor %}

