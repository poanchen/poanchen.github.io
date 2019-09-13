---
layout: post
title: "How to convert a large PDF to HTML?"
author: poanchen
date: 2017-07-25 08:30:30
tags:
- HTML
- Java
- JPDF2HTML5
- Lazy loading
- Optimization
- PDF
- PDF to HTML
- PoAn (Baron) Chen
---
PDF is an awesome format that allows people to view the document easily across different platform while staying consistent (it will look the same). However, viewing a large PDF on a website could be an issue when the size is too large. On top of that, web browser usually needs to download the whole PDF off before the user can actually sees it. It can be very inefficient and waste of time as the PDF gets larger and larger. A 20MB size of PDF with slower internet connection could take a min to download. Nowadays, people are impatient. User would not likes the idea of having to wait for a min or more before viewing a PDF. Here is where the [lazy load](https://en.wikipedia.org/wiki/Lazy_loading) comes into play. Lazy load is where it only trigger to load the contents that the user is requesting/got to. Contents that user never request/got to will not get load. This means two things. One is that it will help us to save some bandwidth for the server-side. Two is user will be able to view the PDF ALMOST immediately. The concept of Lazy load is wildly used on the internet. Because it allows the website to load faster (only load necessary contents) and performance is very important for high traffic website. So now,  back to the topic, how can we leverage the benefit of lazy load with the PDF? We simply turn it into a HTML. It sounds simple. But turning a PDF into a HTML is a lot of work programmically. So today, I am going to show you guys a tool that will do the job. It is called [JPDF2HTML5](https://www.idrsolutions.com/jpdf2html5/). This is one of the simplest tool that I can find online that will convert a large PDF to HTML. Please head over to their site to download the trial version of the tool, <a href="https://www.idrsolutions.com/jpdf2html5/downloads/trial/" target="_blank">https://www.idrsolutions.com/jpdf2html5/downloads/trial/</a>. You should be able to see a JAR file when you downloaded off from their site. The next thing you want to do is to run the following command,
{% highlight bash %}
  java -jar jpdf2html-trial.jar [the PDF you want to convert from] [the destination/path you want it to go] [password for PDF if any]
{% endhighlight %}

For example, this is an example command that will convert a test.pdf and save the HTML to my desktop.
{% highlight bash %}
  java -jar jpdf2html-trial.jar test.pdf C:\Users\myUserName\Desktop
{% endhighlight %}

It is that simple.

## Wrapping Up

Hopefully this guide has help you to convert your large PDF to HTML. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [jpdf2html documentation and support](https://www.idrsolutions.com/jpdf2html5/support).
* [Sample site from IDR Solutions](https://www.idrsolutions.com/jpdf2html5/example-conversions/).
* [I once coverted a 364MB PDF to HTML and here it is](https://s3-ap-northeast-1.amazonaws.com/syd-tw/2016%3F%3F%3F%3F/index.html?page=2) and [here is the hosting website that uses it](https://www.nyf.tw/%E9%9B%BB%E5%AD%90%E5%9E%8B%E9%8C%84/).