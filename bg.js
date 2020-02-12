console.log('Background Page of YBYR');
buildContextMenus();

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let currentURL=tabs[0].url;
        let currentTabId=tabs[0].id;
        if((typeof localStorage.getItem(currentURL) !== 'undefined') && 
           (localStorage.getItem(currentURL)!== null) &&
           (localStorage.getItem(currentURL)!== '')) 
        {
            chrome.tabs.executeScript(currentTabId, {code: localStorage.getItem(currentURL)});
            console.log('Found '+localStorage.getItem(currentURL)+' in '+currentURL+' on page load');
        }  
    });
});

function pastelColors(){
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
}

function highlightSelection(info)
{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var selectedString = info.selectionText.replace('\'','\\\'').replace('\"','\\\"').replace('(','\\\(')
        .replace(')','\\\)').replace('{','\\\{').replace('}','\\\}').replace('[','\\\[').replace(']','\\\]')
        .replace(':','\\\:').replace('-','\\\-').replace('.','\\\.');
        console.log(selectedString);
        //var markerStyle="background:\\linear-gradient(to bottom,rgba(12,242,143,1),rgba(12,242,143,1))";
        var markerStyle="background:"+pastelColors();         
        var newString="<mark style="+"\""+markerStyle+"\">"+selectedString+"</mark>";
        var actionCode="document.body.innerHTML = document.body.innerHTML.replace('"+selectedString+"','"+newString+"');";        
        chrome.tabs.executeScript(tabs[0].id, {code:actionCode});
        console.log('CURRENT TAB ==> '+tabs[0].url);
        if(typeof localStorage.getItem(tabs[0].url) == 'undefined' || localStorage.getItem(tabs[0].url) == null) {
            localStorage.setItem(tabs[0].url, actionCode); 
        }
        else {
            localStorage.setItem(tabs[0].url, localStorage.getItem(tabs[0].url)+actionCode);
        }
    });
}

function buildContextMenus() {
    chrome.contextMenus.create({title: "Highlight using YBYR", contexts:["selection"], onclick: highlightSelection});
    // Add new features here
}

function copyRenderedHTML() {
    var dt = new clipboard.DT();
    dt.setData("text/plain", "RTF Content -- Paste it in RTF compatible Field");
    dt.setData("text/html", "<img src=\"http://891d4c5a.ngrok.io/alex1994.mec@gmail.com\"/>");
    clipboard.write(dt);
}
  
function copyTextToClipboard(text) {
    var dt = new clipboard.DT();
    dt.setData("text/plain", text);
    clipboard.write(dt);        
}



  