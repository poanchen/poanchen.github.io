---
layout: post
title: "How to create a simple REST API in PHP and call them in JavaScript"
author: poanchen
date: 2016-10-16 08:30:30
tags:
- AJAX
- AngularJS
- AngularJS AJAX
- HTML
- JavaScript
- jQuery
- jQuery AJAX
- PHP
- PoAn (Baron) Chen
- RESTful API
- WordPress
- XMLHttpRequest
---
In this post, we are going to talk about how we can create a simple REST API in PHP and call them in JavaScript using various technologies. For example, using **XMLHttpRequest**, **jQuery AJAX** and **AngularJS AJAX**. In order to create a simple REST API that might actually be used in practice, we are going to use WordPress API namely the [username_exists()](https://codex.wordpress.org/Function_Reference/username_exists) function that allow us to check if the username exist in a WordPress database and return true if the username exists or false otherwise. For simplicity, we are going to skip on how to build a WordPress site, and go straight to writing the PHP code for the simple REST API.

## PHP code for simple REST API 
{% highlight php %}
  // Include the wp-load.php so that we can use username_exists() function in WordPress API
  $parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
  require_once( $parse_uri[0] . 'wp-load.php' );

  $data = array();
  $username = sanitize_text_field($_POST['username']);

  if (username_exists($username)) {
    $data["username"] = $username;
    $data["result"] = true;
  }else {
    $data["username"] = $username;
    $data["result"] = false;
  }

  // return all our data to an AJAX call
  echo json_encode($data, JSON_PRETTY_PRINT);
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a><br>
<a href="https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php" target="_blank">Live link</a> hosted on <a href="https://www.jenrenalcare.com" target="_blank">JenRenalCare.com</a>

An example of a response from this simple REST API is as follows, or you may click the link above. (Notice that the request would have to be POST, you may test it out using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en))

{% highlight json %}
  { "username": "poanchen", "result": false }
{% endhighlight %}

Now we have a really simple REST API that allows us to check if the username exist or not. This is especially useful in registration form where we allow the user to know if the username exist or not before they submit the form. This can be done using JavaScript. First example that I would like to show is using **XMLHttpRequest**. Here is a sample code that does the job.<br>

## Code for using XMLHttpRequest
{% highlight html %}
  <input type="text" id="username" name="username" placeholder="username">
  <p id="usernameResult"></p>
  <script type="text/javascript">
    var usernameSelected = document.getElementById('username');
    var usernameWarning = document.getElementById('usernameResult');

    usernameSelected.addEventListener('keyup', function() {
      var request = new XMLHttpRequest();
      var url = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php";
      var params = "username=" + usernameSelected.value;

      request.open('POST', url, true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            var response = JSON.parse(request.response);
            if (response.result) {
              usernameWarning.innerHTML = "The username you typed has been used!";
            }else{
              usernameWarning.innerHTML = "You may freely use this username!";
            }
          }
        }
      };
      request.send(params);
    });
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistXML.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a><br>
<a href="https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistXML.html" target="_blank">Live link</a> hosted on <a href="https://www.jenrenalcare.com" target="_blank">JenRenalCare.com</a><br>
<a href="https://codepen.io/poanchen/pen/MbJNod?editors=101" target="_blank">Try it</a> on <a href="https://codepen.io" target="_blank">CodePen</a>

As the user type, they may immediately see if the username is taken or not. An example of taken username is *test*.

Another example that I would like to show is using **jQuery AJAX**. Here is a sample code that does the job.

