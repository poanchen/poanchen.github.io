---
layout: post
title: "Connecting to UVic wifi with Ubuntu 16.04 LTS"
author: poanchen
date: 2017-11-08 08:30:30
tags:
- PoAn (Baron) Chen
- Ubuntu 16.04
- Uvic
- Wifi
---
Connecting to UVic wifi with Linux for the first time can be a pain in the ass. I literally spent hours trying to figure out how to connect my Linux based laptop to UVic wifi. I thought that it would be helpful to share how I did it that will probably save you some struggles. Here is the set up that I did that worked. Please let me know in the comment if this does not work for you. I will try to reply and help you out.

First step, connect to the Uvic network and not the UvicStart. A Wi-Fi Network Authentication Required dialog should come up. Change the **Authentication** method from Tunneled TLS to **Protected EAP (PEAP)**. 

For those who are using **Debian 9**, head over to [here](https://www.uvic.ca/dl/public/fr.php?filename=GlobalSignRoot.cer) first to download the cert file from uvic website and save it in the directory of **/etc/ssl/certs**.

Next, simply browse your **CA certificate** in the path **/etc/ssl/certs** to select **thawte_Primary_Root_CA.pem** for **Ubuntu 16.04 LTS** user and **GlobalSignRoot.cer** for **Debian 9** user.

Later, put in your UVic Netlink ID as your Username (Make sure to put **@uvic.ca** as well) and UVic Netlink ID password as your Password. All together, it should look something similar to this.

<img src="/img/2017/11/08/Connecting to UVic wifi with Ubuntu 16.04 LTS/connect to uvic wifi set up screenshot.png" alt="Set up to connect to uvic wifi">

Simply click the connect button and it should work!

Tada. You should now be able to connect to UVic wifi using your Linux laptop =)

Note: you should only need to configure this once unless you delete or forget the UVic network setting.

## Wrapping Up

Hopefully this guide has help you to set up the wifi connection at UVic with Ubuntu. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Connecting to UVic wireless with Ubuntu 10.04](http://hcmc.uvic.ca/blogs/index.php?blog=11&p=7078)