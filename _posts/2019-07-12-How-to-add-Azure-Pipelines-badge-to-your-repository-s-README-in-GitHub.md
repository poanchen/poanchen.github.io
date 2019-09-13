---
layout: post
title: "How to add Azure Pipelines badge to your repository's README in GitHub?"
author: poanchen
date: 2019-07-12 08:30:30
tags:
- PoAn (Baron) Chen
- Azure
- Azure Pipelines
- Azure DevOps
- GitHub
---
Ever wanted to be cool? not just anyone-kind-cool but developer-kind-cool or better yet Azure-kind-cool. Do you have a project hosting on GitHub and you would like to show the status of your build? How green it has always been? You are in luck. In this short tutorial, I would like to show you guys how to easily add Azure Pipelines badge into your README on GitHub.

Simply head over to your Azure DevOps page (in this case, my page url looks like this https://dev.azure.com/poanchen/poanchen.github.io),
<img src="/img/2019/07/12/How-to-add-Azure-Pipelines-badge-to-your-repository-s-README-in-GitHub/1.JPG" alt="Azure DevOps page">

Next, ensure Pipeline -> Builds tab is opened. 
<img src="/img/2019/07/12/How-to-add-Azure-Pipelines-badge-to-your-repository-s-README-in-GitHub/2.png" alt="Azure DevOps page">

Then, hover over to the top right corner where you can see three vertical dots. When you click on the dots, you should see an option for Status badge.
<img src="/img/2019/07/12/How-to-add-Azure-Pipelines-badge-to-your-repository-s-README-in-GitHub/3.png" alt="Azure DevOps page">

A pop-up should be on the right side where you can see options for image URL or Sample Markdown. There should be a copy button on the side. 
<img src="/img/2019/07/12/How-to-add-Azure-Pipelines-badge-to-your-repository-s-README-in-GitHub/4.JPG" alt="Azure DevOps page">

Click on it and paste it on to your README on GitHub and you are done!!!

It is that simple.

For exmaple, it looks something like this,
[![Build Status](https://dev.azure.com/poanchen/poanchen.github.io/_apis/build/status/poanchen.poanchen.github.io?branchName=will-jekyll-template)](https://dev.azure.com/poanchen/poanchen.github.io/_build/latest?definitionId=1&branchName=will-jekyll-template)

Whoa.

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. Good luck in adding Azure Pipelines badge to your repository on GitHub.

## Wrapping Up

Hopefully you enjoyed this short tutorial. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) by [Microsoft Azure](https://azure.microsoft.com).
* [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) by [Microsoft Azure](https://azure.microsoft.com).
* [Create your first pipeline](https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops&tabs=tfs-2018-2) by [Microsoft Azure](https://azure.microsoft.com).
* [Azure Devops – Add your build status badges to your Wiki](https://gregorsuttie.com/2019/03/20/azure-devops-add-your-build-status-badges-to-your-wiki/) by [Gregor Suttie](https://gregorsuttie.com/author/gregorsuttie/).
