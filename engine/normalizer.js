export function normalize(text) {

    // =========================
    // 🔥 1. Reduce repeated letters
    // =========================

    text = text.replace(/([a-z])\1{2,}/g, "$1$1");

    // example:
    // aaaa → aa
    // mmmm → mm

    return text;
}
