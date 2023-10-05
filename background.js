chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch?")){
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",

    })
  }
});



chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "redirect"){
    console.log("Redirect request received");
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      // console.log(tabs[0].url);
      const URL = tabs[0].url;
      const newURL = URL.replace('watch', 'watch_popup');
      console.log(newURL);
      chrome.tabs.update(tabs[0].id, {url: newURL});
  });
  }
})