---
layout: post
title: "How to make a Linux-based Azure Function works with file system?"
author: poanchen
date: 2020-11-23 00:30:30
tags:
- Azure
- Azure Function
- Linux
---
Are you having trouble building a Linux-based [Azure Function](https://azure.microsoft.com/services/functions) that needs to work with file system? You are in luck! In this article, I am going to quickly talk about some of the tips working with Linux-based Azure Function, specifically on file system.

As you should know, Azure Function is serverless. This means that [Azure](https://azure.microsoft.com) is going to take care all of your computing resources. Either few or millions. Azure will handle that for you. What you need to do is to provide blocks of code for Azure Function to run. This is extremely useful for resources who may suddenly need huge number of computing power at once. Since Azure will handle the scaling for you, the resource your code run in can be changed during execution, as a result, your blocks of code has no guaranteed that it will start and finish in the same Azure resource, hence, the file you save earlier might not be available in this particular resource. How to deal with this? Here are the tips,

1. It is recommanded to use home folder as temporary storage for linux-based Azure Function. (Remember, this is temporary. In order to have the files persisted, consider to use [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs)).
2. Avoid storing files in Azure Function unless there are no alternatives.
3. You might be using a Windows-based OS as your development environment. Remember to handle the logic so that it works for both environment. (/home/username does not necessary work with Windows-based file system)
4. It can sometimes be difficult to debug the code. It is recommaned to use as many try and catch to properly throw errors so that you can figure out what went wrong.
5. Highly recommaned to use Visual Studio Code to develop and deploy your Azure Function. Instructions [here](https://docs.microsoft.com/azure/azure-functions/functions-develop-vs-code).

Tada! Now that you have seen this, you should be able to go ahead and continue to work on your Azure Function to successfully interact with the file system, start interacting!!!

## Wrapping Up

Hopefully this article has help you to prepopulate GitHub issue with customized text and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Develop Azure Functions by using Visual Studio Code](https://docs.microsoft.com/azure/azure-functions/functions-develop-vs-code) by [Azure](https://azure.microsoft.com)
* [Question Where is the correct way to WRITE temporary data folder locally in azure function? #3626](https://github.com/Azure/azure-functions-host/issues/3626)
