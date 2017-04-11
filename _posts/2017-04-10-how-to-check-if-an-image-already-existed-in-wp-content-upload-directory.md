---
layout: post
title: "How to check if an image already existed in wp-content/upload directory?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2017-04-10
---
If you have never play with WordPress, your first thought might be using file_exists(path) in PHP, which is perfectly fine. However, the way how WordPress organize their uploaded pictures is by their month of upload time. For example, say today is April, 10, 2017 and you just uploaded a picture named example.png. In WordPress, it will be stored in /wp-content/upload/2017/04/example.png with three other different sizes for thumbnail, medium and large size. If you were to use file_exists(path) in PHP, you would need to look for it recursively. And, here is how WordPress would really help you to solve this problem quickly. Every time, when an user upload an image through the WordPress back-end system. The image info will be stored in the database. So, to check if an image is already uploaded in wp-content/upload directory, we can simply make a database query.

Here is the function that will try to find the image, if it does exist then it will return the image post id. Otherwise, a null will be return.&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/04/10/how-to-check-if-an-image-already-existed-in-wp-content-upload-directory/does-file-exists-sample.php" target="_blank">source code</a>

<pre>
  <code class="php">
    function does_file_exists($filename) {
      global $wpdb;
      
      return intval( $wpdb->get_var( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_value LIKE '%/$filename'" ) );
    }
  </code>
</pre>

We can now use this function to check if an image exist in the server.&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2017/04/10/how-to-check-if-an-image-already-existed-in-wp-content-upload-directory/does-file-exists-sample.php" target="_blank">source code</a>

<pre>
  <code class="php">
    if ( null == ( $thumb_id = does_file_exists( 'example.png' ) ) ) {
      // hummm....seems like we have never seen this file name before, let's do an upload
    } else {
      // nice...the image already exist!!!
    }
  </code>
</pre>

Now, with this function, you may check if an image exist in the server or not.

## Wrapping Up

Hopefully this guide has helped you to solve your problem of checking if an image is already uploaded in the server. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [get in touch](https://github.com/poanchen).

### Getting started

* [file_exists()](https://www.w3schools.com/php/func_filesystem_file_exists.asp)
* [Using Images](https://codex.wordpress.org/Using_Images)