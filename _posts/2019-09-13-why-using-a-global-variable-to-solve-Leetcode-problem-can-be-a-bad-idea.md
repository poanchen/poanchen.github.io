---
layout: post
title: "Why using a global variable to solve Leetcode problem can be a bad idea?"
author: poanchen
date: 2019-09-13 08:30:30
tags:
- Python
- PoAn (Baron) Chen
- Leetcode
---
I recently run into the issue of having inconsistent result for the exact same test case that I run locally comparing with the code that [Leetcode](https://leetcode.com) runs on their server. How is that even possible? At first, my suspicion would be the development environment but I code my solution right in their website. In addition, other people solution got accepted, so it is gotta be something wrong with my code. And, it turns out, it is. It is because of how I use the global variable in my solution.

Before I talk about how using a global variable to solve [Leetcode](https://leetcode.com) problem can be a bad idea. I want to show you my code first.

{% highlight python %}
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
  ans = []
  def helper(self, root: TreeNode):
    if root is None:
      return
    self.ans.append(root.val)
    self.helper(root.left)
    self.helper(root.right)
  def preorderTraversal(self, root: TreeNode) -> List[int]:
    self.helper(root)
    return self.ans
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/09/13/why-using-a-global-variable-to-solve-Leetcode-problem-can-be-a-bad-idea/simplePreorderTraversal.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

This is a simple dfs recursion solution for pre-order traversal. As you can see, we have a global list ans to collect all the node value while we traverse. At the end, we simply need to return the list ans and we are done.

Next, I would like to reveal of how [Leetcode](https://leetcode.com) evaluate the submitted solution (At least, this is how I would have done it and it makes sense according to the results that I am seeing). To explain it in one sentence, [Leetcode](https://leetcode.com) simply treats your solution as a function of the code and that is it. Let me show you in code, on how it will work,

{% highlight python %}
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
  ans = []
  def helper(self, root: TreeNode):
    if root is None:
      return
    self.ans.append(root.val)
    self.helper(root.left)
    self.helper(root.right)
  def preorderTraversal(self, root: TreeNode) -> List[int]:
    self.helper(root)
    return self.ans
  def evulateAnswer(result: List[int], correctAnswer: List[int]) -> bool:
    # ...
  def main():
    testCases = [...]
    testCasesAnswer = [...]
    i = 0
    correctness = True
    for test in testCases:
      result = self.preorderTraversal(test)
      if evulateAnswer(result, testCasesAnswer[i]) is False:
        correctness = False
        break
      i = i + 1
    return correctness
  if __name__ == "__main__":
    main()
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2019/09/13/why-using-a-global-variable-to-solve-Leetcode-problem-can-be-a-bad-idea/leetcodeTestCase.py" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

As you can see, for each test cases to be run, answer will be stored in the global list ans. Once it has been run once, the list will be populated with the result. Every time you call the next one, it kept on using the same global list ans. As a result, the global list ans not only have the solution for the current test case, but it also got mixed up with the previous solution. That is why, you get wrong answers when you have multiple test cases but works when you have just one test case. Mystery solved. My suggestion would be, just don't use the global variable in your solution at all or simply clear them whenever you are finished with them. Hence, using a global variable in your solution can be a bad idea because it might/will give you an inconsistent result across your local machine and the [Leetcode](https://leetcode.com) server.

Whoa.

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. Happy Leetcoding!

## Wrapping Up

Hopefully you enjoyed this article and will inspire you to write more pure functions in the near future. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [I encountered Wrong Answer/Runtime Error for a specific test case. When I test my code using this test case, it produced the correct output. Why?](https://support.leetcode.com/hc/en-us/articles/360011834174-I-encountered-Wrong-Answer-Runtime-Error-for-a-specific-test-case-When-I-test-my-code-using-this-test-case-it-produced-the-correct-output-Why-) by [Leetcode](https://leetcode.com).
* [Algorithms Introduction](https://yangshun.github.io/tech-interview-handbook/algorithms/algorithms-introduction/#general-tips) by [Yangshun Tay](https://github.com/yangshun).
