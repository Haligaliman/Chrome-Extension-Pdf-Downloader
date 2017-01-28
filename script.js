function absolute(base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}



var links = [].slice.apply(document.getElementsByTagName('a'));



links = links.map(function(element) {
  // Return an anchor's href attribute, stripping any URL fragment (hash '#').
  // If the html specifies a relative path, chrome converts it to an absolute
  // URL.
  var href = element.href;
  
    
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    href = href.substr(0, hashIndex);
  }
  return href;
});

//new shit

var phps = [].slice.apply(document.getElementsByTagName('div'));

var kBadPrefix = 'javascript';
for (var i = 0; i < phps.length;) {
  if (phps[i].getAttribute('onclick')===null) {
    phps.splice(i, 1);
  } else {
    ++i;
  }
}

phps = phps.map(function(element) {
  // Return an anchor's href attribute, stripping any URL fragment (hash '#').
  // If the html specifies a relative path, chrome converts it to an absolute
  // URL.
  var onclick = element.getAttribute('onclick');
  //onclick = onclick.replace(/\s/g,'');
 // alert(onclick);
  var linkclick = onclick.substr(onclick.indexOf("=")+2,onclick.length-(onclick.indexOf("=")+2)-1);
  var hashIndex = linkclick.indexOf('#');
  if (hashIndex >= 0) {
    linkclick = linkclick.substr(0, hashIndex);
  }
  linkclick=absolute(document.baseURI,linkclick);
 // alert(linkclick);
  return linkclick;
});

links = links.concat(phps); //merging the arrays ╰໒( ි ▾ ි )७╯
//end of "new shit"

var kBadPrefix = 'javascript';
for (var i = 0; i < links.length;) {
  if (((i > 0) && (links[i] == links[i - 1])) ||
      (links[i] == '') ||
      (kBadPrefix == links[i].toLowerCase().substr(0, kBadPrefix.length))) {
    links.splice(i, 1);
  } else {
    ++i;
  }
}

  
chrome.extension.sendMessage(links);
  