var disqus_config = function () {
  this.page.url = "https://poanchen.github.io{{ page.url }}";
  this.page.identifier = "{{ page.url }}";
};
(function() { // DON'T EDIT BELOW THIS LINE
  var d = document, s = d.createElement('script');
  s.src = '//poanchen.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();