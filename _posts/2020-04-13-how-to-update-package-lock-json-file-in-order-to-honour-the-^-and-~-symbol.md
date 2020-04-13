---
layout: post
title: "How to update package-lock.json file in order to honour the ^ and ~ symbol?"
author: poanchen
date: 2020-04-13 08:30:30
tags:
- JavaScript
- Node.js
- npm
- PoAn (Baron) Chen
---
In case you have no idea what ^ and ~ symbol mean in package.json file, please take a look at this blog [post](/blog/2020/04/12/what-is-the-difference-between-~-and-in-package-json) that I did.

> package-lock.json file is useful when multiple people are collaborating on the same project and wanting all the dev members to have similar environment (in this case, similar library versioning across all their packages and its dependencies) as the lock file is simply a snapshot of the dependencies tree graph. Also, useful for CI/CD build pipeline. A popular build pipeline is [Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?view=azure-devops).

There are many reasons why you want to update the package-lock.json file, few reason we can think of is, fix vulnerabilities, update library to keep the project up to update, update library to use the new feature provided by the library. If you came here with those reason in mind, read on, this post will give you steps on how to update the package-lock.json file.

It is actually very easy to update the package-lock.json file in order to honour the ^ and ~ symbol. These are all the steps that you need to follow,

1. Delete your package-lock.json file in the root directory of your project,
2. Simply run `npm install` as in default, it checks if your directory has package-lock.json file otherwise, it will create one for you. (This command will honour the ^ and ~ symbol and update the packages to its latest that is provided by the library author(s)).
3. Run unit tests and any other necessary tests to ensure getting the latest packages does not break your code/project.
4. Commit it and push it so that other dev members can leverage it.

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. Have fun using [npm](https://www.npmjs.com/).

## Wrapping Up

Hopefully you enjoyed this article and will inspire you to explore more useful JavaScript libraries in [npmjs](https://www.npmjs.com/). Let me know if this helps you to clarify. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [npm semver calculator](https://semver.npmjs.com/) by [npm](https://www.npmjs.com/).
* [npm-install](https://docs.npmjs.com/cli/install.html) by [npm](https://www.npmjs.com/).
