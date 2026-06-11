import { CONSONANTS } from "./consonants.js";
import { MODIFIERS } from "./modifiers.js";
import { VOWELS } from "./vowels.js";
import { DICTIONARY } from "./dictionary.js";
import { JOINERS } from "./joiners.js";

export function transliterate(text) {

    text = text.toLowerCase();

    // =========================
    // 🔥 STEP 1: JOINER ENGINE (NEW)
    // =========================

    for (let i = 0; i < JOINERS.length; i++) {

        let [eng, sin] = JOINERS[i];

        text = text.split(eng).join(sin);
    }

    // =========================
    // 🔥 STEP 2: DICTIONARY
    // =========================

    let words = text.split(" ");

    for (let i = 0; i < words.length; i++) {

        if (DICTIONARY[words[i]]) {
            words[i] = DICTIONARY[words[i]];
        }

    }

    text = words.join(" ");

    // =========================
    // 🔥 STEP 3: NORMAL ENGINE
    // =========================

    let result = "";
    let i = 0;

    while (i < text.length) {

        let matched = false;

        let tri = text.substring(i, i + 3);
        let duo = text.substring(i, i + 2);
        let one = text.substring(i, i + 1);

        // consonant + vowel combo
        for (let cKey in CONSONANTS) {
            for (let vKey in MODIFIERS) {

                let combo = cKey + vKey;

                if (text.substring(i, i + combo.length) === combo) {

                    result += CONSONANTS[cKey] + MODIFIERS[vKey];
                    i += combo.length;
                    matched = true;
                    break;
                }
            }
            if (matched) break;
        }

        if (matched) continue;

        // consonants
        if (CONSONANTS[tri]) {
            result += CONSONANTS[tri];
            i += 3;
            continue;
        }

        if (CONSONANTS[duo]) {
            result += CONSONANTS[duo];
            i += 2;
            continue;
        }

        if (CONSONANTS[one]) {
            result += CONSONANTS[one];
            i += 1;
            continue;
        }

        // vowels
        if (VOWELS[tri]) {
            result += VOWELS[tri];
            i += 3;
            continue;
        }

        if (VOWELS[duo]) {
            result += VOWELS[duo];
            i += 2;
            continue;
        }

        if (VOWELS[one]) {
            result += VOWELS[one];
            i += 1;
            continue;
        }

        result += text[i];
        i++;
    }

    return result;
}
