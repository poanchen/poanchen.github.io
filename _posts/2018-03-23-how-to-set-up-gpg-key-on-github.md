---
layout: post
title: "How to set up GPG key on GitHub?"
author: poanchen
date: 2018-03-23 23:59:14
tags:
- GitHub
- GPG key
- PoAn (Baron) Chen
- Security
- Signing git commit
- Windows 10
---
Setting up GPG keys on GitHub is important because it allows other to know that you made the commit and not someone else. You, the person with your GitHub profile picture along with your GitHub username and name. Here is an example of a signing commit looks like on GitHub.

<img src="/img/2018/03/23/how-to-set-up-gpg-key-in-github/signing commit sample.png" alt="signing commit sample">

Just like the [blog](https://blog.github.com/2016-04-05-gpg-signature-verification/) from GitHub mentioned, unlike any other unsigned commit. The signed commit will come with the green word *Verified* with it (a badge) to indicate that the commit was indeed came from the user. In example,

<img src="/img/2018/03/23/how-to-set-up-gpg-key-in-github/commits sample.png" alt="commits sample">

In this tutorial, I am going to guide you through into setting up the GPG key on your local machine for GitHub.

**Note**: In case you do not have GPG command line tool installed on your local machine, please head over to [here](https://www.gnupg.org/download/) to download its latest binary releases. (I downloaded the *Gpg4win* from the site since I am currently using *Windows 10*) Once it is downloaded and installed, make sure to set up your GPG command line tool PATH in your environment variables. So that, when you type *gpg* on command line or Git Bash, it will work!

The first step is to check if there exist any GPG keys on your machine, if not, [skip](#generate-a-new-gpg-keys) these steps, and get straight to generating a new GPG keys.

## Check if there exist any GPG keys on your machine
Run the following command to check all existing public and private GPG key in your machine.
{% highlight bash %}
  gpg --list-secret-keys --keyid-format LONG
{% endhighlight %}

If there were no output or you didn't wish to use any of these available key for signing the commit, carry on to the tutorial.

If there were existing GPG key pair and you want to use them as you sign your commit, then simply [skip](#add-gpg-key-to-your-github-account) generate a new GPG keys and get straight to adding GPG key to your GitHub account.

## Generate a new GPG keys
Follow the GitHub official blog about [generating a new GPG key](https://help.github.com/articles/generating-a-new-gpg-key).

## Add GPG key to your GitHub account
Follow the GitHub official blog about [adding a new GPG key to your GitHub account](https://help.github.com/articles/adding-a-new-gpg-key-to-your-github-account).

## Git client configuration for the GPG key
In order to use the GPG key that you just created, you need to let the Git client know that from now on, you will be using this GPG key to sign your commit on GitHub. Here is what you needed to do,
{% highlight bash %}
  git config --global user.signingKey {REPLACE_THIS_WITH_YOUR_KEY_ID}
  git config --global commit.gpgSign true
{% endhighlight %}
In case you do not know what your key id is, run the following command to find out, *gpg --list-public-keys*

Now, you should be able to git commit with -S and the verified badge should now appear on your GitHub commit!

## Wrapping Up

Hopefully you enjoyed this short tutorial. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Checking for existing GPG keys](https://help.github.com/articles/checking-for-existing-gpg-keys) by [GitHub](https://github.com)
* [Generating a new GPG key](https://help.github.com/articles/generating-a-new-gpg-key) by [GitHub](https://github.com)
* [Is there a way to “autosign” commits in Git with a GPG key?](https://stackoverflow.com/questions/10161198/is-there-a-way-to-autosign-commits-in-git-with-a-gpg-key)
* [Telling git about your GPG key](https://help.github.com/articles/telling-git-about-your-gpg-key/#platform-windows) by [GitHub](https://github.com)
* [Github : Signing commits using GPG (Ubuntu/Mac)](https://gist.github.com/ankurk91/c4f0e23d76ef868b139f3c28bde057fc) by [Ankur Kumar](https://github.com/ankurk91)