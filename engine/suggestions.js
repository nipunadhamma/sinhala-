import { DICTIONARY } from "./dictionary.js";

export function getSuggestions(prefix) {

    prefix = prefix.toLowerCase();

    let results = [];

    // dictionary-based suggestions
    for (let key in DICTIONARY) {

        if (key.startsWith(prefix)) {
            results.push(key);
        }
    }

    // extra smart suggestions
    const extras = [
        "mama",
        "mage",
        "oba",
        "api",
        "kohomada",
        "ehema",
        "balanna",
        "ganna"
    ];

    for (let w of extras) {
        if (w.startsWith(prefix)) {
            results.push(w);
        }
    }

    return results.slice(0, 5);
}
