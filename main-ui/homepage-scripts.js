var page=0;
	//0 - home
    //1 - account details
    //2 - websites visited
    //3 - payment settings
    //I might delete this
var donationAmt = 10;
	//The current weekly donation amount. This should be retrived from somewhere
var balanceAmt = 25;
	//The current balance in the wallet. This should also be retrived



function onError(error){
  console.log(error);
}
function weekOnGot(item){
  //if (typeof item["websiteTracking"] != "undefined"){
  console.log(item["websiteTracking"]["mainArray"]);
  const bogus = Object.keys(item["websiteTracking"]["mainArray"])
  for(var x = 0; x < bogus.length; x++){
    console.log(bogus[x]);
    let row = document.getElementById("weekTable").insertRow();
    let domainName = row.insertCell(0);
    domainName.innerHTML = bogus[x];
    //["websiteTracking"]["mainArray"].indexOf("element");
    let numVisits = row.insertCell(1);
    numVisits.innerHTML = item["websiteTracking"]["mainArray"][bogus[x]];
  }
  //}
}

async function fillTableWeek(){
  let storageItem = browser.storage.local.get("websiteTracking");
  storageItem.then((result) => weekOnGot(result), onError);
}


function checkDonations(){
	document.getElementById("checkDonButton").style.display = "none";
   	document.getElementById("checkWebButton").style.display = "none";
   	document.getElementById("checkPayButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
    document.getElementById("pageTitle").innerHTML = "Check your donations";
    
    document.getElementById("1a").style.display = "block";
    document.getElementById("1b").style.display = "block";
    //Get user history
    document.getElementById("1c").style.display = "block";
    //That's a whole thing
    document.getElementById("1d").style.display = "block";
    document.getElementById("1e").style.display = "block";
    //Get user history
    document.getElementById("1f").style.display = "block";
    document.getElementById("1g").style.display = "block";
    //Get user history

}

function donateNow(){
  alert("we dont have this right now, come back later")
}
    
function checkWebsites(){
	document.getElementById("checkDonButton").style.display = "none";
   	document.getElementById("checkWebButton").style.display = "none";
   	document.getElementById("checkPayButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
    document.getElementById("pageTitle").innerHTML = "Websites you've visited";
    
    document.getElementById("2a").style.display = "block";
    fillTableWeek();
    document.getElementById("weekTable").style.display = "block";
    //Get user history

}

function checkPayments(){
	document.getElementById("checkDonButton").style.display = "none";
   	document.getElementById("checkWebButton").style.display = "none";
   	document.getElementById("checkPayButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
    document.getElementById("pageTitle").innerHTML = "Donation settings";
    
    //That's a whole thing
    document.getElementById("3d").style.display = "block";
    document.getElementById("3e").style.display = "block";
    //Get user history
    document.getElementById("3f").style.display = "block";
    //Get user history
    document.getElementById("3h").style.display = "block";
}

function addRipple(){
	alert("Eventually we'll have some code and this'll confirm the addition of XRPL");
}

function updateDonAmt(){
  var x = document.getElementById("3f").value;
  x = parseFloat(x)
  let donationAmt = {
    amtXRP: x
  }
  browser.storage.local.set(donationAmt)
  alert("Your new donation amount is " + x + " XRP")
  updateXrpCount()
}


function XrpCountOnGot(item){
  z = "" + item.donationAmt.amtXRP.toString() + " XRP";
  document.getElementById("3e").innerHTML = z;

}
async function updateXrpCount(){
  let storageItem = browser.storage.local.get("donationAmt");
  storageItem.then((result) => XrpCountOnGot(result), onError);
  console.log(browser.storage.local.get())
}

function goBack(){
	document.getElementById("checkDonButton").style.display = "block";
   	document.getElementById("checkWebButton").style.display = "block";
   	document.getElementById("checkPayButton").style.display = "block";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("pageTitle").innerHTML = "Home";

    document.getElementById("1a").style.display = "none";
    document.getElementById("1b").style.display = "none";
    document.getElementById("1c").style.display = "none";
    document.getElementById("1d").style.display = "none";
    document.getElementById("1e").style.display = "none";
    document.getElementById("1f").style.display = "none";
    document.getElementById("1g").style.display = "none";

	  document.getElementById("2a").style.display = "none";
    document.getElementById("weekTable").style.display = "none";
    
    document.getElementById("3d").style.display = "none";
    document.getElementById("3e").style.display = "none";
    document.getElementById("3f").style.display = "none";
    document.getElementById("3h").style.display = "none";
}

// This inputs the new amount to donate each week
/*document.getElementById("3h").oninput = function() {
  document.getElementById("3g").innerHTML = document.getElementById("3f").value;
  alert("dumbo")
}
*/
//Connect to a list of websites
//Connect to the wallet

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('checkDonButton')
          .addEventListener('click', function (){checkDonations()});
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('checkWebButton')
          .addEventListener('click', function (){checkWebsites()});
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('checkPayButton')
          .addEventListener('click', function (){checkPayments()});
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('backButton')
          .addEventListener('click', function (){goBack()});
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('1c')
          .addEventListener('click', function (){donateNow()});
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('3h')
          .addEventListener('click', function (){updateDonAmt()});
});