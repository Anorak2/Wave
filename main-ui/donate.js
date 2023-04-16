// what we want to do here is look at the stored web pages, determine which have ripple addresses, and then calculate an appropriate donation amount for each

function XrpCountOnGot(item){
  console.log(item);
  plannedDonation=item.amtXRP;
  z = "" + item.amtXRP.toString() + " XRP";
  document.getElementById("donationAmount").innerHTML = z;
}

async function updateXrpCount(){
  let storageItem2 = browser.storage.local.get("amtXRP");
  storageItem2.then((result) => XrpCountOnGot(result));
  //console.log(browser.storage.local.get())
}

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
    finishedSetup = false;
  //if (typeof item["websiteTracking"] != "undefined"){
  console.log(item["websiteTracking"]["mainArray"]);
  websiteDomains = Object.keys(item["websiteTracking"]["mainArray"]);
  rippleAddresses = {};
  totalVisits = 0;
  visitsToCompatibleSites = 0;
  compatibleSites = 0; // currently not used anywhere in output, but tracking this is probably for something useful later
  totalDonation = 0;
  donations = {};
  for(var x = 0; x < websiteDomains.length; x++){
    if (websiteDomains[x] == "example.com"){
        rippleAddresses[x] = "r3CZnBJeQEPSKccDaBxMEDzA5G7qr3fgj1";
    } else if (websiteDomains[x] == "example.org"){
        rippleAddresses[x] = "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe";
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
        donations[x] = 0;
    } else{
        rippleAddr.innerHTML = rippleAddresses[x];
        donationAmount.innerHTML = Math.floor((item["websiteTracking"]["mainArray"][websiteDomains[x]]/visitsToCompatibleSites)*plannedDonation*1000)/1000;
        totalDonation+=Math.floor((item["websiteTracking"]["mainArray"][websiteDomains[x]]/visitsToCompatibleSites)*plannedDonation*1000)/1000;
        donations[x] = Math.floor((item["websiteTracking"]["mainArray"][websiteDomains[x]]/visitsToCompatibleSites)*plannedDonation*1000)/1000;
    }
  }
  let row = document.getElementById("weekTable").insertRow();
  let domainName = row.insertCell(0);
  domainName.innerHTML = "<i>total</i>";
  let numVisits = row.insertCell(1);
  numVisits.innerHTML = "<i>" + totalVisits + "</i>";
  let rippleAddr = row.insertCell(2);
  let donationAmount = row.insertCell(3);
  totalDonation = Math.ceil(totalDonation*1000)/1000;
  donationAmount.innerHTML = "<i>" + totalDonation + "</i>";
  //}
  finishedSetup = true;
}

async function payToAddress(addr, amount){
    console.log(addr + " " + amount);
    const client = new xrpl.Client(XRP_SERVER); // var set in wallet-config.js
    await client.connect();
    const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": currentWallet.address,
    "Amount": xrpl.xrpToDrops(amount),
    "Destination": addr
    })
    const max_ledger = prepared.LastLedgerSequence;
    console.log("Prepared transaction instructions:", prepared)
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
    console.log("Transaction expires after ledger:", max_ledger)
    const signed = currentWallet.sign(prepared)
    console.log("Identifying hash:", signed.hash)
    console.log("Signed blob:", signed.tx_blob)
    const tx = await client.submitAndWait(signed.tx_blob)
    console.log("Transaction result:", tx.result.meta.TransactionResult)
    console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
}

async function payWebsites(){
    if (!finishedSetup){
        alert("Page hasn't finished loading yet.");
    } else if (totalDonation>currentBalance){
        alert("You don't have enough XRP to pay. Please add some!");
    } else if (totalDonation == 0){
        alert("There aren't any websites to donate to!");
    } else {
        if (!confirm("Confirm: pay " + totalDonation + " XRP?")){
            return 0;
        }
        for (var x = 0; x < websiteDomains.length; x++){
            if (rippleAddresses[x]!=0){
                payToAddress(rippleAddresses[x], donations[x]);
            }
        }
    }
    console.log("finished starting all payments")
    setTimeout(() => {
    if(confirm("Websites have been paid! Clear current websites?")){
        browser.storage.local.remove("websiteTracking");
    };location.reload();}, 15000) // should be enough time
    
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('payWebsites')
          .addEventListener('click', function (){payWebsites()});
});

updateXrpCount();
fillTableWeek();