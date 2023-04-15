document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('devModeToggle')
          .addEventListener('click', function (){switchDevMode()});
});

function checkDevMode(){
    function notSet(){
        browser.storage.local.set({isDevMode: false});
    }
    function gotDevModeStatus(results){
/*        if (typeof(results["isDevMode"]) === 'undefined'){
            browser.storage.local.set({isDevMode: false});
            console.log("No devmode status; defaulted to false.");
            results["isDevMode"] = false;
        }*/
        console.log(results["isDevMode"]);
        if (results["isDevMode"]){
            document.getElementById("devModeToggle").innerHTML = "enabled";
        } else{
            document.getElementById("devModeToggle").innerHTML = "disabled";
        }
    }
    let inDevMode = browser.storage.local.get("isDevMode");
    inDevMode.then((results) => gotDevModeStatus(results));
}function switchDevMode(){
    function gotDevModeStatus(results){
/*        if (typeof(results["isDevMode"]) === 'undefined'){
            browser.storage.local.set({isDevMode: false});
            console.log("No devmode status; defaulted to false.");
            results["isDevMode"] = false;
        }*/
        console.log(results["isDevMode"]);
        if (results["isDevMode"]){
            browser.storage.local.set({isDevMode: false});
            document.getElementById("devModeToggle").innerHTML = "disabled";
        } else{
            browser.storage.local.set({isDevMode: true});
            document.getElementById("devModeToggle").innerHTML = "enabled";
        }
    }
    let inDevMode = browser.storage.local.get("isDevMode");
    inDevMode.then((results) => gotDevModeStatus(results));
}


checkDevMode();