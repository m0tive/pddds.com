---
layout: page
tab: posts
title: Posts
subtitle: "Some things that I have wrote"
---

<ol class="post-archive">{% for post in site.posts %}
    <li>
        <abbr class="published" title="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: '%y%m%d' }}</abbr>
        <span class="title"><a href="{{ post.url }}" rel="bookmark"
            title="{{ post.title }}">{{ post.title }}</a></span>
        <span class="clearfix"></span>
    </li>{% endfor %}
</ol>

