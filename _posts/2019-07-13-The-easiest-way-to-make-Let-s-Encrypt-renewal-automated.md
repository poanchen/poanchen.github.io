---
layout: post
title: "The easiest way to make Let's Encrypt renewal automated"
author: poanchen
date: 2019-07-13 08:30:30
tags:
- PoAn (Baron) Chen
- Let's Encrypt
- Cron
- Bash
---
Are you using Let's Encrypt as your CA (certificate authority) to issue you a trusted certificate for your own domain? Sometimes forgetting to renew when it expires every 90 days? Keep getting email warning you about the expiry date of your SSL certificate? or find out the hard way by getting email about the complain of your site not being able to access due to the expired SSL certificate? You are in luck, in this short tutorial, I am going to show you guys how to make Let's Encrypt renewal automatic. So that you will never have to worry about it **ever again**.

I assume that you have shell access to your hosting server, so that you can create cron job as well as executing simple Bash script to do the trick.

Renewing Let's Encrypt is actually pretty easy. Thanks for [Let's Encrypt](https://letsencrypt.org/) for making it so easy. You simply need to run this command to do the renewal.
{% highlight bash %}
  cd letsencrypt/; ./letsencrypt-auto renew
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/07/13/The-easiest-way-to-make-Let-s-Encrypt-renewal-automated/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Next, you need to make a simple bash script that include the line above so that cron job can run.

This is the bash script that I have on my server.
{% highlight bash %}
  #!/bin/bash
  now="$(date)"
  printf "Current date and time %s\n" "$now"
  cd letsencrypt/; ./letsencrypt-auto renew
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/07/13/The-easiest-way-to-make-Let-s-Encrypt-renewal-automated/readmeForLetsEncrypt.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

I have also created a file named readmeForLetsEncrypt.log so that I get the run-result in case something went wrong that I can use for debugging purpose.

This is how I configure my cron job.
{% highlight bash %}
  0 0 1 * * cd /path/to/your/folder; ./readmeForLetsEncrypt.sh > readmeForLetsEncrypt.log
{% endhighlight %}

This cron job will run every 1st of the month (you probably don't need to run it once a month but there should be no harm for doing it regularly). Every 3 months before the certificate expired should work. Combining these two, you should have the Let's Encrypt certificate renewal automated. Follow this [guide](https://poanchen.github.io/blog/2017/07/01/how-to-recover-all-your-deleted-cron-jobs) in case you accidentally deleted all your cron jobs. Yes, it happened on me before...

Whoa.

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. Good luck in automating your Let's Encrypt renewal process.

## Wrapping Up

Hopefully you enjoyed this short tutorial. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Let’s Encrypt official website](https://letsencrypt.org/).
* [Renew LetsEncrypt Certificate](https://community.letsencrypt.org/t/renew-letsencrypt-certificate/34677).
