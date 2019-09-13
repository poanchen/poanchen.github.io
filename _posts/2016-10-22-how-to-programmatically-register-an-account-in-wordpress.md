---
layout: post
title: "How to programmatically register an account for a user in WordPress?"
author: poanchen
date: 2016-10-22 08:30:30
tags:
- AJAX
- HTML
- JavaScript
- jQuery
- jQuery AJAX
- PHP
- PoAn (Baron) Chen
- RESTful API
- WordPress
---
Today, I am going to show you guys how to programmatically create an account for a user in WordPress. To help you understand clearly, we are going to write a REST API in PHP in the back-end. In the front-end, we will be using jQuery AJAX to query it. In case of error like username already exist, we will be printing out the error to the user in real-time. Lets get started!

## PHP code to start with (directly grabbed from [here](https://poanchen.github.io/blog/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js))
{% highlight php %}
  // Include the wp-load.php so that we can use WordPress API
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
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExist.php" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

As you can see, it is a fairly simple REST API in PHP that return a JSON to allow user to know if the username exist or not.<br>
The output should look something like this.
{% highlight json %}
  { "username": "", "result": false }
{% endhighlight %}
The reason why the username is empty. It is because we didn't pass in any username to the PHP file. We just simply call it.

## HTML Code to start with (directly grabbed from [here](https://poanchen.github.io/blog/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js)) 
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
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js/checkIfUsernameExistJquery.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Okay, now when we have these two files to start with. We can now try to tweak it so that it allows us to create an account for a user in WordPress. First, we need to add the input in the front-end so that user have place to input their email address and their password for their account. We simply add the following lines below the HTML input for username.

## HTML Code for adding HTML input for email and password
{% highlight html %}
  <input type="text" id="email" name="email" placeholder="email">
  <p id="emailResult"></p>
  <input type="password" id="password" name="password" placeholder="password">
  <p id="passwordResult"></p>
{% endhighlight %}
Now, when you open up your page in the web browser, you should see something like [this](https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/22/how-to-programmatically-register-an-account-in-wordpress/tryRegisterAnAccountJquery.html).<br>
At this point, we may try to add some error code so that we know what is actually going on.

## PHP Code with some pre-defined error code
{% highlight php %}
  // Include the wp-load.php so that we can use WordPress API
  $parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
  require_once( $parse_uri[0] . 'wp-load.php' );

  define("USERNAME_ALREADY_EXIST", 1);
  define("EMAIL_ADDRESS_ALREADY_EXIST", 2);
  define("NOT_A_VALID_EMAIL_ADDRESS", 3);
  define("PASSWORD_LENGTH_IS_TOO_SHORT", 4);
  define("SUCCESS", true);
  define("FAIL", false);

  $data = array();
  $username = sanitize_text_field($_POST['username']);
  $email = sanitize_text_field($_POST['email']);
  $password = sanitize_text_field($_POST['password']);

  $data["username"] = $username;
  $data["email"] = $email;
  $data["password"] = $password;

  if (username_exists($username)) {
    $data["result"] = USERNAME_ALREADY_EXIST;
  }else {
    $data["result"] = FAIL;
  }

  // return all our data to an AJAX call
  echo json_encode($data, JSON_PRETTY_PRINT);
{% endhighlight %}
We have added some error code, so that in the front-end, when we receive the result of 2, then we know that the email address is already exist. Let's try to add some validation to check if the username exist or not. If it is true, then return the error code that we pre-defined.

## PHP Code to check if username exist or not.
{% highlight php %}
  // Include the wp-load.php so that we can use WordPress API
  $parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
  require_once( $parse_uri[0] . 'wp-load.php' );

  define("USERNAME_ALREADY_EXIST", 1);
  define("EMAIL_ADDRESS_ALREADY_EXIST", 2);
  define("NOT_A_VALID_EMAIL_ADDRESS", 3);
  define("PASSWORD_LENGTH_IS_TOO_SHORT", 4);
  define("SUCCESS", true);
  define("FAIL", false);

  $data = array();
  $errors = array();
  $username = sanitize_text_field($_POST['username']);
  $email = sanitize_text_field($_POST['email']);
  $password = sanitize_text_field($_POST['password']);

  $data["username"] = $username;
  $data["email"] = $email;
  $data["password"] = $password;

  if (!empty($username)) {
    if (username_exists($username)) {
      $errors[] = USERNAME_ALREADY_EXIST;
    }
  }

  if (count($errors)) {
    $data["errors"] = $errors;
    $data["result"] = FAIL;
  }else{
    $data["result"] = SUCCESS;
  }

  // return all our data to an AJAX call
  echo json_encode($data, JSON_PRETTY_PRINT);
{% endhighlight %}
Now, when we query the PHP code, we should see something like this.
{% highlight json %}
  { "username": "test", "email": "", "password": "", "errors": [ 1 ], "result": false }
{% endhighlight %}
Whenever, we see the errors array, we know that something went wrong. Like, in this example, 1 means that username existed. Also, by checking the result, we know that it was a false. Which tells us that it was a failure to create an account for user.<br>
Now, let's try to combine this with the front-end code, so that we can actually see how it works in the user's point of view.

