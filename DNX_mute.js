// ==UserScript==
// @name         Dueling Nexus Chat Mute
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mute the Dueling Nexus Chat and hide it
// @author       LauchusGestaltus
// @match        https://duelingnexus.com/game/*
// @icon         https://www.google.com/s2/favicons?domain=duelingnexus.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var muted = false;

    let button = document.createElement('button');
    button.innerHTML = 'Mute';
    let window = document.getElementById('options-window');
    window.append(button);
    let chat = document.getElementById("game-chat-content");
    button.onclick = function(){
        muted = !muted
        if(muted){
            Engine.audio.sounds['chat-message'][0].src = '';
            button.innerHTML = 'Unmute';
            chat.style.display = "none";
        } else {
            Engine.audio.sounds['chat-message'][0].src = 'assets/sounds/chat-message.wav';
            button.innerHTML = 'Mute';
            chat.style.display = "block";
        }

    }

    
})();