---
layout: post
title: "How to add Disqus to your Jekyll site?"
author: poanchen
date: 2017-07-27 08:30:30
tags:
- Comments
- Disqus
- HTML
- JavaScript
- Jekyll
- PoAn (Baron) Chen
---
[Jekyll](https://jekyllrb.com) is a popular static site generator that is perfect for blogging. In fact, this site [uses Jekyll](https://github.com/poanchen/poanchen.github.io) as well. Unlike [WordPress](https://www.wordpress.com), Jekyll does not use/have database at all. Which makes it extremely fast because it does need to make a trip to DB when fetching a blog. Since Jekyll is simply a static site generator, there are disadvantages. For example, it does have provide/have the ability for people to comment like WordPress did. However, you can still use a 3rd party library to complement that. [Disqus](https://disqus.com) is a popular library that allows you to add commenting system to your site easily. In this tutorial, I am going to show you guys how to add Disqus to your Jekyll site in two ways.

First way:

Create a disqus.html file and save it within the folder name _includes

Here is an example of the disqus.html file,
{% highlight html %}
  <div id="disqus_thread"></div>
  <script type="text/javascript">
    var disqus_config = function () {
      // Here is an example,
      // this.page.url = "https://poanchen.github.io{{ page.url }}";
      this.page.url = "[put_your_site_url_here]{% raw %}{{ page.url }}{% endraw %}";
      this.page.identifier = "{% raw %}{{ page.url }}{% endraw %}";
    };

    // You should be able to get the following lines of code from your Disqus admin.
    // https://disqus.com/admin/universalcode
    (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = '//[your_username].disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  </script>
  <noscript>
    Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
  </noscript>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/27/how-to-add-disqus-to-your-jekyll-site/_includes/disqus.html#L1-L22" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Use this way if you do not mind inline JavaScript.

And, go to any site that you would like comment included and do this,
{% highlight jekyll %}
  // some contents
  {% raw %}{% include disqus.html %}{% endraw %}
  // some contents
{% endhighlight %}

Second way:

Create a disqus.html file and save it within the folder name _includes

Here is an example of the disqus.html file,
{% highlight html %}
  <div id="disqus_thread"></div>
  <script src="/path/to/your/disqus.js"></script>
  <noscript>
    Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
  </noscript>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/27/how-to-add-disqus-to-your-jekyll-site/_includes/disqus.html#L24-L29" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Create a disqus.js file and save it to anywhere you like, (we saved it in src/js/disqus.js)
{% highlight javascript %}
  var disqus_config = function () {
    // we are using document.location.* here because Jekyll code does not work well in JS code.
    this.page.url = document.location.href;
    this.page.identifier = document.location.pathname;
  };

  // You should be able to get the following lines of code from your Disqus admin.
  // https://disqus.com/admin/universalcode
  (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//[your_username].disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/27/how-to-add-disqus-to-your-jekyll-site/src/js/disqus.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

And, go to any site that you would like comment included and do this,
{% highlight jekyll %}
  // some contents
  {% raw %}{% include disqus.html %}{% endraw %}
  // some contents
{% endhighlight %}

Setting up the code this way allows you to enable commenting on a page-by-page basis.<br>
It is that simple.

## Wrapping Up

Hopefully this guide has help you to add Disqus to your Jekyll site. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [How to: Add Disqus to your Jekyll site](https://medium.com/@r3id/how-to-add-disqus-to-your-jekyll-site-dca477da3585) by [Alan Reid](https://medium.com/@r3id).
* [Here is where you would find your Disqus code](https://disqus.com/admin/universalcode).