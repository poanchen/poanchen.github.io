---
layout: post
title: "How to activate virtual environment in PowerShell?"
author: poanchen
date: 2020-10-23 00:30:30
tags:
- Python
- Virtual Environment
- PowerShell
---
### What is virtual environment? (using Node.js terminology)

For people who are familiar with [Node.js](https://nodejs.org) development environment, virtual environment is somewhat similar. In [Node.js](https://nodejs.org), for your specific project, all the modules you installed is tailored specific to your project. It doesn't affect anything outside of that project unless you [npm](https://www.npmjs.com) install the module with -g tag. We have something similar to Python development environment as well. It is called virtual environment. It is essentially a place where you can [pip](https://pypi.org) install any modules and knowing that anything you do in this environment isn't going to affect anything out there.

### How Python virtual environment can be useful?

This is super useful since people can experinement anything they want inside this isolated area. Once they are satisfy with the modules that are installed, simple run [pip](https://pypi.org) freeze and port its result to a [requiement text file](https://github.com/poanchen/upload-post-stats/blob/master/requirements.txt) so that others can have exactly the same development environment as you do. This is especially helpful in a team setting where group of people working on the same project together. On the other hand, for someone who has multiple Python project on their local computer may need different version of library, this virtual environment also comes in handy for that as well. In the following, we will be showing on how one can activate virtual environment in [PowerShell](https://docs.microsoft.com/powershell/scripting/overview?view=powershell-7).

### How to activate Python virtual environment in PowerShell

Assume that you already have the virtual environment set up and you are wondering how one can enter the virtual environment in [PowerShell](https://docs.microsoft.com/powershell/scripting/overview?view=powershell-7). It is actually pretty simple, simply run the follow command.

{% highlight bash %}
.\.venv\Scripts\Activate
{% endhighlight %}

<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/10/23/how-to-activate-virtual-environment-in-powershell/activateVirtualEnvironment.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Once we are in the virtual environment, it will be indicated on the left side. If we try import a library that we installed only in this virtual environment, we will be able to.
<img src="\img\2020\10\23\how-to-activate-virtual-environment-in-powershell/virtual env.JPG" alt="virtual env">

If we try to import it anywhere else where we don't have the library install. This will happen,
<img src="\img\2020\10\23\how-to-activate-virtual-environment-in-powershell/without virtual env.JPG" alt="without virtual env">

> What Happens in Vegas, Stays in Vegas

Same thing will happen to the library installed in the virtual environment.

Tada! Now that you are in the virtual environment, start coding!!!

## Wrapping Up

Hopefully this article has help you understand what a virtual environment, how it can be useful, and how to activate it and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Why is virtualenv necessary?](https://stackoverflow.com/questions/23948317/why-is-virtualenv-necessary)
* [How to activate virtual environment from Windows 10 command prompt?](https://stackoverflow.com/questions/46896093/how-to-activate-virtual-environment-from-windows-10-command-prompt)
