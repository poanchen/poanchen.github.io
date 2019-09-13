---
layout: post
title: "The right way to manage nested callbacks"
author: poanchen
date: 2019-06-19 08:30:30
tags:
- PoAn (Baron) Chen
- JavaScript
- Asynchronous Programming
- Callback
- Callback hell
- Async/await
- Promise
---
In case you do not know what a callback is, please refer to [this](https://husseinfaara.com/articles/what-the-heck-is-a-callback) awesome article by [Hussein Faara](https://husseinfaara.com/).

All in all, callbacks are great. With callback, we are allowed to write 
code in JavaScript asynchronously and it just work. However, in real world, as a Software Engineer, we do not simply expect things to just work and be satisfied with it. We also look at other things. For example, maintainability.

Let's work with a real world example here to demonstrate what we want to talk about, say, we would like to add couple of songs to a playlist on Spotify.

Here are the steps that we need,
1. Retrieve temporary access token
2. Retrieve user's id using the access token that we just got
3. Create a brand new empty playlist
4. Try to look for the song on Spotify for every song on the list
5. Since we got the user's id from step 2 as well as the playlist's id from step 3, we should now be able to add songs to the playlist on Spotify

As you can see, as we go further down the list, we seem to alway need something from the previous step. Without the information from above, we cannot really do anything. This is where the callback would be useful.

This is how I would do it,
{% highlight javascript %}
  // function get(url, header, param, success) {...}
  // function post(url, header, param, success) {...}

  post("https://accounts.spotify.com/api/token", {}, urlencode({
    grant_type: 'authorization_code',
    code: getParam(tab.url, 'code'),
    redirect_uri: "https://www.jenrenalcare.com/upload/thank-you.html",
    client_id: "3aa81ba3bbea466ba09fef04a5feea41",
    client_secret: "c47f40315044462d8b52bf747e8b2e1f"
  }), function(response) {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    get("https://api.spotify.com/v1/me", {
      Authorization: tokenType + ' ' + accessToken
    }, null, function(response) {
      var userId = response.id;
      post("https://api.spotify.com/v1/users/" + userId + "/playlists", {
        Authorization: tokenType + ' ' + accessToken,
        "Content-type": "application/json"
      }, JSON.stringify({
        name: localStorage.playlistTitle
      }), function(response) {
        var playlistId = response.id;
        var songs = JSON.parse(localStorage.songs);
        var i = 0;
        for (key in songs) {
          get("https://api.spotify.com/v1/search", {
            Authorization: tokenType + ' ' + accessToken
          }, "q=" + songs[key].title + "%20album:" + songs[key].album + "%20artist:" + songs[key].artist + "&type=track", function(response) {
            if (response.tracks.items.length) {
              var uri = response.tracks.items[0].uri;
              post("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks", {
                Authorization: tokenType + ' ' + accessToken,
                "Content-type": "application/json"
              }, JSON.stringify({
                uris: [uri]
              }), function(response) {
                // song has been added to the playlist
              });
            }
          });
        };
      });
    });
  });
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/06/19/The-right-way-to-manage-nested-callbacks/originalVersion.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

To be honest, this code looks long and ugly with 5 nested callbacks. Imagine 10+ nested callbacks, that, will be a lot more difficult to follow. So, what do we do? Are there any better way of doing it? Maybe the real question here is what is the right way to manage nested callbacks? or you prefer to call it as callback hell?

Here are the ways that I can think of that will help make it either cleaner or
a LOT cleaner,
1. Write comments
2. Split functions into smaller functions (Still using callback)
3. Use Promises
4. Use Async/await

### First solution to the callback hell: Write comments
{% highlight javascript %}
  // function get(url, header, param, success) {...}
  // function post(url, header, param, success) {...}

  // Retrieve temporary access token
  post("https://accounts.spotify.com/api/token", {}, urlencode({
    grant_type: 'authorization_code',
    code: getParam(tab.url, 'code'),
    redirect_uri: "https://www.jenrenalcare.com/upload/thank-you.html",
    client_id: "3aa81ba3bbea466ba09fef04a5feea41",
    client_secret: "c47f40315044462d8b52bf747e8b2e1f"
  }), function(response) {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    // Retrieve user’s id using the access token that we just got
    get("https://api.spotify.com/v1/me", {
      Authorization: tokenType + ' ' + accessToken
    }, null, function(response) {
      var userId = response.id;
      // Create a brand new empty playlist
      post("https://api.spotify.com/v1/users/" + userId + "/playlists", {
        Authorization: tokenType + ' ' + accessToken,
        "Content-type": "application/json"
      }, JSON.stringify({
        name: localStorage.playlistTitle
      }), function(response) {
        var playlistId = response.id;
        var songs = JSON.parse(localStorage.songs);
        var i = 0;
        // Try to look for the song on Spotify for every song on the list
        for (key in songs) {
          get("https://api.spotify.com/v1/search", {
            Authorization: tokenType + ' ' + accessToken
          }, "q=" + songs[key].title + "%20album:" + songs[key].album + "%20artist:" + songs[key].artist + "&type=track", function(response) {
            if (response.tracks.items.length) {
              var uri = response.tracks.items[0].uri;
              // Since we got the user’s id from step 2 as well as the playlist’s id from step 3, we should now be able to add songs to the playlist on Spotify
              post("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks", {
                Authorization: tokenType + ' ' + accessToken,
                "Content-type": "application/json"
              }, JSON.stringify({
                uris: [uri]
              }), function(response) {
                // song has been added to the playlist
              });
            }
          });
        };
      });
    });
  });
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/06/19/The-right-way-to-manage-nested-callbacks/originalVersionWithComments.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Okay, did the comments make it easier to follow? Hummmm, I would say a bit but not a LOT.

How about we try the second approach?

### Second solution to the callback hell: Split functions into smaller functions (Still using callback)
{% highlight javascript %}
  // function get(url, header, param, success) {...}
  // function post(url, header, param, success) {...}

  var tokenType, accessToken, userId, playlistId, songs = JSON.parse(localStorage.songs);

  retrieveAccessToken(function(response) {
    retrieveUserId(response, function(response) {
      createANewPlaylist(response, function(response) {
        addAllSongsToPlayList(response, function(total) {
          console.log("There are " + total + " out of " + songs.length + " songs been added to the playlist!!!");
        });
      });
    });
  });

  function retrieveAccessToken(callback) {
    post("https://accounts.spotify.com/api/token", {}, urlencode({
      grant_type: 'authorization_code',
      code: getParam(tab.url, 'code'),
      redirect_uri: "https://www.jenrenalcare.com/upload/thank-you.html",
      client_id: "3aa81ba3bbea466ba09fef04a5feea41",
      client_secret: "c47f40315044462d8b52bf747e8b2e1f"
    }), function(response) {
      callback(response);
    });
  }

  function retrieveUserId(response, callback) {
    tokenType = response.token_type;
    accessToken = response.access_token;
    get("https://api.spotify.com/v1/me", {
      Authorization: tokenType + ' ' + accessToken
    }, null, function(response) {
      callback(response);
    });
  }

  function createANewPlaylist(response, callback) {
    userId = response.id;
    post("https://api.spotify.com/v1/users/" + userId + "/playlists", {
      Authorization: tokenType + ' ' + accessToken,
      "Content-type": "application/json"
    }, JSON.stringify({
      name: localStorage.playlistTitle
    }), function(response) {
      callback(response);
    });
  }

  function searchASong(key, callback) {
    get("https://api.spotify.com/v1/search", {
      Authorization: tokenType + ' ' + accessToken
    }, "q=" + songs[key].title + "%20album:" + songs[key].album + "%20artist:" + songs[key].artist + "&type=track", function(response) {
      callback(response);
    });
  }

  function addASongToThePlaylist(uri, callback) {
    post("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks", {
      Authorization: tokenType + ' ' + accessToken,
      "Content-type": "application/json"
    }, JSON.stringify({
      uris: [uri]
    }), function(response) {
      callback(response);
    });
  }

  function addAllSongsToPlayList(response, callback) {
    playlistId = response.id;
    var i = 0;
    for (key in songs) {
      searchASong(key, function(response) {
        if (response.tracks.items.length) {
          addASongToThePlaylist(response.tracks.items[0].uri, function(response) {
            i++;
          });
        }
      });
    }
    callback(i);
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/06/19/The-right-way-to-manage-nested-callbacks/secondSolution.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

I have to admit, this is MUCH MUCH cleaner than it used to be and looks a LOT nicer.

But hey, don't just stop here. As a Software Engineer, we always need to keep looking to see if there are any other way (maybe better) of doing the same thing.

Let's look at the Promises approach. (and we can decide which way is better)

### Third solution to the callback hell: Use Promises
Don't know what a Promises is? Please read [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) awesome documentation about Promises by [Mozilla](https://developer.mozilla.org).

{% highlight javascript %}
  retrieveAccessToken(tab.url)
    .then(retrieveUserInfo)
    .then(createAPlaylist)
    .then(getAllSongsInfo)
    .then(prepareToaddAllSongsToPlaylist)
    .then(addAllSongsToPlaylist)
    .catch(error => {
      progress.innerHTML += "[WARNING] " + error + "<br>";
    });

  const retrieveAccessToken = url => {
    return new Promise(resolve => {
      post("https://accounts.spotify.com/api/token", {}, urlencode({
        grant_type: 'authorization_code',
        code: getParam(url, 'code'),
        redirect_uri: "https://www.jenrenalcare.com/upload/thank-you.html",
        client_id: "3aa81ba3bbea466ba09fef04a5feea41",
        client_secret: "c47f40315044462d8b52bf747e8b2e1f"
      }), response => {
        resolve(response);
      });
    })
  };

  const retrieveUserInfo = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    return new Promise(resolve => {
      get("https://api.spotify.com/v1/me", {
        Authorization: tokenType + ' ' + accessToken
      }, null, response => {
        response['token_type'] = tokenType
        response['access_token'] = accessToken;
        return resolve(response);
      });
    });
  };

  const createAPlaylist = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    var userId = response.id;
    return new Promise(resolve => {
      post("https://api.spotify.com/v1/users/" + userId + "/playlists", {
        Authorization: tokenType + ' ' + accessToken,
        "Content-type": "application/json"
      }, JSON.stringify({
        name: localStorage.playlistTitle
      }), response => {
        response['token_type'] = tokenType
        response['access_token'] = accessToken;
        response['userId'] = userId;
        return resolve(response);
      });
    });
  };

  const searchASong = response => {
    return new Promise(resolve => {
      get("https://api.spotify.com/v1/search", {
        Authorization: response.token_type + ' ' + response.access_token
      }, buildSearchQuery(response.song), responseFromSearch => {
        resolve(responseFromSearch.tracks.items[0]);
      });
    });
  };


  const getAllSongsInfo = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    var playlistId = response.id;
    var userId = response.userId;
    var songs = JSON.parse(localStorage.songs);
    var allSearchPromises = [];
    for (key in songs) {
      response['song'] = songs[key];
      allSearchPromises.push(searchASong(response));
    }
    return Promise.all(allSearchPromises).then(function(response) {
      response['token_type'] = tokenType;
      response['access_token'] = accessToken;
      response['playlistId'] = playlistId;
      response['userId'] = userId;
      return response;
    });
  };

  const prepareToaddAllSongsToPlaylist = response => {
    var songs = [];
    for (key in response) {
      if (isNumeric(key)) {
        songs.push(response[key].uri);
      }
    }
    return new Promise(resolve => {
      response['songs'] = songs;
      resolve(response);
    });
  };

  const addAllSongsToPlaylist = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    var playlistId = response.playlistId;
    var userId = response.userId;
    var songs = response.songs;
    return new Promise(resolve => {
      post("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks", {
        Authorization: tokenType + ' ' + accessToken,
        "Content-type": "application/json"
      }, JSON.stringify({
        uris: songs
      }), function(response) {
        resolve(response);
      });
    });
  };

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function buildSearchQuery(song) {
    return "q=" + song.title +
            "%20album:" + song.album +
            "%20artist:" + song.artist +
            "&type=track";
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/06/19/The-right-way-to-manage-nested-callbacks/thirdSolution.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Callback hell has truly disappear. This solution has the advantage of the second solution where it split functions into smaller functions but it also 
avoids the use of nested functions thanks to the nature of Promises.

Let's see how the Async/await different from Promises.

### Forth solution to the callback hell: Use Async/await
Don't know what an Async/await is? Please read [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) awesome documentation about Async/await by [Mozilla](https://developer.mozilla.org).
{% highlight javascript %}
  const beginToAddSongsToPlaylist = async () => {
    let response = await retrieveAccessToken(tab.url);
    response = await retrieveUserInfo(response);
    response = await createAPlaylist(response);
    response = await getAllSongsInfo(response);
    response = await prepareToaddAllSongsToPlaylist(response);
    response = await addAllSongsToPlaylist(response);
  };

  beginToAddSongsToPlaylist();

  const retrieveAccessToken = url => {
    return new Promise(resolve => {
      post("https://accounts.spotify.com/api/token", {}, urlencode({
        grant_type: 'authorization_code',
        code: getParam(url, 'code'),
        redirect_uri: "https://www.jenrenalcare.com/upload/thank-you.html",
        client_id: "3aa81ba3bbea466ba09fef04a5feea41",
        client_secret: "c47f40315044462d8b52bf747e8b2e1f"
      }), response => {
        resolve(response);
      });
    })
  };

  const retrieveUserInfo = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    return new Promise(resolve => {
      get("https://api.spotify.com/v1/me", {
        Authorization: tokenType + ' ' + accessToken
      }, null, response => {
        response['token_type'] = tokenType
        response['access_token'] = accessToken;
        return resolve(response);
      });
    });
  };

  const createAPlaylist = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    var userId = response.id;
    return new Promise(resolve => {
      post("https://api.spotify.com/v1/users/" + userId + "/playlists", {
        Authorization: tokenType + ' ' + accessToken,
        "Content-type": "application/json"
      }, JSON.stringify({
        name: localStorage.playlistTitle
      }), response => {
        response['token_type'] = tokenType
        response['access_token'] = accessToken;
        response['userId'] = userId;
        return resolve(response);
      });
    });
  };

  const searchASong = response => {
    return new Promise(resolve => {
      get("https://api.spotify.com/v1/search", {
        Authorization: response.token_type + ' ' + response.access_token
      }, buildSearchQuery(response.song), responseFromSearch => {
        resolve(responseFromSearch.tracks.items[0]);
      });
    });
  };


  const getAllSongsInfo = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    var playlistId = response.id;
    var userId = response.userId;
    var songs = JSON.parse(localStorage.songs);
    var allSearchPromises = [];
    for (key in songs) {
      response['song'] = songs[key];
      allSearchPromises.push(searchASong(response));
    }
    return Promise.all(allSearchPromises).then(function(response) {
      response['token_type'] = tokenType;
      response['access_token'] = accessToken;
      response['playlistId'] = playlistId;
      response['userId'] = userId;
      return response;
    });
  };

  const prepareToaddAllSongsToPlaylist = response => {
    var songs = [];
    for (key in response) {
      if (isNumeric(key)) {
        songs.push(response[key].uri);
      }
    }
    return new Promise(resolve => {
      response['songs'] = songs;
      resolve(response);
    });
  };

  const addAllSongsToPlaylist = response => {
    var tokenType = response.token_type;
    var accessToken = response.access_token;
    var playlistId = response.playlistId;
    var userId = response.userId;
    var songs = response.songs;
    return new Promise(resolve => {
      post("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks", {
        Authorization: tokenType + ' ' + accessToken,
        "Content-type": "application/json"
      }, JSON.stringify({
        uris: songs
      }), function(response) {
        resolve(response);
      });
    });
  };

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function buildSearchQuery(song) {
    return "q=" + song.title +
            "%20album:" + song.album +
            "%20artist:" + song.artist +
            "&type=track";
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/06/19/The-right-way-to-manage-nested-callbacks/forthSolution.js" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

One HUGE advantage of using Async/await to solve the callback hell is that you can write asynchronous JavaScript as if it was synchronous! Damn, just damn. Simply add Async/await keyword in front of your asynchronous functions and that is it. (Make sure your function returns Promises though) Thank you ECMAScript 2016 (ES7) for providing this awesome feature that everyone would love!!!

### This is what I would recommend
If you were to ask me how I would personally handle the callback hell, this is what I would do. I certainly won't recommend to jump from zero to step 3/4 as that might be a huge change to your code base. (and that often introduces new bug) What I would do is, incremental changes. Baby step. Start from writing comments to make it clearer for other developers then gradually split functions into smaller functions. Here, you should also reuse your functions as much as you can so that you do not have duplicate code. You should also keep your function as [pure](https://www.sitepoint.com/functional-programming-pure-functions/) as possible. Every step of the way, you should write more tests as you see fit/missing. Run tests to make sure you did not break anything. Also ensure that you write code the way your team want. Use tool like [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) to help you check if your code aligns well with your team lint rules on popular code editor like [Visual Studio Code](https://code.visualstudio.com/). Next, simply convert your "smaller functions" into Promises. So that you can either do step 3 or 4 later on easily. As you can see, I always do incremental changes instead of committing a huge chunk of code. Huge PR often gives your team member/code reviewer headache. Just don't do it unless there is a good reason for it. Incremental changes are MUCH MUCH better as it also allows you to be agile and able to fix mistake quickly. Last but not least, I actually did this refactor myself for one of the project that I did (I told you it was a real world example) as I got annoyed by looking at the callback hell that I created. My project is called [google-play-music-playlist-exporter](https://github.com/poanchen/google-play-music-playlist-exporter) hosted on [GitHub](https://github.com) and the transformation (GitHub commit) between callback hell and Promises is [here](https://github.com/poanchen/google-play-music-playlist-exporter/commit/9baf94e6ca0479cacddb9666237e98e69f369717). If I can do it, you can as well!!!

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. Good luck in fixing your callback hell!

## Wrapping Up

Hopefully you enjoyed this post. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [What the heck is a Callback?](https://husseinfaara.com/articles/what-the-heck-is-a-callback) by [Hussein Faara](https://husseinfaara.com/).
* [How to deal with nested callbacks and avoid “callback hell”](https://www.freecodecamp.org/news/how-to-deal-with-nested-callbacks-and-avoid-callback-hell-1bc8dc4a2012/) by [Zell Liew](https://www.freecodecamp.org/news/author/zellwk/).
* [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) by [Mozilla](https://developer.mozilla.org).
* [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) by [Mozilla](https://developer.mozilla.org).