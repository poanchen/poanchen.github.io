---
layout: post
title: "How to build a search page in Django with Amazon Dynamodb and React? Part 2 (Front-end)"
author: Poan (Baron) Chen
author_url: https://github.com/poanchen
date: 2016-12-09
---
Before we begin, If you have not yet read the post about how to build a search page in Django with Amazon Dynamodb and React? Part 1, then please read [this](/blog/2016/12/06/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p1-back-end) before you carry on. In this tutorial, we will be mainly focus on using React to make the front-end of the search page. Also, we will be discussing on how we approach to the solution using two different ways. Long story short, the big differences of two would be that one is filtering in the client side, and another one is filtering in the server side. Let's discuss about the first way in this tutorial. In the first way, we will be using filter to remove those person who does not meet the requirments. For example, say a user lives in New York right now and the user is interested in learning what are the names of the billionaire who currently lives in New York, NY as well. Then, React will comes in handy. Let's begin to write some code in React. Here, we will be implementing the search.html (where we left off from part 1 tutorial). Here is the code from part 1. (unchanged)

## Original code of search.html in part 1

<pre>
  <code class="html">
    &#123;% for billionaire in billionaires %&#125;
      &#123;&#123; billionaire.first_name &#125;&#125; &#123;&#123; billionaire.last_name &#125;&#125;&lt;br&gt;
      &#123;&#123; billionaire.source_of_wealth &#125;&#125;&lt;br&gt;
      &#123;&#123; billionaire.current_location &#125;&#125;&lt;br&gt;
      &#123;&#123; billionaire.net_worth &#125;&#125;&lt;br&gt;
      &lt;br&gt;
    &#123;% endfor %&#125;
  </code>
</pre>
Then, we need to modify the code so that we are using React way to represent the information. Before, we do anything. We first try to print the hello world in React way. And, here is how we are doing it.

## Hello World version of React code

<pre>
  <code class="html">
    &lt;script src="https://unpkg.com/react@15/dist/react.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/react-dom@15/dist/react-dom.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"&gt;&lt;/script&gt;

    &lt;div id='react-container'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
      var ListOfBillionaire = React.createClass({
        render() {
          return (
            &lt;p&gt;
              Hello World
            &lt;/p&gt;
          )
        }
      })
      ReactDOM.render(&lt;ListOfBillionaire /&gt;,
        document.getElementById('react-container'))
    &lt;/script&gt;
  </code>
</pre>
Pretty simple hul! Then, we simply need to pass the data from Django controller to React. But, before we do that. We probably need to modify the back-end code a little bit in order for it to work. In the views.py from the part 1, there is a method called get_list_of_tutors and we need to make sure that @variables items is a JSON when it is return. We may simply do something like this.

## Modify the views.py a little bit so that the get_list_of_tutors returns as a JSON

<pre>
  <code class="python">
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
  </code>
</pre>
That is it. Then, now we may easily treat it as JSON for the @variable billionaires and pass it to React. But, before we do that, let's try to see if we can print out the JSON billionaires in JavaScript.

## Print out the JSON billionaires in JavaScript

<pre>
  <code class="html">
    &lt;script src="https://unpkg.com/react@15/dist/react.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/react-dom@15/dist/react-dom.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"&gt;&lt;/script&gt;

    &lt;div id='react-container'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
      var listOfBillionaireFromDB = &#123;&#123; billionaires|safe &#125;&#125;;
      console.log(listOfBillionaireFromDB);
      var ListOfBillionaire = React.createClass({
        render() {
          return (
            &lt;p&gt;
              Hello World
            &lt;/p&gt;
          )
        }
      })
      ReactDOM.render(&lt;ListOfBillionaire /&gt;,
        document.getElementById('react-container'))
    &lt;/script&gt;
  </code>
</pre>
You should be able to see the array print out in the console and when you look into it. The data for each billionaire should show up. Then, we simply need to pass the @variable listOfBillionaireFromDB to React. So that we can print out all the billionaire information from the database.

## Pass data to React

<pre>
  <code class="html">
    &lt;script src="https://unpkg.com/react@15/dist/react.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/react-dom@15/dist/react-dom.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"&gt;&lt;/script&gt;

    &lt;div id='react-container'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
      var listOfBillionaireFromDB = &#123;&#123; billionaires|safe &#125;&#125;;
      var ListOfBillionaire = React.createClass({
        getInitialState() {
          return {
            ListOfBillionaireFromDB : listOfBillionaireFromDB
          }
        },
        render() {
          return (
            &lt;p&gt;
              Hello World
            &lt;/p&gt;
          )
        }
      })
      ReactDOM.render(&lt;ListOfBillionaire /&gt;,
        document.getElementById('react-container'))
    &lt;/script&gt;
  </code>
