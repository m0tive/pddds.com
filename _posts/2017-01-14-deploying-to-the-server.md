---
title: "Deloying to the server"
---

_This is part 3 of my -- sometimes rambling -- review of building the latest
iteration of_ pddds. _In part 1 I [reviewed the tech,
tools and features I used](/blog/2016/12/Shiny), in part 2 I [covered the
workflow I used to develop the site](/blog/2017/01/Building-things-quickly)._

--------------------------------------------------------------------------------

The last piece of the puzzle when building the website (other than _actually
making it_) was to decide how to upload it. I could have just copied the
files generated by jekyll onto the server using `scp`, but that's fiddly and
repetitive so why not automate it?

The logical way to do this was via git; I can push changes from git and use a
server-side hook to rebuild the site.

## Setting up the server

First you need a git repository on the server to push to. Although you'll need
to check out the repo to build it, you only need a bare repository, i.e. one
without a checked out working copy.

Connect to the server using ssh and do:

{% highlight shell %}
git init --bare ~/path/to/repo
{% endhighlight %}

That will create create the folder `~/path/to/repo.git` which will contain the
git info. Then, from the local machine you can add it as a remote as `deploy`:

{% highlight shell %}
git remote add deploy peter@server-address.com:~/path/to/repo.git
{% endhighlight %}

and push the local master branch to the server

{% highlight shell %}
git push deploy master
{% endhighlight %}

With the bare repo setup, we can send the latest version to the server but we
still need to add a hook to run jekyll, building the final website.

## Deploying

Git has a number of hooks you can register, they are scripts that run on
specific events. To build the site after receiving pushed changes, we can use
the [post-receive hook](https://git-scm.com/docs/githooks#post-receive).

The post-receive hook should be created on the server, in the `repo.git/hooks`
folder.

A simple post-receive hook, which just print to the terminal when changes are
pushed, looks like:

{% highlight shell %}
#!/bin/bash

while read oldVal newVal refName; do
	echo "recieved branch $refName"
done
{% endhighlight %}

To build the site, we need the hook to checkout a working copy of the
repository and run jekyll, outputting to the public html folder. I found this
tricky to get right, but ended up with something similar to the following.

{% highlight shell %}
#!/bin/bash
set -e

TMP_CLONE="$TMPDIR/website-git-clone"
PUBLIC_WWW="/home/public"

build(){
	local branch="$1"
	branch="${branch#refs/}"
	branch="${branch#heads/}"

	local out="$PUBLIC_WWW"

	if [[ "$branch" != "master" ]]; then
		return
	fi

	local clone="$TMP_CLONE"

	echo checking out
	mkdir -p "$clone"
	git --work-tree="$clone" checkout -f "$branch"
	git --work-tree="$clone" reset --hard HEAD

	echo building
	JEKYLL_ENV=production jekyll build -s "$clone" -d "$out"
}

while read oldVal newVal refName; do
	build "$refName"
done
{% endhighlight %}

This will checkout and build the master branch when it is pushed. Everything
else is ignored. That means the master branch is the "live" branch.

Note the use of `JEKYLL_ENV=production`,
[previously](/blog/2017/01/Building-things-quickly#live-editing) I mentioned
using `jekyll.environment` in the base layout to determine if we're in the live
site. By setting `JEKYLL_ENV` before calling `jekyll build`, we change that
variable from the default "development" to "production". This will disable
things like the live.js script.

## Per-branch builds

Sometimes I wanted to push something that wasn't the master branch, usually to
show some in progress changes to a friend. To do this, I extended the script
first by removing the check for `master`, then by changing the output directory
to be in a folder `/wip`.

{% highlight shell %}
build(){
	# ...

	local out="$PUBLIC_WWW/wip/$branch"
	if [[ "$branch" == "master" ]]; then
		out="$PUBLIC_WWW"
	fi
	echo destination $out
	mkdir -p "$out"

	# ...
}
{% endhighlight %}

To avoid trashing `/wip` when rebuilding `master`, you also need to add the
following to the jekyll `_config.yml`.

{% highlight yaml %}
keep_files:
    - wip
{% endhighlight %}

When you push a branch, that should then build that branch into a wip folder of
the same name.

Because the work-in-progress sites now reside as a subfolder of the website,
when defining urls we need to make sure we use the correct baseurl, and we need
to set it building on the server.

The best solution I found for setting the baseurl was to just inject it into the
temporary checkout's `_config.yml`:

{% highlight shell %}
build(){
	# ...

	if [[ "$branch" != "master" ]]; then
		echo "baseurl: \"/wip/$branch\"">>"$clone/_config.yml"
	fi

	# ...
}
{% endhighlight %}

It seems dirty, but it works.

Then in layouts and other website code, we need to use the baseurl variable.

{% highlight html %}
<link rel="stylesheet" href="{% raw %}{{ site.baseurl }}{% endraw %}/css/base.css" type="text/css" />
{% endhighlight %}

Now we can push any branch

{% highlight shell %}
git push deploy test-rebuild-layout
{% endhighlight %}

and see it at `http://pddds.com/wip/test-rebuild-layout` _(in theory)._

## Full script

I did a couple more changes after that including avoiding building tags and
cleaning up deleted branches. Instead of cover them
all, you can just read through the final hook.

<!---------------------------------------------------------------->
{% highlight shell %}
#!/bin/bash
set -e

TMP_CLONE="$TMPDIR/website-git-clone"
PUBLIC_WWW="/home/public"

build(){
	local branch="$1"
	branch="${branch#refs/}"
	branch="${branch#heads/}"

	local clone="$TMP_CLONE"

	if grep -q "^tags/" <<<"$branch"; then
		return
	fi

	local out="$PUBLIC_WWW/wip/$branch"
	if [[ "$branch" == "master" ]]; then
		out="$PUBLIC_WWW"
	fi
	echo destination $out
	mkdir -p "$out"

	echo checking out
	mkdir -p "$clone"
	git --work-tree="$clone" checkout -f "$branch"
	git --work-tree="$clone" reset --hard HEAD

	echo destination $out
	mkdir -p "$out"

	echo building
	if [[ "$branch" != "master" ]]; then
		echo "baseurl: \"/wip/$branch\"">>"$clone/_config.yml"
	fi

	JEKYLL_ENV=production jekyll build -s "$clone" -d "$out"
}

delete(){
	local branch="$1"
	branch="${branch#refs/}"
	branch="${branch#heads/}"

	echo deleting $branch
	rm -rf "$PUBLIC_WWW/wip/$branch"
}


while read oldVal newVal refName; do
	if grep -q '^0*$' <<<$newVal; then
		delete $refName
	else
		build "$refName"
	fi
done
{% endhighlight %}
<!---------------------------------------------------------------->

--------------------------------------------------------------------------------

That's it. Plenty more to add to the site (firstly pagination, the front pages
is getting pretty long), and some less technical posts to write.

<!-- vim:tw=80
-->
