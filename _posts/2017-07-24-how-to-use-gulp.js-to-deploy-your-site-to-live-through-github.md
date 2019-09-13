---
layout: post
title: "How to use Gulp.js to deploy your site to live through Github?"
author: poanchen
date: 2017-07-24 08:30:30
tags:
- Deployment
- GitHub
- Gulp.js
- gulp-gh-pages
- PoAn (Baron) Chen
---
Today, I am going to show you guys how to use [Gulp.js](http://gulpjs.com/) to deploy your site to live through [Github](https://www.github.com). Before we start, I would like to clarify couple of things. In this tutorial, we are making the following assumptions, (it works best when you set up your site the same way we did)

* You are using Github to host your website (that means your website's code is also on Github).
* You have two branch in your repo, one named dev and another named master. (the idea of having two branch is that all your development code will be push to the dev branch, and once everything looks good, then you simply push it to master branch, which will get roll out to production automatically, thanks to Github)
* Your production-ready code will be saved in the directory named prod.
* Assuming you have [Gulp.js](http://gulpjs.com/) and [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages) installed.

Okay, let's get it started. Here is an example of what your production code might looks like,

index.html (it should be stored in a directory called prod)
{% highlight html %}
  <!DOCTYPE html>
  <html>
    <head>
      <title>Page Title</title>
    </head>
    <body>
      <h1>Hello world</h1>
    </body>
  </html>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/24/how-to-use-gulp.js-to-deploy-your-site-to-live-through-github/prod/index.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Next, we need to create the gulpfile.js to describe what our gulp task would be,

gulpfile.js
{% highlight javascript %}
  var gulp   = require('gulp');
  var deploy = require('gulp-gh-pages');

  gulp.task('deploy', function () {
    return gulp.src("./prod/**/*")
      .pipe(deploy({ 
        remoteUrl: "https://github.com/your_github_username_here/your_github_username_here.github.io.git",
        branch: "master"
      }))
  });
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/07/24/how-to-use-gulp.js-to-deploy-your-site-to-live-through-github/gulpfile.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

In this way, you can deploy your site to live through the following command whenever you are ready,
{% highlight bash %}
  gulp deploy
{% endhighlight %}

During the development, you should always push your code to dev branch in order to keep the production/master branch clean. (you should never directly push it to master branch except through the gulp deploy command)
{% highlight bash %}
  git add .
  git commit -m "your commit message"
  git push origin dev
{% endhighlight %}

Now, your file structure should looks something like this,
{% highlight bash %}
  | gulpfile.js
  |-> prod
  |->-> index.html
{% endhighlight %}

Note: For simplicity, I do not minimized my html code. However, in the real world, I would normally create a directory called src and put all my development code here. And then I will create bunch of gulp task that will minimized all my html/js/css files and port it to prod directory. Then, I will have my .gitignore to ignore my prod directory. So that I do not accidentally commit my production-ready/minimized code to my dev branch. In this way, when I deploy my site through 'gulp deploy', all my code will be minimized in production. And, all my development code will stay readable/not minimized. This is consider best practice in terms of how you would organize your project/web app. Here is an example of what the [gulpfile.js](https://github.com/poanchen/pwa-to-do-list/blob/dev/gulpfile.js) would look like in case you need an example.

## Wrapping Up

Hopefully this guide has teach you how to use Gulp.js to deploy your site to live through Github. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Gulp.js Github](https://github.com/gulpjs/gulp).
* [Github Pages](https://pages.github.com/).
* [gulp-gh-pages Github](https://github.com/shinnn/gulp-gh-pages).
* [Example of a repo that uses the best practice that I mentioned earlier](https://github.com/poanchen/pwa-to-do-list) by [PoAn (Baron) Chen](https://www.github.com/poanchen).
* [Example of a site that uses Gulp.js to deploy](https://github.com/poanchen/poanchen.github.io) by [PoAn (Baron) Chen](https://www.github.com/poanchen).