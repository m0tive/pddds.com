---
---

_The firehose_

<ol id="firehose-list">{% for post in site.posts %}
  <li id="{{ post.date | date: "%s%3N" }}">
  <a href="{{ post.url | prepend:site.baseurl }}">{{ post.title }}</a>
  </li>
{% endfor %}</ol>

<script type="text/javascript">
const SITE_BASEURL = "{{ site.baseurl }}";
function getScript(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;
    prior.parentNode.insertBefore(script, prior);

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if(!isAbort) { if(callback) callback(); }
        }
    };

    script.src = source;
}
</script>

<script type="text/javascript" src="{{ site.baseurl }}/js/firehose.js"></script>
<script type="text/javascript">
buildFirehose("firehose-list");
</script>
