---
layout: post
title: "What Are Algorithms & Why Are They Important?"
author: junilearning
date: 2020-10-14 08:30:30
tags:
- Algorithms
- Juni Learning
- Partnership
---
## What Is An Algorithm?

An algorithm is a set of step-by-step procedures, or a set of rules to follow, for completing a specific task or solving a particular problem. Algorithms are all around us. The recipe for baking a cake, the method we use to solve a long division problem, and the process of doing laundry are all examples of an algorithm. Here’s what baking a cake might look like, written out as a list of instructions, just like an algorithm:

1. Preheat the oven
2. Gather the ingredients
3. Measure out the ingredients
4. Mix together the ingredients to make the batter
5. Grease a pan
6. Pour the batter into the pan
7. Put the pan in the oven
8. Set a timer
9. When the timer goes off, take the pan out of the oven
10. Enjoy!

Algorithmic programming is all about writing a set of rules that instruct the computer how to perform a task. A computer program is essentially an algorithm that tells the computer what specific steps to execute, in what specific order, in order to carry out a specific task. Algorithms are written using particular syntax, depending on the programming language being used.

Here is an example of a simple algorithm that will add two number and return its result using the programming language of Java,

{% highlight java %}
  public class PureFunction {
    public static int add(int a, int b) {
      return a + b;
    }
    public static void main(String [] args) {
      int c = add(10, 5);
      System.out.println(c); // 15
    }
  }
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/09/11/what-is-a-pure-function-and-how-can-it-be-a-good-practice/PureFunction.java" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

This is essentially an algorithm that will find the value of c in this formula, a + b = c.

## Types of Algorithms