## HTML Code to check if username exist or not.
{% highlight html %}
  <input type="text" id="username" name="username" placeholder="username">
  <p id="usernameResult"></p>
  <input type="text" id="email" name="email" placeholder="email">
  <p id="emailResult"></p>
  <input type="password" id="password" name="password" placeholder="password">
  <p id="passwordResult"></p>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function () {
      // username
      var usernameSelected = $('#username');
      var usernameWarning = $('#usernameResult');
      // email
      var emailSelected = $('#email');
      var emailWarning = $('#emailResult');
      // password
      var passwordSelected = $('#password');
      var passwordWarning = $('#passwordResult');

      usernameSelected.keyup(function() {
        createAnAccountForUserInWordPress();
      });

      function createAnAccountForUserInWordPress () {
        var url = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/22/how-to-programmatically-register-an-account-in-wordpress/tryRegisterAnAccount.php";
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
            if (!response.result) {
              outpurErrorMessages(response.errors);
            }else{
              clearErrorMessages();
            }
          },
          error: function (xhr, status, error) {
            usernameWarning.html("Something went wrong!");
          }
        });
      }

      function outpurErrorMessages (errorCodes) {
        errorCodes.forEach(function (element, index, array) {
          switch(element) {
            case 1:
              usernameWarning.html("The username you typed has been used!");
              break;
            default:
              console.log("test");
          }
        });
      }

      function clearErrorMessages () {
        usernameWarning.html("");
        emailWarning.html("");
        passwordWarning.html("");
      }
   });
  </script>
{% endhighlight %}
Now, when you start typing, if the username you input exist then it will tells you that. Otherwise, it will not print anything.<br>Now, let's try to check if the user's email is valid or not!

## PHP Code to check if user's email is valid or not.
{% highlight php %}
  // Include the wp-load.php so that we can use WordPress API
  $parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
  require_once( $parse_uri[0] . 'wp-load.php' );

  define("USERNAME_ALREADY_EXIST", 1);
  define("EMAIL_ADDRESS_ALREADY_EXIST", 2);
  define("NOT_A_VALID_EMAIL_ADDRESS", 3);
  define("PASSWORD_LENGTH_IS_TOO_SHORT", 4);
  define("SUCCESS", true);
  define("FAIL", false);

  $data = array();
  $errors = array();
  $username = sanitize_text_field($_POST['username']);
  $email = sanitize_text_field($_POST['email']);
  $password = sanitize_text_field($_POST['password']);

  $data["username"] = $username;
  $data["email"] = $email;
  $data["password"] = $password;

  if (!empty($username)) {
    if (username_exists($username)) {
      $errors[] = USERNAME_ALREADY_EXIST;
    }
  }

  if (!empty($email)) {
    if (!is_email($email)) {
      $errors[] = NOT_A_VALID_EMAIL_ADDRESS;
    }else{
      if (email_exists($email)) {
        $errors[] = EMAIL_ADDRESS_ALREADY_EXIST;
      }
    }
  }

  if (count($errors)) {
    $data["errors"] = $errors;
    $data["result"] = FAIL;
  }else{
    $data["result"] = SUCCESS;
  }

  // return all our data to an AJAX call
  echo json_encode($data, JSON_PRETTY_PRINT);
{% endhighlight %}

