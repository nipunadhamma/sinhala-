import { CONSONANTS } from "./consonants.js";
import { MODIFIERS } from "./modifiers.js";
import { VOWELS } from "./vowels.js";

export function transliterate(text) {

    text = text.toLowerCase();

    let result = "";
    let i = 0;

    while (i < text.length) {

        let matched = false;

        // 🔥 STEP 1: Try 3-letter combos (gh, kh, th, etc.)
        let tri = text.substring(i, i + 3);
        let duo = text.substring(i, i + 2);
        let one = text.substring(i, i + 1);

        // =========================
        // 1. CONSONANT + VOWEL combos (ka, ki, ko)
        // =========================

        for (let len = 3; len >= 1; len--) {

            let chunk = text.substring(i, i + len);

            // CASE: consonant + vowel (ka, ki, ko)
            for (let cKey in CONSONANTS) {
                for (let vKey in MODIFIERS) {

                    if (chunk === cKey + vKey) {

                        result += CONSONANTS[cKey] + MODIFIERS[vKey];
                        i += len;
                        matched = true;
                        break;
                    }
                }
                if (matched) break;
            }

            if (matched) break;
        }

        if (matched) continue;

        // =========================
        // 2. PURE CONSONANT (k, m, t)
        // =========================

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

        // =========================
        // 3. VOWELS ONLY (a, i, u)
        // =========================

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

        // =========================
        // 4. DEFAULT (space, symbols)
        // =========================

        result += text[i];
        i++;
    }

    return result;
}
