function getPathName() {
  // this will make sure
  // when url became /blog/2016/11/15/how-to-add-background-music-in-processing-3.0
  // or /blog/2016/11/15/how-to-add-background-music-in-processing-3.0/
  // or /blog/2016/11/15/how-to-add-background-music-in-processing-3.0.html
  // will all go back to /blog/2016/11/15/how-to-add-background-music-in-processing-3.0
  // for disqus to recongize the post
  var pathname = document.location.pathname;
  var dividerList = pathname.split("/");
  if(dividerList[dividerList.length - 1] == "") {
    // there exist trailing "/", we should remove them
    pathname = pathname.slice(0, -1)
  }
  // remove .html if any
  pathname = pathname.replace(".html", "");
  
  return pathname;
}