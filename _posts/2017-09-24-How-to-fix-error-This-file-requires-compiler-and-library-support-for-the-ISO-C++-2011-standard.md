---
layout: post
title: "How to fix 'error This file requires compiler and library support for the ISO C++ 2011 standard'?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-09-24
---
Have you ever seen this error message 
<pre>
  <code class="bash">
    error This file requires compiler and library support for the ISO C++ 2011 standard. This support is currently experimental, and must be enabled with the -std=c++11 or -std=gnu++11 compiler options.
  </code>
</pre>
before when you are running
<pre>
  <code class="bash">
    cmake CMakeLists.txt
  </code>
</pre>
command in a C++ project?

You are in luck. In this short tutorial, we are going to show you guys how to solve this issue.

You simply need to add the following line of code into your CMakeLists.txt file and it should works now.

<pre>
  <code class="cmake">
    SET(CMAKE_CXX_FLAGS "-std=c++11 -O3")
  </code>
</pre>

Tada. Your project should build successfully now =)

## Wrapping Up

Hopefully this guide has help you to make the error message goes away. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [get in touch](https://github.com/poanchen).

### Getting started

* [error This file requires compiler and library support for the ISO C++ 2011 standard](http://blog.csdn.net/xbcReal/article/details/63689872) by [xbcReal](http://my.csdn.net/xbcReal).