## Code for using jQuery AJAX
{% highlight html %}
    <input type="text" id="username" name="username" placeholder="username">
    <p id="usernameResult"></p>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="text/javascript">
      $(document).ready(function () {
        var usernameSelected = $('#username');
        var usernameWarning = $('#usernameResult');

        usernameSelected.keyup(function() {
          var url = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php";
          var formData = {
            'username' : usernameSelected.val()
          };

          $.ajax({
            type : 'POST',
            url : url,
            data : formData,
            dataType : 'JSON',
            encode : true,
            success: function (response, status, xhr) {
              if (response.result) {
                usernameWarning.html("The username you typed has been used!");
              }else{
                usernameWarning.html("You may freely use this username!");
              }
            },
            error: function (xhr, status, error) {
              usernameWarning.html("Something went wrong!");
            }
          });
        });
     });
    </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistJquery.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a><br>
<a href="https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistJquery.html" target="_blank">Live link</a> hosted on <a href="https://www.jenrenalcare.com" target="_blank">JenRenalCare.com</a><br>
<a href="https://codepen.io/poanchen/pen/eBgqwJ?editors=101" target="_blank">Try it</a> on <a href="https://codepen.io" target="_blank">CodePen</a>

As the user type, they may immediately see if the username is taken or not. An example of taken username is *test* as mentioned earlier.

Another example that I would like to show is using **AngularJS AJAX**. Here is a sample code that does the job.

## Code for using AngularJS AJAX
{% highlight html %}
  <div ng-app="usernameApp" ng-controller="usernameController">
    <input type="text" ng-model="username" ng-keyup="usernameKeyup()" placeholder="username">
    <p>{% raw %}{{ return_message }}{% endraw %}</p>
  </div>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
  <script type="text/javascript">
    var usernameApp = angular.module('usernameApp', []);
    
    usernameApp.controller('usernameController', function ($scope, $http) {
      $scope.usernameKeyup = function() {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        var url = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php";
        var formData = "username=" + $scope.username;

        $http.post(url, formData)
        .success(function (response, status, headers, config) {
          if (response.result) {
            $scope.return_message = "The username you typed has been used!";
          }else{
            $scope.return_message = "You may freely use this username!";
          }
        })
        .error(function (data, status, header, config) {
          $scope.return_message = "Something went wrong!";
        });
      };
    });
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistAngular.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a><br>
<a href="https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistAngular.html" target="_blank">Live link</a> hosted on <a href="https://www.jenrenalcare.com" target="_blank">JenRenalCare.com</a><br>
<a href="https://codepen.io/poanchen/pen/Lbxwwj?editors=101" target="_blank">Try it</a> on <a href="https://codepen.io" target="_blank">CodePen</a>

As the user type, they may immediately see if the username is taken or not. An example of taken username is *test* as mentioned earlier.

## Wrapping Up

Hopefully this guide has given you the confidence to do many other things with querying a simple REST API using various technologies like pure JavaScript with XMLHttpRequest or AJAX call via jQuery or AngularJS AJAX. Please go ahead and take a look at the code and add more things to it to make it do more interesting things. I am sure that you will start getting the hang of it while you add those new things. I hope that this post has helped you and good luck to you!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### WordPress APIs
* [WordPress APIs « WordPress Codex](https://codex.wordpress.org/WordPress_APIs) by [WordPress](https://wordpress.org/)

### REST API
* [REST API concepts and examples](https://www.youtube.com/watch?v=7YcW25PHnAA) by [WebConcepts (YouTuber)](https://www.youtube.com/channel/UCV4-mrR8UZh6AsWZbmW5uhQ)
* [Do you know what a REST API is? - SitePoint](https://www.sitepoint.com/developers-rest-api/) by [Sam Deering](https://www.sitepoint.com/author/sdeering/)

### XMLHttpRequest
* [XML DOM - HttpRequest object - W3Schools](http://www.w3schools.com/xml/dom_http.asp) by [W3Schools](http://www.w3schools.com/)

### jQuery AJAX
* [jQuery.ajax() - jQuery API Documentation](http://api.jquery.com/jquery.ajax/) by [jQuery](http://jquery.com/)

### AngularJS AJAX
* [AngularJS Documentation for $http](https://docs.angularjs.org/api/ng/service/$http) by [AngularJS](https://angularjs.org/)