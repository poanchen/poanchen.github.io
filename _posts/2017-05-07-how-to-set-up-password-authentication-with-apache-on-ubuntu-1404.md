---
layout: post
title: "How to set up password authentication with Apache on Ubuntu 14.04"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-05-07
---
When setting up a web server, there are often sections of the site that you wish to restrict access to. In order to restrict access to a certain page, a password-authentication will be used. In this guide, we will demonstrate how to password protect assets on an Apache web server running on Ubuntu 14.04. 

First, you need to install the Apache Utilities Package.&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a>

<pre>
  <code class="bash">
    sudo apt-get update
    sudo apt-get install apache2 apache2-utils
  </code>
</pre>

Next, you need to create the password file for the Apache Utilities to use.&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a>

<pre>
  <code class="bash">
    sudo htpasswd -c /etc/apache2/.htpasswd username
  </code>
</pre>
You will be asked to supply and confirm a password for the user you just created.

You may view the username and encrypted password for each user:&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a>

<pre>
  <code class="bash">
    cat /etc/apache2/.htpasswd
  </code>
</pre>

Next, all you need to do is to configure the Apache file for the access control.&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a>

<pre>
  <code class="bash">
    sudo vi /etc/apache2/sites-enabled/000-default.conf
  </code>
</pre>

Add the following code to your Apache config file.&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/000-default-le-ssl.conf" target="_blank">source code</a>

<pre>
  <code class="bash">
    <Directory /path/to/protect>
      Options Indexes FollowSymLinks
      AllowOverride All
      Require all granted
    </Directory>
  </code>
</pre>

Now, you need to restart your Apache web server for it to take effect.&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/05/07/how-to-set-up-password-authentication-with-apache-on-ubuntu-1404/commands.sh" target="_blank">source code</a>

<pre>
  <code class="bash">
    sudo service apache2 restart
  </code>
</pre>

To confirm that your content is protected, try to access your restricted content in a web browser. A login widget should pop up.

## Wrapping Up

Hopefully this guide has helped you to solve your problem of adding simple password authentication using Apache Utilities. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [get in touch](https://github.com/poanchen).

### Getting started

* [How To Set Up Password Authentication with Apache on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-14-04)