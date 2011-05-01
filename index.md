---
layout: default
tab: home
---

Peter Dodds
-----------
Software developer and design enthusiast. Once started a web dev company with [a friend][bell], with [mixed results][hoptic]. Currently he works on 3D software and a couple of [other things][github].

He likes to share things if your willing to [listen][twitter].

[bell]:http://404visuals.com/ "David Bell"
[hoptic]:http://hoptic.co.uk/ "Hoptic"
[github]:https://github.com/m0tive/ "github.com/m0tive"
[twitter]:http://twitter.com/m0tive/ "twitter.com/m0tive"

~
-

<ol class="post-list">{% for post in site.posts %}
    <li>
        <abbr class="published" title="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: '%B %d, %Y' }}</abbr>
        <span class="title"><a href="{{ post.url }}" rel="bookmark"
            title="{{ post.title }}">{{ post.title }}</a></span>
        <span class="clr"></span>
    </li>{% endfor %}
</ol>
