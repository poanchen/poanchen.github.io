---
layout: post
title: "Build a scalable, reliable, and inexpensive RESTful API using AWS Lambda that will do the Roman Numerals Conversion"
author: poanchen
date: 2017-12-03 08:30:30
tags:
- AWS
- AWS Lambda
- JSON
- PoAn (Baron) Chen
- Restful API
- Roman Numerals Conversion
---
## Prerequisite Concepts, Skills and/or Values

- Experienced with at least one of the programming language ranging from Node.js/Java/C#/Python.
- Worked with RESTful API.
- Familiar with Algebra.
- Understand how HTTP(s)/web request works.
- AWS account with admin privilege.

## Introduction

Building a scalable and reliable RESTful API from scratch can be challenging with hardware and software in mind. Using [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) allows the developer to build a RESTful API that are scalable, reliable and inexpensive without worrying too much about the compute resources, server and operating system maintenance, capacity provisioning and automatic scaling, code and security path deployment, code monitoring and logging. All you need to do is supply the code and that is it. It does sound very appearling as the developers get to focus on the business logics and shipping their product for their client. In addition, many software developer job requirements require some knowledge of RESTful API. Learning what a RESTful API is and build one from scratch can really help the learner to stands out in a pile of applicants. As there are more and more technology companies started to adapt AWS ecosystem, knowing how to use AWS is also a big plus on their resume.

## Audience Needs & Motivation

- Learning how to build a RESTful API with AWS Lambda can be a very useful skill to put on the resume which in turn improves your chances of getting a Computer Science-related job in the future.
- Learning how Roman Numerals Conversion works is a fun thing to do and I encourage everyone to try it.
- This blog will motivate the learners into wanted to learn more about the topic because it is very interesting and its expandability is unbelievable. (people can potentially build so MANY things after they have read this educational blog)

## Learning Objectives

* Learn to build a RESTful API using AWS Lambda
  * Build a Hello World version of RESTful API using AWS Lambda
    * In this topic, the learner will learn in-depth what a AWS Lambda and API Gateway is and at the end, they will get to know how to build a Hello World version of it.
* Learn to do a Roman Numerals Conversion in hand
  * Ability to convert Roman Numerals to digital numbers in hand
    * In this topic, the learner will learn to do a Roman Numerals Conversion in hand.
* Implementing the Roman Numerals Conversion RESTful API
  * Build a RESTful API that will do the Roman Numerals Conversion.
    * In this topic, the learner will simply use the roman library to do the Roman Numerals Conversion.

## Learn to build a RESTful API using AWS Lambda

In this section, I am going to show you guys how to build a RESTful API using AWS Lambda.

