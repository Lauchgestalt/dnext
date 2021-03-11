// ==UserScript==
// @name         Dueling Nexus Music Selector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds UI to change the current music
// @author       LauchusGestaltus
// @match        https://duelingnexus.com/game/*
// @grant        none
// ==/UserScript==
window.addEventListener('load', function(){

    // Your code here...
    let window = document.createElement('div');
    window.id="audioSelector";
    let gameContainer = document.getElementById('options-window');
    var musicList = ["3574-cut-trance-by-kevin-macleod.ogg",
                     "3859-harmful-or-fatal-by-kevin-macleod.ogg",
                     "3953-killing-time-by-kevin-macleod.ogg",
                     "3998-long-time-coming-by-kevin-macleod.ogg",
                     "4596-voltaic-by-kevin-macleod.ogg",
                     "5004-severe-tire-damage-by-kevin-macleod.ogg",
                     "anthem-01.ogg",
                     "infected-mushroom-vibes.ogg",
                     "infected-vibes.ogg",
                     "party-robot.ogg",
                     "summer-dream.ogg",
                     "techno-fest-feel.ogg",
                     "trance-party.ogg",
                     "wyungamesh.ogg"]
    var titleList = ["Cut Trance",
                    "Harmful or Fatal",
                    "Killing Time",
                    "Long time coming",
                    "Voltaic",
                    "Severe tire damage",
                    "Anthem",
                    "Infected Mushroom",
                    "Infected Vibes",
                    "Party Robot",
                    "Summer Dream",
                    "Techno Fest Feel",
                    "Trance Party",
                    "Wyungamesh"]

    var css = '#audioSelector {width: 100%; height: 3vh; line-height: 3vh;} #selectCont{margin:5px;}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    let selectCont = document.createElement('select');
    selectCont.id='selectCont';
    for (var i = 0; i < musicList.length; i++){
        let option = document.createElement('option');
        option.value = ''+i;
        option.innerHTML = titleList[i];
        selectCont.append(option);
    }
    let button = document.createElement('button');
    button.innerHTML = 'Play';
    function changeMusic(){var select = document.getElementById("selectCont");
                           Game.audio.src = Game.audio.src="https://duelingnexus.com/assets/musics/" + musicList[select.value];
                          Game.audio.play();
                          }
    button.onclick = changeMusic;

    let script = document.createElement('script');
    script.innerHTML='function changeMusic(){var select = document.getElementById("selectCont");console.log(select);Game.audio.src = Game.audio.src="https://duelingnexus.com/assets/musics/" + musicList[select.value];}Game.audio.play();';
    document.head.append(script);
    window.append(selectCont);
    window.append(button);
    gameContainer.prepend(window);
});