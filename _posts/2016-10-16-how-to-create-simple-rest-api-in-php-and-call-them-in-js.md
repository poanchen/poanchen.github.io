---
layout: post
title: "How to create a simple REST API in PHP and call them in JavaScript"
author: Poan (Baron) Chen
author_url: https://github.com/poanchen
date: 2016-10-16
---

In this post, we are going to talk about how we can create a simple REST API in PHP and call them in JavaScript using various technologies. For example, using **XMLHttpRequest**, **jQuery AJAX** and **AngularJS AJAX**. In order to create a simple REST API that might actually be used in practice, we are going to use WordPress API namely the [username_exists()](https://codex.wordpress.org/Function_Reference/username_exists) function that allow us to check if the username exist in a WordPress database and return true if the username exists or false otherwise. For simplicity, we are going to skip on how to build a WordPress site, and go straight to writing the PHP code for the simple REST API.
<br>

## PHP code for simple REST API &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php" target="_blank">source code</a>

<pre>
  <code class="php">
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
  </code>
</pre>
Live link are [here](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php).<br>
An example of a response from this simple REST API is as follows, or you may click the link above. (Notice that the request would have to be POST, you may test it out using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).)
<pre>
  <code class="json">
    { "username": "poanchen", "result": false }
  </code>
</pre>
In this way, now we have a really simple REST API that allow us to check if the username exist or not. This is especially useful in registration form where we allow the user to know if the username exist or not before they submit the form. This can be done using JavaScript. First example that I would like to show is using **XMLHttpRequest**. Here is a sample code that does the job.<br>

## Code for using XMLHttpRequest &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistXML.html" target="_blank">source code</a>

<pre>
  <code class="html">
    &lt;input type="text" id="username" name="username" placeholder="username"&gt;
    &lt;p id="usernameResult"&gt;&lt;/p&gt;

    &lt;script type="text/javascript"&gt;
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
    &lt;/script&gt;
  </code>
</pre>

<a href="https://codepen.io/poanchen/pen/MbJNod?editors=101" target="_blank">
  <img src="https://blog.codepen.io/wp-content/uploads/2012/06/TryItOn-CodePen.svg" width="150"/>
</a>

Live link are [here](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistXML.html).<br>
As the user type, they may immediately see if the username is taken or not. An example of taken username is 'test'!<br>
Another example that I would like to show is using **jQuery AJAX**. Here is a sample code that does the job.<br>

## Code for using jQuery AJAX &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistJquery.html" target="_blank">source code</a>

<pre>
  <code class="html">
    &lt;input type="text" id="username" name="username" placeholder="username"&gt;
    &lt;p id="usernameResult"&gt;&lt;/p&gt;

    &lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript"&gt;
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
    &lt;/script&gt;
  </code>
</pre>

<a href="https://codepen.io/poanchen/pen/eBgqwJ?editors=101" target="_blank">
  <img src="https://blog.codepen.io/wp-content/uploads/2012/06/TryItOn-CodePen.svg" width="150"/>
</a>

Live link are [here](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistJquery.html).<br>
As the user type, they may immediately see if the username is taken or not. An example of taken username is ‘test’!<br>
Another example that I would like to show is using **AngularJS AJAX**. Here is a sample code that does the job.<br>

## Code for using AngularJS AJAX &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistAngular.html" target="_blank">source code</a>

<pre>
  <code class="html">
    &lt;div ng-app="usernameApp" ng-controller="usernameController"&gt;
      &lt;input type="text" ng-model="username" ng-keyup="usernameKeyup()" placeholder="username"&gt;
      &lt;p&gt;&#123;&#123; return_message &#125;&#125;&lt;/p&gt;
    &lt;/div&gt;

    &lt;script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript"&gt;
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
    &lt;/script&gt;    
  </code>
</pre>

<a href="https://codepen.io/poanchen/pen/Lbxwwj?editors=101" target="_blank">
  <img src="https://blog.codepen.io/wp-content/uploads/2012/06/TryItOn-CodePen.svg" width="150"/>
</a>

Live link are [here](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistAngular.html).<br>
As the user type, they may immediately see if the username is taken or not. An example of taken username is ‘test’!<br>

## Wrapping Up

Hopefully this guide has given you the confidence to do many other things with querying a simple REST API using various technologies like pure JavaScript with XMLHttpRequest or AJAX call via jQuery or AngularJS AJAX. Please go ahead and take a look at the code and add more things to it to make it do more interesting things. I am sure that you will start getting the hang of it while you add those new things. I hope that this post has helped you and good luck to you!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [get in touch](https://github.com/poanchen).

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