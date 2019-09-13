---
layout: post
title: "How to delete a commit completely in GitHub?"
author: poanchen
date: 2018-02-24 08:30:30
tags:
- Git
- GitHub
- GitHub commit
- PoAn (Baron) Chen
---
Ever needed to delete a commit completely in GitHub but tried hundred of thousands of tutorials and still does not work? You are in luck! In this tutorial, I am going to teach you guys how to make a GitHub commit disappear forever. Note: before you carry on with this tutorial, make sure you do not have any local changes or stash all your local changes to be safe.

Follow this tutorial in order to delete one or more commits in GitHub. First, you use the following command to list all or some of your latest GitHub commits.
{% highlight bash %}
  git log -n 3 # 3 means to list the latest 3 commits
{% endhighlight %}

It should look something similar to this,

<img src="/img/2018/02/24/How-to-delete-a-commit-completely-in GitHub/git log top 3 commits.PNG" alt="git log top 3 commits">

Say you want to delete the first latest commit, you would need to type in this command.
{% highlight bash %}
  git rebase -i 77d55bd72c63d43cc83f9c0fea4990c33427c2a6
{% endhighlight %}

As you can see, instead of putting the deleted commit hash, we put the next next one. We will explain why in the next step.

Once the `git bash` command is entered, you should see something similar to this.

<img src="/img/2018/02/24/How-to-delete-a-commit-completely-in GitHub/git bash command.PNG" alt="git bash command">

Simply move your cursor to the line or commit that you would like to delete, and press `d` to delete that line/commit. Just like any other `vim`, Shift + colon with `wq` + enter to leave the text editor. You should see the response like "Successfully rebased and updated refs/heads/master."

Okay, the reason why we did not put the commit hash for the `git rebase` command to the one we wanted to delete is that the text editor or rebase does not allow us to "remove everything, as the rebase will be aborted." (this means that at least one needs to stay)

Now, you can simply commit your changes to GitHub to make your commit goes away by doing this command,
{% highlight bash %}
  git push -f origin master
{% endhighlight %}

As you can see, we need that `-f` option to force the Git to commit the changes, otherwise, it will not allow you to do that.

Tada. You have done it! You should head over to your GitHub repo, and the commit you deleted in that text editor should be gone now.

## Wrapping Up

As this is a fairly short tutorial. Hopefully you have learned how to delete a commit completely in GitHub.

Thanks for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [How To GitHub delete a commit](https://www.youtube.com/watch?v=B5Ss4xNYWDY) by [Saju M](https://www.youtube.com/channel/UC46XhaCEaPAuSrM_LPm7Ruw).