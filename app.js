const input=document.getElementById("roman");
const output=document.getElementById("sinhala");

input.addEventListener("input",()=>{

output.value=input.value;

});
import {transliterate} from "./engine/transliterator.js";

const input = document.getElementById("roman");
const output = document.getElementById("sinhala");

input.addEventListener("input", () => {
    output.value = transliterate(input.value);
});
