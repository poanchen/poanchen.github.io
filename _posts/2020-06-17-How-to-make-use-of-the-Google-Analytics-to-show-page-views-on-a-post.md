---
layout: post
title: "How to make use of the Google Analytics to show page views on a post?"
author: poanchen
date: 2020-06-17 08:30:30
tags:
- Azure Blob Storage
- Google Analytics
- Python
- JSON
- XML
- PoAn (Baron) Chen
---
Ever wonder how to show views on your website? You are in luck, this post will cover all the technical details that you need to get it started. The simplest way to show how many views this post has is to have a count that got increment it every time when there is a visit. Sounds good and all until, someone kept refreshing the same page to max out the number. Now, this person would be thinking, we just need some unique identifier to identify this person, for example, IP address and then we would only counts them as one although, they kept on refreshing the same page. But, here comes another problem, with the same WiFi router, every user who connects to the WiFi would get assigned the same external IP address. These people are distinct, they should not be counted as just one. This is just incorrect. Now, some other people might suggest that why not just assign a [cookie](https://www.howtogeek.com/119458/htg-explains-whats-a-browser-cookie) to them. In this way, we know if it is the exact same person. For example, we check if the person's browser has the [cookie](https://www.howtogeek.com/119458/htg-explains-whats-a-browser-cookie) assign, if no [cookie](https://www.howtogeek.com/119458/htg-explains-whats-a-browser-cookie) is assign, we know this is a new person. If there is one, we know it is a returning customer. But, here comes two problem, cookie can be deleted, a person can potentially comes to the site, delete the cookie, returns back, we would think that this person is new. Another problem is that, if the same person comes to the site today, a week later, he/she comes back. Does that count as 2 views for the same person? How long should the time be between each visit from the same person in order to count as 2 views? People might have different opinions on this and to be honest, there is no right or wrong answer here. What we are trying to show you is that, this (show views) might seem simple but it is actually not an easy problem to solve. Let me give you another example, how does YouTube accurately count the views of the video. To be honest, I don't know. But, I would bet that it is a complex one. There is a saying that we should avoid "Reinventing the Wheel", which is what we are doing, using [Google Analytics](https://analytics.withgoogle.com) to show views to the users. We bet that many people are already using the [Google Analytics](https://analytics.withgoogle.com), why not leverage it. In this post, we will show you in detail how we show views on our website and feel free to use it in your own website.

Here is the short version of how we do it, in a nutshell, we check out the site's sitemap.xml to get the list of blog posts, call the [Google's Core Reporting API](https://developers.google.com/analytics/devguides/reporting/core/v3/) to get views for each post, store it as JSON and then simply upload the file to [Azure Blob Storage](https://azure.microsoft.com/en-ca/services/storage/blobs). And, of course, we need to do this once a day. (To keep the data fresh with one day old data) The scheduling part is done through [cron job](https://en.wikipedia.org/wiki/Cron). In the front end, we simply call the API to get the static JSON from [Azure Blob Storage](https://azure.microsoft.com/en-ca/services/storage/blobs) and show it to user. And that is it. (Should be do-able with one breath haha)

Here is the long version of how we do it, let's break it down to few parts

Note: In the following example, we will be using the programming language, [Python](https://www.python.org/) as it is one of the best scripting language,

Before we start with coding, these are some of the config you need to set/get in order to continue,

{% highlight python %}
config = {}

config['absolute_path_to_this_project'] = 'absolutePathToThisProject'
config['json_file_name'] = "fileName.json"

# XML
config['xml_url'] = 'urlToYourXml'
config['xml_file_name'] = 'yourFileName'

# Google's Core Reporting API
config['client_secret_file_name'] = 'yourFileName.json'
config['views_start_date'] = 'views_start_date' # 2020-01-01
config['views_end_date'] = 'views_end_date' # 2020-02-01

# Azure Portal
config['account_name'] = 'azureAccountName'
config['account_key'] = 'azureAccountKey'

# Azure Blob Storage
config['container_name'] = 'containerName'
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/config.py#L1" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

### Get the list of blog posts url from site's sitemap.xml

We will be consistenly adding new blog posts, it doesn't make sense to hard code this value, we should make it dynamic and simply grab it from the sitemap.xml as we know it is the source of truth. (If you do not have a sitemap.xml, we strongly recommand you to have one as it helps the search engine to be able to index your pages)

First, let's import the config file so that we can use its value,

{% highlight python %}
execfile('config.py')
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/script.py#L1" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Next, we need to download the XML file from the internet.

{% highlight python %}
# Get the XML
import requests, datetime
print 'Beginning to get the XML file...'
print 'Starting time: %s' % datetime.datetime.now()
r = requests.get(config['xml_url'])
print 'Finished to get the XML file.'
print 'Ending time: %s' % datetime.datetime.now()
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/script.py#L3" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Once the XML is downloaded, we need to extract the relative blog post url from the XML file. Depends on how you configure your blog post url, the regular expression might be different but the idea is similar. Extract them and store them in an array.

{% highlight python %}
# Extract relative blog posts link from the XML
print 'Beginning to extract relative blog posts link from the XML file...'
print 'Starting time: %s' % datetime.datetime.now()
import xml.etree.ElementTree as ET, re
root = ET.fromstring(r.content)
links = []
for child in root:
  match = re.match('https://poanchen\.github\.io(/blog/[0-9]{4}/[0-9]{2}/[0-9]{2}/.+)', child[0].text)
  if match:
    links.append(match.group(1))
print 'Finished to extract relative blog posts link from the XML file.'
print 'Ending time: %s' % datetime.datetime.now()
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/script.py#L11" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

### Call the Google's Core Reporting API to get views for each blog post

The idea is to provide the start and end date, along with the metrics that you are interested with, at the end, filter with the blog post relative url so that we can get the views for the individual post.

{% highlight python %}
# Get the all time views for all the posts from Google's Core Reporting API
import helper
print 'Beginning to get the all time views for each individual blog posts...'
print 'Starting time: %s' % datetime.datetime.now()
core_reporting_api_service = helper.get_core_reporting_api_service()
data = {}
for link in links:
  data[link] = core_reporting_api_service.data().ga().get(
                ids='ga:' + helper.get_the_first_profile_id(core_reporting_api_service),
                start_date=config['views_start_date'],
                end_date=config['views_end_date'] ,
                metrics='ga:pageviews',
                filters='ga:pagepath==%s' % (link)).execute().get('totalsForAllResults').get('ga:pageviews')
print 'Finished to get the all time views for each individual blog posts.'
print 'Ending time: %s' % datetime.datetime.now()
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/script.py#L24" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

You would also need to include the following helper file to make the above work (for full disclosure, most of the helper code are copied from the example code provided by Google)

{% highlight python %}
from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
execfile("config.py")

# Core Reporting API
def get_core_reporting_api_service():
  scope = 'https://www.googleapis.com/auth/analytics.readonly'
  key_file_location = config['client_secret_file_name']

  # Authenticate and construct service.
  service = get_service(
          api_name='analytics',
          api_version='v3',
          scopes=[scope],
          key_file_location=key_file_location)

  return service

# Common Utilits
def get_service(api_name, api_version, scopes, key_file_location):
    """Get a service that communicates to a Google API.
    Args:
        api_name: The name of the api to connect to.
        api_version: The api version to connect to.
        scopes: A list auth scopes to authorize for the application.
        key_file_location: The path to a valid service account JSON key file.
    Returns:
        A service that is connected to the specified API.
    """

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            key_file_location, scopes=scopes)

    # Build the service object.
    service = build(api_name, api_version, credentials=credentials)

    return service

def get_the_first_profile_id(service):
    accounts = service.management().accounts().list().execute()

    if accounts.get('items'):
        account = accounts.get('items')[0].get('id')

        properties = service.management().webproperties().list(
                accountId=account).execute()

        if properties.get('items'):
            property = properties.get('items')[0].get('id')

            profiles = service.management().profiles().list(
                    accountId=account,
                    webPropertyId=property).execute()

            if profiles.get('items'):
                return profiles.get('items')[0].get('id')

    return None
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/helper.py#L1" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

### Store it as JSON

Okay, now that we have got the views for each blog post. We simply need to convert it to JSON so that we can upload them to the Azure Blob Storage.

{% highlight python %}
# Convert dict to JSON file
import json
print 'Beginning to convert dict to JSON file...'
print 'Starting time: %s' % datetime.datetime.now()
open(config['json_file_name'], 'wb').write(json.dumps(data))
print 'Finished to convert dict to JSON file.'
print 'Ending time: %s' % datetime.datetime.now()
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/script.py#L40" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

### Upload the JSON file to the Azure Blob Storage

We upload the file to Azure Blob Storage so that it can be publicly accessible in the internet. (In this way, we kept our site simple, no API endpoint. In addition, storing data in Azure Blob Storage is fairly cheap. I believe that they also support CDN feature in case you have lots of people from around the world who are trying to access your file/data)

{% highlight python %}
# Upload it to the Azure Blob Storage
from azure.storage.blob import BlockBlobService
print 'Beginning to upload the JSON file...'
print 'Starting time: %s' % datetime.datetime.now()
blob_service = BlockBlobService(config['account_name'], config['account_key'])
full_path_to_file = config['absolute_path_to_this_project'] +\
  config['json_file_name']
blob_service.create_blob_from_path(
  config['container_name'],
  config['json_file_name'],
  full_path_to_file)
print 'Finished to upload the JSON file.'
print 'Ending time: %s' % datetime.datetime.now()
{% endhighlight %}
<a href="https://github.com/poanchen/upload-post-stats/blob/298ce1ae20945499e65d8b61d550d63bd045179b/script.py#L48" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

### Run the script once a day using Cron job

This is our set up for the cron job to run the script.

{% highlight bash %}
00 6 * * * cd /path/to/the/upload-post-stats; python script.py >> output.log;
{% endhighlight %}

This simply tells the cron job to run the script once at 6AM everyday. We decided that we are okay with the one day old data. Feel free to be more aggressive on this and make it like every 15 mins or something.

### Call the API to get the static JSON from Azure Blob Storage directly

This last bit will cover how we call the endpoint provided by Azure Blob Storage so that we can show the views to the user on the website.

{% highlight html %}
<p id="stats"></p>

<script>
function getPathName() {
  // this will make sure
  // when url became /blog/2016/11/15/how-to-add-background-music-in-processing-3.0
  // or /blog/2016/11/15/how-to-add-background-music-in-processing-3.0/
  // or /blog/2016/11/15/how-to-add-background-music-in-processing-3.0.html
  // will all go back to /blog/2016/11/15/how-to-add-background-music-in-processing-3.0
  // for disqus to recongize the post
  var pathname = document.location.pathname;
  var dividerList = pathname.split("/");
  if(dividerList[dividerList.length - 1] == "") {
    // there exist trailing "/", we should remove them
    pathname = pathname.slice(0, -1)
  }
  // remove .html if any
  pathname = pathname.replace(".html", "");
  
  return pathname;
}

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
    var json = JSON.parse(request.response);
    if (json[getPathName()] != undefined) {
      document.getElementById('stats').innerHTML = `${Number(json[getPathName()]).toLocaleString()} views`;
    }
  }
};
request.open('GET', 'https://poanchen.blob.core.windows.net/poanchen/poanchen.github.io%20-%20views.json?sp=r&st=2020-04-18T03:32:30Z&se=2030-04-18T11:32:30Z&spr=https&sv=2019-02-02&sr=b&sig=0d1sCUnCzdw8IeO8GwNsuKiGgot3sQuwF3QPsboa2uw%3D', true);
request.send(null);
</script>
{% endhighlight %}
<a href="https://github.com/poanchen/poanchen.github.io/blob/cce2064871dbea8867c64059036e992537aa217d/_includes/post-stats.html#L1" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Pretty simple hul. This is all we have to make it happen.

