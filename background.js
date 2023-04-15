console.log("background")

function openTab(){
    
    var newTab = browser.tabs.create({
        url:'',
        active:true
    })
}

browser.browserAction.onClicked.addListener(openTab)
