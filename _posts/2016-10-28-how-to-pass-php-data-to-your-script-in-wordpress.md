---
layout: post
title: "How to pass PHP data to your script in WordPress?"
author: poanchen
date: 2016-10-28 08:30:30
tags:
- HTML
- JavaScript
- PHP
- PoAn (Baron) Chen
- WordPress
---
Today, I am going to show you guys how to pass PHP data like an array to your JavaScript file in WordPress. However, you might be thinking why would I need to pass PHP data to the script. For example, have to ever encounter where you need to use some object or data from PHP in a JavaScript file, but you do not quite want to build a REST API for it as the data isn't used a lot. Or, have to ever need to embedded php code in your JavaScript in WordPress? If the answer is positive, then this article is for you. This article will teach you on how to properly pass PHP data (an array) to your JavaScript file. However, in order to make this interesting, we are going to have a PHP file that contains some ielts conversation audios from [AEHelp](https://www.aehelp.com/). Then, we are going to have another PHP file where learner can see and listen to all the audios. We also gonna have a JavaScript file that will get the audios from the PHP file and generate html for each audio on the fly. Now, we can begin.

## PHP code that contains all the audios
{% highlight php %}
  // Audios are from https://www.aehelp.com
  // if you are interested in learning ielts, please go to their site!
  // they have amazing online course for ielts that will
  // help you improve your score!
  $basePath = 'https://d5s5h26eyrr5q.cloudfront.net/';

  $urlsForAllTheAudios = array(
    array(
      'artist' => 'AEHelp',
      'title'  => 'CD1-T-1: Listening Section 1 (Demo)',
      'mp3'    => $basePath . 'ielts-sample-audio/CD1-Track-01.mp3'
    ),
    array(
      'artist' => 'AEHelp',
      'title'  => 'CD1-T-1: Listening Section 3 (Demo)',
      'mp3'    => $basePath . 'ielts-sample-audio/CD1-Track-03.mp3'
    ),
    array(
      'artist' => 'AEHelp',
      'title'  => 'CD1-T-5: Reading Passage 1 (Demo)',
      'mp3'    => $basePath . 'ielts-sample-audio/CD1-Track-05.mp3'
    ),
    array(
      'artist' => 'AEHelp',
      'title'  => 'CD1-T-7: Reading Passage 3 (Demo)',
      'mp3'    => $basePath . 'ielts-sample-audio/CD1-Track-07.mp3'
    ),
    array(
      'artist' => 'AEHelp',
      'title'  => 'CD1-T-8: Speaking Part 1 (Demo)',
      'mp3'    => $basePath . 'ielts-sample-audio/CD1-Track-08.mp3'
    )
  );
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/28/how-to-pass-php-data-to-your-script-in-wordpress/audioPlaylist.php" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now that we have all the audios information in the @variable named urlsForAllTheAudios. Then, we need to pass the array to JavaScript file in WordPress. Before we do that, we are going to create a PHP file. This file would be accessible to user as you should treat this file as the place where to show the users all the audios. First, we need to include the PHP file that we just created above. So that the @variable urlsForAllTheAudios is accessible in this PHP file.

