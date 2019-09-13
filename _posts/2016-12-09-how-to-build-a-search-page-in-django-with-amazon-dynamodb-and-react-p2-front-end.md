---
layout: post
title: "How to build a search page in Django with Amazon Dynamodb and React? Part 2 (Front-end)"
author: poanchen
date: 2016-12-09 08:30:30
tags:
- Amazon Dynamodb
- AWS
- Babel
- Front-end
- Database
- Django
- HTML
- NoSQL
- PoAn (Baron) Chen
- Python
- React
---
Before we begin, If you have not yet read the post about how to build a search page in Django with Amazon Dynamodb and React? Part 1, then please read [this](/blog/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end) before you carry on. In this tutorial, we will be mainly focus on using React to make the front-end of the search page. Also, we will be discussing on how we approach to the solution using two different ways. Long story short, the big differences of two would be that one is filtering in the client side, and another one is filtering in the server side. Let's discuss about the first way in this tutorial. In the first way, we will be using filter to remove those person who does not meet the requirments. For example, say a user lives in New York right now and the user is interested in learning what are the names of the billionaire who currently lives in New York, NY as well. Then, React will comes in handy. Let's begin to write some code in React. Here, we will be implementing the search.html (where we left off from part 1 tutorial). Here is the code from part 1. (unchanged)

## Original code of search.html in part 1
{% highlight html %}
  {% raw %}{% for billionaire in billionaires %}
    {{ billionaire.first_name }} {{ billionaire.last_name }}
    {{ billionaire.source_of_wealth }}
    {{ billionaire.current_location }}
    {{ billionaire.net_worth }}
  {% endfor %}{% endraw %}
{% endhighlight %}
Then, we need to modify the code so that we are using React way to represent the information. Before, we do anything. We first try to print the hello world in React way. And, here is how we are doing it.

## Hello World version of React code
{% highlight html %}
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

  <div id='react-container'></div>
  <script type="text/babel">
    var ListOfBillionaire = React.createClass({
      render() {
        return (
          <p>
            Hello World
          </p>
        )
      }
    })
    ReactDOM.render(<ListOfBillionaire />,
      document.getElementById('react-container'))
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/hello-world-in-react-way.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>
Pretty simple hul! Then, we simply need to pass the data from Django controller to React. But, before we do that. We probably need to modify the back-end code a little bit in order for it to work. In the views.py from the part 1, there is a method called get_list_of_tutors and we need to make sure that @variables items is a JSON when it is return. We may simply do something like this.

## Modify the views.py a little bit so that the get_list_of_tutors returns as a JSON
{% highlight python %}
  import json
  ...
  ...
  ...
  def get_list_of_tutors(param):
  ...
  ...
  ...
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
      try:
        item = response['Item']
      except KeyError:
        return None
      return json.dumps(items, indent=4)
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/modified-views.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>
That is it. Then, now we may easily treat it as JSON for the @variable billionaires and pass it to React. But, before we do that, let's try to see if we can print out the JSON billionaires in JavaScript.

## Print out the JSON billionaires in JavaScript
{% highlight html %}
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

  <div id='react-container'></div>
  <script type="text/babel">
    var listOfBillionaireFromDB = {% raw %}{{ billionaires|safe }};{% endraw %}
    console.log(listOfBillionaireFromDB);
    var ListOfBillionaire = React.createClass({
      render() {
        return (
          <p>
            Hello World
          </p>
        )
      }
    })
    ReactDOM.render(<ListOfBillionaire />,
      document.getElementById('react-container'))
  </script>
{% endhighlight %}
You should be able to see the array print out in the console and when you look into it. The data for each billionaire should show up. Then, we simply need to pass the @variable listOfBillionaireFromDB to React. So that we can print out all the billionaire information from the database.

