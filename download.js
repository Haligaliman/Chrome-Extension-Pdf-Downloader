// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file:"script.js"});
 });
 
 

  
chrome.extension.onMessage.addListener(function(links) {

 
 var allLinks = [];
for (var index in links) {
    allLinks.push(links[index]);
  }
  allLinks.sort();
  visibleLinks = allLinks;

  
 //alert("why");
  for (var i = 0; i < visibleLinks.length; ++i) {
	  
	 
      chrome.downloads.download({url: visibleLinks[i]});
    
  }
 
});