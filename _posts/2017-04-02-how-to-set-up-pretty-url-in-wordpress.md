---
layout: post
title: "How to set up pretty url in WordPress?"
author: poanchen
date: 2017-04-02 08:30:30
tags:
- Apache2
- PoAn (Baron) Chen
- Pretty url
- WordPress
---
If you have ever play with WordPress, you would know that WordPress is a pretty powerful CMS that allows you to do a lot of cool things. For example, in the setting, you may choose what kind of permalink you want for your url. It can be something like this "https://www.example.com/?p=123" or it can be something like this "https://www.example.com/sample-post/". For many good reasons, the second one is more preferable to user. Reason like it looks more pretty and it is good for SEO. However, sometimes you may run into issue that you tried to set it to Post name (the second one that we just discussed) and when you head over to the page, you receive "Not Found" error message on your browser. This is because you may have not setup correctly in the [Apache](https://httpd.apache.org/). Today, I am going to walk you through it and help you to fix that "Not Found" error message.

Firstable, assuming that you have access to your web server and logged in as administrator. Otherwise, you might not be able to do the following tutorial. Let's do it!

For WordPress to use pretty url in permalink, you need to enable mod_rewrite. To do that, first you need to run this command to enable it.
{% highlight bash %}
  sudo a2enmod rewrite
{% endhighlight %}

Next, you need to make sure your Apache conf file allow you to rewrite as well. Do these commands.
{% highlight bash %}
  cd /etc/apache2/sites-enabled
  sudo vi [name of your conf file].conf
{% endhighlight %}

Then, vi will open up the conf file and you may view your setting for your web server. Try adding the following line to your conf file.
{% highlight apache %}
  <Directory /var/www>
    AllowOverride All
  </Directory>
{% endhighlight %}

Next, in order for Apache to take effect, you need to restart your Apache server.
{% highlight bash %}
  sudo service apache2 restart
{% endhighlight %}

Now, when you head over to your WordPress site. You should be able to properly see your site without the "Not Found" error message.

## Wrapping Up

Hopefully this guide has helped you to fix the "Not Found" error message and finally, the visitor may see your site with a pretty url. Yaa!! I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Using Permalinks](https://codex.wordpress.org/Using_Permalinks)
* [WordPress](https://wordpress.org/)