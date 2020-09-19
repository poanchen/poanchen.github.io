---
layout: post
title: "What to do when git branch has diverged?"
author: poanchen
date: 2020-09-19 08:30:30
tags:
- Git
- GitHub
---
Ever try to commit and push your changes to master branch and see this annoying message stated that your branch and 'origin/master' branch have diverged,

<img src="\img\2020\09\19\what-to-do-when-git-branch-has-diverged/branch diverged.JPG" alt="branch diverged">

You are in luck, in this tutorial, we are going to talk about how this happen, how to fix it and how to avoid this from happening in the future. Before we talk about how to fix it, we should talk about how this can happen to you. I have drawn the diagram to show you what happened, here is the picture,

<img src="\img\2020\09\19\what-to-do-when-git-branch-has-diverged/branch diverged diagram.JPG" alt="branch diverged diagram">

As you can see, up until the changes B, your branch and 'origin/master' is exactly the same. Starting from changes B, your branch and 'origin/master' started to diverged. Your branch started with the changes of E, F and G while the 'origin/master' follows the changes of C and D which completely explains the message where it stated "Your branch and 'origin/master' have diverged, and have 3 and 2 different commits each, respectively." Here, the 3 represent the E, F, and G while the 2  represent the C and D.

Note: This typically happens when you are trying to merge your changes to 'origin/master' and someone else in your team pushed some other changes after you sync with 'origin/master' and before you merge your changes.

Now that we understand the "what", let's talk about the "how" here.

There are two ways to fix this problem, one is [rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase), another one is [merge](https://www.atlassian.com/git/tutorials/using-branches/git-merge). They have their advantages and disadvantages and it really depends on your preferences.

{% highlight python %}
git rebase origin/master
{% endhighlight %}

Let's explain it in diagram, when one do rebase, this is what will happen,

<img src="\img\2020\09\19\what-to-do-when-git-branch-has-diverged/rebase branch.JPG" alt="rebase branch">

Your branch used to be based off changes B, it is now based off changes D. Now, you should have no problem merging your code from your branch to 'origin/master'.

Advantages: More clean/linear git history that would help people to find what caused the regression quicker and easier if any.<br>
Disadvantages: Merge conflict may become more frequent with possibilities of losing your commit history if done wrong.

{% highlight python %}
git merge origin/master
{% endhighlight %}

When one do merge, this is what will happen,

<img src="\img\2020\09\19\what-to-do-when-git-branch-has-diverged/merge branch.JPG" alt="merge branch">

As you can see, although your branch and 'origin/master' have diverged, it eventually merged together at the end.

Advantages: Easier and quicker to resolve conflicts.<br>
Disadvantages: Non-linear git history.

Now, to fix it, simply pick the one you think that makes more sense in your case and execute the command and follow the instruction given by the git.

I personally like rebase more since it gives more linear git history which would be really helpful when there is a need to look at the git history in the future. However, it might be a pain to resolve conflict while rebasing.

**Rule of thumb: Frequently rebase your feature branch to make process of resolving conflict easier in the future.**

Tada! You should have now understand why the diverge would happen, the differences between rebase and merge, how to fix it, and how to make your life easier in the future.

## Wrapping Up

Hopefully this article will help you to resolve diverged branches and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [git rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase) by [Atlassian](https://atlassian.com).
* [git merge](https://www.atlassian.com/git/tutorials/using-branches/git-merge) by [Atlassian](https://atlassian.com).
* [What's the difference between 'git merge' and 'git rebase'?](https://stackoverflow.com/questions/16666089/whats-the-difference-between-git-merge-and-git-rebase) by [VonC](https://stackoverflow.com/users/6309/vonc).
* [master branch and 'origin/master' have diverged, how to 'undiverge' branches'?](https://stackoverflow.com/questions/2452226/master-branch-and-origin-master-have-diverged-how-to-undiverge-branches) by [mvp](https://stackoverflow.com/users/1734130/mvp).