</pre>
Now, we have stored the JSON to the @variable ListOfBillionaireFromDB. If you need to access it, you can simply do this in React, this.state.ListOfBillionaireFromDB Let's try to print out all the billionaire information that just looked like before.

## Print out all the billionaire information

<pre>
  <code class="html">
    &lt;script src="https://unpkg.com/react@15/dist/react.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/react-dom@15/dist/react-dom.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"&gt;&lt;/script&gt;

    &lt;div id='react-container'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
      var listOfBillionaireFromDB = &#123;&#123; billionaires|safe &#125;&#125;;
      var ListOfBillionaire = React.createClass({
        getInitialState() {
          return {
            ListOfBillionaireFromDB : listOfBillionaireFromDB
          }
        },
        eachPerson(person, index) {
          return (
            &lt;p key={ index }&gt;
              { person.first_name } { person.last_name }&lt;br/&gt;
              { person.source_of_wealth }&lt;br/&gt;
              { person.current_location }&lt;br/&gt;
              { person.net_worth }&lt;br/&gt;
            &lt;/p&gt;
          )
        },
        render() {
          return (
            &lt;div&gt;
              { this.state.ListOfBillionaireFromDB.map(this.eachPerson) }
            &lt;/div&gt;
          )
        }
      })
      ReactDOM.render(&lt;ListOfBillionaire /&gt;,
        document.getElementById('react-container'))
    &lt;/script&gt;
  </code>
</pre>
Then, we probably need to add a dropdown menu on the top so that user may easily filter to what they want. Let's do that first.

## React code for the dropdown menu

<pre>
  <code class="html">
    &lt;div id='react-container-locations-dropdown'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
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
          return (&lt;option key={ index }&gt;{ location.name }&lt;/option&gt;)
        },
        render() {
          return (
            &lt;select value={ this.state.selectedLocation }
                    onChange={ this.update }&gt;
              { this.state.locations.map(this.eachLocation) }
            &lt;/select&gt;
          )
        }
      })
      ReactDOM.render(&lt;CurrentLocation /&gt;,
        document.getElementById('react-container-locations-dropdown'))
    &lt;/script&gt;
  </code>
</pre>
When you combine them together, you should see something like this.

## Screenshots of the dropdown menu with the list of unfiltered billionaire

<img src="/img/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/dropdown menu with the list of unfiltered billionaire.PNG" alt="An example of dropdown menu with the list of unfiltered billionaire"><br>
Right now, if you try to select different city, the list does not change at all. Let's use the filter so that it actually changes too according to the user's selection. Before, we do that, let's try to combine the ReactDOM of CurrentLocation and ListOfBillionaire so that they are all in the same ReactDOM. Something like this.

## Full code of combined React code

<pre>
  <code class="html">
    &lt;script src="https://unpkg.com/react@15/dist/react.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/react-dom@15/dist/react-dom.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"&gt;&lt;/script&gt;

    &lt;div id='react-container'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
      var listOfBillionaireFromDB = &#123;&#123; billionaires|safe &#125;&#125;;
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
          return (&lt;option key={ index }&gt;{ location.name }&lt;/option&gt;)
        },
        eachPerson(person, index) {
          return (
            &lt;p key={ index }&gt;
              { person.first_name } { person.last_name }&lt;br/&gt;
              { person.source_of_wealth }&lt;br/&gt;
              { person.current_location }&lt;br/&gt;
              { person.net_worth }&lt;br/&gt;
            &lt;/p&gt;
          )
        },
        render() {
          return (
            &lt;div&gt;
              &lt;select value={ this.state.selectedLocation }
                      onChange={ this.update }&gt;
                { this.state.locations.map(this.eachLocation) }
              &lt;/select&gt;
              { this.state.ListOfBillionaireFromDB.map(this.eachPerson) }
            &lt;/div&gt;
          )
        }
      })
      ReactDOM.render(&lt;ListOfBillionaire /&gt;,
        document.getElementById('react-container'))
    &lt;/script&gt;
  </code>
</pre>
Whenever there is a change of dropdown, the list of people should be changed as well. Thanks to React! Here is the code that does that.

## Full code for dropdown filter for location of the billionaire

