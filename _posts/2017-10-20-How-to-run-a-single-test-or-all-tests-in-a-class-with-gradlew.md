---
layout: post
title: "How to run a single test or all tests in a class with gradlew?"
author: poanchen
date: 2017-10-20 08:30:30
tags:
- Gradle
- gradlew
- Groovy
- Integration test
- PoAn (Baron) Chen
- Unit test
---
Ever wonder how you can run one single test with gradlew? Ever get tried of waiting all the tests to be finished? You have came to the right place. Running tests can be a time consuming tasks. Ability to run one single test or all the tests in a test class is very powerful. And, it will save TONS of time. Here is how you can do it.

Let's assume that this is your testClass,
{% highlight groovy %}
  package io.github.poanchen.projectName.api
  class BlogControllerTests {
    void testCreate_BlogWithoutTitle() {
      // some test code
    }
    void testUpdate_BlogWithInvalidAuthorEmail() {
      // some test code
    }
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/20/How-to-run-a-single-test-or-all-tests-in-a-class-with-gradlew/BlogControllerTests.groovy" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

To run single test (testCreate_BlogWithoutTitle),
{% highlight bash %}
  ./gradlew :projectName-api:unitTest --tests io.github.poanchen.projectName.api.BlogControllerTests.testCreate_BlogWithoutTitle
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/20/How-to-run-a-single-test-or-all-tests-in-a-class-with-gradlew/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Note: Depends on how you write your configuration file for gradlew tasks, ":projectName-api:unitTest" might look different for you than the one that I show you here.

To run all the tests in a test class (BlogControllerTests),
{% highlight html %}
  ./gradlew :projectName-api:unitTest --tests io.github.poanchen.projectName.api.BlogControllerTests
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/20/How-to-run-a-single-test-or-all-tests-in-a-class-with-gradlew/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Tada. You should now be able to run a single test or all the tests in a test class with gradlew =)

## Wrapping Up

Hopefully this guide has help you to learn how to run tests with gradlew. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Can I run a single unit test from the command line for a Grails project?](https://stackoverflow.com/questions/3680272/can-i-run-a-single-unit-test-from-the-command-line-for-a-grails-project)
* [Gradle Goodness: Running a Single Test](http://mrhaki.blogspot.ca/2013/05/gradle-goodness-running-single-test.html)
* [How to run only one test class on gradle](https://stackoverflow.com/questions/22505533/how-to-run-only-one-test-class-on-gradle)
* [run single integration test with gradle](https://stackoverflow.com/questions/18061774/run-single-integration-test-with-gradle)
* [Chapter 6. The Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html)