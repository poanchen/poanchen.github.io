---
layout: post
title: "What is a Pure function and how can it be a good practice?"
author: poanchen
date: 2019-09-11 08:30:30
tags:
- Java
- PoAn (Baron) Chen
- React
- Redux
---
## What is a pure function?

Pure function is a function that **its return value is determined by its inputs and nothing else**. Simple as that. Let me give you an example of a pure function in Java,
{% highlight java %}
  public class PureFunction {
    public static int add(int a, int b) {
      return a + b;
    }
    public static void main(String [] args) {
      int c = add(10, 5);
      System.out.println(c); // 15
    }
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/09/11/what-is-a-pure-function-and-how-can-it-be-a-good-practice/PureFunction.java" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

As you can see, by adding number between a and b, we get c. The returned value is solely rely on the arguments and nothing else. How about this one? Is it still a pure function?
{% highlight java %}
  public class ImPureFunctionWithGlobalMutation {
    public static int accessAddFunctionCount = 0;
    public static int add(int a, int b) {
      accessAddFunctionCount++;
      return a + b;
    }
    public static void main(String [] args) {
      int c = add(10, 5);
      System.out.println(c); // 15
      c = add(5, 20);
      System.out.println(c); // 25
    }
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/09/11/what-is-a-pure-function-and-how-can-it-be-a-good-practice/ImPureFunctionWithGlobalMutation.java" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

If you simply look at the returned value, it is still solely based on the inputs and nothing else. One may conclude that it is still a pure function. Let me stop you right there, there are more rules to being a pure function and the given example above isn't one. Let me explain, it looks like whenenver the method is being called, it is incrementing the global variable accessAddFunctionCount. This is clearly violating the side effects rule. Another rule of being a pure function is that **there should be no side effects**. Meaning that no mutation of any non-local variable. How about the next one?
{% highlight java %}
  public class ImPureFunctionWithReferenceArgumentMutation {
    public static void append(ArrayList<Integer> list, Integer a) {
      list.add(a);
    }
    public static void main(String [] args) {
      ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 3, 5, 7, 9));
      System.out.println(list.size()); // 5
      append(list, 11);
      System.out.println(list.size()); // 6
    }
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/09/11/what-is-a-pure-function-and-how-can-it-be-a-good-practice/ImPureFunctionWithReferenceArgumentMutation.java" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

This is also an example of impure function as the function append is mutating the reference arguments which also violates the side effects rule. This one?

{% highlight java %}
  public class ImPureFunctionWithGlobalReturn {
    public static int accessImpureAddFunctionCount = 0;
    public static int impureAdd(int a, int b) {
      accessImpureAddFunctionCount++;
      return a + b;
    }
    public static int getAccessImpureAddFunctionCount() {
      return accessImpureAddFunctionCount;
    }
    public static void main(String [] args) {
      int c = impureAdd(10, 5);
      System.out.println(c); // 15
      c = impureAdd(5, 20);
      System.out.println(c); // 25
      System.out.println(getAccessImpureAddFunctionCount()); // 2
    }
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/09/11/what-is-a-pure-function-and-how-can-it-be-a-good-practice/ImPureFunctionWithGlobalReturn.java" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

The method getAccessImpureAddFunctionCount should be classify as impure function as its return value is not solely based on its input but the global variable. In addition, given the same or no parameters, the returned value might be different as the program advance which violates the rule that we are going to talk about in the next paragraph.

All in all. We can expect the pure function to **return the same results given the same parameters no matter how many times we call them**. (think about the result of Math.max(10, 20)) Let me write down the rules for pure function in numbered list,

1. Its return value is calculated solely from the inputs without any other help.
2. Its return value is consistently the same for the same arguments.
3. Its evaluation has no observable side effects. (No mutating global variable or reference argument)

## How can it be a good practice?

In general, pure function is predictable. It keeps your function simple by not adding complexity/dependency to your function. For function that has side effect, as your application begin to grow, it could be tough for Engineer to maintain. Imagine, you have many global variable along with many impure functions mutating both the global variable and reference argument and your job is to figure out how one's state is being changed. It can sometimes be tricky to figure that out. Why do that when you can totally avoid them in the beginning.

Let me give you a real world example, [React](https://github.com/facebook/react) made by [Facebook](https://github.com/facebook) is a really nice Front-end JavaScript framework for building UI on a web application. As web application started to grow, it can be difficult to track one's state as React is all about changing the state in order to update the UI for user to interact with the application. [Redux](https://github.com/reduxjs/redux) made by [ReduxJS](https://redux.js.org/) has been introduced to better solve this problem and to avoid the state being changed all over the place in order to make all the application's state mutations to be predictable. In turns, should make the web application A LOT easier to maintain.

[Redux](https://github.com/reduxjs/redux) can be described in three fundamental principles: (resources is from [Three Principles](https://redux.js.org/introduction/three-principles) by [ReduxJS](https://redux.js.org/))

> 1. [Single source of truth](https://redux.js.org/introduction/three-principles#single-source-of-truth)
  2. [State is read-only](https://redux.js.org/introduction/three-principles#state-is-read-only)
  3. [Changes are made with **pure functions**](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions)

As you can see, the idea of pure function is being applied during the creation of [Redux](https://github.com/reduxjs/redux) and as one of its [motives](https://redux.js.org/introduction/motivation). And Engineers are encouraged to follow this pattern while they use Redux.

As a result, we can conclude that pure function is a good practice for Software Development because it makes the application easier to maintain in a long run.

Whoa.

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. Good luck making your application maintainable/better using the idea of pure function.

## Wrapping Up

Hopefully you enjoyed this article and will inspire you to write more pure functions in the near future. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [MUTABLE VS IMMUTABLE OBJECT IN JAVASCRIPT](https://poanchen.github.io/blog/2017/06/13/mutable-vs-Immutable-object-in-JavaScript) by [PoAn (Baron) Chen](https://github.com/poanchen).
* [Pure Functions, Laziness, I/O, and Monads](https://www.schoolofhaskell.com/school/starting-with-haskell/basics-of-haskell/3-pure-functions-laziness-io) by [Bartosz Milewski](https://www.schoolofhaskell.com/user/bartosz).
* [Chapter 03: Pure Happiness with Pure Functions](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch03.html) by [MostlyAdequate
](https://github.com/MostlyAdequate).
* [Functional Programming: Pure Functions](https://www.sitepoint.com/functional-programming-pure-functions/) by [Arne Brasseur](https://www.sitepoint.com/author/abrasseur/).
* [Motivation](https://redux.js.org/introduction/motivation) by [ReduxJS](https://redux.js.org/).
* [Algorithms Introduction](https://yangshun.github.io/tech-interview-handbook/algorithms/algorithms-introduction/#general-tips) by [Yangshun Tay](https://github.com/yangshun).
