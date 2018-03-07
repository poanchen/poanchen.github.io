---
layout: post
title: "How to fix 'permission denied for relation some_table_name' in PostgreSQL?"
author: PoAn (Baron) Chen
author_url: https://github.com/poanchen
date: 2018-03-07
---
Ever needed to create a bunch of tables for a newly created user to access in PostgreSQL and see the following error message pop up, '**permission denied for relation some_table_name**'? You are in luck, in this tutorial, I am going to guide you guys through it to make the error message goes away.

Let me give you guys an example on how this error message might occur (at least this is how I found out),

Check out this following sql file,&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2018/03/07/How-to-fix-permission-denied-for-relation-some_table_name-in-PostgreSQL/userUnableToAccess.sql" target="_blank">source code</a>

<pre>
  <code class="sql">
    CREATE DATABASE "database";
    CREATE USER someuser WITH PASSWORD 'securepassword';
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO someuser;
    CREATE TABLE "some_table_name"(
      "id" int NOT NULL,
      "data" text NOT NULL
    );
    INSERT INTO "some_table_name" values(0, "some text");
  </code>
</pre>

As one can imagine, when you login as 'someuser' and try to access the table with the **SELECT** query, you will likely see the error message pop up. This is because you granted all privileges to the someuser on all tables but no table has been created yet which means that the query has no effect at all. To fix this, you can simply move that **GRANT ALL..** query all the way down to the bottom (the point where you created all the necessary table for your database). It should look something similar to the following.

Your someuser should now have access to the table,&nbsp;&nbsp;<a href="https://github.com/poanchen/code-for-blog/blob/master/2018/03/07/How-to-fix-permission-denied-for-relation-some_table_name-in-PostgreSQL/userableToAccess.sql" target="_blank">source code</a>

<pre>
  <code class="sql">
    CREATE DATABASE "database";
    CREATE USER someuser WITH PASSWORD 'securepassword';
    CREATE TABLE "some_table_name"(
      "id" int NOT NULL,
      "data" text NOT NULL
    );
    INSERT INTO "some_table_name" values(0, "some text");
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO someuser;
  </code>
</pre>

As a result, the order is very important. Just remember to do that next time haha!

Tada. This is a fairly short tutorial. Hope that solve your problem. Let me know if it didn't. I will be happy to help as always.

## Wrapping Up

Hopefully you enjoyed this short tutorial. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues).

### Getting started

* [permission denied for relation](http://www.postgresql-archive.org/permission-denied-for-relation-td5789674.html).