---
title: "Building Things, Quickly"
---

_This is part 2 of my -- sometimes rambling -- review of building the latest
iteration of_ pddds. _In part 1 I [reviewed the tech,
tools and features I used](blog/2016/12/Shiny)._

---

This time I'm going to cover workflow I used to rapidly develop the site.

I built the site in what scraps of spare time I could find, so I wanted to
maximise the time I spent actually building the site. The first thing I did was
streamline the dev process.

## Live editing

My first goal is to make editing and previewing as fast as possible.

Previewing the work-in-progress site using [Jekyll][] is easy out of the box:

{% highlight shell %}
$ jekyll server --watch --drafts
{% endhighlight %}

That builds starts the built the site and starts a simple webserver hosting the
site at `http://localhost:4000`. The two additional flags make it possible to
quickly edit the site; `--watch` tells jekyll to rebuild the website when files
are edited so you don't need to restart the server, and `--drafts` includes
unfinished posts in the `_drafts/` folder.

Jekyll now recommends you also use [Bundler][] when building the site. This
ensures you have all the required ruby packages. With bundler, it then looks
like:

{% highlight shell %}
$ bundler exec jekyll server --watch --drafts
{% endhighlight %}

With that running, I'm able to preview the website in my browser, next to my
text editor, as I change it. The only downside with this setup is I have to
refresh the page to see my changes. That's where the next step comes in.

Included at the end of each page is [Live.js][], a bit of javascript that
watches for changes to the websites files and triggers a reload when they
change:

{% highlight html %}
<script type="text/javascript" src="http://livejs.com/live.js"></script>
{% endhighlight %}

Now, this isn't the sort of script I want to run on the live site, so we need to
only include it when previewing the site locally. We can use the variable
`jekyll.environment` to detect if we're in the live production site or just in
the preview development site. Later, when I talk about deployment, I'll show how
to set the environment when building the live site.

In the
[base layout](https://github.com/m0tive/pddds.com/blob/2.1/_layouts/base.html)
this code looks something like:

{% highlight html %}{% raw %}
{% if jekyll.environment == "development" %}
<script type="text/javascript" src="http://livejs.com/live.js"></script>
{% endif %}
{% endraw %}{% endhighlight %}

Now -- with the text editor on my left, and the webbrowser on the right -- as I
save changes to pages, layouts, css, or any other file, and jekyll automatically
rebuilds them, the web browser automatically refreshes to reflect the changes!

It's not perfect, (I can't easily save tweaks made in the browsers dev tools,
back to the original css/scss files) but it's relative simplicity and complete
isolation from the specific tools is a major advantage. It will work with any
text editor, and browser, and on any OS.

(It should even work mobiles/tablets previewing the development site, but you'd
have to work out how to connect to the jekyll server across your network)

## Getting up-and-running

Now I never needed to leave the text editor, another major sticking point was
getting up-and-running. When you've just got just half an hour spare, I needed
to be able to sit down and start work immediately.

First though, a disclaimer: I "work" inside bash and vim, but I _work_ on Windows
because I want to get work done. This leads to some odd environment-specific
scripts and tools. So, sorry, the sample below probably won't work for you,
but maybe they'll help?

I have a script checked in that I run before I do anything else. It's very
simple; it launches the sever and opens the web browser on the correct address.
Work starts as so:

{% highlight shell %}
peter@my-pc MINGW64 /
$ cd ~/pddds

peter@hawthorne-pc MINGW64 ~/pddds (master)
$ ./run_server.sh
{% endhighlight %}

Open vim, off I go.

This is what `run_server.sh` looks like:

<!---------------------------------------------------------------->
{% highlight shell %}
#!/bin/bash

# start the server in another window
start cmd /c"bundler exec jekyll server --watch --drafts"

# wait for server to start
while ! curl http://localhost:4000/ &>/dev/null; do sleep 1; done

# open the homepage
explorer http://localhost:4000/
{% endhighlight %}
<!---------------------------------------------------------------->

## Time logged

One of the surprising revelations I had at the end of 2016 was how useful time
tracking would be at keeping on-task. I use [Toggl][], initially to keep track
of how many non-development things I was having to do at work. As I started
using it I found it had the additional benefit of giving my time focus. I decide
what I'm going to do, hit _Go_ and start work. I feel guilty if the timers
running, but I'm not doing that thing, so I stay on-task and have a better idea
how long I've been working on a thing. For that reason I started using it at
home.

Anyway, back to the website.

A nice side effect is I know exactly how much time I spend building the site.

* Total work done: 35 hours, 56 minutes.
* Over a period of: [2 months 5 days](https://www.wolframalpha.com/input/?i=time+between+17%2F10%2F2016+and+22%2F12%2F2016)

I think, considering I was re-learning many aspects, completing the site in
roughly a work-week (i.e. 40 hr week) seems respectable.

---

Next time, deployment.

[Jekyll]: https://jekyllrb.com
[Bundler]: https://bundler.io
[Live.js]: http://livejs.com
[Toggl]: https://toggl.com

<!-- vim:tw=80
-->