## HTML Code to check if user's email is valid or not.
{% highlight html %}
  <input type="text" id="username" name="username" placeholder="username">
  <p id="usernameResult"></p>
  <input type="text" id="email" name="email" placeholder="email">
  <p id="emailResult"></p>
  <input type="password" id="password" name="password" placeholder="password">
  <p id="passwordResult"></p>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function () {
      // username
      var usernameSelected = $('#username');
      var usernameWarning = $('#usernameResult');
      // email
      var emailSelected = $('#email');
      var emailWarning = $('#emailResult');
      // password
      var passwordSelected = $('#password');
      var passwordWarning = $('#passwordResult');

      usernameSelected.keyup(function() {
        createAnAccountForUserInWordPress();
      });

      emailSelected.keyup(function() {
        createAnAccountForUserInWordPress();
      });

      function createAnAccountForUserInWordPress () {
        var url = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/22/how-to-programmatically-register-an-account-in-wordpress/tryRegisterAnAccount.php";
        var formData = {
          'username' : usernameSelected.val(),
          'email' : emailSelected.val()
        };

        $.ajax({
          type : 'POST',
          url : url,
          data : formData,
          dataType : 'JSON',
          encode : true,
          success: function (response, status, xhr) {
            clearErrorMessages();
            if (!response.result) {
              outpurErrorMessages(response.errors);
            }
          },
          error: function (xhr, status, error) {
            usernameWarning.html("Something went wrong!");
          }
        });
      }

      function outpurErrorMessages (errorCodes) {
        errorCodes.forEach(function (element, index, array) {
          switch(element) {
            case 1:
              usernameWarning.html("The username you typed has been used!");
              break;
            case 2:
              emailWarning.html("The email address you typed has been used!");
              break;
            case 3:
              emailWarning.html("The email address you typed is not valid!");
              break;
            default:
              console.log("test");
          }
        });
      }

      function clearErrorMessages () {
        usernameWarning.html("");
        emailWarning.html("");
        passwordWarning.html("");
      }
   });
  </script>
{% endhighlight %}
Now, with the PHP code and HTML code combined. You may try to email field. Try to type something that isn't an email. You should see the warning that you inputted invalid email. Try email like 'a@b.c'. You should see that the email address that you typed has been used. Yaa! Okay. Now, we can do the similar thing with password then we will be close in creating an account for a WordPress user!

## PHP code to check if user's password is at least length of 5.
{% highlight php %}
  // Include the wp-load.php so that we can use WordPress API
  $parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
  require_once( $parse_uri[0] . 'wp-load.php' );

  define("USERNAME_ALREADY_EXIST", 1);
  define("EMAIL_ADDRESS_ALREADY_EXIST", 2);
  define("NOT_A_VALID_EMAIL_ADDRESS", 3);
  define("PASSWORD_LENGTH_IS_TOO_SHORT", 4);
  define("SUCCESS", true);
  define("FAIL", false);

  $data = array();
  $errors = array();
  $username = sanitize_text_field($_POST['username']);
  $email = sanitize_text_field($_POST['email']);
  $password = sanitize_text_field($_POST['password']);

  $data["username"] = $username;
  $data["email"] = $email;
  $data["password"] = $password;

  if (!empty($username)) {
    if (username_exists($username)) {
      $errors[] = USERNAME_ALREADY_EXIST;
    }
  }

  if (!empty($email)) {
    if (!is_email($email)) {
      $errors[] = NOT_A_VALID_EMAIL_ADDRESS;
    }else{
      if (email_exists($email)) {
        $errors[] = EMAIL_ADDRESS_ALREADY_EXIST;
      }
    }
  }

  if (!empty($password)) {
    if (strlen($password) < 5) {
      $errors[] = PASSWORD_LENGTH_IS_TOO_SHORT;
    }
  }

  if (count($errors)) {
    $data["errors"] = $errors;
    $data["result"] = FAIL;
  }else{
    $data["result"] = SUCCESS;
  }

  // return all our data to an AJAX call
  echo json_encode($data, JSON_PRETTY_PRINT);
{% endhighlight %}

