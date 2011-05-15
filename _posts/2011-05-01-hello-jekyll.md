---
layout: post
title: Hello Jekyll
category: offtopic
date: 2011-05-01 18:34:09
subtitle: "or How I finally got my site online again"
---

Just more [noise][1].

0. a list
0. in order

- not ordered
- list here

A very sensible piece of code that could _never_ break...

{% highlight cpp linenos %}
//---------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
for( uint32_t i = 0, n = 2000; i != n; ++i )
    foobar( &i ); // run shit
std::cout << "ok\n";
std::vector< Vector > hello = big_vetor;
std::cerror << 'q';
assert( 1 + 1 == 3 );
int world( 1 );
if( fffff == 4 )
{
    return false;
}

return true;

{% endhighlight %}
My favorite part is `foobar( &i );`

I usually run jekyll like this:
{% highlight sh %}
$ jekyll --server --auto
{% endhighlight %}

[1]:https://secure.wikimedia.org/wikipedia/en/wiki/Signal-to-noise_ratio "Signal-to-noise"
