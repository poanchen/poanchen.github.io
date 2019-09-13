---
layout: post
title: "How to fix login must use security token in Salesforce?"
author: poanchen
date: 2018-08-27 08:30:30
tags:
- PoAn (Baron) Chen
- Salesforce
---
Recently, I ran into this error message in Salesforce where it stated that **"LOGIN_MUST_USE_SECURITY_TOKEN: Invalid username, password, security token; or user locked out. Are you at a new location? When accessing Salesforce--either via a desktop client or the API--from outside of your company's trusted networks, you must add a security token to your password to log in. To get your new security token, log in to Salesforce. From your personal settings, enter Reset My Security Token in the Quick Find box, then select Reset My Security Token."**

According to the official Salesforce documentation about [User Authentication](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_concepts_security.htm), there are two major ways to log in to the Salesforce via the API. One way is to use your Salesforce credential along with your [security token](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_concepts_security.htm#topic-title_login_token). Here is an example of how to do it,

> If a user’s password is mypassword, and the security token is XXXXXXXXXX, the user must enter mypasswordXXXXXXXXXX to log in. Source: https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_concepts_security.htm

Another way is to simply use your Salesforce credential to log in to the Salesforce. However, you must **whitelist your server IP address** in your Salesforce's Network Access page. Otherwise, you might get error message like I mentioned earlier. To get to the Network Access page, simply head over to your Salesforce dashboard and go to **Setup->Administration Setup->Security Controls->Network Access.**

One of the biggest differences that I can see between them are the origins of the request. The first way allows you to send SOAP API request to Salesforce with unknown origin as long as you provided your own security token. This is especially useful when your application does not have fixed server IP address. In contrast, you must whitelist your server IP address in order for second way to work. This can be useful when you have lost your security token but were unable to retrieve them nor to reset them.

For a long time, the form that I wrote that integrates well with Salesforce been working for almost 3 years till recently it started to break. I asked the company whether or not did they switch to a new web hosting provider. They answered no. Then, I got hooked. How is it even possible that you guys receive the error message LOGIN_MUST_USE_SECURITY_TOKEN when you guys did not change anything at all? I feel that it is just not possible. Something must have changed. And, I was like "Great, now is a perfect time for me to show off my debugging skill. Let's do it!" Thanks to Salesforce, it logs pretty much everything about what an user do on their Salesforce account. I was able to go through the API access log and to see what has changed in the past 6 months. And guess what I saw, the day that the form broke, was also the same day that the server IP address changed. But who changed it if not the own company? I think you can guessed who. It was the web hosting provider. Yuck! I was wondering, why didn't we get any friendly warning about that. That is just not right. Now that I have found the root cause of the problem, like I mentioned above, I simply need to head over to the Network Access page, and add that new server IP address to the list and everything should be back to normal now and it did. Now, the form started to work again. =) However, I still think that a better fix for this problem would be to use security token along with your Salesforce credential to log in to the Salesforce via API so that even when the web hosting provider changed their server to a new one. The form will still works which is something that I am working on right now as we cannot let these things happen again in the future.

Now, you should be able to go ahead and make that error message go away=)

## Wrapping Up

Hopefully you enjoyed this short tutorial. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Security and the API](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_quickstart_intro.htm) by [Salesforce](https://developer.salesforce.com/).
* [login() sample code](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_login.htm) by [Salesforce](https://developer.salesforce.com/).
* [Understanding the Username-Password OAuth Authentication Flow](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_username_password_oauth_flow.htm#!) by [Salesforce](https://developer.salesforce.com/).