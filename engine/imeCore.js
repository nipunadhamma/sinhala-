import { RULES } from "./rules.js";
import { DICTIONARY } from "./dictionary.js";

export function process(input){

input = input.toLowerCase();

// =============================
// 1. SPLIT WORDS (dictionary first)
// =============================
let words = input.split(" ");

for(let i=0;i<words.length;i++){
    if(DICTIONARY[words[i]]){
        words[i] = DICTIONARY[words[i]];
    }
}

input = words.join(" ");

// =============================
// 2. BUFFER ENGINE (SAFE IME)
// =============================
let result = "";
let buffer = "";
let i = 0;

while(i < input.length){

buffer += input[i];

// try longest match first
let match = null;

for(let r of RULES){

if(buffer.endsWith(r[0])){

match = r;
break;

}

}

if(match){

// remove matched roman
buffer = buffer.slice(0, -match[0].length);

// flush Sinhala
result += match[1];

buffer = "";

}

i++;

}

// flush remaining (fallback)
result += buffer;

return result;

}
