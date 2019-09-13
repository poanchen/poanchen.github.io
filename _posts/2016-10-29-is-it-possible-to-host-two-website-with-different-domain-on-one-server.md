---
layout: post
title: "Is it possible to host two website with different domain name on one server? If yes, how would you do that?"
author: poanchen
date: 2016-10-29 08:30:30
tags:
- Apache2
---
If you have ever play around with server administration, you probably already knew the answer for this. The answer for this question is a BIG yes. It is totally possible to host two website on one server. And, you can easily achieve it by using Apache HTTP Server. However, there are various reason why you would do that. There are two reasons that I can come up with. One is, it is more cost-effective as having another server running will cost a bit more. Two is, both website is not consider as high traffic website. Otherwise, it is probably a good idea to separate them. Anyways, our focus in this article would be how you would do that in practice. In this post, we will be using Apache HTTP Server. Apache HTTP Server is consider to be the most used web server in the world according to [Web Server Usage Statistics](https://trends.builtwith.com/web-server). In our example, say we have two website with two different domain name. One is example.com, another one is example.net. Two completely different domain name, and we are going to host them on one server with the help of Apache. Also, to make it simpler. Both website will be using HTTP protocol instead of HTTPS. So, we do not need to get their own SSL certificate. Also, to do this. All we need to do is modify some Apache config file then we will be able to host two different website on one server. Now, a sample of how the example.com conf file might look something like this.

## Apache config file for example.com
{% highlight apache %}
 <VirtualHost *:80>
    ServerName www.example.com
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/example.com

    ErrorLog /var/www/example.com/log/error.log
    CustomLog /var/www/example.com/log/access.log combined
 </VirtualHost>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/29/is-it-possible-to-host-two-website-with-different-domain-on-one-server/www-example-com.conf" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

The file that you should be modifying is this file, /etc/apache2/sites-enabled/000-default.conf. This is the default config file for apache. The above code is basically telling apache that when a client request a webpage for www.example.com and the port was 80 or HTTP. Then, please go to the root directory, which is /var/www/example.com to find the webpage. Also, make sure to log the access activities to the file namely /var/www/example.com/log/access.log in the server, if there are any errors, then log them into this, /var/www/example.com/log/error.log.

## Apache config file for example.net
{% highlight apache %}
 <VirtualHost *:80>
    ServerName www.example.net
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/example.net

    ErrorLog /var/www/example.net/log/error.log
    CustomLog /var/www/example.net/log/access.log combined
 </VirtualHost>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/29/is-it-possible-to-host-two-website-with-different-domain-on-one-server/www-example-net.conf" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Just simply place this right below the code above (www.example.com). As you can see, this is fairly simple to do. However, once we have done all this. We need to do one more steps for this to take effect. We need to restart the apache server. Just remember, whenever you modify something in the apache config file. ALWAYS remember to restart the apache server. Otherwise, it would simply does not work. You may do it by the following command.

## Apache command to restart the server
{% highlight apache %}
  sudo service apache2 restart
{% endhighlight %}

## Wrapping Up

As this is a fairly short tutorial. Hopefully you have learned something and now you should begin to play around with Apache configuration. The more you play, the more you would understand how it works. Okay! I hope that this tutorial has helped you and Thanks for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Apache Documentation](https://httpd.apache.org/docs/) by [Apache](https://httpd.apache.org/).