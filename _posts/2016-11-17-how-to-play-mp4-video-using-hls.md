---
layout: post
title: "How to play mp4 video using hls.js?"
author: poanchen
date: 2016-11-17 08:30:30
tags:
- hls.js
- JavaScript
- Mp4 video
- m3u8
- PoAn (Baron) Chen
---
Today, I am going to show you guys how to play mp4 video using [hls.js](https://github.com/dailymotion/hls.js/tree/master). hls.js is a JavaScript library which implements a HTTP Live Streaming client. It relies on HTML5 video and MediaSource Extensions for playback. What is great about hls.js is that it does not need any player, it works directly on top of a standard HTML &lt;video&gt; element. (assuming your browser supported it, check [here](http://caniuse.com/#search=MediaSource)). So, how does hls.js works? It works by breaking the overall stream into a sequence of small HTTP-based file downloads, each download loading one short chunk of an overall stream. As the stream is played, it will continue on requesting more short chunk of the overall stream. And, how does it know what file name it should download? Since, initially, the video will be load from a m3u8 file where it contains the metadata of the video itself. You may think it as a playlist. By simply looking at them, hls.js would know which file should download next while playing. Couple of the advantages of using HLS is that it works faster than [Flash](http://www.adobe.com/ca/products/flashplayer.html), it is supported by [many browser](http://caniuse.com/#search=MediaSource) these days, and it unlocks the potential to stream live in 4k and 60 fps. This is an example of how a m3u8 file would look like.

## sample m3u8 file when the video is named sample.mp4
{% highlight m3u8 %}
  #EXTM3U
  #EXT-X-VERSION:3
  #EXT-X-TARGETDURATION:11
  #EXT-X-MEDIA-SEQUENCE:0
  #EXTINF:10.023222,
  sample0.ts
  #EXTINF:10.000000,
  sample1.ts
  #EXTINF:10.000000,
  sample2.ts
  #EXTINF:10.000000,
  sample3.ts
  #EXTINF:10.000000,
  sample4.ts
  #EXTINF:10.000000,
  sample5.ts
  #EXTINF:10.000000,
  sample6.ts
  #EXTINF:10.000000,
  sample7.ts
  #EXTINF:10.000000,
  sample8.ts
  #EXTINF:7.800000,
  sample9.ts
  #EXT-X-ENDLIST
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/11/17/how-to-play-mp4-video-using-hls/sample.m3u8" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

As you can see, the first chunk of the overall stream is sample0.ts and follow by sample1.ts. In this way, hls.js would know which ts file to be played next. Now, before we dive right into the code. We first need to convert the mp4 video to m3u8 format in order to use the HLS technologies. There are many great tools that can do this. We are going to use the [command line with ffmpeg](https://linux.die.net/man/1/ffmpeg) by [ffmpeg](https://www.ffmpeg.org/). And, I will be using ffmpeg in command line to convert the video from mp4 to m3u8. If you do not have ffmpeg installed, please go to this StackOverflow [thread](http://stackoverflow.com/questions/29125229/how-to-reinstall-ffmpeg-clean-on-ubuntu-14-04) for more instruction on how to install on Ubuntu. Say, I have a mp4 video file named sample.mp4 and I would like to name my m3u8 file as sample.m3u8. Then, I may simply do this command to convert the mp4 video to m3u8 format.

## command on how to convert mp4 video to m3u8 format using ffmpeg
{% highlight bash %}
    ffmpeg -i sample.mp4 -profile:v baseline -level 3.0 -s 840x560 -start_number 0 -hls_list_size 0 -f hls sample.m3u8
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/11/17/how-to-play-mp4-video-using-hls/commands.sh" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Notice that I set the resolution of video to 840x560. Please refer to this [site](https://linux.die.net/man/1/ffmpeg) if you are interested in other size. When you hit the ENTER button, it should begin for conversion and it might look something similar like this.

<img src="/img/2016/11/17/how-to-play-mp4-video-using-hls/Converting to m3u8 from mp4.PNG" alt="Converting to m3u8 from mp4">

Wait for it to be finished (it might take some time depends on the size of your video and machine specs). When it is done, you should see bunch of ts file like sample0.ts, sample1.ts, and sample.m3u8. This means that you have successfully convert your mp4 file to m3u8 format. Now, when we have all these. We can dive right into how to use hls.js to play m3u8 file. We first need to include the hls.js from the CDN.

## Including hls.js library code from jsdelivr CDN
{% highlight html %}
    <script src="//cdn.jsdelivr.net/hls.js/latest/hls.min.js"></script>
{% endhighlight %}
Now, we need to add the &lt;div&gt; element with video as id so that the JavaScript would know where to put the video.

## Adding div element with video as id with controls
{% highlight html %}
  <video id="video" controls></video>
{% endhighlight %}
Then, we need to write the JavaScript code that use the hls.js library to play the video.

## Play m3u8 playlist using hls.js library
{% highlight html %}
  <script type="text/javascript">
    var video = document.getElementById("video");
    var videoSrcHls = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/sample.m3u8";

    if(Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrcHls);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
    }
  </script>
{% endhighlight %}
In the code, we first check if the browser is HLS supported, then we initialize the Hls instance, and load it with the path where you put your m3u8 file. Later, we simply play the video. So that, when user comes to the site, the video will be automatically played. However, what happen when the browser does not support HLS? We should do this as fallback as it is a good practice.

## Added the fallback when user's browser does not support HLS
{% highlight html %}
  <script type="text/javascript">
    var video = document.getElementById("video");
    var videoSrcInHls = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/sample.m3u8";
    var videoSrcInMp4 = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/sample.mp4";

    if(Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrcInHls);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
    }else{
      addSourceToVideo(video, videoSrcInMp4, 'video/mp4');
      video.play();
    }

    function addSourceToVideo(element, src, type) {
      var source = document.createElement('source');
      source.src = src;
      source.type = type;
      element.appendChild(source);
    }
  </script>
{% endhighlight %}
Now, even if the browser happen to not support hls, user may still be able to watch the video. If you would like to see the live demo, please visit [here](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/playM3u8UsingHlsJs.html). If you would like to download the audio files, please visit [here](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/).

