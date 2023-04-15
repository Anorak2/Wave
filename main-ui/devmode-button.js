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
        } else{
            document.getElementById("devModeToggle").innerHTML = "disabled";
            Array.from(document.getElementsByClassName("devmode-show")).forEach( s => {
                s.style.display="none";
            });
            Array.from(document.getElementsByClassName("devmode-hide")).forEach( s => {
                s.style.display="revert";
            });
        }
    }
    let inDevMode = browser.storage.local.get("isDevMode");
    inDevMode.then((results) => gotDevModeStatus(results));
}

function switchDevMode(){
    let inDevMode = browser.storage.local.get("isDevMode");
    inDevMode.then((results) => {
        if (results["isDevMode"]){
            browser.storage.local.set({isDevMode: false});
        } else{
            browser.storage.local.set({isDevMode: true});
        }
        checkDevMode();
    });
}
checkDevMode();