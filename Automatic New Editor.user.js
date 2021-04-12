// ==UserScript==
// @name         Automatic New Editor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically forwards to the new DN editor
// @author       LauchusGestaltus
// @match        https://duelingnexus.com/editor/*
// @icon         https://www.google.com/s2/favicons?domain=duelingnexus.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var url = window.location.href;
    url = url.toString();
    if(url.includes('/editor/')){
       var fixed_url = url.replace("/editor/", "/editor2.php?id=");
        window.location.href = fixed_url;
       }
})();