## Full code for playM3u8UsingHlsJs.html
{% highlight html %}
  <script src="//cdn.jsdelivr.net/hls.js/latest/hls.min.js"></script>
  <video id="video" controls></video>

  <script type="text/javascript">
    var video = document.getElementById("video");
    var videoSrcInHls = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/sample.m3u8";
    var videoSrcInMp4 = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/sample.mp4";

    if(Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrcInHls);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
    }else{
      addSourceToVideo(video, videoSrcInMp4, 'video/mp4');
      video.play();
    }

    function addSourceToVideo(element, src, type) {
      var source = document.createElement('source');
      source.src = src;
      source.type = type;
      element.appendChild(source);
    }
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/11/17/how-to-play-mp4-video-using-hls/playM3u8UsingHlsJs.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

## Wrapping Up

Hopefully this guide has given you the confidence to play around with hls.js. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [ffmpeg command option reference1](http://ffmpeg.org/ffmpeg-all.html#hls) by [ffmpeg](http://ffmpeg.org/).
* [ffmpeg command option reference2](https://linux.die.net/man/1/ffmpeg).
* [ffmpeg command help](http://stackoverflow.com/questions/30912542/mp4-to-hls-using-ffmpeg) by [budthapa](http://stackoverflow.com/users/2489973/budthapa).
* [HTTP Live Streaming](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).
* [HTTP Live Streaming In Javascript](http://blog.peer5.com/http-live-streaming-in-javascript/) by [Shachar Zohar](http://blog.peer5.com/author/shachar-zohar/).
* [Download Sample audio files](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/11/17/how-to-play-mp4-video-using-hls/).