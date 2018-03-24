# poanchen.github.io
Data for poanchen.github.io. Blog and pages generated by Jekyll. Hosted on GitHub.

Dev tool to be installed before run
----------------------
- Gulp
- npm

## Development Usage

```
1. git clone https://github.com/poanchen/poanchen.github.io.git
2. cd poanchen.github.io/
3. npm install
4. gulp // this will run the default gulp task that will minimized all the css/js/img files in
the src folder as well as watching any css/js/img files changes and minimized automatically. In addition, it will also run the server and automatically open up the website.
5. Site should be running now!!!
```

## Steps to deploy the site to live

```
1. Remember to add the new post to the List of post topic that I have written for my blog in README.md
2. git add .
3. git commit -S -m "your commit message"
4. git push poanchen2 will-jekyll-template
5. gulp deploy // this will commit the jekyll-gulp-generated production-ready code to master 
branch, then Github will automatically roll the site to live
6. Remember to head over to Webmaster Tools to update the sitemap.xml so that Google will 
index your new blog
7. You are done!!!
```

## Troubleshooting

In case you ran into problem like `/usr/bin/env: node: No such file or directory` when you try to run gulp, this was due to the misnaming convention between nodejs and node. You simply need to run this command to make this error goes away,

```bash
ln -s /usr/bin/nodejs /usr/bin/node
```
according to https://github.com/nodejs/node-v0.x-archive/issues/3911

In case you ran into problem like `require': cannot load such file -- jekyll-sitemap (LoadError)` when you try to run jekyll server, this was due to the missing jekyll-sitemap in gem. You simply need to run this command to make this error goes away,

```
gem install jekyll-sitemap
```
according to https://github.com/holman/left/issues/34

## List of post topic that I have written for my blog
- How to set up GPG key on GitHub?
- How to fix 'permission denied for relation some_table_name' in PostgreSQL?
- How to delete a commit completely in GitHub?
- Solving the Fibonacci problem using Dynamic Programming in Java.
- Build a scalable, reliable, and inexpensive RESTful API using AWS Lambda that will do the Roman numerals conversion.
- How to create a GitHub pull request with a specific commits?
- Connecting to UVic wifi with Ubuntu 16.04 LTS
- Installing Marsyas with Python bindings on Ubuntu 14.04.3 LTS - 64 bits
- How to run a single test or all tests in a class with gradlew?
- How to replace a git submodules in a repository?
- How to fix 'error This file requires compiler and library support for the ISO C++ 2011 standard'?
- How to add Disqus to your Jekyll site?
- How to convert a large PDF to HTML?
- How to use Gulp.js to deploy your site to live through Github?
- How to recover all your deleted cron jobs?
- Mutable vs Immutable object in JavaScript
- How to set up password authentication with Apache on Ubuntu 14.04
- How to check if an image already existed in wp-content/upload directory?
- How to set up pretty url in WordPress?
- How to build a search page in Django with Amazon Dynamodb and React? Part 2 (Front-end)
- How to build a search page in Django with Amazon Dynamodb and React? Part 1 (Back-end)
- How to enable cross-origin resource sharing on an apache server?
- How to play mp4 video using hls.js?
- How to add background music in Processing 3.0?
- How to take screenshots at different screen sizes using CasperJS?
- Is it possible to host two website with different domain name on one sever how would you do that?
- How to pass PHP data to your script in WordPress?
- How to login to a WordPress site using CasperJS?
- How to programmatically register an account for a user in WordPress?
- How to set up a Node.js application for production on Ubuntu 14.04?
- How to build a simple chat bot using Hubot that determine gender based on their first name?
- How to automatically send a welcome email to new user when they sign up for their account in WordPress programmatically?
- How to create a simple REST API in PHP and call them in JavaScript