## Pass data to React
{% highlight html %}
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

  <div id='react-container'></div>
  <script type="text/babel">
    var listOfBillionaireFromDB = {% raw %}{{ billionaires|safe }};{% endraw %}
    var ListOfBillionaire = React.createClass({
      getInitialState() {
        return {
          ListOfBillionaireFromDB : listOfBillionaireFromDB
        }
      },
      render() {
        return (
          <p>
            Hello World
          </p>
        )
      }
    })
    ReactDOM.render(<ListOfBillionaire />,
      document.getElementById('react-container'))
  </script>
{% endhighlight %}
Now, we have stored the JSON to the @variable ListOfBillionaireFromDB. If you need to access it, you can simply do this in React, this.state.ListOfBillionaireFromDB Let's try to print out all the billionaire information that just looked like before.

## Print out all the billionaire information
{% highlight html %}
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

  <div id='react-container'></div>
  <script type="text/babel">
    var listOfBillionaireFromDB = {% raw %}{{ billionaires|safe }};{% endraw %}
    var ListOfBillionaire = React.createClass({
      getInitialState() {
        return {
          ListOfBillionaireFromDB : listOfBillionaireFromDB
        }
      },
      eachPerson(person, index) {
        return (
          <p key={ index }>
            { person.first_name } { person.last_name }<br/>
            { person.source_of_wealth }<br/>
            { person.current_location }<br/>
            { person.net_worth }<br/>
          </p>
        )
      },
      render() {
        return (
          <div>
            { this.state.ListOfBillionaireFromDB.map(this.eachPerson) }
          </div>
        )
      }
    })
    ReactDOM.render(<ListOfBillionaire />,
      document.getElementById('react-container'))
  </script>
{% endhighlight %}
Then, we probably need to add a dropdown menu on the top so that user may easily filter to what they want. Let's do that first.

## React code for the dropdown menu
{% highlight html %}
  <div id='react-container-locations-dropdown'></div>
  <script type="text/babel">
    var CurrentLocation = React.createClass({
      getInitialState() {
        return {
          locations: [
            {
              'name' : 'Seattle, WA'
            },
            {
              'name' : 'Omaha, NE'
            },
            {
              'name' : 'Wichita, KS'
            },
            {
              'name' : 'Woodside, CA'
            },
            {
              'name' : 'Medina, WA'
            },
            {
              'name' : 'New York, NY'
            },
            {
              'name' : 'La Coruna, Spain'
            },
            {
              'name' : 'Palo Alto, CA'
            },
            {
              'name' : 'Mexico City, Mexico'
            }
          ],
          selectedLocation : 'Seattle, WA'
        }        
      },
      update(e) {
        this.setState({ selectedLocation : e.target.value });
      },
      eachLocation(location, index) {
        return (<option key={ index }>{ location.name }</option>)
      },
      render() {
        return (
          <select value={ this.state.selectedLocation }
                  onChange={ this.update }>
            { this.state.locations.map(this.eachLocation) }
          </select>
        )
      }
    })
    ReactDOM.render(<CurrentLocation />,
      document.getElementById('react-container-locations-dropdown'))
  </script>
{% endhighlight %}
When you combine them together, you should see something like this.

## Screenshots of the dropdown menu with the list of unfiltered billionaire

<img src="/img/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/dropdown menu with the list of unfiltered billionaire.PNG" alt="An example of dropdown menu with the list of unfiltered billionaire"><br>
Right now, if you try to select different city, the list does not change at all. Let's use the filter so that it actually changes too according to the user's selection. Before, we do that, let's try to combine the ReactDOM of CurrentLocation and ListOfBillionaire so that they are all in the same ReactDOM. Something like this.

