'use strict';

let setRemindButton= document.getElementById('setRemindButton');
let removeRemindButton= document.getElementById('removeRemindButton');

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