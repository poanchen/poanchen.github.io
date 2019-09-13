---
layout: post
title: "How to check if an image already existed in wp-content/upload directory?"
author: poanchen
date: 2017-04-10 08:30:30
tags:
- Database
- Image
- MySQL
- PHP
- PoAn (Baron) Chen
- Wordpress
- Wp-content/upload
---
If you have never play with WordPress, your first thought might be using file_exists(path) in PHP, which is perfectly fine. However, the way how WordPress store the images is different than one might thought. WordPress comes with a default of organizing the upload images into month- and year- based folders, however, user could unchecked this option by following this [tutorial](http://www.wpbeginner.com/beginners-guide/where-does-wordpress-store-images-on-your-site/) by [WPBeginner](http://www.wpbeginner.com/). Let's assume that you have checked that option. Then, how does WordPress store your upload images? I will give you an example. Say today is April, 10, 2017 and you just uploaded a picture named example.png. In WordPress, it will be stored in /wp-content/upload/2017/04/example.png with three other different sizes for thumbnail, medium and large size. If you were to use file_exists(path) in PHP, you would need to look for it recursively. And, here is how WordPress would really help you to solve this problem quickly. Every time, when an user upload an image through the WordPress back-end system. The image info will be stored in the database. So, to check if an image is already uploaded in wp-content/upload directory, we can simply make a database query.

Here is the function that will try to find the image, if it does exist then it will return the image post id. Otherwise, a null will be return.
{% highlight php %}
  function does_file_exists($filename) {
    global $wpdb;
    
    return intval( $wpdb->get_var( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_value LIKE '%/$filename'" ) );
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/04/10/how-to-check-if-an-image-already-existed-in-wp-content-upload-directory/does-file-exists-sample.php" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

We can now use this function to check if an image exist in the server.
{% highlight php %}
  if ( null == ( $thumb_id = does_file_exists( 'example.png' ) ) ) {
    // hummm....seems like we have never seen this file name before, let's do an upload
  } else {
    // nice...the image already exist!!!
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/04/10/how-to-check-if-an-image-already-existed-in-wp-content-upload-directory/does-file-exists-sample.php" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now, with this function, you may check if an image exist in the server or not.

## Wrapping Up

Hopefully this guide has helped you to solve your problem of checking if an image is already uploaded in the server. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [file_exists()](https://www.w3schools.com/php/func_filesystem_file_exists.asp) by [W3Schools](https://www.w3schools.com/)
* [Using Images](https://codex.wordpress.org/Using_Images) by [WordPress](https://www.wordpress.org)
* [More info on Organize my uploads into month- and year-based folders ](https://codex.wordpress.org/Settings_Media_Screen#Uploading_Files) by [WordPress](https://www.wordpress.org)