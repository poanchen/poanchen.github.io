---
layout: post
title: "How to fix error This file requires compiler and library support for the ISO C++ 2011 standard?"
author: poanchen
date: 2017-09-24 08:30:30
tags:
- C++ 11
- CMake
- ISO C++ 2011 standard
- PoAn (Baron) Chen
---
Have you ever seen this error message 
{% highlight bash %}
  error This file requires compiler and library support for the ISO C++ 2011 standard. This support is currently experimental, and must be enabled with the -std=c++11 or -std=gnu++11 compiler options.
{% endhighlight %}
before when you are running
{% highlight bash %}
  cmake CMakeLists.txt
{% endhighlight %}
command in a C++ project?

You are in luck. In this short tutorial, we are going to show you guys how to solve this issue.

You simply need to add the following line of code into your CMakeLists.txt file and it should works now.
{% highlight cmake %}
  SET(CMAKE_CXX_FLAGS "-std=c++11 -O3")
{% endhighlight %}

Tada. Your project should build successfully now =)

## Wrapping Up

Hopefully this guide has help you to make the error message goes away. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5BHow to fix error This file requires compiler and library support for the ISO C++ 2011 standard?%5D(https://poanchen.github.io/blog/2017/09/24/How-to-fix-error-This-file-requires-compiler-and-library-support-for-the-ISO-C%2B%2B-2011-standard)%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/2017-09-24-How-to-fix-error-This-file-requires-compiler-and-library-support-for-the-ISO-C%2B%2B-2011-standard.md)).

### Getting started

* [error This file requires compiler and library support for the ISO C++ 2011 standard](http://blog.csdn.net/xbcReal/article/details/63689872) by [xbcReal](http://my.csdn.net/xbcReal).