## Full code of combined React code
{% highlight html %}
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

  <div id='react-container'></div>
  <script type="text/babel">
    var listOfBillionaireFromDB = {% raw %}{{ billionaires|safe }};{% endraw %}
    var ListOfBillionaire = React.createClass({
      getInitialState() {
        return {
          ListOfBillionaireFromDB : listOfBillionaireFromDB,
          locations: [
            {
              'name' : 'Seattle, WA'
            },
            {
              'name' : 'Omaha, NE'
            },
            {
              'name' : 'Wichita, KS'
            },
            {
              'name' : 'Woodside, CA'
            },
            {
              'name' : 'Medina, WA'
            },
            {
              'name' : 'New York, NY'
            },
            {
              'name' : 'La Coruna, Spain'
            },
            {
              'name' : 'Palo Alto, CA'
            },
            {
              'name' : 'Mexico City, Mexico'
            }
          ],
          selectedLocation : 'Seattle, WA'
        }
      },
      update(e) {
        this.setState({ selectedLocation : e.target.value });
      },
      eachLocation(location, index) {
        return (<option key={ index }>{ location.name }</option>)
      },
      eachPerson(person, index) {
        return (
          <p key={ index }>
            { person.first_name } { person.last_name }<br/>
            { person.source_of_wealth }<br/>
            { person.current_location }<br/>
            { person.net_worth }<br/>
          </p>
        )
      },
      render() {
        return (
          <div>
            <select value={ this.state.selectedLocation }
                    onChange={ this.update }>
              { this.state.locations.map(this.eachLocation) }
            </select>
            { this.state.ListOfBillionaireFromDB.map(this.eachPerson) }
          </div>
        )
      }
    })
    ReactDOM.render(<ListOfBillionaire />,
      document.getElementById('react-container'))
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/combined-ReactDOM-code-for-both-dropdown.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Whenever there is a change of dropdown, the list of people should be changed as well. Thanks to React! Here is the code that does that.

## Full code for dropdown filter for location of the billionaire
{% highlight html %}
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

  <div id='react-container'></div>
  <script type="text/babel">
    var listOfBillionaireFromDB = {% raw %}{{ billionaires|safe }};{% endraw %}
    var ListOfBillionaire = React.createClass({
      getInitialState() {
        return {
          ListOfBillionaireFromDB : listOfBillionaireFromDB,
          locations: [
            {
              'name' : 'Seattle, WA'
            },
            {
              'name' : 'Omaha, NE'
            },
            {
              'name' : 'Wichita, KS'
            },
            {
              'name' : 'Woodside, CA'
            },
            {
              'name' : 'Medina, WA'
            },
            {
              'name' : 'New York, NY'
            },
            {
              'name' : 'La Coruna, Spain'
            },
            {
              'name' : 'Palo Alto, CA'
            },
            {
              'name' : 'Mexico City, Mexico'
            }
          ],
          selectedLocation : 'Seattle, WA',
          showedBillionaire : listOfBillionaireFromDB.filter(billionaire => billionaire.current_location == 'Seattle, WA')
        }
      },
      update(e) {
        this.setState({ selectedLocation : e.target.value });
        var filteredBillionaire = this.state.ListOfBillionaireFromDB.filter(billionaire => billionaire.current_location == e.target.value)
        this.setState({ showedBillionaire : filteredBillionaire });
      },
      eachLocation(location, index) {
        return (<option key={ index }>{ location.name }</option>)
      },
      eachPerson(person, index) {
        return (
          <p key={ index }>
            { person.first_name } { person.last_name }<br/>
            { person.source_of_wealth }<br/>
            { person.current_location }<br/>
            { person.net_worth }<br/>
          </p>
        )
      },
      render() {
        return (
          <div>
            <select value={ this.state.selectedLocation }
                    onChange={ this.update }>
              { this.state.locations.map(this.eachLocation) }
            </select>
            { this.state.showedBillionaire.map(this.eachPerson) }
          </div>
        )
      }
    })
    ReactDOM.render(<ListOfBillionaire />,
      document.getElementById('react-container'))
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/filter-location-in-react-way.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>
As you may see, in the update method, everytime when there is a change in the dropdown, then we simply filter it to make sure that it only shows the relevant billionaire. Here is what it looks like.

## Demo on how the dropdown filter works for location

<img src="/img/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/demo on how the dropdown filter works.gif" alt="A demo on how the dropdown filter works"><br>
Now, let's try to add the filter for the net worth as well. Here is the code.

