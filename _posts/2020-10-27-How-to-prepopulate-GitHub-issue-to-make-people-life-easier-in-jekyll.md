---
layout: post
title: "How to prepopulate GitHub issue to make people's life easier in Jekyll?"
author: poanchen
date: 2020-10-27 08:30:30
tags:
- GitHub
- Jekyll
---
Have you ever click on a button that take you to GitHub issue that look something like this,

<img src="\img\2020\10\27\How-to-prepopulate-GitHub-issue-to-make-people-life-easier-in-jekyll/githubissue.JPG" alt="githubissue">

As you can see, the information about the blog URL and the GitHub source URL is already prepopulated. User simply need to put down their concerns and that is it. Look nice and all right?

Ever wonder how this works? You are in luck, this article will teach you how it works and how to include it in your Jekyll site.

This is actually pretty simple. The magic is done through the query parameters.

### What is a query parameters?

Query parameters is the bits that appended at the end of an URL. For example,

<img src="\img\2020\10\27\How-to-prepopulate-GitHub-issue-to-make-people-life-easier-in-jekyll/queryparameters.JPG" alt="queryparameters">

From the picture, we can see that the key fields are q and type, while the values are poanchen and repositories. Each set of key-value pair is separated by '&'. In case where the value has special character like '&', the value would need to be encoded. For example, '&' became '%26'.

### How it works?

Natively, GitHub issue supports the following query parameters,

- title
- body

And the format would look like this,

https://github.com/[github_username]/[repository_name]/issues/new?title=[customized_title]&body=[customized_body]

For example, [create an issue](https://github.com/poanchen/poanchen.github.io/issues/new?title=&amp;body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5BHow to enable cross-origin resource sharing on an apache server?%5D(https://poanchen.github.io/blog/2016/11/20/how-to-enable-cross-origin-resource-sharing-on-an-apache-server)%0A*+GitHub+Source+URL%3A+%5Bhow-to-enable-cross-origin-resource-sharing-on-an-apache-server.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/2016-11-20-how-to-enable-cross-origin-resource-sharing-on-an-apache-server.md)).

### How do I add this to my Jekyll blog website?

Say, you want to prepopulate your GitHub issue in such a way,

{% highlight bash %}
Hey {{ page.author }},

I found an issue where [Enter feedback here].

---

Blog title: {{ page.title }}
Site URL: {{ site.url }}{{ page.url }}
Blog Date: {{ page.date }}

{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/10/27/How-to-prepopulate-GitHub-issue-to-make-people-life-easier-in-jekyll/afterrender.txt" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Then, this is how you would do it.

{% highlight bash %}
{% raw %}
Hey {{ page.author }},

I found an issue where [Enter feedback here].

---

Blog title: {{ page.title }}
Site URL: {{ site.url }}{{ page.url }}
Blog Date: {{ page.date }}
{% endraw %}
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/10/27/How-to-prepopulate-GitHub-issue-to-make-people-life-easier-in-jekyll/beforerender.txt" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Once, you are happy with your customized body message. Simply copy and paste it into [this](https://www.bing.com/search?q=url+encode) place to encode it. This should give you a long encoded string. Simply add it as body in the format described above.

For example, [create an issue](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=Hey+poanchen%2C%0A%0AI+found+an+issue+where+%5BEnter+feedback+here%5D%0A%0A---%0A%0ABlog+title%3A+How+to+prepopulate+GitHub+issue+to+make+people%27s+life+easier+in+Jekyll%3F%0ASite+URL%3A+https%3A%2F%2Fpoanchen.github.io%2Fblog%2F2020%2F10%2F27%2FHow-to-prepopulate-GitHub-issue-to-make-people-life-easier-in-jekyll%0ABlog+Date%3A+2020-10-27+01%3A30%3A30+-0700).

which should look something similar to this,

<img src="\img\2020\10\27\How-to-prepopulate-GitHub-issue-to-make-people-life-easier-in-jekyll/githubissuedone.JPG" alt="githubissuedone">

Now, simply include this magic long URL into one of your Jeykll blog so that others can start creating issue on your end effortlessly.

Tada! Now that you have learned how to prepopulate GitHub issue with customized title and body message, start adding!!!

## Wrapping Up

Hopefully this article has help you to prepopulate GitHub issue with customized text and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Pre-populate the github new issue form using the querystring](https://stackoverflow.com/questions/34146618/pre-populate-the-github-new-issue-form-using-the-querystring)
