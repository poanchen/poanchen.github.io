---
layout: post
title: "How to setup pretty url in WordPress through LAMP stack?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-04-02
---
If you have ever play with WordPress, you would know that WordPress is a pretty powerful CMS that allows you to do a lot of cool things. For example, in the setting, you may choose what kind of permalink you want for your url. It can be something like this "https://www.example.com/?p=123" or it can be something like this "https://www.example.com/sample-post/". For many good reasons, the second one is more preferable to user. Reason like it looks more pretty and it is good for SEO. However, sometimes you may run into issue that you tried to set it to Post name (the second one that we just discussed) and when you head over to the page, you receive "Not Found" error message on your browser. This is because you may have not setup correctly in the [Apache](https://httpd.apache.org/). Today, I am going to walk you through it and help you to fix that "Not Found" error message.

Firstable, assuming that you have access to your web server and logged in as administrator. Otherwise, you might not be able to do the following tutorial. Let's do it!

For WordPress to use pretty url in permalink, you need to enable mod_rewrite. To do that, first you need to run this command to enable it.

<pre>
  <code class="bash">
    sudo a2enmod rewrite
  </code>
</pre>

Next, you need to make sure your Apache conf file allow you to rewrite as well. Do these commands.

<pre>
  <code class="bash">
    cd /etc/apache2/sites-enabled
    sudo vi [name of your conf file].conf
  </code>
</pre>

Then, vi will open up the conf file and you may view your setting for your web server. Try adding the following line to your conf file.

<pre>
  <code class="bash">
    <Directory /var/www>
      AllowOverride All
    </Directory>
  </code>
</pre>

Next, in order for Apache to take effect, you need to restart your Apache server.

<pre>
  <code class="bash">
    sudo service apache2 restart
  </code>
</pre>

Now, when you head over to your WordPress site. You should be able to properly see your site without the "Not Found" error message.

## Wrapping Up

Hopefully this guide has helped you to fix the "Not Found" error message and finally, the visitor may see your site with a pretty url. Yaa!! I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [get in touch](https://github.com/poanchen).

### Getting started

* [Using Permalinks](https://codex.wordpress.org/Using_Permalinks)
* [WordPress](https://wordpress.org/)