---
layout: post
title: "How to create a GitHub pull request with a specific commits?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-11-12
---
Ever wanted to create a pull request in GitHub but only wished to commit changes that is relevant? You are in luck. In this tutorial, I am going to show you how I would do it. Recently, I tried to create a pull request in GitHub and this is what I see.

<img src="/img/2017/11/12/How-to-create-a-GitHub-pull-request-with-a-specific-commits/create pull request with other changes.png" alt="creating a pull request along with other changes">

The problem that I have here is that I only wanted to create a pull request with only the **a51afa6** and **07f39f7**. But, it seems like you cannot really do anything on the GitHub UI to remove it. You know why? Because you are not suppose to. You are suppose to create a branch with the latest changes and cherry-pick the ones that you want. And then compare that branch with the repository that you would like to contribute. The differences will only be the ones that you cherry-picked. Then, you are done. This is how you would create a GitHub pull request with a specific commits. Let me show you in action.

First, you need to create a branch with the latest changes (that is the same with the upstream remote branch)
<pre>
  <code class="bash">
    git fetch --all
    git checkout -b new-branch-name upstream/master
  </code>
</pre>

Note: The above assumes you've set up upstream as a remote. If not, do this first:
<pre>
  <code class="bash">
    git remote add upstream https://github.com/upstream_github_username/upstream_github_repo_name.git
  </code>
</pre>

Next, you would need to cherry-pick the changes that you would like to include in the pull request.
<pre>
  <code class="bash">
    git cherry-pick a51afa6
    git cherry-pick 07f39f7
  </code>
</pre>

Now, all you need to do is to push your changes to your GitHub repository
<pre>
  <code class="bash">
    git push -u origin new-branch-name
  </code>
</pre>

Head over to your GitHub repository, and you should see this.

<img src="/img/2017/11/12/How-to-create-a-GitHub-pull-request-with-a-specific-commits/recently pushed branch.png" alt="Recently pushed branch">

Simply click **Compare & pull request** to create a pull request in the repository that you would like to contribute with only the changes you picked.

Tada. You have done it=)

## Wrapping Up

Hopefully this guide has help you to create a GitHub pull request with a specific commits. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues).

### Getting started

* [How to “pull request” a specific commit](https://stackoverflow.com/questions/34027850/how-to-pull-request-a-specific-commit) by [Joseph Silber](https://stackoverflow.com/users/825568/joseph-silber)