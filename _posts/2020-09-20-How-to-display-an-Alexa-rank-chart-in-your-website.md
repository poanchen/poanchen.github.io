---
layout: post
title: "How to display an Alexa rank chart in your website?"
author: poanchen
date: 2020-09-20 08:30:30
tags:
- Alexa
- Azure Blob Storage
- Chart.js
- Front-end
- Google Sheets
- IFTTT
- RESTful API
---
Ever wonder how to display an [Alexa rank chart](https://www.alexa.com/siteinfo/poanchen.github.io#section_traffic) in your website? You are in luck, in this tutorial, we are going to show you how it can be done.

In a nutshell, this is how it works. We would query this free [Alexa API endpoint](https://data.alexa.com/data?cli=10&url=poanchen.github.io) once a day to get the Alexa global rank for a specifc website. We then [parse](https://docs.python.org/3.7/library/xml.etree.elementtree.html) the result as XML and send the rank to [Google Sheets](https://www.google.com/sheets/about) via [IFTTT](https://ifttt.com). Now that we have the rank stored in [Google Sheets](https://www.google.com/sheets/about), we simply need to download it and go through the ranks to retrieve global rank for each month of the year. Once every month of the year is retrieved, it is store in a JSON file and upload it to [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs). In the website, simply show the ranks to user using [Chart.js](https://www.chartjs.org) with the data coming from [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs).

Let's start! We will be breaking down the task to 3.

The first task will get the rank from [Alexa API endpoint](https://data.alexa.com/data?cli=10&url=poanchen.github.io), process it and send the rank to [Google Sheets](https://www.google.com/sheets/about) via [IFTTT](https://ifttt.com).

The second task will download the ranks from [Google Sheets](https://www.google.com/sheets/about), process it and upload it to [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs) for website to use.

The third task will simply show the data to user in the front end.

### The first task
This will get the rank from [Alexa API endpoint](https://data.alexa.com/data?cli=10&url=poanchen.github.io), process it and send the rank to [Google Sheets](https://www.google.com/sheets/about) via [IFTTT](https://ifttt.com).

#### Set up IFTTT Applets
Head over to [IFTTT](https://ifttt.com/create) to create an Applets. If you do not have an account with them, simply [create](https://ifttt.com/join) one. IFTTT is a great service that allows you to create chains of simple conditional statements, called applets. An applet is triggered by changes that occur within other web services such as Webhooks, Spotify and many others. For example, an applet may send an email to you when an user retweet your twitter post.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/create applets page.JPG" alt="create applets page">

For the "If This", let's select the Webhooks.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/search webhooks.JPG" alt="search webhooks">

Specify your event name as add_alexa_rank, and click Create trigger.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/add event name.JPG" alt="add event name">

Now that we have "If This", let's set up the "Then That",

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/then that.JPG" alt="then that">

In your "Then That", add Google Sheets.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/google sheets.JPG" alt="google sheets">

Make sure you select "Add row to spreadsheet" option since we don't want to overwrite existing ranks.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/add row.JPG" alt="add row">

Here is how I set up my action.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/action.JPG" alt="action">

Click Create action follow by Continue button.

Review your changes and make sure it looks good.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/complete.JPG" alt="complete">

If you created the applet successfully, you should see this.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/applets.JPG" alt="applets">

Now that you have the applet ready, let's get to work!

#### Get the rank from Alexa API endpoint
We need to set up our config before we can get started.
{% highlight python %}
import os
config = {}

# config for your site
config["website"] = "https://poanchen.github.io"

# config for your ifttt
config["iftttApiEndpoint"] = "https://maker.ifttt.com/trigger/%s/with/key/%s"
config["iftttEventName"] = "add_alexa_rank"
config["iftttApiMakerKey"] = os.environ['IFTTTAPIMAKERKEY'] # get the key from https://ifttt.com/maker_webhooks/settings

# config for alexa site
config["alexaCli"] = 10
config["alexaApiEndpoint"] = "http://data.alexa.com/data"
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/addAlexaConfig.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Your iftttApiMakerKey will be right [here](https://ifttt.com/maker_webhooks/settings) and the rest should be exactly the same except the value of the website.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/key.JPG" alt="key">

Now that we have all the values needed for config, let's get this rolling!

We simply need to call Alexa API endpoint to get the rank.

{% highlight python %}
import requests, xml.etree.ElementTree as ET, sys
execfile("config.py")
CLI = config["alexaCli"]

def getDefaultAlexaParams(url, cli=CLI):
  return """?cli=%d&url=%s""" % (cli, url)
def getGlobalRankIfAny(xml):
  try:
    return xml[0].find("POPULARITY").get("TEXT")
  except:
    pass
def getCountryNameIfAny(xml):
  try:
    return xml[0].find("COUNTRY").get("NAME")
  except:
    pass
def getCountryRankIfAny(xml):
  try:
    return xml[0].find("COUNTRY").get("RANK")
  except:
    pass

if __name__ == "__main__":
  # getting site rank from Alexa api
  r = requests.get(config["alexaApiEndpoint"] + 
    getDefaultAlexaParams(config["website"]))
  if r.status_code != requests.codes.ok:
    print "Alexa api end-point went wrong. Please try again later"
    sys.exit(0)

  # reading the xml and retrieve the rank
  xml = ET.fromstring(r.content)

  print(getGlobalRankIfAny(xml)) # for example, 523849
  print(getCountryNameIfAny(xml)) # for example, United States
  print(getCountryRankIfAny(xml)) # for example, 359604

{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/getAlexaRank.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

#### Parse the result as XML and send the rank to Google Sheets via IFTTT
{% highlight python %}
import requests, xml.etree.ElementTree as ET, sys
execfile("config.py")
CLI = config["alexaCli"]

def getDefaultAlexaParams(url, cli=CLI):
  return """?cli=%d&url=%s""" % (cli, url)
def getDefaultAlexaPostParams(gr, cn, cr):
  return {"value1": gr, "value2": cn, "value3": cr}
def getGlobalRankIfAny(xml):
  try:
    return xml[0].find("POPULARITY").get("TEXT")
  except:
    pass
def getCountryNameIfAny(xml):
  try:
    return xml[0].find("COUNTRY").get("NAME")
  except:
    pass
def getCountryRankIfAny(xml):
  try:
    return xml[0].find("COUNTRY").get("RANK")
  except:
    pass

if __name__ == "__main__":
  # getting site rank from Alexa api
  r = requests.get(config["alexaApiEndpoint"] + 
    getDefaultAlexaParams(config["website"]))
  if r.status_code != requests.codes.ok:
    print "Alexa api end-point went wrong. Please try again later"
    sys.exit(0)

  # reading the xml and retrieve the rank
  xml = ET.fromstring(r.content)

  # trigger the ifttt api
  payload = getDefaultAlexaPostParams(getGlobalRankIfAny(xml),
    getCountryNameIfAny(xml),
    getCountryRankIfAny(xml))
  r = requests.post(config["iftttApiEndpoint"] % \
    (config["iftttEventName"], config["iftttApiMakerKey"]), 
    data=payload)
  if r.status_code != requests.codes.ok:
    print "Ifttt api end-point went wrong. Please try again later"
    sys.exit(0)
  print "yaa, entry has been added to your Google spreadsheet"

{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/addAlexaRank.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now, we would need to set up a cron job to run this guy once a day. Here is how I set it up,

{% highlight python %}
00 9 * * * cd /path/to/the/add-alexa-rank-ifttt; python addAlexaRank.py >> add-alexa-rank.log; 
date >> add-alexa-rank.log;
{% endhighlight %}

At 9:00 AM every day, the cron job will be responsible to run this script once and output its result to the log file. In case you need help with figuring out your cron job time, check out this [awesome](https://crontab.guru/#00_9_*_*_*) website.

### The second task
The second task will download the ranks from [Google Sheets](https://www.google.com/sheets/about), process it and upload it to [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs) for website to use.

#### Download the ranks from Google Sheets

Follow [this](https://docs.microsoft.com/azure/storage/common/storage-account-create) tutorial to create an [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs) account and get your access key here.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/access key.JPG" alt="access key">

You must also [create](https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) a container so that you have a place for your JSON file.

Let's set up the config file.

{% highlight python %}
import os
config = {}

config['excelDownloadUrl'] = "urlToYourGoogleSheet" # for example, "https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXX/export?format=csv"
config['excelFileName'] = "poanchen - alexa"
config['excelFileExtension'] = "json"
config['excelFilePath'] = "./"

# Azure Portal
config['accountName'] = "poanchengithubio"
config['accountKey'] = os.environ['AZUREPORTALACCOUNTKEY'] # get the key from https://portal.azure.com

# Azure Blob Storage
config['containerName'] = "poanchen"

{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/uploadAlexaConfig.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now that we have the config ready, let's go ahead and download the sheets from Google

{% highlight python %}
import requests, csv, re
execfile("config.py")

# Download the sheets
print "Beginning to download the CSV from Google Sheets"
r = requests.get(config['excelDownloadUrl'])
open(config['excelFileName'], 'wb').write(r.content)
print "Finished downloading the sheets..."
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/downloadAlexaRank.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

#### Go through the Google Sheets (ranks) to retrieve global rank for each month of the year

{% highlight python %}
# Convert CSV to JSON (Including Data Decimation)
import json
print "Converting CSV to JSON format..."
months = ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February']
i = 0
json_data = []
been_throughed_months = set()
with open(config['excelFileName']) as csvDataFile:
  csvReader = csv.reader(csvDataFile)
  for row in csvReader:
    matchDate = re.match(r'^(%s) (\d*),\s(\d*)\sat\s\d\d:\d\d[AP]M' % months[i % 12], row[0])
    if matchDate and int(matchDate.group(2)) >= 10:
      date_and_time = matchDate.group(1) + ', ' + matchDate.group(3)
      if (date_and_time not in been_throughed_months and row[1] != '' and row[2] != '' and row[3] != '') or int(matchDate.group(2)) == 28:
        json_data.append({
          "Date and Time" : date_and_time,
          "Global Rank" : int(row[1]),
          "Top Ranked Country" : row[2] if row[2] != '' else "",
          "Country Rank" : int(row[3]) if row[3] != '' else "",
        })
        been_throughed_months.add(date_and_time)
        i = i + 1
print "Finished converting...Time to write to a file and save as JSON"
full_file_name = config['excelFileName'] +\
  "." +\
  config['excelFileExtension']
open(full_file_name, 'wb').write(json.dumps(json_data))
print "Finished writing."
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/parseAlexaRank.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

The code will try to find if any row has all the information in there, otherwise, it falls back with the last one. At the end, the result is stored as a JSON file.

#### Upload the JSON file to Azure Blob Storage
{% highlight python %}
# Upload the JSON file to my Azure Blob Storage
from azure.storage.blob import BlockBlobService
print "Beginning to upload the JSON file"
blob_service = BlockBlobService(config['accountName'], config['accountKey'])
full_path_to_file = config['excelFilePath'] +\
  full_file_name
blob_service.create_blob_from_path(
  config['containerName'],
  full_file_name,
  full_path_to_file)
print "Finished uploading the JSON file"
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/uploadAlexaRank.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now, we would need to set up a cron job to run this guy once a month. Here is how I set it up,

{% highlight python %}
00 9 15 * * cd /path/to/the/upload-alexa-rank; python script.py >> output.log; date >> output.log;
{% endhighlight %}

At 9:00 AM on the 15th of the month, the cron job will be responsible to run this script once and output its result to the log file. In case you need help with figuring out your cron job time, check out this [awesome](https://crontab.guru/#00_9_15_*_*) website.

### The third task
The third task will show the data to user in the Front-end.

### Show the data to user in the Front-end.
{% highlight html %}
<h2>Alexa rank</h2>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>

<canvas id="myChart"></canvas>
<script>
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
	if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
		var labels = [], data = [], json = JSON.parse(request.response);
		for(var i = 0; i < json.length; i++) {
			labels.push(json[i]['Date and Time']);
			data.push(json[i]['Global Rank']);
		}
		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					label: 'Global Rank for poanchen.github.io',
					data: data,
					fill: false
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							reverse: true
						}
					}]
				}
			}
		});
	}
};
request.open('GET', 'https://poanchengithubio.blob.core.windows.net/poanchen/poanchen - alexa.json?sp=rl&st=2020-09-12T11:44:01Z&se=2030-09-13T11:44:00Z&sv=2019-12-12&sr=b&sig=m8jGz72tUxYfyyflfTVdr7CVdTcyN4aMPIM6uEi4hRE%3D', true);
request.send(null);
</script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/20/How-to-display-an-Alexa-rank-chart-in-your-website/alexaRank.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

This is what it would look like.

<img src="\img\2020\09\20\How-to-display-an-Alexa-rank-chart-in-your-website/alexa rank.JPG" alt="alexa rank">

Hopefully your website's alexa rank will keep going up haha!

Tada! You should now be able to go home and add Alexa rank chart in your website. If you do, please let us know in the comments below. If you happen to have any questions, feel free to ask us in the comments as well!

## Wrapping Up

Hopefully this article will help you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Fetching Alexa data [closed]](https://stackoverflow.com/questions/3676376/fetching-alexa-data).
* [poanchen.github.io - Alexa](https://www.alexa.com/siteinfo/poanchen.github.io) by [Alexa](https://alexa.com).
* [Alexa Web Services](https://aws.amazon.com/alexa) by [Amazon Web Services](https://aws.amazon.com).
* [xml.etree.ElementTree — The ElementTree XML API¶](https://docs.python.org/3.8/library/xml.etree.elementtree.html) by [Python](https://www.python.org).
* [Google Sheets](https://www.google.com/sheets/about) by [Google](https://www.google.com).
* [poanchen/upload-alexa-rank](https://github.com/poanchen/upload-alexa-rank) by [PoAn (Baron) Chen](https://poanchen.github.io).
* [poanchen/add-alexa-rank-ifttt](https://github.com/poanchen/add-alexa-rank-ifttt) by [PoAn (Baron) Chen](https://poanchen.github.io).
