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
	alert("Eventually we'll have some code and this'll confirm the donation");
}
    
function checkWebsites(){
	document.getElementById("checkDonButton").style.display = "none";
   	document.getElementById("checkWebButton").style.display = "none";
   	document.getElementById("checkPayButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
    document.getElementById("pageTitle").innerHTML = "Websites you've visited";
    
    document.getElementById("2a").style.display = "block";
    document.getElementById("2b").style.display = "block";
    //Get user history
    document.getElementById("2c").style.display = "block";
    document.getElementById("2d").style.display = "block";
    //Get user history

}

function checkPayments(){
	document.getElementById("checkDonButton").style.display = "none";
   	document.getElementById("checkWebButton").style.display = "none";
   	document.getElementById("checkPayButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
    document.getElementById("pageTitle").innerHTML = "Donation settings";
    
    document.getElementById("3a").style.display = "block";
    document.getElementById("3b").style.display = "block";
    //Get wallet
    document.getElementById("3c").style.display = "block";
    //That's a whole thing
    document.getElementById("3d").style.display = "block";
    document.getElementById("3e").style.display = "block";
    //Get user history
    document.getElementById("3f").style.display = "block";
    document.getElementById("3g").style.display = "block";
    //Get user history
    document.getElementById("3h").style.display = "block";
    document.getElementById("3i").style.display = "block";
}

function addRipple(){
	alert("Eventually we'll have some code and this'll confirm the addition of XRPL");
}

function updateDon(){
	alert("Eventually we'll have some code and this'll confirm the donation amount");
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
    document.getElementById("2b").style.display = "none";
    document.getElementById("2c").style.display = "none";
    document.getElementById("2d").style.display = "none";
    
    document.getElementById("3a").style.display = "none";
    document.getElementById("3b").style.display = "none";
    document.getElementById("3c").style.display = "none";
    document.getElementById("3d").style.display = "none";
    document.getElementById("3e").style.display = "none";
    document.getElementById("3f").style.display = "none";
    document.getElementById("3g").style.display = "none";
    document.getElementById("3h").style.display = "none";
    document.getElementById("3i").style.display = "none";
}

document.getElementById("3g").innerHTML = document.getElementById("3f").value;
document.getElementById("3f").oninput = function() {
  document.getElementById("3g").innerHTML = "New value: " + document.getElementById("3g").value;
}
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
  document.getElementById('3c')
          .addEventListener('click', function (){addRipple()});
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('3h')
          .addEventListener('click', function (){updateDon()});
});