Algorithms are classified based on the concepts that they use to accomplish a task. While there are many types of algorithms, the most fundamental types of computer science algorithms are:
1. Divide and conquer algorithms – divide the problem into smaller subproblems of the same type; solve those smaller problems, and combine those solutions to solve the original problem. Here is an [example](/blog/2018/11/23/how-to-calculate-time-complexity-of-an-algorithm#binarySearch) of Divide and conquer algorithm, a binary search algorithm that will search an element from a sorted array, for each run, it would either find it or divide the problem into half and head into the half that for sure has the answer. Continuing doing so until an element has been found if the element is in the array.
2. Brute force algorithms – try all possible solutions until a satisfactory solution is found. Here is an [example](/blog/2019/09/13/why-using-a-global-variable-to-solve-Leetcode-problem-can-be-a-bad-idea#dfs) of Brute force algorithm, a Depth-first Search algorithm that will basically traverse the whole tree before giving up.
3. Randomized algorithms – use a random number at least once during the computation to find a solution to the problem.
4. Greedy algorithms – find an optimal solution at the local level with the intent of finding an optimal solution for the whole problem. Here is an [example](/blog/2018/11/23/how-to-calculate-time-complexity-of-an-algorithm#maxValueListOperators) of Greedy algorithm.
5. Recursive algorithms – solve the lowest and simplest version of a problem to then solve increasingly larger versions of the problem until the solution to the original problem is found. Here is an [example](/blog/2018/02/09/Solving-the-Fibonacci-problem-using-Dynamic-Programming-in-Java#recursion) of Recursive algorithm.
6. Backtracking algorithms – divide the problem into subproblems, each which can be attempted to be solved; however, if the desired solution is not reached, move backwards in the problem until a path is found that moves it forward. Here is an [example](https://github.com/poanchen/leetcode-problems/blob/master/Word%20Search/Solution.java) of Backtracking algorithm.
7. Dynamic programming algorithms – break a complex problem into a collection of simpler subproblems, then solve each of those subproblems only once, storing their solution for future use instead of re-computing their solutions. Here is an [example](/blog/2018/02/09/Solving-the-Fibonacci-problem-using-Dynamic-Programming-in-Java#dp) of Dynamic programming algorithm.

## Example of an Algorithm

### Solving a Rubik’s Cube

<img src="\img\2020\10\14\What-Are-Algorithms-and-Why-Are-They-Important/rubiks-cube.jpg" alt="rubiks cube">
Source: <a href="https://runrunchan.wordpress.com/2014/06/28/rubiks-cube">RUBIK’S CUBE</a> by <a href="https://runrunchan.wordpress.com/author/runrunchan">runrunchan</a>

There are a number of different algorithms, from simple to very complicated, that exist for solving a Rubik’s cube. Below is just one simple algorithm. First, let’s specify a notation to use (similar to picking a programming language).

Each of the six faces of a Rubik’s cube can be represented by the first letter of their name:

* U - up
* D - down
* L - left
* R - right
* F - front
* B - back

Each face can be turned in three different ways/directions. Using U as an example, these are represented as:

* U - clockwise quarter-turn of the upper face
* U' - counter-clockwise quarter-turn of the upper face
* U2 - half turn in either direction of the upper face

Now, let’s go through the steps in the algorithm to solve a Rubik’s Cube. Feel free to grab one of your own and follow along!

Step 1: The Cross
1. First, flip some edges so that there is a white cross on the upper face.
2. Apply the following turns: F, R’, D’, R, F2, R’, U, R, U’, R’, R2, L2, U2, R2, L2.
3. The cross is now solved.

Step 2: The White Corners

1. The edges on the white face are now complete, but the corners remain.
2. Depending on where the white-orange-green corner is in the puzzle, apply one of the following series of turns:
    1. Bottom: R’, D’, R, D (repeat until the corner moves to its correct place)
    2. Top: R’, D’, R, D (this moves the corner to the bottom; then, follow the above instructions)

Step 3: Middle Layer Edges

1. Flip the cube so that the white is on the bottom.
2. Look for an edge that is on the top face and doesn’t have yellow on it.
3. Perform a U-turn so that the color on the front face of the edge matches with the center.
4. Depending on the direction that the edge could go, apply one of the following series of turns:
    1. Left: U’, L’, U, L, U, F, U’, F’
    2. Right: U, R, U’, R’, U’, F’, U, F)

Step 4: Yellow Cross

1. Apply the following turns, until a yellow cross on the face appears with the yellow center: F, R, U, R’, U’, F’.
2. If there is an “L” shape, where the two yellow pieces showing are adjacent to each other, apply the following turns: F, U, R, U’, R’, F’.
3. If there is a “Line” shape, which is horizontal, apply the following turns: F, R, U, R’, U’, F’.

Step 5: Sune and Antisune

1. Look at the face with the yellow center.
2. Depending on the below contingencies, apply one of the following series of turns:
    1. If there is only one oriented corner: R, U, R’, U, R, U2, R’ (repeat until the desired position is attained)
    2. There is one oriented corner and one right-facing corner: U2, R, U2, R’, U’, R, U’, R’

Step 6: Finishing the puzzle

1. Look for sets of “headlights” (two stickers of the same color in the same row, separated by a sticker of a different color).
2. Depending on how many there are, apply one of the following series of turns:
    1. If there are a set of headlights on each side: R, U’, R, U, R, U, R, U’, R’, U’, R2
    2. Otherwise: R’, F, R’, B2, R, F’, R’, B2, R2

## Sorting Algorithms

A sorting algorithm is an algorithm that puts elements of a list in a certain order, usually in numerical or lexicographical order. Sorting is often an important first step in algorithms that solves more complex problems. There are a large number of sorting algorithms, each with their own benefits and costs. Below, we will focus on some of the more famous sorting algorithms.

1. Linear sort: Find the smallest element in the list to be sorted, add it to a new list, and remove it from the original list. Repeat this until the original list is empty.
2. Bubble sort: Compare the first two elements in the list, and if the first is greater than the second, swap them. Repeat this with every pair of adjacent elements in the list. Then, repeat this process until the list is fully sorted.
3. Insertion sort: Compare each element in the list to all the prior elements until a smaller element is found. Swap these two elements. Repeat this process until the list is fully sorted.

## Where Algorithms are Used in Computer Science?

Algorithms are used in every part of computer science. They form the field's backbone. In computer science, an algorithm gives the computer a specific set of instructions, which allows the computer to do everything, be it running a calculator or running a rocket. Computer programs are, at their core, algorithms written in programming languages that the computer can understand. Computer algorithms play a big role in how social media works: which posts show up, which ads are seen, and so on. These decisions are all made by algorithms. Google’s programmers use algorithms to optimize searches, predict what users are going to type, and more. In problem-solving, a big part of computer programming is knowing how to formulate an algorithm.

## Why are Algorithms Important to Understand?

Algorithmic thinking, or the ability to define clear steps to solve a problem, is crucial in many different fields. Even if we’re not conscious of it, we use algorithms and algorithmic thinking all the time. Algorithmic thinking allows students to break down problems and conceptualize solutions in terms of discrete steps. Being able to understand and implement an algorithm requires students to practice structured thinking and reasoning abilities.

## Wrapping Up

For full disclosure, this article is a combined work mostly written by [Juni Learning](https://junilearning.com) and slightly modified by [PoAn (Baron) Chen](https://poanchen.github.io). This [article](https://junilearning.com/blog/college-and-career/preparing-for-the-ap-computer-science-a-exam) originally appeared on [junilearning.com](https://junilearning.com). Hopefully, by bring-in different writting technic, it will attract more readers to this site. I hope that this article will help some of you to understand what an algorithms is and why they are important and thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Preparing for the AP Computer Science A Exam - Juni Learning](https://junilearning.com/blog/college-and-career/preparing-for-the-ap-computer-science-a-exam) by [Juni Learning](https://junilearning.com).
