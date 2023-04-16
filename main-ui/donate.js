// what we want to do here is look at the stored web pages, determine which have ripple addresses, and then calculate an appropriate donation amount for each

plannedDonation = 50; // want to actually load this

function load(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {callback(xhr.responseText)}
    else {
        console.log("xhr status: " + xhr.status);
        callback(0);
    };
  };
  xhr.open("GET", url, true);
}

async function fillTableWeek(){
  let storageItem = browser.storage.local.get("websiteTracking");
  storageItem.then((result) => weekOnGot(result));
}

async function weekOnGot(item){
  //if (typeof item["websiteTracking"] != "undefined"){
  console.log(item["websiteTracking"]["mainArray"]);
  websiteDomains = Object.keys(item["websiteTracking"]["mainArray"]);
  rippleAddresses = {};
  totalVisits = 0;
  visitsToCompatibleSites = 0;
  compatibleSites = 0; // currently not used anywhere in output, but tracking this is probably for something useful later
  totalDonation = 0;
  for(var x = 0; x < websiteDomains.length; x++){
    if (websiteDomains[x] == "example.com"){
        rippleAddresses[x] = "r3CZnBJeQEPSKccDaBxMEDzA5G7qr3fgj1";
    }
    else{
    load("https://" + websiteDomains[x] + "/xrp.txt", function (contents){
        console.log(contents);
        rippleAddresses[x] = contents;
    });
    }
    if (rippleAddresses[x]!=0){
        compatibleSites++;
        visitsToCompatibleSites+=item["websiteTracking"]["mainArray"][websiteDomains[x]];
    }
  }
  for(var x = 0; x < websiteDomains.length; x++){
    console.log(websiteDomains[x]);
    let row = document.getElementById("weekTable").insertRow();
    let domainName = row.insertCell(0);
    domainName.innerHTML = websiteDomains[x];
    //["websiteTracking"]["mainArray"].indexOf("element");
    let numVisits = row.insertCell(1);
    numVisits.innerHTML = item["websiteTracking"]["mainArray"][websiteDomains[x]];
    totalVisits+=item["websiteTracking"]["mainArray"][websiteDomains[x]];
    let rippleAddr = row.insertCell(2);
    let donationAmount = row.insertCell(3);
    if (rippleAddresses[x] == 0){
        rippleAddr.innerHTML = "<span style='color:grey;'>no XRP address</span>";
        donationAmount.innerHTML = "<span style='color:grey;'>0</span>";
    } else{
        rippleAddr.innerHTML = rippleAddresses[x];
        donationAmount.innerHTML = Math.floor((item["websiteTracking"]["mainArray"][websiteDomains[x]]/visitsToCompatibleSites)*plannedDonation);
        totalDonation+=Math.floor((item["websiteTracking"]["mainArray"][websiteDomains[x]]/visitsToCompatibleSites)*plannedDonation)
    }
  }
  let row = document.getElementById("weekTable").insertRow();
  let domainName = row.insertCell(0);
  domainName.innerHTML = "<i>total</i>";
  let numVisits = row.insertCell(1);
  numVisits.innerHTML = "<i>" + totalVisits + "</i>";
  let rippleAddr = row.insertCell(2);
  let donationAmount = row.insertCell(3);
  donationAmount.innerHTML = "<i>" + totalDonation + "</i>";
  //}
}
fillTableWeek();

