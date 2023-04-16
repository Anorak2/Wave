function gotKitten(item) {
    console.log(`${item.kitten.name} has ${item.kitten.eyeCount} eyes`);
}
function onError(error) {
    console.log(error)
}

function test(){
    browser.storage.local.get("kitten").then(gotKitten, onError);
}
