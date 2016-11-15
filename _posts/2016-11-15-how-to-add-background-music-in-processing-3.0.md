---
layout: post
title: "How to add background music in Processing 3.0?"
author: Poan (Baron) Chen
author_url: https://github.com/poanchen
date: 2016-11-15
---
Today, I am going to show you guys how to add background music in [Processing 3.0](https://processing.org/). Processing is a flexible software sketchbook and a language for learning how to code within the context of the visual arts. One of the aims of Processing is to allow non-programmers to start computer programming aided by visual feedback. As Processing is a fairly simple programming language that uses simplified syntax and a graphics user interface, some of the visual art school in Canada actually uses Processing to teach their students (who has no prior knowledge in programming) how to make things with code in an arts-oriented approach. I have to say that Processing is a very powerful tool and you can do a lot of really interesting things with it. Some of the amazing works by people around the world can be seen [here](https://processing.org/exhibition/). Pretty much anything you can think of visually, you can do it in Processing. The sky's the limit. If you haven't already, install [Processing 3.0](https://processing.org/download/) before we continue on. Now, we can begin.

## Processing code to start with

<pre>
  <code class="java">
    //runs once when the app first starts
    void setup() {
    }

    //runs all the time, this is the main app loop
    void draw() {
    }
  </code>
</pre>
If you are new to Processing, there are two functions that are very important in Processing. One is setup and another one is draw. Think of setup as an one-time pad. It will only be called/runned once unless you restart the application. Draw is a function that will be consistently called/runned during the application and will continually to be running unless you terminate your program. Think of it as a while loop that does not break. Now, in order to add audio in Processing 3.0. We need to use a library called Sound by [The Processing Foundation](https://processingfoundation.org/). Here are the steps to get it up and running.<br><br>
First, you need to have your Processing software open,<br>
Second, go to Sketch->Import Library->Add Library. Then, a Contribution Manager window should pop up.<br>

<img src="/img/2016/11/15/how-to-add-background-music-in-processing-3.0/how to add library.png" alt="How to add library">

Third, in the filter input box, type in "Sound" and select install and wait for a few moments.

<img src="/img/2016/11/15/how-to-add-background-music-in-processing-3.0/install the library.png" alt="Install the library">

And then, once it is installed completely. Close the window and lets add few lines of code to see if it is actually working.

## Processing code to see if the Sound is actually working

<pre>
  <code class="java">
    //right above the setup function, add the following code
    import processing.sound.*;
    
    SoundFile file;
    //replace the sample.mp3 with your audio file name here
    String audioName = "sample.mp3";
    String path;
  </code>
</pre>
Just like any other programming language, you need to import the library before you can use it. Here, for simplicity, add your audio/mp3 file within the same folder as your sketch_XXXXXXXX.pde file.

## Processing code to add the audio

<pre>
  <code class="java">
    //runs once when the app first starts
    void setup() {
      // for more info about sketchPath, go to https://processing.org/discourse/beta/num_1229443269.html
      path = sketchPath(audioName);
      file = new SoundFile(this, path);
      file.play();
    }
  </code>
</pre>
Now, when you run the application, you should hear your audio playing in the background. Pretty simple hul?! In the future tutorial, I will be teaching you guys how to draw simple things with Processing. Here is the full code to the solution.

## Full Processing code to play audio in the background

<pre>
  <code class="java">
    import processing.sound.*;
    
    SoundFile file;
    //put your audio file name here
    String audioName = "sample.mp3";
    String path;

    //runs once when the app first starts
    void setup() {
      // for more info about sketchPath, go to https://processing.org/discourse/beta/num_1229443269.html
      path = sketchPath(audioName);
      file = new SoundFile(this, path);
      file.play();
    }

    //runs all the time, this is the main app loop
    void draw() {
    }
  </code>
</pre>

## Wrapping Up

Hopefully this guide has given you the confidence to start building really simple things with Processing. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [get in touch](https://github.com/poanchen).

### Getting started

* [Processing documentation](https://processing.org/reference/) by [Processing](https://processing.org/).

### Example of Processing work

* [PPAP game developed with Processing](https://github.com/poanchen/try-to-avoid-PPAP-game) by [poanchen](https://github.com/poanchen) and Mandy.
