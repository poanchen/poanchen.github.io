---
layout: post
title: "How to automatically send a welcome email to new user when they sign up for their account in WordPress programmatically?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2016-10-17
---
Nowadays, it is no surprise that user will usually receive an email when they first sign up for a new account with a site. It could be a greeting email or a confirmation email. Either way, this should be done automatically in the background. Imagine that a person in the back-end who needs to send an email to user every time when there is a new register. This could be a lot of work depends on the popularity of the site. Today, we are going to talk about how we can achieve that in WordPress. WordPress is a free and open-source content management system (CMS) based on PHP and MySQL. According to [CMS Usage Statistics](https://trends.builtwith.com/cms), it is reportedly the most popular blogging system in use on the web and it powers 26% of the website on the internet. [really?](https://w3techs.com/technologies/details/cm-wordpress/all/all) One of the amazing feature that came pre-installed with WordPress is the ability to have multiple users, as an administrator of a WordPress site, you can set-up multiple users for the website and assign access levels and capabilities to each other. For example, you can assign role like editor to a specific person so that they can publish and manage all the posts on your site. But, who does not have the ability to install a new plugin on the site. If you would like to know all the roles that are available on pre-installed WordPress, please go ahead to their official site to [check it out](https://codex.wordpress.org/Roles_and_Capabilities). After hearing many great things about WordPress, lets get to the point and start coding! Since WordPress is based on PHP in the back-end, we are going to code in PHP. If you do not know what a PHP is, you should take a look at some really basic things that can be done using PHP. [PHP 5 tutorial](http://www.w3schools.com/php/default.asp) by [w3school.com](http://www.w3schools.com/). Beside PHP, we are going to use what so-called actions in WordPress. Actions are triggered by specific events that take place in WordPress, such as publishing a post, a new user sign up, or a user resetted their password for their account. An action is a custom PHP function defined in your plugin (or theme) and hooked, i.e. set to respond to specific event trigger by user. This is especially useful for programmer to write a clean and maintainable PHP code in WordPress. Which is again, another great feature came with WordPress. For more information about action in WordPress, please go to this [site](https://codex.wordpress.org/Plugin_API). The first step in creating an action in WordPress is to create a PHP function with the functionality that you want. In this case, we are going to write a PHP function that send a welcome email to user when this function get triggered. The code can be seen as follows,
<br>

## PHP code for writing a function that send a welcome email to user

<pre>
  <code class="php">
    function send_welcome_email_to_new_user($user_id) {
      $user = get_userdata($user_id);
      $user_email = $user->user_email;
      // for simplicity, lets assume that user has typed their first and last name when they sign up
      $user_full_name = $user->user_firstname . $user->user_lastname;

      // Now we are ready to build our welcome email
      $to = $user_email;
      $subject = "Hi " . $user_full_name . ", welcome to our site!";
      $body = '
                &lt;h1&gt;Dear ' . $user_full_name . ',&lt;/h1&gt;&lt;/br&gt;
                &lt;p&gt;Thank you for joining our site. Your account is now active.&lt;/p&gt;
                &lt;p&gt;Please go ahead and navigate around your account.&lt;/p&gt;
                &lt;p&gt;Let me know if you have further questions, I am here to help.&lt;/p&gt;
                &lt;p&gt;Enjoy the rest of your day!&lt;/p&gt;
                &lt;p&gt;Kind Regards,&lt;/p&gt;
                &lt;p&gt;poanchen&lt;/p&gt;
      ';
      $headers = array('Content-Type: text/html; charset=UTF-8');
      if (wp_mail($to, $subject, $body, $headers)) {
        error_log("email has been successfully sent to user whose email is " . $user_email);
      }else{
        error_log("email failed to sent to user whose email is " . $user_email);
      }
    }
  </code>
</pre>
The above code should be fairly simple. We are using WordPress built-in function to send an email. For more information about it, please go to this [site](https://developer.wordpress.org/reference/functions/wp_mail/). Another thing that I would like to add is, in order to see the error message. You must set your WP_DEBUG_LOG to true in your wp-config.php file. On instruction on how to turn it on, please go to this [site](https://premium.wpmudev.org/blog/debugging-wordpress-how-to-use-wp_debug) by [WPMU DEV](https://premium.wpmudev.org/). **Don’t forget that WP_DEBUG is for local development use and should not be used on production.** The following example that I would like to show is hook this function up with an action provided by WordPress. In this way, whenever there is a new user sign up, this function will get called automatically.

## Full PHP code for sending a welcome email to user &nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/10/17/how-to-automatically-send-welcome-email-to-user-when-they-sign-up-in-wp/functions.php" target="_blank">source code</a>

<pre>
  <code class="php">
    function send_welcome_email_to_new_user($user_id) {
      $user = get_userdata($user_id);
      $user_email = $user->user_email;
      // for simplicity, lets assume that user has typed their first and last name when they sign up
      $user_full_name = $user->user_firstname . $user->user_lastname;

      // Now we are ready to build our welcome email
      $to = $user_email;
      $subject = "Hi " . $user_full_name . ", welcome to our site!";
      $body = '
                &lt;h1&gt;Dear ' . $user_full_name . ',&lt;/h1&gt;&lt;/br&gt;
                &lt;p&gt;Thank you for joining our site. Your account is now active.&lt;/p&gt;
                &lt;p&gt;Please go ahead and navigate around your account.&lt;/p&gt;
                &lt;p&gt;Let me know if you have further questions, I am here to help.&lt;/p&gt;
                &lt;p&gt;Enjoy the rest of your day!&lt;/p&gt;
                &lt;p&gt;Kind Regards,&lt;/p&gt;
                &lt;p&gt;poanchen&lt;/p&gt;
      ';
      $headers = array('Content-Type: text/html; charset=UTF-8');
      if (wp_mail($to, $subject, $body, $headers)) {
        error_log("email has been successfully sent to user whose email is " . $user_email);
      }else{
        error_log("email failed to sent to user whose email is " . $user_email);
      }
    }

    // THE ONLY DIFFERENCE IS THIS LINE
    add_action('user_register', 'send_welcome_email_to_new_user');
    // THE ONLY DIFFERENCE IS THIS LINE
  </code>
</pre>
By hooking this function up with the action 'user_register', all we need to do is add one line of code and we are done. (please make sure you put this function into the core functions.php in your theme folder in order for it to work!).

## Wrapping Up

Hopefully this guide has given you the confidence to do things with WordPress Action. Please go ahead and take a look at the [list of all WordPress hook](https://codex.wordpress.org/Plugin_API/Action_Reference) that they have offer. I am sure that you will start getting the hang of it while you start to implement more function that hooked up with the WordPress Action. I hope that this post has helped you and good luck to you!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [get in touch](https://github.com/poanchen).

### WordPress official site for developer

* [WordPress.org](https://wordpress.org/)