> AWS Lambda is a compute service that lets you run code without provisioning or managing servers. AWS Lambda executes your code only when needed and scales automatically, from a few requests per day to thousands per second. You pay only for the compute time you consume - there is no charge when your code is not running. With AWS Lambda, you can run code for virtually any type of application or backend service - all with zero administration. AWS Lambda runs your code on a high-availability compute infrastructure and performs all of the administration of the compute resources, including server and operating system maintenance, capacity provisioning and automatic scaling, code monitoring and logging. All you need to do is supply your code in one of the languages that AWS Lambda supports (currently Node.js, Java, C# and Python).

To simplify the problem, we are simply going to build a Hello World version of RESTful API using AWS Lambda. The code for doing the Roman Numerals Conversion will come later in the blog. Also, as I am more familiar with Python. The example here is going to be in Python. Okay, let's head over to your AWS account Dashboard and search "Lambda". Select the first one and you should see a page that briefly teaches you how it works. Click the "Create a function" button and it should take you to this page.

<img src="/img/2017/12/03/Build-a-scalable-reliable-and-inexpensive-RESTful-API-using-AWS-Lambda-that-will-do-the-Roman-numerals-conversion/create a function.png" alt="Create a Lambda function">

Here, you can simply set it up exactly as I suggested in the figure above. Next, you would need to write a Lambda function that will print the "Hello World" message. Here is a quick example of what it might look like.
{% highlight python %}
  def lambda_handler(event, context):
    return {
      "message": "Hello World"
    }
{% endhighlight %}

Since we are building a RESTful API, we need to use [API Gateway](https://aws.amazon.com/api-gateway/) to trigger the Lambda function.

> API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. With a few clicks in the AWS Management Console, you can create an API that acts as a “front door” for applications to access data, business logic, or functionality from your back-end services, such as workloads running on Amazon Elastic Compute Cloud (Amazon EC2), code running on AWS Lambda, or any Web application. Amazon API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, authorization and access control, monitoring, and API version management. Amazon API Gateway has no minimum fees or startup costs. You pay only for the API calls you receive and the amount of data transferred out.

Thanks to Amazon. API Gateway is fairly easy to set up and configure. However, its compatibility could be the problem but still fairly easy to solve. We know that the API Gateway expects Lambda functions to return certain output. You must code your function accordingly. This is the structure it expects:
{% highlight json %}
  {
    "statusCode": 200, 
    "headers": {"Content-Type": "application/json"},
    "body": "body_text_goes_here"
  }
{% endhighlight %}

In the case of the Eratosthenes function, we actually return json as the body so we have to use backslashes to escape our json-within-json:
{% highlight json %}
  {
    "statusCode": 200,
    "headers": {"Content-Type": "application/json"},
    "body": "{\"message\": \"Hello World\"}"
  }
{% endhighlight %}

API Gateway will read the “body” element and return it as the body of the response:
backslashes to escape our json-within-json:
{% highlight json %}
  {
    "message": "Hello World"
  }
{% endhighlight %}

Now, to accommodate that (for Lambda to work with API Gateway). Here is what the Lambda function might look like.
{% highlight python %}
  def lambda_handler(event, context):
    return {
      "statusCode": 200,
      "headers": {"Content-Type": "application/json"},
      "body": "{\"message\": \"Hello World\"}"
    }
{% endhighlight %}

Simply copy that and paste it into the Function code like this.

<img src="/img/2017/12/03/Build-a-scalable-reliable-and-inexpensive-RESTful-API-using-AWS-Lambda-that-will-do-the-Roman-numerals-conversion/sample function code.png" alt="Sample function code">

Next, you should head over to the top and add the API Gateway as your Lambda triggers. Just like what I did here.

<img src="/img/2017/12/03/Build-a-scalable-reliable-and-inexpensive-RESTful-API-using-AWS-Lambda-that-will-do-the-Roman-numerals-conversion/add trigger.png" alt="add trigger">

Make sure you hit the save button to save all your works. Next, find out what your Invoke URL is for your API Gateway for Lambda. Open up [Postman](https://www.getpostman.com/) or [Restlet Client](https://restlet.com/modules/client/) to check out the Hello World version RESTful API that you just did using API Gateway and Lambda. You should get something like this in return response.

<img src="/img/2017/12/03/Build-a-scalable-reliable-and-inexpensive-RESTful-API-using-AWS-Lambda-that-will-do-the-Roman-numerals-conversion/return response.png" alt="return response">

Tada! You just built yourself a Hello World version of RESTful API using API Gateway and Lambda.

## Learn to do a Roman Numerals Conversion in hand

Roman Numerals Conversion is actually pretty simple to learn. All you have to do is to get familiar with the table below.

<table>
  <tr>
    <th>Number</th>
    <th><a href="https://en.wikipedia.org/wiki/Roman_numerals">Roman numeral</a></th>
    <th>Calculation</th>
  </tr>
  <tr>
    <td>0</td>
    <td>not defined</td>
    <td>&nbsp;</td>
  </tr>
  <tr style="background:#f8f8f0">
    <td>1</td>
    <td>I</td>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
    <td>II</td>
    <td>1+1</td>
  </tr>
  <tr>
    <td>3</td>
    <td>III</td>
    <td>1+1+1</td>
  </tr>
  <tr>
    <td>4</td>
    <td>IV</td>
    <td>5-1</td>
  </tr>
  <tr style="background:#f8f8f0">
    <td>5</td>
    <td>V</td>
    <td>5</td>
  </tr>
  <tr>
    <td>6</td>
    <td>VI</td>
    <td>5+1</td>
  </tr>
  <tr>
    <td>7</td>
    <td>VII</td>
    <td>5+1+1</td>
  </tr>
  <tr>
    <td>8</td>
    <td>VIII</td>
    <td>5+1+1+1</td>
  </tr>
  <tr>
    <td>9</td>
    <td>IX</td>
    <td>10-1</td>
  </tr>
  <tr style="background:#f8f8f0">
    <td>10</td>
    <td>X</td>
    <td>10</td>
  </tr>
  <tr>
    <td>11</td>
    <td>XI</td>
    <td>10+1</td>
  </tr>
  <tr>
    <td>12</td>
    <td>XII</td>
    <td>10+1+1</td>
  </tr>
  <tr>
    <td>13</td>
    <td>XIII</td>
    <td>10+1+1+1</td>
  </tr>
  <tr>
    <td>14</td>
    <td>XIV</td>
    <td>10-1+5</td>
  </tr>
  <tr>
    <td>15</td>
    <td>XV</td>
    <td>10+5</td>
  </tr>
  <tr>
    <td>16</td>
    <td>XVI</td>
    <td>10+5+1</td>
  </tr>
  <tr>
    <td>17</td>
    <td>XVII</td>
    <td>10+5+1+1</td>
  </tr>
  <tr>
    <td>18</td>
    <td>XVIII</td>
    <td>10+5+1+1+1</td>
  </tr>
  <tr>
    <td>19</td>
    <td>XIX</td>
    <td>10-1+10</td>
  </tr>
  <tr>
    <td>20</td>
    <td>XX</td>
    <td>10+10</td>
  </tr>
  <tr>
    <td>21</td>
    <td>XXI</td>
    <td>10+10+1</td>
  </tr>
  <tr>
    <td>22</td>
    <td>XXII</td>
    <td>10+10+1+1</td>
  </tr>
  <tr>
    <td>23</td>
    <td>XXIII</td>
    <td>10+10+1+1+1</td>
  </tr>
  <tr>
    <td>24</td>
    <td>XXIV</td>
    <td>10+10-1+5</td>
  </tr>
  <tr>
    <td>25</td>
    <td>XXV</td>
    <td>10+10+5</td>
  </tr>
  <tr>
    <td>26</td>
    <td>XXVI</td>
    <td>10+10+5+1</td>
  </tr>
  <tr>
    <td>27</td>
    <td>XXVII</td>
    <td>10+10+5+1+1</td>
  </tr>
  <tr>
    <td>28</td>
    <td>XXVIII</td>
    <td>10+10+5+1+1+1</td>
  </tr>
  <tr>
    <td>29</td>
    <td>XXIX</td>
    <td>10+10-1+10</td>
  </tr>
  <tr>
    <td>30</td>
    <td>XXX</td>
    <td>10+10+10</td>
  </tr>
  <tr>
    <td>31</td>
    <td>XXXI</td>
    <td>10+10+10+1</td>
  </tr>
  <tr>
    <td>32</td>
    <td>XXXII</td>
    <td>10+10+10+1+1</td>
  </tr>
  <tr>
    <td>33</td>
    <td>XXXIII</td>
    <td>10+10+10+1+1+1</td>
  </tr>
  <tr>
    <td>34</td>
    <td>XXXIV</td>
    <td>10+10+10-1+5</td>
  </tr>
  <tr>
    <td>35</td>
    <td>XXXV</td>
    <td>10+10+10+5</td>
  </tr>
  <tr>
    <td>36</td>
    <td>XXXVI</td>
    <td>10+10+10+5+1</td>
  </tr>
  <tr>
    <td>37</td>
    <td>XXXVII</td>
    <td>10+10+10+5+1+1</td>
  </tr>
  <tr>
    <td>38</td>
    <td>XXXVIII</td>
    <td>10+10+10+5+1+1+1</td>
  </tr>
  <tr>
    <td>39</td>
    <td>XXXIX</td>
    <td>10+10+10-1+10</td>
  </tr>
  <tr>
    <td>40</td>
    <td>XL</td>
    <td>-10+50</td>
  </tr>
  <tr>
    <td>41</td>
    <td>XLI</td>
    <td>-10+50+1</td>
  </tr>
  <tr>
    <td>42</td>
    <td>XLII</td>
    <td>-10+50+1+1</td>
  </tr>
  <tr>
    <td>43</td>
    <td>XLIII</td>
    <td>-10+50+1+1+1</td>
  </tr>
  <tr>
    <td>44</td>
    <td>XLIV</td>
    <td>-10+50-1+5</td>
  </tr>
  <tr>
    <td>45</td>
    <td>XLV</td>
    <td>-10+50+5</td>
  </tr>
  <tr>
    <td>46</td>
    <td>XLVI</td>
    <td>-10+50+5+1</td>
  </tr>
  <tr>
    <td>47</td>
    <td>XLVII</td>
    <td>-10+50+5+5+1</td>
  </tr>
  <tr>
    <td>48</td>
    <td>XLVIII</td>
    <td>-10+50+5+1+1+1</td>
  </tr>
  <tr>
    <td>49</td>
    <td>XLIX</td>
    <td>-10+50-1+10</td>
  </tr>
  <tr style="background:#f8f8f0">
    <td>50</td>
    <td>L</td>
    <td>50</td>
  </tr>
  <tr>
    <td>51</td>
    <td>LI</td>
    <td>50+1</td>
  </tr>
  <tr>
    <td>52</td>
    <td>LII</td>
    <td>50+1+1</td>
  </tr>
  <tr>
    <td>53</td>
    <td>LIII</td>
    <td>50+1+1+1</td>
  </tr>
  <tr>
    <td>54</td>
    <td>LIV</td>
    <td>50-1+5</td>
  </tr>
  <tr>
    <td>55</td>
    <td>LV</td>
    <td>50+5</td>
  </tr>
  <tr>
    <td>56</td>
    <td>LVI</td>
    <td>50+5+1</td>
  </tr>
  <tr>
    <td>57</td>
    <td>LVII</td>
    <td>50+5+1+1</td>
  </tr>
  <tr>
    <td>58</td>
    <td>LVIII</td>
    <td>50+5+1+1+1</td>
  </tr>
  <tr>
    <td>59</td>
    <td>LIX</td>
    <td>50-1+10</td>
  </tr>
  <tr>
    <td>60</td>
    <td>LX</td>
    <td>50+10</td>
  </tr>
  <tr>
    <td>61</td>
    <td>LXI</td>
    <td>50+10+1</td>
  </tr>
  <tr>
    <td>62</td>
    <td>LXII</td>
    <td>50+10+1+1</td>
  </tr>
  <tr>
    <td>63</td>
    <td>LXIII</td>
    <td>50+10+1+1+1</td>
  </tr>
  <tr>
    <td>64</td>
    <td>LXIV</td>
    <td>50+10-1+5</td>
  </tr>
  <tr>
    <td>65</td>
    <td>LXV</td>
    <td>50+10+5</td>
  </tr>
  <tr>
    <td>66</td>
    <td>LXVI</td>
    <td>50+10+5+1</td>
  </tr>
  <tr>
    <td>67</td>
    <td>LXVII</td>
    <td>50+10+5+1+1</td>
  </tr>
  <tr>
    <td>68</td>
    <td>LXVIII</td>
    <td>50+10+5+1+1+1</td>
  </tr>
  <tr>
    <td>69</td>
    <td>LXIX</td>
    <td>50+10-1+10</td>
  </tr>
  <tr>
    <td>70</td>
    <td>LXX</td>
    <td>50+10+10</td>
  </tr>
  <tr>
    <td>71</td>
    <td>LXXI</td>
    <td>50+10+10+1</td>
  </tr>
  <tr>
    <td>72</td>
    <td>LXXII</td>
    <td>50+10+10+1+1</td>
  </tr>
  <tr>
    <td>73</td>
    <td>LXXIII</td>
    <td>50+10+10+1+1+1</td>
  </tr>
  <tr>
    <td>74</td>
    <td>LXXIV</td>
    <td>50+10+10-1+5</td>
  </tr>
  <tr>
    <td>75</td>
    <td>LXXV</td>
    <td>50+10+10+5</td>
  </tr>
  <tr>
    <td>76</td>
    <td>LXXVI</td>
    <td>50+10+10+5+1</td>
  </tr>
  <tr>
    <td>77</td>
    <td>LXXVII</td>
    <td>50+10+10+5+1+1</td>
  </tr>
  <tr>
    <td>78</td>
    <td>LXXVIII</td>
    <td>50+10+10+5+1+1+1</td>
  </tr>
  <tr>
    <td>79</td>
    <td>LXXIX</td>
    <td>50+10+10-1+5</td>
  </tr>
  <tr>
    <td>80</td>
    <td>LXXX</td>
    <td>50+10+10+10</td>
  </tr>
  <tr>
    <td>81</td>
    <td>LXXXI</td>
    <td>50+10+10+10+1</td>
  </tr>
  <tr>
    <td>82</td>
    <td>LXXXII</td>
    <td>50+10+10+10+1+1</td>
  </tr>
  <tr>
    <td>83</td>
    <td>LXXXIII</td>
    <td>50+10+10+10+1+1+1</td>
  </tr>
  <tr>
    <td>84</td>
    <td>LXXXIV</td>
    <td>50+10+10+10-1+5</td>
  </tr>
  <tr>
    <td>85</td>
    <td>LXXXV</td>
    <td>50+10+10+10+5</td>
  </tr>
  <tr>
    <td>86</td>
    <td>LXXXVI</td>
    <td>50+10+10+10+5+1</td>
  </tr>
  <tr>
    <td>87</td>
    <td>LXXXVII</td>
    <td>50+10+10+10+5+1+1</td>
  </tr>
  <tr>
    <td>88</td>
    <td>LXXXVIII</td>
    <td>50+10+10+10+5+1+1+1</td>
  </tr>
  <tr>
    <td>89</td>
    <td>LXXXIX</td>
    <td>50+10+10+10-1+10</td>
  </tr>
  <tr>
    <td>90</td>
    <td>XC</td>
    <td>100-10</td>
  </tr>
  <tr>
    <td>91</td>
    <td>XCI</td>
    <td>100-10+1</td>
  </tr>
  <tr>
    <td>92</td>
    <td>XCII</td>
    <td>100-10+1+1</td>
  </tr>
  <tr>
    <td>93</td>
    <td>XCIII</td>
    <td>100-10+1+1+1</td>
  </tr>
  <tr>
    <td>94</td>
    <td>XCIV</td>
    <td>100-10-1+5</td>
  </tr>
  <tr>
    <td>95</td>
    <td>XCV</td>
    <td>100-10+5</td>
  </tr>
  <tr>
    <td>96</td>
    <td>XCVI</td>
    <td>100-10+5+1</td>
  </tr>
  <tr>
    <td>97</td>
    <td>XCVII</td>
    <td>100-10+5+1+1</td>
  </tr>
  <tr>
    <td>98</td>
    <td>XCVIII</td>
    <td>100-10+5+1+1+1</td>
  </tr>
  <tr>
    <td>99</td>
    <td>XCIX</td>
    <td>100-10-1+10</td>
  </tr>
  <tr style="background:#f8f8f0">
    <td>100</td>
    <td>C</td>
    <td>100</td>
  </tr>
  <tr>
    <td>200</td>
    <td>CC</td>
    <td>100+100</td>
  </tr>
  <tr>
    <td>300</td>
    <td>CCC</td>
    <td>100+100+100</td>
  </tr>
  <tr>
    <td>400</td>
    <td>CD</td>
    <td>500-100</td>
  </tr>
  <tr style="background:#f8f8f0">
    <td>500</td>
    <td>D</td>
    <td>500</td>
  </tr>
  <tr>
    <td>600</td>
    <td>DC</td>
    <td>500+100</td>
  </tr>
  <tr>
    <td>700</td>
    <td>DCC</td>
    <td>500+100+100</td>
  </tr>
  <tr>
    <td>800</td>
    <td>DCCC</td>
    <td>500+100+100+100</td>
  </tr>
  <tr>
    <td>900</td>
    <td>CM</td>
    <td>1000-100</td>
  </tr>
  <tr style="background:#f8f8f0">
    <td>1000</td>
    <td>M</td>
    <td>1000</td>
  </tr>
</table>

For simplicity, we are going to ignore number that is larger than 1000. By following the table, you should be able to do the Roman Numerals Conversion.

## Implementing the Roman Numerals Conversion RESTful API

Thanks to Roman library. It allows us to easily convert digital numbers to Roman Numerals with two lines of code. For example,
{% highlight python %}
  import roman
  print(roman.toRoman(10)) # you should get 'X'
{% endhighlight %}

Now, we simply need to make sure we can pass in data so that we can do the conversion. Here is how you can do it with Lambda.
{% highlight python %}
  def handler(event, context):
    e = event.get('e')
    pi = event.get('pi')
    return {
        "statusCode": 200,
        "headers": { "Content-Type": "application/json"},
        "body": e + pi
    }
{% endhighlight %}

Let's use that in our Lambda functions.
{% highlight python %}
  def lambda_handler(event, context):
    import roman
    return {
      "statusCode": 200,
      "headers": {"Content-Type": "application/json"},
      "body": "{\"result\": %d}" % (roman.fromRoman(event.get('d')))
    }
{% endhighlight %}

Simply update your Lambda function to the one above. The Roman Numerals Conversion should now works. Here is what it might looks like,

<img src="/img/2017/12/03/Build-a-scalable-reliable-and-inexpensive-RESTful-API-using-AWS-Lambda-that-will-do-the-Roman-numerals-conversion/sample roman numerals conversion response.png" alt="sample roman numerals conversion response">

Tada! You now have a fully functional Roman Numerals Conversion RESTful API that will convert any digital number to Roman Numerals.

## Extensions

In case you found the tutorial too easy, here are some of the pointers that will make this more challenging.

* Instead of using the roman library to do the Roman Numerals Conversion. I would suggest you to implement your own conversion. On top of this, make sure your conversion works for number that is larger than 1000.
* Instead of doing the conversion from the number to the Roman Numerals. Convert the Roman Numerals to the number instead without using the roman library. (implementing your own conversion)
* Roman Numerals Conversion might not perform well for a much larger number. Use some kind of caching technic so that the number the conversion has seen before will not get computed again.

## Wrapping Up

Hopefully this guide has help you to build a scalable, reliable, and inexpensive RESTful API using AWS Lambda that will do the Roman Numerals Conversion for you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Tutorial: AWS Lambda with API Gateway](https://medium.com/@jconning/tutorial-aws-lambda-with-api-gateway-36a8513ec8e3) by [Jim Conning](https://medium.com/@jconning)
* [Create a Serverless REST API with Node.JS, AWS Lambda, DynamoDB & API Gateway](https://hackernoon.com/create-a-serverless-rest-api-with-node-js-aws-lambda-dynamodb-api-gateway-f08e7111fd16) by [Mohamed Labouardy](https://hackernoon.com/@mlabouardy)
* [Converting Roman Numerals to integers in python](https://stackoverflow.com/questions/19308177/converting-roman-numerals-to-integers-in-python/22802368)
* [AWS lambda building external dependency libraries in python](https://stackoverflow.com/questions/45179452/aws-lambda-building-external-dependency-libraries-in-python)
* [python-lambda](https://github.com/nficano/python-lambda) by [Nick Ficano](https://github.com/nficano)
* [Creating a Deployment Package (Python)](http://docs.aws.amazon.com/lambda/latest/dg/lambda-python-how-to-create-deployment-package.html)
* [roman 2.0.0](https://pypi.python.org/pypi/roman)