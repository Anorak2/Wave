document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('devModeToggle')
          .addEventListener('click', function (){switchDevMode()});
});

function checkDevMode(){
    function notSet(){
        browser.storage.local.set({isDevMode: false});
    }
    function gotDevModeStatus(results){
        //console.log(results["isDevMode"]);
        if (results["isDevMode"]){
            document.getElementById("devModeToggle").innerHTML = "enabled";
            Array.from(document.getElementsByClassName("devmode-show")).forEach( s => {
                s.style.display="revert";
            });
            Array.from(document.getElementsByClassName("devmode-hide")).forEach( s => {
                s.style.display="none";
            });
            indevmode=true;
        } else{
            document.getElementById("devModeToggle").innerHTML = "disabled";
            Array.from(document.getElementsByClassName("devmode-show")).forEach( s => {
                s.style.display="none";
            });
            Array.from(document.getElementsByClassName("devmode-hide")).forEach( s => {
                s.style.display="revert";
            });
            indevmode=false;
        }
    }
    let inDevMode = browser.storage.local.get("isDevMode");
    inDevMode.then((results) => gotDevModeStatus(results));
}

function switchDevMode(){
    let inDevMode = browser.storage.local.get(["isDevMode", "xrpwallet"]);
    inDevMode.then((results) => {
        finishSwitching = true;
        if (results["xrpwallet"]){
            if(window.confirm("You have a stored XRP wallet. Switching between developer and non-developer mode will ***permanently delete your wallet***, and if you have not backed up your keys, you will lose all the XRP in it. Are you absolutely sure?")){
                browser.storage.local.remove("xrpwallet");
            } else {
                finishSwitching = false;
            }
        }
        if (results["isDevMode"] && finishSwitching){
            browser.storage.local.set({isDevMode: false});
        } else{
            browser.storage.local.set({isDevMode: true});
        }
        location.reload();
    });
}
checkDevMode();