// ============================
// FONT SYSTEM (FINAL CLEAN VERSION)
// ============================

const FONT_LIST = [
    { name: "Arial", file: null, category: "English" },
    { name: "Poppins", file: "fonts/Poppins.ttf", category: "English" },
    { name: "FM-Arjunn", file: "fonts/FM-Arjunn.TTF", category: "Sinhala" },
    { name: "FM Abhaya", file: "fonts/AbhayaLibre-Bold.ttf", category: "Sinhala" },
    { name: "FM Bindumathi", file: "fonts/5 FM_Bindumathi sinhala font by Aluth.com.TTF", category: "Sinhala" },
    { name: "THARU", file: "fonts/TharuDigitalSinhalaCooper.ttf", category: "Sinhala" },
];

let previewText = "AaBbCc අකුරු";

// ============================
// LOAD SYSTEM FONTS
// ============================
function loadFonts() {

    const select = document.getElementById("fontFamily");
    if (!select) return;

    select.innerHTML = "";

    FONT_LIST.forEach(font => {

        // inject font-face only once
        if (font.file && !document.getElementById(font.name)) {

            const style = document.createElement("style");
            style.id = font.name;

            style.innerHTML = `
                @font-face {
                    font-family: "${font.name}";
                    src: url("${font.file}");
                }
            `;

            document.head.appendChild(style);
        }

        const option = document.createElement("option");
        option.value = font.name;
        option.textContent = font.name;

        select.appendChild(option);
    });
}

// ============================
// APPLY FONT TO CANVAS
// ============================
window.changeFontFamily = function (fontName) {

    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();

 if (!obj || (obj.type !== "textbox" && obj.type !== "text")) return;

    obj.set("fontFamily", fontName);

    // 🔥 important fixes
    obj.initDimensions();
    obj.set("dirty", true);

    canvas.requestRenderAll();
};

// ============================
// IMPORT FONT (.ttf / .otf)
// ============================
document.getElementById("fontUpload")?.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const fontName = file.name.replace(/\.[^/.]+$/, "");

    const reader = new FileReader();

    // ✅ SAFE METHOD
    reader.readAsDataURL(file);

    reader.onload = function (event) {

        const url = event.target.result;

        const style = document.createElement("style");

        style.innerHTML = `
            @font-face {
                font-family: "${fontName}";
                src: url("${url}");
            }
        `;

        document.head.appendChild(style);

        const select = document.getElementById("fontFamily");

        const option = document.createElement("option");
        option.value = fontName;
        option.textContent = fontName;

        select.appendChild(option);

        select.value = fontName;

        // force font load
        document.fonts.load(`16px "${fontName}"`).then(() => {

            const canvas = getCanvas();
            const obj = canvas?.getActiveObject();

            if (obj && obj.type === "textbox") {
                obj.set("fontFamily", fontName);
                obj.initDimensions();
                obj.set("dirty", true);
                canvas.requestRenderAll();
            }
        });
    };
});

// ============================
// FONT APPLY (SAFE WRAPPER)
// ============================
window.applyFont = function (fontName) {

    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();

    if (!obj || obj.type !== "textbox") return;

    obj.set("fontFamily", fontName);

    obj.initDimensions();
    obj.set("dirty", true);

    canvas.requestRenderAll();
};

// ============================
// SEARCH FILTER
// ============================
window.filterFontList = function (keyword) {

    const items = document.querySelectorAll(".font-item");

    items.forEach(item => {

        const text = item.innerText.toLowerCase();

        item.style.display =
            text.includes(keyword.toLowerCase()) ? "flex" : "none";
    });
};

// ============================
// PREVIEW TEXT UPDATE
// ============================
window.updateFontPreviewText = function (text) {

    previewText = text || "AaBbCc අකුරු";

    loadFontPanel?.();
};

// ============================
// INIT
// ============================
window.addEventListener("load", loadFonts);
