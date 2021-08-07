// ==UserScript==
// @name         DNX Scrollable
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
    var deckSel = document.getElementById('game-deck-selection');
    deckSel.style.maxHeight = '50vh';
    deckSel.style.overflowY = 'scroll';
    // Your code here...
})();
