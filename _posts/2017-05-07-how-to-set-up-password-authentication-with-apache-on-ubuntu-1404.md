---
layout: post
title: "How to set up password authentication with Apache on Ubuntu 14.04"
author: poanchen
date: 2017-05-07 08:30:30
tags:
- Apache2
- Authentication
- PoAn (Baron) Chen
- Ubuntu 14.04
---
When setting up a web server, there are often sections of the site that you wish to restrict access to. In order to restrict access to a certain page, a password-authentication will be used. In this guide, we will demonstrate how to password protect assets on an Apache web server running on Ubuntu 14.04. 

First, you need to install the Apache Utilities Package.
{% highlight bash %}
  sudo apt-get update
  sudo apt-get install apache2 apache2-utils
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Next, you need to create the password file for the Apache Utilities to use.
{% highlight bash %}
  sudo htpasswd -c /etc/apache2/.htpasswd username
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

You will be asked to supply and confirm a password for the user you just created.

You may view the username and encrypted password for each user:
{% highlight bash %}
  cat /etc/apache2/.htpasswd
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Next, all you need to do is to configure the Apache file for the access control.
{% highlight bash %}
  sudo vi /etc/apache2/sites-enabled/000-default.conf
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Add the following code to your Apache config file.
{% highlight apache %}
  <Directory /path/to/protect>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/000-default-le-ssl.conf" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now, you need to restart your Apache web server for it to take effect.
{% highlight bash %}
  sudo service apache2 restart
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

To confirm that your content is protected, try to access your restricted content in a web browser. A login widget should pop up.

## Wrapping Up

Hopefully this guide has helped you to solve your problem of adding simple password authentication using Apache Utilities. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [How To Set Up Password Authentication with Apache on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-14-04)