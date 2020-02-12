console.log('Popup Page');
var currentURL,currentTab;

window.onload = () => {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        currentTab=tabs[0];
        currentURL=tabs[0].url;
        console.log(currentURL);
        getFromChromeLocalStorage();
        document.getElementById('code').addEventListener("keyup", onScriptSubmit);        
    });
}

function onScriptSubmit() {
    saveToChromeLocalStorage();
    chrome.tabs.update(currentTab.id, {url: currentTab.url});
}

function saveToChromeLocalStorage() {
    localStorage.setItem(currentURL,document.getElementById('code').value);
  }
  
function getFromChromeLocalStorage() {
    document.getElementById('code').value = localStorage.getItem(currentURL);
  }

function existsInChromeLocalStorage(key) {
    chrome.storage.sync.get(key, function (obj) {
        if(key in obj)
            return true;
        else
            return false;
    });
  }