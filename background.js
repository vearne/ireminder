// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let alarmSet = new Set();

function setReminder(interval, tip) {
  // interval 单位分钟
  // tip 提示的消息
  var st = new Date().getTime() + 60 * 1000 * interval;
  chrome.alarms.clearAll();
  chrome.alarms.create("ireminder", {when: st, periodInMinutes:interval});
  chrome.alarms.onAlarm.addListener(alarm => {
    if(alarm.name != "ireminder"){
      return
    }
    if(alarmSet.has(alarm.scheduledTime)){
      return
    }

    chrome.storage.sync.get(['tip'], result => {
      if(result.tip){
        chrome.notifications.create( 
          {type:"basic", 
          iconUrl:"images/get_started16.png", 
          title:"ireminder message",
          message:result.tip,
          requireInteraction:true}
        );
      }
    });

    alarmSet.clear();
    alarmSet.add(alarm.scheduledTime);
    console.log("*******Got an alarm!*********", alarm);
  });

  chrome.storage.sync.set({"interval": interval, "tip": tip});
  alert("set reminder success");
};

function removeReminder() {
  chrome.alarms.clearAll();
  alert("remove reminder success");
};

// 一加载插件，就默认设置
chrome.runtime.onInstalled.addListener(function(reason){
  setReminder(1, "休息一下眼睛吧!");
});
