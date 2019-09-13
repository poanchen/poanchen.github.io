---
layout: post
title: "How to enable cross-origin resource sharing on an apache server?"
author: poanchen
date: 2016-11-20 08:30:30
tags:
- Apache2
- CORS on Apach
- Cross domain request
- PoAn (Baron) Chen
---
Today, I am going to show you guys how to enable cross-origin resource sharing on an apache server. Before we start, I would like to ask you a question. Have you ever come cross this error message while development? To be more specific, here is what the error message might look like.

<img src="/img/2016/11/20/how-to-enable-cross-origin-resource-sharing-on-an-apache-server/example of error message for cors.PNG" alt="An example of error message of CORS"><br>

If yes, then you are in luck. By following this tutorial, you may solve this problem. So, what exactly is cross-origin resource sharing? [Cross-origin resource sharing (CORS)](https://www.w3.org/TR/cors/) is a mechanism that allows restricted resources (e.g. file) on a web page to be requested from another domain outside the domain from which the resource originated. For example, a HTML page served from http://www.domain-a.com makes a &lt;img&gt; src request for http://www.domain-b.com. For security reasons, browsers restrict cross-origin HTTP requests initiated from within scripts. For example, in the error message shown above, the script in HTML was trying to make a XMLHttpRequest and Fetch some JSON from domain namely the https://www.jenrenalcare.com. However, the HTML page was served from https://s.codepen.io. As we know, a web application using XMLHttpRequest or Fetch could only make HTTP requests to its own domain. So, how do we solve this in the server side? Here are the steps that what you should do.
First, change directory to where you put your apache conf file.

## command to change directory to apache conf file
{% highlight bash %}
  cd /etc/apache2/sites-enabled
{% endhighlight %}
Then, you need to have administrator access or sudo to modify the apache conf file. Then do the following commands,

## command to vi the apache conf file
{% highlight bash %}
  sudo vi [name of your conf file].conf
{% endhighlight %}
Then, add the following lines to your code.

## apache code for enable the CORS
{% highlight apache %}
  # remember to replace /var/www with your directory root
  <Directory /var/www>
    # some other apache code here, if any
    # replace the url to the one you wanted
    Header set Access-Control-Allow-Origin "https://s.codepen.io"
    # some other apache code here, if any
  </Directory>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/11/20/how-to-enable-cross-origin-resource-sharing-on-an-apache-server/000-default-le-ssl.conf" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Simple hul!? Now, you may simply save the file and quit. Then, in fact, for Header to work in apache, we need to run the following command.

## command to enable Header for apache
{% highlight bash %}
  sudo a2enmod headers
{% endhighlight %}
Now, we are left with only one command to make it work. We simple need to restart the apache!

## restart your Apache2 server
{% highlight bash %}
  sudo service apache2 restart
{% endhighlight %}

## Wrapping Up

Hopefully this guide has given you the confidence to fix the CORS problem on the server side when you see them. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)