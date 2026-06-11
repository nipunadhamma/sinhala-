import { process } from "./engine/imeCore.js";

const editor = document.getElementById("editor");

let lastValue = "";

editor.addEventListener("input", () => {

let newValue = editor.value;

// prevent full rewrite flicker
let converted = process(newValue);

editor.value = converted;

lastValue = converted;

});
