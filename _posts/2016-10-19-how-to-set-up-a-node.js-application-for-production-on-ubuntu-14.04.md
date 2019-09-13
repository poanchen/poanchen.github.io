---
layout: post
title: "How to set up a Node.js application for production on Ubuntu 14.04?"
author: poanchen
date: 2016-10-19 08:30:30
tags:
- Apache2
- Express
- Node.js
- pm2
- PoAn (Baron) Chen
- Production
- Ubuntu 14.04
---
You probably have heard of Node.js at some points in your life. Maybe it is at [stack overflow](http://stackoverflow.com/) or somewhere else. No surprise that Node.js became really popular as there are increasing interest in [JavaScript](http://githut.info/) on [Github](https://github.com/). Normally, people use [HTML](https://en.wikipedia.org/wiki/HTML), [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets), and [JavaScript](https://www.javascript.com/) for front-end development. In the back-end, some popular programming languages like [PHP](https://secure.php.net/) on [WordPress](https://wordpress.com/) or [Symfony](https://symfony.com/), [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) on [spring](https://spring.io/) or [J2EE](http://www.theserverside.com/definition/J2EE-Java-2-Platform-Enterprise-Edition), [Python](https://www.python.org/) on [django](https://www.djangoproject.com/) or [Ruby on Rails](http://rubyonrails.org/). However, today we are going to talk about how to set up a Node.js application for production on Ubuntu 14.04 using [Apache2](https://httpd.apache.org/) server. Thanks to Chrome's V8 JavaScript engine, as the runtime environment interprets JavaScript. It allows the developer to write JavaScript in the back-end. One benefit would be that normally a developer who came from front-end who already knew JavaScript can easily pick up and implement a back end system using JavaScript and do not need to know other languages like frameworks that we talked about above. In this tutorial, we will cover setting up a production-ready Node.js environment that is composed of two Ubuntu 14.04 servers; one server will run Node.js applications managed by [PM2](http://pm2.keymetrics.io/), while the other will provide users with access to the application through an Apache2 reverse proxy to the application server. This guide uses two Ubuntu 14.04 servers with private networking in the same server. For simplicity, we also assume that you already have a domain name that points to your web server, so that you may access your web server via a domain name instead of its public IP address. Once you have those set up, then we may continue on this tutorial. We all know that in the local development for Node.js, we usually make a few changes along the way and simply uses the localhost IP address, i.e. 127.0.0.1, wherever the app server's private IP address is used. Here, is the simplest hello world version of Node.js with [Express](http://expressjs.com/).

## Hello world version of Node.js
{% highlight javascript %}
  var express = require('express');
  var app = express();

  app.get('/', function (request, response) {
    response.send("Hello World");
  });

  app.listen(8080);
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/19/how-to-set-up-a-node.js-application-for-production-on-ubuntu-14.04/server.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

When you run it, you should see something like this,

<img src="/img/2016/10/19/how-to-set-up-a-node.js-application-for-production-on-ubuntu-14.04/hello world of nodejs.PNG" alt="chat example for hello world version"><br>

This Node.js application simply listens on the specified IP address and port, and returns "Hello World" with a 200 HTTP status code. This means that the application is only reachable from servers on the same private network, such as our web server. Let's test the application through the private IP address. Open another a terminal session and connect to your web server. Because the web server is on the same private network, it should be able to reach the private IP address of the application using curl. Be sured to change the PRIVATE_IP_ADDRESS to your private IP address and PORT_THAT_Node_JS_APP_LISTEN if you changed to something else.

## curl to your Node.js application via private IP address
{% highlight html %}
  curl http://PRIVATE_IP_ADDRESS:PORT_THAT_Node_JS_APP_LISTEN
{% endhighlight %}
This should return Hello World! Once this is good. Then, we may proceed and install PM2. Now, we will install PM2, which is a process manager for Node.js application that is running, and configured to listen on the proper IP address and port your specify earlier. And, we will be using [npm](https://www.npmjs.com/) to install our PM2.

## installing PM2 using npm
{% highlight html %}
  sudo npm install pm2 -g
{% endhighlight %}
Once this is installed, then we may use PM2 to start a Node.js as simple as this, also be sured to replaced YOUR_NODE_JS_SERVER_NAME_FILE with the name of the Node.js server file you named.

## start Node.js application with PM2
{% highlight html %}
  sudo pm2 YOUR_NODE_JS_SERVER_NAME_FILE.js
{% endhighlight %}
Then, you should be able to see that PM2 is now running. You may use the following command to check if the Node.js application is running or not via PM2.

## check if Node.js application is running or not with PM2
{% highlight html %}
  sudo pm2 list
{% endhighlight %}
Now, you should be able to see your application is running in that output from the command above.<br>Normally, PM2 will restart automatically if the application crashes or is killed (thanks to PM2), but additonal step need to get the application running again if the web server boot or reboot itself. Hence, be sured to run the following command, so that your PM2 will restart your node.js application say one day you reboot your web server.

## run the command so that one day when you reboot your web server, the PM2 will automatically restart your Node.js application
{% highlight html %}
  sudo pm2 startup ubuntu
{% endhighlight %}
Once this is done, then we may proceed and set up a reverse proxy server so that we can access our Node.js application via the domain name that you have. In order for this to work, you need to have Apache2 installed in your web server and it can be achieved like this,

## installing Apache2 on a web server via a command line
{% highlight html %}
  sudo apt-get update
  sudo apt-get install apache2
{% endhighlight %}
Then, you may use the following command to see if it is running,

## checking if Apache2 is running
{% highlight html %}
  sudo service apache2 status
{% endhighlight %}
It should print something like apache2 is running. If it is not already running, use the following command to start the Apache2,

## start the Apache2 server
{% highlight html %}
  sudo service apache2 start
{% endhighlight %}
Now, we need to go to Apache2 folder and insert the following configuration for the Apache2 server to work with PM2. Do the following command to get to Apache2 folder and modify the following file,

## about to make changes to the config file for Apache2, so that we may access Node.js application via a domain name
{% highlight html %}
  cd /etc/apache2/sites-enabled/
  sudo vi 000-default.conf
{% endhighlight %}

## add the following configuration in the 000-default.conf file
{% highlight apache %}
  <VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName THIS_IS_WHERE_YOU_PUT_YOUR_DOMAIN_NAME_HERE

    ProxyRequests off

    <Proxy *>
      Order deny,allow
      Allow from all
    </Proxy>

    <Location />
      ProxyPass http://PRIVATE_IP_ADDRESS:PORT_THAT_Node_JS_APP_LISTEN/
      ProxyPassReverse http://PRIVATE_IP_ADDRESS:PORT_THAT_Node_JS_APP_LISTEN/
    </Location>
  </VirtualHost>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/19/how-to-set-up-a-node.js-application-for-production-on-ubuntu-14.04/000-default.conf" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now, we need to restart the Apache2 server to take effect.

## restart your Apache2 server
{% highlight html %}
  sudo service apache2 restart
{% endhighlight %}
Assume that your Node.js application is running using PM2, and your application and Apache2 configuration are correct, you should now be able to access your application via the reverse proxy of the web server. Try it out by accessing your web server with the domain name that you have (the one you put in the Apache2 config file).

## Wrapping Up

Hopefully this guide has given you the confidence to do configuration setting with running Node.js application using PM2, and access the application via a reverse proxy of the web server with Apache2. If you would like to learn more and do this in [Nginx way](https://www.nginx.com/), please go [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04). As our tutorial is greatly inspired from it. I am sure that with this guide, you will now be more comfortable with doing the server side configuration with your Node.js application and Apache2 server on Ubuntu 14.04. I hope that this post has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [How to set up Node.js on various kind of server](https://www.digitalocean.com/community/tags/node-js?type=tutorials) by [DigitalOcean](https://www.digitalocean.com/).