<pre>
  <code class="html">
    &lt;script src="https://unpkg.com/react@15/dist/react.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/react-dom@15/dist/react-dom.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"&gt;&lt;/script&gt;

    &lt;div id='react-container'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
      var listOfBillionaireFromDB = &#123;&#123; billionaires|safe &#125;&#125;;
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
            showedBillionaire : listOfBillionaireFromDB.filter(billionaire =&gt; billionaire.current_location == 'Seattle, WA')
          }
        },
        update(e) {
          this.setState({ selectedLocation : e.target.value });
          var filteredBillionaire = this.state.ListOfBillionaireFromDB.filter(billionaire =&gt; billionaire.current_location == e.target.value)
          this.setState({ showedBillionaire : filteredBillionaire });
        },
        eachLocation(location, index) {
          return (&lt;option key={ index }&gt;{ location.name }&lt;/option&gt;)
        },
        eachPerson(person, index) {
          return (
            &lt;p key={ index }&gt;
              { person.first_name } { person.last_name }&lt;br/&gt;
              { person.source_of_wealth }&lt;br/&gt;
              { person.current_location }&lt;br/&gt;
              { person.net_worth }&lt;br/&gt;
            &lt;/p&gt;
          )
        },
        render() {
          return (
            &lt;div&gt;
              &lt;select value={ this.state.selectedLocation }
                      onChange={ this.update }&gt;
                { this.state.locations.map(this.eachLocation) }
              &lt;/select&gt;
              { this.state.showedBillionaire.map(this.eachPerson) }
            &lt;/div&gt;
          )
        }
      })
      ReactDOM.render(&lt;ListOfBillionaire /&gt;,
        document.getElementById('react-container'))
    &lt;/script&gt;
  </code>
</pre>
As you may see, in the update method, everytime when there is a change in the dropdown, then we simply filter it to make sure that it only shows the relevant billionaire. Here is what it looks like.

## Demo on how the dropdown filter works for location

<img src="/img/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/demo on how the dropdown filter works.gif" alt="A demo on how the dropdown filter works"><br>
Now, let's try to add the filter for the net worth as well. Here is the code.

## Full code for dropdown filter for net worth and location of the billionaire

<pre>
  <code class="html">
    &lt;script src="https://unpkg.com/react@15/dist/react.js"&gt;&lt;/script&gt;
    &lt;script src="https://unpkg.com/react-dom@15/dist/react-dom.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"&gt;&lt;/script&gt;

    &lt;div id='react-container'&gt;&lt;/div&gt;
    &lt;script type="text/babel"&gt;
      var listOfBillionaireFromDB = &#123;&#123; billionaires|safe &#125;&#125;;
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
            showedBillionaire : listOfBillionaireFromDB.filter(billionaire =&gt; billionaire.current_location == 'Seattle, WA' && billionaire.net_worth &lt; 85)
          }
        },
        updateForLocation(e) {
          this.setState({ selectedLocation : e.target.value });
          var filteredBillionaire = this.state.ListOfBillionaireFromDB.filter(billionaire =&gt; billionaire.current_location == e.target.value)
          this.setState({ showedBillionaire : filteredBillionaire });
        },
        updateForNetWorth(e) {
          var net_worth_in_number = parseInt(e.target.value.split(' ')[3].split('B')[0]);
          this.setState({ selectedNetWorth : e.target.value });
          var filteredBillionaire = this.state.ListOfBillionaireFromDB.filter(billionaire =&gt; billionaire.net_worth &lt; net_worth_in_number && billionaire.current_location == this.state.selectedLocation)
          this.setState({ showedBillionaire : filteredBillionaire });
        },
        eachLocation(location, index) {
          return (&lt;option key={ index }&gt;{ location.name }&lt;/option&gt;)
        },
        eachNetWorth(netWorth, index) {
          return (&lt;option key={ index }&gt;Net worth under { netWorth.value }B&lt;/option&gt;)
        },
        eachPerson(person, index) {
          return (
            &lt;p key={ index }&gt;
              { person.first_name } { person.last_name }&lt;br/&gt;
              { person.source_of_wealth }&lt;br/&gt;
              { person.current_location }&lt;br/&gt;
              { person.net_worth }&lt;br/&gt;
            &lt;/p&gt;
          )
        },
        render() {
          return (
            &lt;div&gt;
              &lt;select value={ this.state.selectedNetWorth }
                      onChange={ this.updateForNetWorth }&gt;
                { this.state.netWorth.map(this.eachNetWorth) }
              &lt;/select&gt;
              &lt;select value={ this.state.selectedLocation }
                      onChange={ this.updateForLocation }&gt;
                { this.state.locations.map(this.eachLocation) }
              &lt;/select&gt;
              { this.state.showedBillionaire.map(this.eachPerson) }
            &lt;/div&gt;
          )
        }
      })
      ReactDOM.render(&lt;ListOfBillionaire /&gt;,
        document.getElementById('react-container'))
    &lt;/script&gt;
  </code>
</pre>

## Demo on how the dropdown filter works for net worth and location

<img src="/img/2016/12/09/how-to-build-a-search-page-in-django-with-amazon-dynamodb-and-react-p2-front-end/demo on how the dropdown filter works for net worth and location.gif" alt="A demo on how the dropdown filter works for net worth and location"><br>

## Wrapping Up

Hopefully this guide has given you the confidence to do the filter in React way. The other way that uses the server side filtering will be discussed in the next part. Anyways, I hope that this tutorial has helped you and thank you for reading!