## HTML Code to check if user's password is at least length of 5.
{% highlight html %}
  <input type="text" id="username" name="username" placeholder="username">
  <p id="usernameResult"></p>
  <input type="text" id="email" name="email" placeholder="email">
  <p id="emailResult"></p>
  <input type="password" id="password" name="password" placeholder="password">
  <p id="passwordResult"></p>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function () {
      // username
      var usernameSelected = $('#username');
      var usernameWarning = $('#usernameResult');
      // email
      var emailSelected = $('#email');
      var emailWarning = $('#emailResult');
      // password
      var passwordSelected = $('#password');
      var passwordWarning = $('#passwordResult');

      usernameSelected.keyup(function() {
        createAnAccountForUserInWordPress();
      });

      emailSelected.keyup(function() {
        createAnAccountForUserInWordPress();
      });

      passwordSelected.keyup(function() {
        createAnAccountForUserInWordPress();
      });

      function createAnAccountForUserInWordPress () {
        var url = "https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/22/how-to-programmatically-register-an-account-in-wordpress/tryRegisterAnAccount.php";
        var formData = {
          'username' : usernameSelected.val(),
          'email' : emailSelected.val(),
          'password' : passwordSelected.val()
        };

        $.ajax({
          type : 'POST',
          url : url,
          data : formData,
          dataType : 'JSON',
          encode : true,
          success: function (response, status, xhr) {
            clearErrorMessages();
            if (!response.result) {
              outpurErrorMessages(response.errors);
            }
          },
          error: function (xhr, status, error) {
            usernameWarning.html("Something went wrong!");
          }
        });
      }

      function outpurErrorMessages (errorCodes) {
        errorCodes.forEach(function (element, index, array) {
          switch(element) {
            case 1:
              usernameWarning.html("The username you typed has been used!");
              break;
            case 2:
              emailWarning.html("The email address you typed has been used!");
              break;
            case 3:
              emailWarning.html("The email address you typed is not valid!");
              break;
            case 4:
              passwordWarning.html("Please input a password that is at least length of 5!");
              break;
            default:
              console.log("test");
          }
        });
      }

      function clearErrorMessages () {
        usernameWarning.html("");
        emailWarning.html("");
        passwordWarning.html("");
      }
   });
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/22/how-to-programmatically-register-an-account-in-wordpress/tryRegisterAnAccountJquery.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a><br>
<a href="https://www.jenrenalcare.com/upload/poanchen.github.io/sample-code/2016/10/22/how-to-programmatically-register-an-account-in-wordpress/tryRegisterAnAccountJquery.html" target="_blank">Live link</a> hosted on <a href="https://www.jenrenalcare.com" target="_blank">JenRenalCare.com</a><br>
<a href="https://codepen.io/poanchen/pen/gLmYOB?editors=101" target="_blank">Try it</a> on <a href="https://codepen.io" target="_blank">CodePen</a>

Now, you may try to input your password, and it will alert you whenever your password length isn't at least length of 5!<br>
Okay. Now, we have user's username, email and password. I think it is time to create an account for them in WordPress.

## PHP code to create an account for user in WordPress. 
{% highlight php %}
  // Include the wp-load.php so that we can use WordPress API
  $parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
  require_once( $parse_uri[0] . 'wp-load.php' );

  define("USERNAME_ALREADY_EXIST", 1);
  define("EMAIL_ADDRESS_ALREADY_EXIST", 2);
  define("NOT_A_VALID_EMAIL_ADDRESS", 3);
  define("PASSWORD_LENGTH_IS_TOO_SHORT", 4);
  define("SUCCESS", true);
  define("FAIL", false);

  $data = array();
  $errors = array();
  $username = sanitize_text_field($_POST['username']);
  $email = sanitize_text_field($_POST['email']);
  $password = sanitize_text_field($_POST['password']);

  $data["username"] = $username;
  $data["email"] = $email;
  $data["password"] = $password;

  if (!empty($username)) {
    if (username_exists($username)) {
      $errors[] = USERNAME_ALREADY_EXIST;
    }
  }

  if (!empty($email)) {
    if (!is_email($email)) {
      $errors[] = NOT_A_VALID_EMAIL_ADDRESS;
    }else{
      if (email_exists($email)) {
        $errors[] = EMAIL_ADDRESS_ALREADY_EXIST;
      }
    }
  }

  if (!empty($password)) {
    if (strlen($password) < 5) {
      $errors[] = PASSWORD_LENGTH_IS_TOO_SHORT;
    }
  }

  if (count($errors)) {
    $data["errors"] = $errors;
    $data["result"] = FAIL;
  }else{
    if (!empty($username) && !empty($email) && !empty($password)) {
      $random_password = wp_generate_password($length=12, $include_standard_special_chars=false);
      $userID = wp_create_user($username, $random_password, $email);
      if (!is_wp_error($user_id)) {
        wp_set_password($password, $userID);
        $data["result"] = SUCCESS;
      }else{
        $data["result"] = FAIL;
      }
    }else{
      $data["result"] = FAIL;
    }
  }

  // return all our data to an AJAX call
  echo json_encode($data, JSON_PRETTY_PRINT);
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/22/how-to-programmatically-register-an-account-in-wordpress/tryRegisterAnAccount.php" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a><br>
<a href="https://codepen.io/poanchen/pen/gLmYOB?editors=101" target="_blank">Try it</a> on <a href="https://codepen.io" target="_blank">CodePen</a>

One of the flaw that I would like to mention is. There wasn't any validation to check if the user is a robot or not. User may type random things and create hundreds of account in WordPress which should not be use in production. Probably next time, I will have a tutorial about how to prevent robot register hundreds of account on your site.

## Wrapping Up

Hopefully this guide has given you the confidence to create an account in WordPress programmatically. I hope that this post has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [wp_create_user() code reference](https://developer.wordpress.org/reference/functions/wp_create_user/) by [WordPress](https://www.wordpress.org).