---
layout: post
title: "How to fix permission denied for relation some_table_name in PostgreSQL?"
author: poanchen
date: 2018-03-07 08:30:30
tags:
- Database
- PoAn (Baron) Chen
- PostgreSQL
- SQL
---
Ever needed to create a bunch of tables for a newly created user to access in PostgreSQL and see the following error message pop up, '**permission denied for relation some_table_name**'? You are in luck, in this tutorial, I am going to guide you guys through it to make the error message goes away.

Let me give you guys an example on how this error message might occur (at least this is how I found out),

Check out this following sql file,
{% highlight sql %}
  CREATE DATABASE "database";
  CREATE USER someuser WITH PASSWORD 'securepassword';
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO someuser;
  CREATE TABLE "some_table_name"(
    "id" int NOT NULL,
    "data" text NOT NULL
  );
  INSERT INTO "some_table_name" values(0, "some text");
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2018/03/07/How-to-fix-permission-denied-for-relation-some_table_name-in-PostgreSQL/userUnableToAccess.sql" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

As one can imagine, when you login as 'someuser' and try to access the table with the **SELECT** query, you will likely see the error message pop up. This is because you granted all privileges to the someuser on all tables but no table has been created yet which means that the query has no effect at all. To fix this, you can simply move that **GRANT ALL..** query all the way down to the bottom (the point where you created all the necessary table for your database). It should look something similar to the following.

Your someuser should now have access to the table,
{% highlight sql %}
  CREATE DATABASE "database";
  CREATE USER someuser WITH PASSWORD 'securepassword';
  CREATE TABLE "some_table_name"(
    "id" int NOT NULL,
    "data" text NOT NULL
  );
  INSERT INTO "some_table_name" values(0, "some text");
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO someuser;
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2018/03/07/How-to-fix-permission-denied-for-relation-some_table_name-in-PostgreSQL/userAbleToAccess.sql" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

As a result, the order is very important. Just remember to do that next time haha!

Tada. This is a fairly short tutorial. Hope that solve your problem. Let me know if it didn't. I will be happy to help as always.

## Wrapping Up

Hopefully you enjoyed this short tutorial. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [permission denied for relation](http://www.postgresql-archive.org/permission-denied-for-relation-td5789674.html).