## PHP code to start with
{% highlight php %}
  // Include this php file, so that we have all the information for the audio that we will be playing later
  require_once("audioPlaylist.php");
{% endhighlight %}
Now that we have the @variable, we need to figure out how to pass that data to the JavaScript file. To do that, we are going to use [wp_localize_script](https://codex.wordpress.org/Function_Reference/wp_localize_script). Through the use of this, it can be used to make any PHP data available to your script that you can normally only get from the server side of WordPress.

## PHP code to use wp_localize_script
{% highlight php %}
  // Enqueue this js file, so that WordPress knows that we will be using this js file in this page
  wp_enqueue_script('audio-demo-player', get_template_directory_uri() . '/createPlaylist.js');

  // now we need to set the array name to be audio_array, so that later in the js file we can call them with that name
  // we also pass in the array that we have in the require_once
  wp_localize_script('audio-demo-player', 'audio_array', $urlsForAllTheAudios);
{% endhighlight %}
This is basically telling the wp_localize_script that we are going to pass this @variable namely urlsForAllTheAudios as audio_array to the JavaScript file named createPlaylist.js. Now, since this is a WordPress site, we need to call the wp_head, so that the js file will be included in this page.

## PHP code to call wp_head
{% highlight php %}
  // this trigger the &lt;head&gt;&lt;/head&gt; section, which will enqueue the js file. Without this, the js file will not be
  // included in this specific page
  wp_head();
{% endhighlight %}
Now that we have enqueue the js file in the WordPress head. Now, we simply need to add a Div element in the PHP file, so that the JavaScript know where to put all the audios. For more information about wp_head, please go to [here](https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head).

## HTML code for placeholder of audios
{% highlight html %}
  <div id="audio"></div>
{% endhighlight %}
With this, the JavaScript can now add audio to that Div. Now it is time to create the js file that generate html for each audio on the fly. Then, we are done!

## JavaScript code to generate html for each audio
{% highlight javascript %}
  document.addEventListener("DOMContentLoaded", function(event) { 
    for (var i = 0; i < audio_array.length; i++) {
      addAudioToHTML(audio_array[i].artist, audio_array[i].title, audio_array[i].mp3, i);
    }

    function addAudioToHTML (artist, title, source, position) {
      var parentDiv = document.createElement("div");
      var firstP = document.createElement("p");
      var artistForP1 = document.createTextNode("Artist: " + artist);

      firstP.appendChild(artistForP1);
      parentDiv.appendChild(firstP);

      var secondP = document.createElement("p");
      var artistForP2 = document.createTextNode("Title: " + title);

      secondP.appendChild(artistForP2);
      parentDiv.appendChild(secondP);

      var audio = new Audio(source);
      audio.controls = true;
      // add warning message for web browser that does not support audio tag
      audio.innerHTML = "Your browser does not support the audio element.";

      parentDiv.appendChild(audio);

      var audioDiv = document.getElementById('audio');
      document.querySelector('#audio').insertBefore(parentDiv, audioDiv.childNodes[position]);
    }
  });
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/28/how-to-pass-php-data-to-your-script-in-wordpress/createPlaylist.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

We need to wrap everythings in the DOMContentLoaded because without it, the javascript code will execute before the DOM which will not work (Including your JavaScript in your head section of HTML might increase the page load, hence, do not do that in production). In the code, we have a for loop that grabs each audio information one by one and call the function addAudioToHTML to append the audio to the Div that we created earlier. Notice that to play the audio, we are using the audio tag which is only available in HTML5. Please check [here](http://www.w3schools.com/html/html5_audio.asp) to see if your browser works with HTML5 audio tag. Here is a screenshot of how it would look like. If you would like to see it in live, please check out this [link](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/28/how-to-pass-php-data-to-your-script-in-wordpress/showPlaylistToUser.php).

<img src="/img/2016/10/28/how-to-pass-php-data-to-your-script-in-wordpress/audioPlaylist.PNG" alt="example on the audio playlist look like in HTML"><br>

## Complete code for PHP that show audio playlist to user 
{% highlight php %}
 <?php

  // Include this php file, so that we have all the information for the audio that we will be playing later
  require_once("audioPlaylist.php");

  // Enqueue this js file, so that WordPress knows that we will be using this js file in this page
  wp_enqueue_script('audio-demo-player', get_template_directory_uri() . '/createPlaylist.js');

  // now we need to set the array name to be audio_array, so that later in the js file we can call them with that name
  // we also pass in the array that we have in the require_once
  wp_localize_script('audio-demo-player', 'audio_array', $urlsForAllTheAudios);

  // this trigger the &lt;head&gt;&lt;/head&gt; section, which will enqueue the js file. Without this, the js file will not be
  // included in this specific page
  wp_head();

  ?>
  
  <div id="audio"></div>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/28/how-to-pass-php-data-to-your-script-in-wordpress/showPlaylistToUser.php" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

## Wrapping Up

Hopefully this guide has given you the confidence to pass PHP data to JavaScript file in WordPress. Hopefully, you can . I hope that this tutorial has helped you and you can use this function in your own code and enjoy its benefits! Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Live site of How to pass PHP data to your script in WordPress?](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/28/how-to-pass-php-data-to-your-script-in-wordpress/showPlaylistToUser.php) by [poanchen](https://github.com/poanchen).
* [How to Pass PHP Data and Strings to JavaScript in WordPress](https://code.tutsplus.com/tutorials/how-to-pass-php-data-and-strings-to-javascript-in-wordpress--wp-34699) by [Benjamin Intal](https://tutsplus.com/authors/benjamin-intal).