'use strict';

let initialText = document.querySelector('.initialText').innerHTML;

let outputText = document.querySelector('.outputText');

outputText.innerHTML = initialText.replace(/'/g, '"');

