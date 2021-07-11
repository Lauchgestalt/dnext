// ==UserScript==
// @name         Custom Video Background
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://duelingnexus.com/game/*
// @icon         https://www.google.com/s2/favicons?domain=duelingnexus.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    let video = document.createElement('video');
    video.src = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4';
    video.id = 'bg_video';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.minWidth = '100vw';
    video.style.minHeight = '100vh';
    video.style.zIndex = '-1';
    let DOM = document.documentElement;
    DOM.insertBefore(video, DOM.firstChild);
})();
