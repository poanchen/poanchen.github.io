---
layout: post
title: "How to run a single test or all tests in a class with gradlew?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-10-20
---
Ever wonder how you can run one single test with gradlew? Ever get tried of waiting all the tests to be finished? You have came to the right place. Running tests can be a time consuming tasks. Ability to run one single test or all the tests in a test class is very powerful. And, it will save TONS of time. Here is how you can do it.

Let's assume that this is your testClass,&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/20/How-to-run-a-single-test-or-all-tests-in-a-class-with-gradlew/BlogControllerTests.groovy" target="_blank">source code</a>
<pre>
  <code class="java">
    package io.github.poanchen.projectName.api
    class BlogControllerTests {
      void testCreate_BlogWithoutTitle() {
        // some test code
      }
      void testUpdate_BlogWithInvalidAuthorEmail() {
        // some test code
      }
    }
  </code>
</pre>

To run single test (testCreate_BlogWithoutTitle),&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/20/How-to-run-a-single-test-or-all-tests-in-a-class-with-gradlew/commands.sh" target="_blank">source code</a>
<pre>
  <code class="bash">
    ./gradlew :projectName-api:unitTest --tests io.github.poanchen.projectName.api.BlogControllerTests.testCreate_BlogWithoutTitle
  </code>
</pre>

Note: Depends on how you write your configuration file for gradlew tasks, ":projectName-api:unitTest" might look different for you than the one that I show you here.

To run all the tests in a test class (BlogControllerTests),&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/20/How-to-run-a-single-test-or-all-tests-in-a-class-with-gradlew/commands.sh" target="_blank">source code</a>
<pre>
  <code class="bash">
    ./gradlew :projectName-api:unitTest --tests io.github.poanchen.projectName.api.BlogControllerTests
  </code>
</pre>

Tada. You should now be able to run a single test or all the tests in a test class with gradlew =)

## Wrapping Up

Hopefully this guide has help you to learn how to run tests with gradlew. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues).

### Getting started

* [Can I run a single unit test from the command line for a Grails project?](https://stackoverflow.com/questions/3680272/can-i-run-a-single-unit-test-from-the-command-line-for-a-grails-project)
* [Gradle Goodness: Running a Single Test](http://mrhaki.blogspot.ca/2013/05/gradle-goodness-running-single-test.html)
* [How to run only one test class on gradle](https://stackoverflow.com/questions/22505533/how-to-run-only-one-test-class-on-gradle)
* [run single integration test with gradle](https://stackoverflow.com/questions/18061774/run-single-integration-test-with-gradle)
* [Chapter 6. The Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html)