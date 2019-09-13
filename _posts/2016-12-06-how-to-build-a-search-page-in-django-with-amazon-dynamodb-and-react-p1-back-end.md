---
layout: post
title: "How to build a search page in Django with Amazon Dynamodb and React? Part 1 (Back-end)"
author: poanchen
date: 2016-12-06 08:30:30
tags:
- Amazon Dynamodb
- AWS
- Back-end
- Database
- Django
- HTML
- NoSQL
- PoAn (Baron) Chen
- Python
- React
---
Hello everyone, I thought that by creating this tutorial about how to build a search page in [Django](https://www.djangoproject.com/) along with [Amazon Dynamodb](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) and [React](https://facebook.github.io/react/) might help you guys to understand more about those trending technologies. First off, I would like to briefly talk about the search page. As you guys can imagine, a search page is a place where you allow user to search for what they want. For example, you would like to find a billionaire whose net worth is under 50 Billion and currently lives in Palo Alto, CA. For simplicity, we will be ignoring on how you would set up a Django environment in your own computer. If you have not done so, please go to [here](https://docs.djangoproject.com/en/1.10/intro/install/). Also, we will be skipping on how to set up Amazon dynamodb as well. If you have trouble with setting up for Amazon Dynamodb, please go to [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SampleData.CreateTables.html) for more detailed instruction. Now, before we do anything, we should fill in some dummy datas into the database for us to use later. Here is what the data looks like in the database.

## Screenshots of dummy data in the database

<img src="/img/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/dummy data in the database.PNG" alt="An example of dummy data in the database">

Now, we need to add the url search into the url pattern in the Django in order for it to work like this, http://127.0.0.1:8000/search. To do that in Django, we can configure it in urls.py.

## Add search url into the urls.py
{% highlight python %}
  from django.conf.urls import url

  urlpatterns = [
    # http://127.0.0.1:8000/search
    # http://127.0.0.1:8000/search/
    url(r'^search/?', views.search, name='search'),
  ]
{% endhighlight %}
Then, we need to create a HTML page for search so that the search method would know which page it should render. In Django, you may simply add the HTML page in the folder named templates. If you are not familiar with templates in Django, be sure to check out this [site](https://docs.djangoproject.com/en/1.10/topics/templates/).

## Sample of what the search.html looks like
{% highlight html %}
  Hello there!
{% endhighlight %}
Now, we may go to the views.py, this file should be side by side with the urls.py, the one you modified earlier. Add these piece of codes to notify the search method to render the search.html page.

## Told the views.py to render the search.html page
{% highlight python %}
  from django.shortcuts import render
  from django.template import loader
  from django.http import HttpResponse

  # http://127.0.0.1:8000/search
  # http://127.0.0.1:8000/search/
  def search(request):
    template = loader.get_template('search.html')
    context = {}

    return HttpResponse(template.render(context, request))
{% endhighlight %}
Try go to the http://127.0.0.1:8000/search and see if you can see the Hello there! If you can see it, that means that you did it correctly. If you cannot, try to turn on your debug mode and see what went wrong! Next, in order for the search page to work, we need to retrieve the value of the GET parameter from the requested url. For example, say you need to find the billionaire whose net worth is under 50 Billion, and the requested url might look something like this, http://127.0.0.1:8000/search?net_worth_under=50. Or you are interested in billionaire who is currently located in New York, then the query might look something like this, http://127.0.0.1:8000/search?current_residence=New York, NY. Here is what the method might look like in order to get the values of GET parameters.

## Method to retrieve the value of the GET parameter from the requested url
{% highlight python %}
  def retrieve_all_get_parameters(request):
    param = {}
    net_worth_under = request.GET.get('net_worth_under')
    current_residence = request.GET.get('current_residence')

    if net_worth_under != None and net_worth_under != '':
      param['net_worth_under'] = net_worth_under
    if current_residence != None and current_residence != '':
      param['current_residence'] = current_residence

    return param
{% endhighlight %}
Now, let's modify the search method a little bit to see if the method retrieve_all_get_parameters is working properly.

## Check to see if the method retrieve_all_get_parameters is working properly
{% highlight python %}
  from django.shortcuts import render
  from django.template import loader
  from django.http import HttpResponse

  # http://127.0.0.1:8000/search
  # http://127.0.0.1:8000/search/
  def search(request):
    template = loader.get_template('search.html')
    params = retrieve_all_get_parameters(request)

    return HttpResponse(template.render(params, request))
{% endhighlight %}

## search.html
{% highlight html %}
  {% raw %}{{ net_worth_under }}<br>{% endraw %}
  {% raw %}{{ current_residence }}{% endraw %}
{% endhighlight %}
Try type in this, http://127.0.0.1:8000/search?net_worth_under=50&current_residence=New York, NY and you should be able to see your result print out on the page! Once we have this, we may move to the next level. Try to implment the code in such a way that when user comes to the search page, it first returns all the billionaire from the database.

## Made database connection and simply return all the billionaire from the database
{% highlight python %}
  def get_list_of_billionaires(param):
    try:
      table = dynamodb.Table('put_your_amazon_dynamodb_table_name_here')
    except botocore.exceptions.ClientError as e:
      # http://stackoverflow.com/questions/33068055/boto3-python-and-how-to-handle-errors
      return 'failed'
    else:
      response = table.scan()
      if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        try:
          item = response['Item']
        except KeyError:
          return None
        return item
{% endhighlight %}

## In method search,
{% highlight python %}
  def search(request):
    template = loader.get_template('search.html')
    params = retrieve_all_get_parameters(request)
    billionaires = get_list_of_billionaires(params)
    context = {
      'billionaires' : billionaires
    }

    return HttpResponse(template.render(context, request))
{% endhighlight %}

## In search.html,

<pre>
  <code class="html">
    {% raw %}{% for billionaire in billionaires %}
      {{ billionaire.first_name }} {{ billionaire.last_name }}
      {{ billionaire.source_of_wealth }}
      {{ billionaire.current_location }}
      {{ billionaire.net_worth }}
    {% endfor %}{% endraw %}
  </code>
</pre>
Now, when you go to http://127.0.0.1:8000/search, you should be able to see something like this.

## Screenshots of printing out all the billionaire in the database

<img src="/img/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/sample output of all the billionaire in the database.PNG" alt="Sample output of all the billionaire in the database"><br>
It seems to be working fine. Now, let's work on the filtering part in the search page. There are few ways of doing filtering with Amazon Dynamodb, we will be using scan operation as our database is consider small. In production, you should use query instead for better performace. For more information about this, go ahead and read [this offical document](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/QueryAndScan.html) by Amazon. First, we need to work on the filter expression that is designed for Amazon Dynamodb. Your code should look something like this.

## In method get_list_of_billionaires,
{% highlight python %}
  def get_list_of_billionaires(param):
    filter_expression = []
    expression_attribute_names = {}
    expression_attribute_values = {}

    try:
      net_worth_under = param['net_worth_under']
      filter_expression.append('(#net_worth <= :net_worth_under)')
      expression_attribute_names['#net_worth'] = 'net_worth'
      expression_attribute_values[':net_worth_under'] = net_worth_under
    except KeyError:
      pass
    try:
      current_residence = param['current_residence']
      filter_expression.append('(#l = :current_residence)')
      expression_attribute_names['#l'] = 'current_location'
      expression_attribute_values[':current_residence'] = current_residence
    except KeyError:
      pass
{% endhighlight %}
So, at the end, in the array of filter_expression, we will have all the necessary query if needed. Attribute names and values are for setting the values for variables in the filter expression, so that later on, we can do the comparison operation with the query. Next, we need to write a method to combine all the query in the filter_expression with the 'and'. For example, the query might look something like this, (#net_worth <= :net_worth_under) and (#l = :current_residence)


## Method to combine queries into one
{% highlight python %}
  def filter_expression_to_string(filter_expression):
    if not filter_expression:
      return ''
    length_of_filter_expression = len(filter_expression)
    filter_expression_to_string = ''
    for x in range(length_of_filter_expression):
      filter_expression_to_string += filter_expression[x]
      if x + 1 != length_of_filter_expression:
        filter_expression_to_string += ' and '
    return filter_expression_to_string
{% endhighlight %}
Once we have this, we can easily do the filtering part by doing this.

## In method get_list_of_billionaires,
{% highlight python %}
  try:
    table = dynamodb.Table('put_your_amazon_dynamodb_table_name_here')
  except botocore.exceptions.ClientError as e:
    # http://stackoverflow.com/questions/33068055/boto3-python-and-how-to-handle-errors
    return 'failed'
  else:
    filtered_string = filter_expression_to_string(filter_expression)
    if filtered_string != '' and expression_attribute_names and expression_attribute_values:
      response = table.scan(
        FilterExpression = filtered_string,
        ExpressionAttributeNames = expression_attribute_names,
        ExpressionAttributeValues = expression_attribute_values,
      )
    else:
      response = table.scan(
        ReturnConsumedCapacity = 'TOTAL',
      )
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
      try:
        item = response['Item']
      except KeyError:
        return None
      return item
{% endhighlight %}
Now, your search page should be fully working. Here are some of the examples.

## Screenshots of searching for billionaire whose net worth is under 40 Billion and currently lives in New York, NY

<img src="/img/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/search for billionaire whose net worth is under 40 Billion and currently lives in New York, NY.PNG" alt="Result of billionaire whose net worth is under 40 Billion and currently lives in New York, NY"><br>

## Screenshots of searching for billionaire whose net worth is under 51 Billion

<img src="/img/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/search for billionaire whose net worth is under 51 Billion.PNG" alt="Result of billionaire whose net worth is under 51 Billion"><br>

## Screenshots of searching for billionaire who currently lives in Medina, WA

<img src="/img/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/search for billionaire who currently lives in Medina, WA.PNG" alt="Result of billionaire who currently lives in Medina, WA"><br>

## Full code for urls.py
{% highlight python %}
  from django.conf.urls import url

  urlpatterns = [
    # http://127.0.0.1:8000/search
    # http://127.0.0.1:8000/search/
    url(r'^search/?', views.search, name='search'),
  ]
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/urls.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

## Full code for views.py
{% highlight python %}
  from django.shortcuts import render
  from django.template import loader
  from django.http import HttpResponse
  from boto3.dynamodb.conditions import Key, Attr
  import boto3
  import botocore

  # dynamodb configuration
  dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id='put_your_aws_access_key_here',
    aws_secret_access_key='put_your_aws_secret_access_key_here',
    region_name='puy_your_amazon_dynamodb_region_here')

  # http://127.0.0.1:8000/search
  # http://127.0.0.1:8000/search/
  def search(request):
    template = loader.get_template('search.html')
    params = retrieve_all_get_parameters(request)
    billionaires = get_list_of_billionaires(params)
    context = {
      'billionaires' : billionaires
    }

    return HttpResponse(template.render(context, request))

  def get_list_of_billionaires(param):
    filter_expression = []
    expression_attribute_names = {}
    expression_attribute_values = {}

    try:
      net_worth_under = param['net_worth_under']
      filter_expression.append('(#net_worth <= :net_worth_under)')
      expression_attribute_names['#net_worth'] = 'net_worth'
      expression_attribute_values[':net_worth_under'] = net_worth_under
    except KeyError:
      pass
    try:
      current_residence = param['current_residence']
      filter_expression.append('(#l = :current_residence)')
      expression_attribute_names['#l'] = 'current_location'
      expression_attribute_values[':current_residence'] = current_residence
    except KeyError:
      pass
    try:
      table = dynamodb.Table('put_your_amazon_dynamodb_table_name_here')
    except botocore.exceptions.ClientError as e:
      # http://stackoverflow.com/questions/33068055/boto3-python-and-how-to-handle-errors
      return 'failed'
    else:
      filtered_string = filter_expression_to_string(filter_expression)
      if filtered_string != '' and expression_attribute_names and expression_attribute_values:
        response = table.scan(
          FilterExpression = filtered_string,
          ExpressionAttributeNames = expression_attribute_names,
          ExpressionAttributeValues = expression_attribute_values,
        )
      else:
        response = table.scan(
          ReturnConsumedCapacity = 'TOTAL',
        )
      if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        try:
          item = response['Item']
        except KeyError:
          return None
        return item

  def retrieve_all_get_parameters(request):
    param = {}
    net_worth_under = request.GET.get('net_worth_under')
    current_residence = request.GET.get('current_residence')

    if net_worth_under != None and net_worth_under != '':
      param['net_worth_under'] = net_worth_under
    if current_residence != None and current_residence != '':
      param['current_residence'] = current_residence

    return param

  def filter_expression_to_string(filter_expression):
    if not filter_expression:
      return ''
    length_of_filter_expression = len(filter_expression)
    filter_expression_to_string = ''
    for x in range(length_of_filter_expression):
      filter_expression_to_string += filter_expression[x]
      if x + 1 != length_of_filter_expression:
        filter_expression_to_string += ' and '
    return filter_expression_to_string
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/views.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

## Full code for search.html
{% highlight html %}
  {% raw %}{% for billionaire in billionaires %}
    {{ billionaire.first_name }} {{ billionaire.last_name }}
    {{ billionaire.source_of_wealth }}
    {{ billionaire.current_location }}
    {{ billionaire.net_worth }}
  {% endfor %}{% endraw %}
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end/search.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

## Wrapping Up

Hopefully this guide has given you the confidence to do the scan operation in Amazon Dynamodb and see how it works with the Django under the hood. I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Django](https://www.djangoproject.com/)
* [Introduction of Amazon Dynamodb](https://aws.amazon.com/dynamodb)
* [Amazon Dynamodb](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
* [Learning React.js: Getting Started and Concepts](https://scotch.io/tutorials/learning-react-getting-started-and-concepts)
* [React](https://facebook.github.io/react/)
* [Source code of React](https://github.com/facebook/react)

### Django

* [Install Django](https://docs.djangoproject.com/en/1.10/intro/install/)
* [Templates in Django](https://docs.djangoproject.com/en/1.10/topics/templates/)

### Amazon Dynamodb

* [Set up Amazon Dynamodb](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SampleData.CreateTables.html)
- [Query and Scan Operations in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/QueryAndScan.html)