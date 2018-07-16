// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


function setReminder(interval, tip) {
  // interval 单位分钟
  // tip 提示的消息
  var st = new Date().getTime() + 60 * 1000 * interval;
  chrome.alarms.clearAll();
  chrome.alarms.create("ireminder", {when: st, periodInMinutes:interval});
  chrome.alarms.onAlarm.addListener(function(alarm) {
    var t = new Date().getTime();
    chrome.notifications.create(t.toString(), 
                                {type:"basic", 
                                iconUrl:"images/get_started16.png", 
                                title:"ireminder message",
                                message:tip}
    );
    console.log("*******Got an alarm!*********", alarm);
  });
  alert("set reminder success");
};

function removeReminder() {
  chrome.alarms.clearAll();
  alert("remove reminder success");
};

// 一加载插件，就默认设置
setReminder(1, "休息一下眼睛吧!");