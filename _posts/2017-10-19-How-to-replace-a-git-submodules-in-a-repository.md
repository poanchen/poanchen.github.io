---
layout: post
title: "How to replace a git submodules in a repository?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-10-19
---
Have you ever wanted to replace a git submodules in a repository but don't know where to start? You are in luck. In this tutorial, I am going to show you how I would do it.

It is actually pretty simple as long as you have added the submodules correctly in the first place.

This means that you added your submodules like this,
 
<pre>
  <code class="bash">
    git submodule add https://www.github.com/poanchen/your-submodules-name path/to/your-submodules
  </code>
</pre>

One might think that you could do something like this,

<pre>
  <code class="bash">
    git submodule replace https://www.github.com/poanchen/your-new-submodules-name path/to/your-new-submodules
  </code>
</pre>

However, it does not work like that as the list of available git submodule commands does not include replace except these,

<pre>
  <code class="bash">
     git submodule [--quiet] add [-b &lt;branch>] [-f|--force] [--name &lt;name&gt;]
                     [--reference &lt;repository&gt;] [--depth &lt;depth&gt;] [--] &lt;repository&gt; [&lt;path&gt;]
     git submodule [--quiet] status [--cached] [--recursive] [--] [&lt;path&gt;...]
     git submodule [--quiet] init [--] [&lt;path&gt;...]
     git submodule [--quiet] deinit [-f|--force] [--] &lt;path&gt;...
     git submodule [--quiet] update [--init] [--remote] [-N|--no-fetch]
                     [-f|--force] [--rebase|--merge] [--reference &lt;repository&gt;]
                     [--depth &lt;depth&gt;] [--recursive] [--] [&lt;path&gt;...]
     git submodule [--quiet] summary [--cached|--files] [(-n|--summary-limit) &lt;n&gt;]
                     [commit] [--] [&lt;path&gt;...]
     git submodule [--quiet] foreach [--recursive] &lt;command&gt;
     git submodule [--quiet] sync [--recursive] [--] [&lt;path&gt;...]
  </code>
</pre>

Then, how would one replace it?

You simply need to modify one file, then you are done.

Take a look at your file .gitmodules in the root of your repository, it will probably look something similar to this,&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/10/19/How-to-replace-a-git-submodules-in-a-repository/.gitmodules" target="_blank">source code</a>

<pre>
  <code class="bash">
    [submodule "path/to/your-submodules"]
        path = path/to/your-submodules
        url = https://www.github.com/poanchen/your-submodules-name
  </code>
</pre>

Now, all you need to do is to change the repository url to the one you want. Also, you might need to change the path to your submodules in case of any submodules name changes.

That is it! All that is left with was commiting your changes.

Tada. Your project should now have a new submodules =)

## Wrapping Up

Hopefully this guide has help you to replace a git submodules in a repository. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues).

### Getting started

* [Git Submodules: Adding, Using, Removing, Updating](https://chrisjean.com/git-submodules-adding-using-removing-and-updating/) by [Chris Jean](https://twitter.com/chrisjean).