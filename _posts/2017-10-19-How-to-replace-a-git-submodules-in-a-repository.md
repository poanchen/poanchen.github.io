---
layout: post
title: "How to replace a git submodules in a repository?"
author: poanchen
date: 2017-10-19 08:30:30
tags:
- Git
- GitHub
- PoAn (Baron) Chen
---
Have you ever wanted to replace a git submodules in a repository but don't know where to start? You are in luck. In this tutorial, I am going to show you how I would do it.

It is actually pretty simple as long as you have added the submodules correctly in the first place.

This means that you added your submodules like this,
{% highlight bash %}
  git submodule add https://www.github.com/poanchen/your-submodules-name path/to/your-submodules
{% endhighlight %}

One might think that you could do something like this,
{% highlight bash %}
  git submodule replace https://www.github.com/poanchen/your-new-submodules-name path/to/your-new-submodules
{% endhighlight %}

However, it does not work like that as the list of available git submodule commands does not include replace except these,
{% highlight bash %}
   git submodule [--quiet] add [-b <branch>] [-f|--force] [--name <name>]
                   [--reference <repository>] [--depth <depth>] [--] <repository> [<path>]
   git submodule [--quiet] status [--cached] [--recursive] [--] [<path>...]
   git submodule [--quiet] init [--] [<path>...]
   git submodule [--quiet] deinit [-f|--force] [--] <path>...
   git submodule [--quiet] update [--init] [--remote] [-N|--no-fetch]
                   [-f|--force] [--rebase|--merge] [--reference <repository>]
                   [--depth <depth>] [--recursive] [--] [<path>...]
   git submodule [--quiet] summary [--cached|--files] [(-n|--summary-limit) <n>]
                   [commit] [--] [<path>...]
   git submodule [--quiet] foreach [--recursive] <command>
   git submodule [--quiet] sync [--recursive] [--] [<path>...]
{% endhighlight %}

Then, how would one replace it?

You simply need to modify one file, then you are done.

Take a look at your file .gitmodules in the root of your repository, it will probably look something similar to this,
{% highlight bash %}
  [submodule "path/to/your-submodules"]
      path = path/to/your-submodules
      url = https://www.github.com/poanchen/your-submodules-name
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/19/How-to-replace-a-git-submodules-in-a-repository/.gitmodules" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now, all you need to do is to change the repository url to the one you want. Also, you might need to change the path to your submodules in case of any submodules name changes.

That is it! All that is left with was commiting your changes.

Tada. Your project should now have a new submodules =)

## Wrapping Up

Hopefully this guide has help you to replace a git submodules in a repository. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Git Submodules: Adding, Using, Removing, Updating](https://chrisjean.com/git-submodules-adding-using-removing-and-updating/) by [Chris Jean](https://twitter.com/chrisjean).