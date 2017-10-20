---
layout: post
title: "How to add Disqus to your Jekyll site?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-07-27
---
[Jekyll](https://jekyllrb.com) is a popular static site generator that is perfect for blogging. In fact, this site [uses Jekyll](https://github.com/poanchen/poanchen.github.io) as well. Unlike [WordPress](https://www.wordpress.com), Jekyll does not use/have database at all. Which makes it extremely fast because it does need to make a trip to DB when fetching a blog. Since Jekyll is simply a static site generator, there are disadvantages. For example, it does have provide/have the ability for people to comment like WordPress did. However, you can still use a 3rd party library to complement that. [Disqus](https://disqus.com) is a popular library that allows you to add commenting system to your site easily. In this tutorial, I am going to show you guys how to add Disqus to your Jekyll site in two ways.

First way:

Create a disqus.html file and save it within the folder name _includes

Here is an example of the disqus.html file, &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/27/how-to-add-disqus-to-your-jekyll-site/_includes/disqus.html#L1-L22" target="_blank">source code</a>
<pre>
  <code class="html">
    &lt;div id="disqus_thread"&gt;&lt;/div&gt;
    &lt;script type="text/javascript"&gt;
      var disqus_config = function () {
        // Here is an example,
        // this.page.url = "https://poanchen.github.io&lcub;&lcub; page.url &rcub;&rcub;";
        this.page.url = "[put_your_site_url_here]&lcub;&lcub; page.url &rcub;&rcub;";
        this.page.identifier = "&lcub;&lcub; page.url &rcub;&rcub;";
      };

      // You should be able to get the following lines of code from your Disqus admin.
      // https://disqus.com/admin/universalcode
      (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = '//[your_username].disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
    &lt;/script&gt;
    &lt;noscript&gt;
      Please enable JavaScript to view the &lt;a href="https://disqus.com/?ref_noscript"&gt;comments powered by Disqus.&lt;/a&gt;
    &lt;/noscript&gt;
  </code>
</pre>
Use this way if you do not mind inline JavaScript.

And, go to any site that you would like comment included and do this,
<pre>
  <code class="jekyll">
    // some contents
    &lcub;&percnt; include disqus.html &percnt;&rcub;
    // some contents
  </code>
</pre>

Second way:

Create a disqus.html file and save it within the folder name _includes

Here is an example of the disqus.html file, &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/27/how-to-add-disqus-to-your-jekyll-site/_includes/disqus.html#L24-L29" target="_blank">source code</a>
<pre>
  <code class="html">
    &lt;div id="disqus_thread"&gt;&lt;/div&gt;
    &lt;script src="/path/to/your/disqus.js"&gt;&lt;/script&gt;
    &lt;noscript&gt;
      Please enable JavaScript to view the &lt;a href="https://disqus.com/?ref_noscript"&gt;comments powered by Disqus.&lt;/a&gt;
    &lt;/noscript&gt;
  </code>
</pre>

Create a disqus.js file and save it to anywhere you like, (we saved it in src/js/disqus.js) &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/27/how-to-add-disqus-to-your-jekyll-site/src/js/disqus.js" target="_blank">source code</a>
<pre>
  <code class="javascript">
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
  </code>
</pre>
Use this way if you mind inline JavaScript.

And, go to any site that you would like comment included and do this,
<pre>
  <code class="jekyll">
    // some contents
    &lcub;&percnt; include disqus.html &percnt;&rcub;
    // some contents
  </code>
</pre>

Setting up the code this way allows you to enable commenting on a page-by-page basis.<br>
It is that simple.

## Wrapping Up

Hopefully this guide has help you to add Disqus to your Jekyll site. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues).

### Getting started

* [How to: Add Disqus to your Jekyll site](https://medium.com/@r3id/how-to-add-disqus-to-your-jekyll-site-dca477da3585) by [Alan Reid](https://medium.com/@r3id).
* [Here is where you would find your Disqus code](https://disqus.com/admin/universalcode).