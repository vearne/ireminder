'use strict';

let setRemindButton = document.getElementById('setRemindButton');
let removeRemindButton = document.getElementById('removeRemindButton');


chrome.storage.sync.get(['interval', 'tip'], result => {
  let intervalInput = document.getElementById('interval');
  let tipInput = document.getElementById('tip');
  if(result.interval){
    intervalInput.value = result.interval;
    tipInput.value = result.tip;
    console.info("change the popup");
  }
});

setRemindButton.onclick = function(element) {
    let interval = document.getElementById('interval');
    let tip = document.getElementById('tip');
    var bg = chrome.extension.getBackgroundPage();
    bg.setReminder(parseInt(interval.value), tip.value);
};

removeRemindButton.onclick = function(element) {
  var bg = chrome.extension.getBackgroundPage();
  bg.removeReminder();
}