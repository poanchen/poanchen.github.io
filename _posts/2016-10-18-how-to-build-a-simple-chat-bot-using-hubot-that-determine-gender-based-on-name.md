---
layout: post
title: "How to build a simple chat bot using Hubot that determine gender based on their first name?"
author: poanchen
date: 2016-10-18 08:30:30
tags:
- Chatbot 
- CoffeeScript
- Hubot
- RESTful API
---
Today, I am going to teach you guys how to build a chat bot using Hubot. So, what is a Hubot? Hubot is a chat bot, modeled after GitHub's Campfire bot. He is really cool. He can do a lot of things. For example, sending a message to someone as soon as they enter the chat room, or queries for the status of AWS services, or automate your deployment process, or display app performace status from New Relic, or warn the developer whenever a build failed in git, and many more! He is [extendable with scripts](https://hubot.github.com/docs/#scripts) and can work on [many different chat services](https://hubot.github.com/docs/adapters/). In order to keep this post short and simple, we are not going to cover how to install hubot on your machine. Instead, we are going straight into the implementation on how to build a simple chat bot using Hubot. For people who aren't familar with setting up the environment for hubot, you may check out [this](https://youtu.be/A7fh6RIzGrw?t=5m15s) YouTube video as it gives step by step on how to install hubot from scratch. Okay, that's get it started. The following code is the hello world version of using Hubot.

## Hello world version of Hubot
{% highlight coffeescript %}
  module.exports = (robot) ->
    robot.hear /hi/i, (res) ->
      res.send "Hello there"
{% endhighlight %}
In the chat room, a possible chat would be like this,<br>

<img src="/img/2016/10/18/how-to-build-a-simple-chat-bot-using-hubot-that-determine-gender-based-on-name/hubot-1-ex.PNG" alt="chat example for hello world version"><br>

Pretty simple hul?!<br>
But, I have a question through. Is it possible that Hubot can grab what I just typed like when I said "hi Hubot", can the Hubot get the word "Hubot"? <br>Yes, indeed. You can do that. Just watch!

## Example on how to pass parameter to hubot
{% highlight coffeescript %}
  module.exports = (robot) ->
    robot.hear /hi hubot my name is (.*)/i, (res) ->
      personName = escape(res.match[1])
      res.send "Hello " + personName
{% endhighlight %}
In the chat room, a possible chat would be like this,<br>

<img src="/img/2016/10/18/how-to-build-a-simple-chat-bot-using-hubot-that-determine-gender-based-on-name/hubot-2-ex.PNG" alt="chat example for pass parameter to hubot"><br>

Not bad hul?!<br>
Okay, now before we begin. I would like to introduce an amazing REST API that we will be using is called Genderize.io. A REST API that determines the gender of a first name which will help us to make this tutorial a lot easier. Thanks to [Genderize.io](https://genderize.io/). The REST API that we will be calling is **https://api.genderize.io**. An example on how this would be used.

## Example on GET request to https://api.genderize.io
{% highlight html %}
  GET https://api.genderize.io/?name=peter
{% endhighlight %}

## Example on the response for https://api.genderize.io/?name=peter
{% highlight json %}
  {"name":"peter","gender":"male","probability":"1.00","count":796}
{% endhighlight %}
Now, with this REST API. We can easily build a Hubot that allow the user to ask them if a given first name is a male or a female.

## Example on calling a GET request in Hubot 
{% highlight coffeescript %}
  module.exports = (robot) ->
    robot.hear /check gender for (.*)/i, (res) ->
      personName = escape(res.match[1])
      res.http("https://api.genderize.io/?name=" + personName)
        .get() (error, response, body) ->
        try
          json = JSON.parse(body)
          res.send "Probability of " + "#{json.probability}" + " that " + personName + " is a " + "#{json.gender}.\n"
        catch error
          res.send "something went wrong..."
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/18/how-to-build-a-simple-chat-bot-using-hubot-that-determine-gender-based-on-name/chatbotThatDetermineGenderBasedOnName.coffee" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a><br>

In the chat room, a possible chat would be like this,<br>

<img src="/img/2016/10/18/how-to-build-a-simple-chat-bot-using-hubot-that-determine-gender-based-on-name/hubot-3-ex.PNG" alt="chat example for checking gender for peter"><br>

or<br>

<img src="/img/2016/10/18/how-to-build-a-simple-chat-bot-using-hubot-that-determine-gender-based-on-name/hubot-4-ex.PNG" alt="chat example for checking gender for belle"><br>

Normally, the higher the probability, the greater chance that the response is correct!

## Wrapping Up

Hopefully this guide has given you the confidence to do things with Hubot. If you would like to learn more, please go to their [offical site for more example](https://hubot.github.com/docs/scripting/). I am sure that you will start getting the hang of it while you start playing around with Hubot. I hope that this post has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Getting Started With Hubot](https://hubot.github.com/docs/) by [Hubot](https://hubot.github.com/).
* [More examples on Hubot](https://github.com/hubot-scripts) by [Hubot](https://hubot.github.com/).