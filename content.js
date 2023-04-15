
function onError(error) {
    console.log(error);
}
function setItem() {
    console.log("OK");
}
function onGot(item){
    if (typeof item["websiteTracking"] == "undefined"){
        browser.storage.local.set({websiteTracking: {mainArray: []}})
    }
    if (typeof item["websiteTracking"]["mainArray"][window.location.hostname] == "undefined"){
        item["websiteTracking"]["mainArray"][window.location.hostname] = 0;
    }
    item["websiteTracking"]["mainArray"][window.location.hostname]++;
    browser.storage.local.set({websiteTracking: {mainArray: item["websiteTracking"]["mainArray"]}})
}



async function updateArray(){
    let storageItem = browser.storage.local.get("websiteTracking");
    storageItem.then((result) => onGot(result), onError);
}

updateArray();

console.log(browser.storage.local.get());

//browser.storage.local.clear()
