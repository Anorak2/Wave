//const client = new xrpl.Client(XRP_SERVER);
if (indevmode){
    XRP_SERVER = "wss://s.altnet.rippletest.net:51233";
} else{
    XRP_SERVER = "wss://xrplcluster.com/";
}

async function createWallet(){
    const client = new xrpl.Client(XRP_SERVER);
    await client.connect();
    // this function will create a wallet, then save it to local storage. 
    //newWallet = xrpl.Wallet.generate();
    //console.log(newWallet);
    if (indevmode){
        newWalletFunded = await client.fundWallet()
        newWallet = newWalletFunded.wallet;
        //client.fundWallet.newWallet;
    } else{
        newWallet = await xrpl.Wallet.generate()
    }
    //currentBalance = (await client.getXrpBalance(newWallet.address))
    await browser.storage.local.set({xrpwallet: newWallet.seed});
    //console.log(currentBalance);
    checkWalletStatus();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('createWallet')
          .addEventListener('click', function (){createWallet()});
});

async function updateBalanceInPage(walletAddress){
    const client = new xrpl.Client(XRP_SERVER);
    await client.connect();
    try {
        currentBalance = await client.getXrpBalance(walletAddress);
    } catch (ReferenceError){
        currentBalance = 0;
    }
    document.getElementById("currentBalance").innerHTML = currentBalance;
}

function checkWalletStatus(){
    let hasStoredWallet = browser.storage.local.get("xrpwallet");
    hasStoredWallet.then((results) => {
        if (results["xrpwallet"]){
            console.log("there's a stored wallet");
            document.getElementById("walletDoesNotExist").style.display = "none"; // redundant but might as well set this
            document.getElementById("walletExists").style.display = "revert"; // redundant but might as well set this
            currentWallet = xrpl.Wallet.fromSeed(results["xrpwallet"]);
            document.getElementById("walletAddress").innerHTML = currentWallet.address;
            updateBalanceInPage(currentWallet.address);
        } else{
            console.log("there's not a stored wallet");
            document.getElementById("walletDoesNotExist").style.display = "revert";
            document.getElementById("walletExists").style.display = "none"; // redundant but might as well set this
        }
    });
}


checkWalletStatus();