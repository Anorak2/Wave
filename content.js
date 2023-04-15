function gotKitten(item) {
    console.log(`${item.kitten.name} has ${item.kitten.eyeCount} eyes`);
}

function gotMonster(item) {
    console.log(`${item.monster.name} has ${item.monster.eyeCount} eyes`);
}

function onError(error) {
    console.log(error)
}
function setItem() {
    console.log("OK");
}

// define 2 objects
let monster = {
    name: "Kraken",
    tentacles: true,
    eyeCount: 10
}

let kitten = {
    name: "Moggy",
    tentacles: false,
    eyeCount: 2
}

// store the objects
//browser.storage.local.set({kitten, monster})
//.then(setItem, onError);
browser.storage.local.get("kitten")
.then(gotKitten, onError);
browser.storage.local.get("monster")
.then(gotMonster, onError);


console.log(window.location.hostname)