Here are some questions that you may have for us, and we have answer for them.

## Q&A

Question: Why didn't you guys just call the Google's API to get the views for each blog post in the front end directly?<br>
Answer: Google provides a few ways to authenticate the user to be able to see their data. One way is to login using their Google credential which doesn't work in our case. As I am the only one who has access to my Google account. Another way is to use the [Service Accounts](https://developers.google.com/analytics/devguides/reporting/core/v3/quickstart/service-py#clientId). But this requires you to do it in the back end which is what we did.

Question: Why did you guys pick the program language Python?<br>
Answer: Python is really great with scripting. It has lots of library that you can leverage. In our case, we use xml, google reporting core, json, azure blob storage library. It really makes your life easier with all these libraries. We also done a lot of scripting with Python already, so it is more like a natural choice.

Question: Why did you guys decided to use Azure Blob Storage as storage to keep the JSON file?<br>
Answer: First, it is really cheap. Second, we do not need to worry about having an API end point. Third, we are using Jekyll to build our website. Everything is static, it doesn't make sense to maintain an end point to handle this unless there is no other way.

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. I am sure your user would be happy to see views on your website!

## Wrapping Up

Hopefully you enjoyed this article and will inspire you to add views to your site leveraging Google Analytics. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [upload-post-stats source code](https://github.com/poanchen/upload-post-stats) by [poanchen](https://github.com/poanchen).
* [What is browser cookie?](https://www.howtogeek.com/119458/htg-explains-whats-a-browser-cookie) by [How-To Geek](https://www.howtogeek.com/).
* [Google Reporting Core API](https://developers.google.com/analytics/devguides/reporting/core/v3/) by [Google Analytics](https://developers.google.com/analytics).
* [Azure Blob Storage](https://azure.microsoft.com/en-ca/services/storage/blobs) by [Azure](https://azure.microsoft.com/en-us/).