## Full code for dropdown filter for net worth and location of the billionaire
{% highlight html %}
  <script src="https://unpkg.com/react@15/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>

  <div id='react-container'></div>
  <script type="text/babel">
    var listOfBillionaireFromDB = {% raw %}{{ billionaires|safe }};{% endraw %}
    var ListOfBillionaire = React.createClass({
      getInitialState() {
        return {
          ListOfBillionaireFromDB : listOfBillionaireFromDB,
          locations: [
            {
              'name' : 'Seattle, WA'
            },
            {
              'name' : 'Omaha, NE'
            },
            {
              'name' : 'Wichita, KS'
            },
            {
              'name' : 'Woodside, CA'
            },
            {
              'name' : 'Medina, WA'
            },
            {
              'name' : 'New York, NY'
            },
            {
              'name' : 'La Coruna, Spain'
            },
            {
              'name' : 'Palo Alto, CA'
            },
            {
              'name' : 'Mexico City, Mexico'
            }
          ],
          netWorth: [
            {
              'value' : 85
            },
            {
              'value' : 75
            },
            {
              'value' : 65
            },
            {
              'value' : 55
            },
            {
              'value' : 45
            },
            {
              'value' : 40
            },
            {
              'value' : 35
            }
          ],
          selectedLocation : 'Seattle, WA',
          selectedNetWorth : 85,
          showedBillionaire : listOfBillionaireFromDB.filter(billionaire => billionaire.current_location == 'Seattle, WA' && billionaire.net_worth < 85)
        }
      },
      updateForLocation(e) {
        var net_worth_in_number = parseInt(this.state.selectedNetWorth.split(' ')[3].split('B')[0]);
        this.setState({ selectedLocation : e.target.value });
        var filteredBillionaire = this.state.ListOfBillionaireFromDB.filter(billionaire => billionaire.current_location == e.target.value && billionaire.net_worth < net_worth_in_number)
        this.setState({ showedBillionaire : filteredBillionaire });
      },
      updateForNetWorth(e) {
        var net_worth_in_number = parseInt(e.target.value.split(' ')[3].split('B')[0]);
        this.setState({ selectedNetWorth : e.target.value });
        var filteredBillionaire = this.state.ListOfBillionaireFromDB.filter(billionaire => billionaire.net_worth < net_worth_in_number && billionaire.current_location == this.state.selectedLocation)
        this.setState({ showedBillionaire : filteredBillionaire });
      },
      eachLocation(location, index) {
        return (<option key={ index }>{ location.name }</option>)
      },
      eachNetWorth(netWorth, index) {
        return (<option key={ index }>Net worth under { netWorth.value }B</option>)
      },
      eachPerson(person, index) {
        return (
          <p key={ index }>
            { person.first_name } { person.last_name }<br/>
            { person.source_of_wealth }<br/>
            { person.current_location }<br/>
            { person.net_worth }<br/>
          </p>
        )
      },
      render() {
        return (
          <div>
            <select value={ this.state.selectedNetWorth }
                    onChange={ this.updateForNetWorth }>
              { this.state.netWorth.map(this.eachNetWorth) }
            </select>
            <select value={ this.state.selectedLocation }
                    onChange={ this.updateForLocation }>
              { this.state.locations.map(this.eachLocation) }
            </select>
            { this.state.showedBillionaire.map(this.eachPerson) }
          </div>
        )
      }
    })
    ReactDOM.render(<ListOfBillionaire />,
      document.getElementById('react-container'))
  </script>
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/filter-in-react-way-full-code.html" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

## Demo on how the dropdown filter works for net worth and location

<img src="/img/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/demo on how the dropdown filter works for net worth and location.gif" alt="A demo on how the dropdown filter works for net worth and location"><br>

## Wrapping Up

Hopefully this guide has given you the confidence to do the filter in React way. The other way that uses the server side filtering will be discussed in the next part. Anyways, I hope that this tutorial has helped you and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [How to build a search page in Django with Amazon Dynamodb and React? Part 1 (Back-end)](/blog/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end)
* [React](https://facebook.github.io/react/)
* [Source code of React](https://github.com/facebook/react)

### React

* [Learning React.js: Getting Started and Concepts](https://scotch.io/tutorials/learning-react-getting-started-and-concepts)
* [React for beginner](https://facebook.github.io/react/docs/hello-world.html)
* [Intro to React](https://facebook.github.io/react/tutorial/tutorial.html)