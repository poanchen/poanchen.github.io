---
layout: post
title: "Mutable vs Immutable object in JavaScript"
author: poanchen
date: 2017-06-13 08:30:30
tags:
- ES6
- ES6 spread
- Immutable
- JavaScript
- Mutable
- PoAn (Baron) Chen
---
### Definition:<br>
Mutable object - The object is subject to be changed/altered.<br>
Immutable object - The object cannot be changed once created.

In some cases, it can be neat to have immutable object as it often leads to a much simpler application development. Often times you need root cause analysis to figure out what went wrong in your program, having mutable objects passed as parameters between functions/methods can be a real pain in the ass when you are debugging your program. Like myself, I ran into problems where I thought it was passed by value but in reality, it was passed by reference. Sometimes, it can be tricky just to find that out (I did spent lots of time just to find that out). However, if we were to design the application in a way that instead of mutating the original data, we simply always make a new one. So that we will never have to worry about passed by value or passed by reference issues. Having said that, sometimes mutating original object in video game development is somewhat preferable as making copy of the object can be very expensive. Especially, when the game character is spawned for every little change.

Here is an example of mutating your original object in JavaScript,
{% highlight javascript %}
  function mutation(originalArray) {
    // directly mutating/modifying the original array
    originalArray[0] = "new value";
    return originalArray;
  }

  var array = ["some value", "another value"];
  alert("Return from mutation " + mutation(array));
  alert("Array: " + array + " (original array has been altered).");
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/06/13/mutable-vs-Immutable-object-in-JavaScript/mutation-sample.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

In this example, the original array got changed in the function (the object has been mutated).

Here is an example of immutable-object-style coding in JavaScript,
{% highlight javascript %}
  function immutable(originalArray) {
    // Instead of mutating/modifying the original array,
    // we first make a copy of the original array
    // In this way, the original array stay unchanged.
    var newArray = [...originalArray];
    newArray[0] = "new value";
    return newArray;
  }

  var array = ["some value", "another value"];
  alert("Return from immutable " + immutable(array));
  alert("Array: " + array + " (original array stay unchanged).");
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/06/13/mutable-vs-Immutable-object-in-JavaScript/immutable-sample.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

In this example, the original array stay unchanged even though it was used in the function (a new copied/created array has been return with the new changes).

Both approach might be perfectly fine for small simple program. However, as your application scales/grows, you might prefer one way or the other.

## Wrapping Up

Hopefully this guide has taught you something. Thank you for reading! 

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [What is Mutability in Javascript?](https://www.quora.com/What-is-Mutability-in-Javascript/answer/PoAn-Baron-Chen-1) by [PoAn (Baron) Chen](https://www.quora.com/profile/PoAn-Baron-Chen-1)
* [Immutable.js](https://facebook.github.io/immutable-js/) by [Facebook](https://github.com/facebook)
* [battlesnake](https://github.com/poanchen/battlesnake) by [poanchen](https://github.com/poanchen) (project where Immutable.js is extensively used)
* [If immutable objects are good, why do people keep creating mutable objects?](https://softwareengineering.stackexchange.com/questions/151733/if-immutable-objects-are-good-why-do-people-keep-creating-mutable-objects)