// ===================================
// CANVA MINI FONT PRO - TEXT SYSTEM
// CLEAN + FIXED VERSION
// ===================================

// ================================
// ADD TEXT
// ================================
window.addText = function () {
    const canvas = getCanvas();
    if (!canvas) return;

    const text = new fabric.Textbox("Type here...", {
        left: 100,
        top: 100,
        width: 250,
        fontSize: 30,
        fontFamily: "FM-Arjunn",
        fill: "#000000",
        editable: true
        // textBaseline ඉවත් කරන ලදී (දෝෂ මඟහරවා ගැනීමට)
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
};

// ================================
// FONT FAMILY CHANGE
// ================================
window.changeFontFamily = function (fontName) {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj || (obj.type !== "textbox" && obj.type !== "text")) return;

    obj.set("fontFamily", fontName);
    
    // Canvas update ආරක්ෂිත කිරීම
    if (typeof obj.initDimensions === 'function') obj.initDimensions();
    canvas.requestRenderAll();
};

// ================================
// FONT SIZE
// ================================
window.changeFontSize = function (size) {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set("fontSize", parseInt(size) || 30);
    canvas.requestRenderAll();
};

// ================================
// TEXT COLOR
// ================================
window.changeTextColor = function (color) {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set("fill", color);
    canvas.requestRenderAll();
};

// ================================
// QUICK SINHALA FONT
// ================================
window.applySinhalaFont = function () {
    changeFontFamily("FM Abhaya");
};

// ================================
// UI SYNC (Properties Panel)
// ================================
window.updateTextUI = function () {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj) return;

    const size = document.getElementById("fontSize");
    const color = document.getElementById("colorPicker");
    const family = document.getElementById("fontFamily");

    // වටිනාකම් පවතින බව තහවුරු කරගැනීමෙන් දෝෂ මඟහරවයි
    if (size) size.value = obj.fontSize || 30;
    if (color) color.value = obj.fill || "#000000";
    if (family) family.value = obj.fontFamily || "Arial";
};

// ================================
// LIVE SHADOW SYSTEM
// ================================
window.applyShadowLive = function() {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj || (obj.type !== "textbox" && obj.type !== "text")) return;

    const colorEl = document.getElementById("shadowColor");
    const blurEl = document.getElementById("shadowBlur");
    const xEl = document.getElementById("shadowX");
    const yEl = document.getElementById("shadowY");

    obj.set("shadow", new fabric.Shadow({
        color: colorEl ? colorEl.value : "#000",
        blur: blurEl ? parseInt(blurEl.value) : 10,
        offsetX: xEl ? parseInt(xEl.value) : 5,
        offsetY: yEl ? parseInt(yEl.value) : 5
    }));

    canvas.requestRenderAll();
};

// ================================
// LIVE OUTLINE SYSTEM
// ================================
window.applyOutlineLive = function() {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj || (obj.type !== "textbox" && obj.type !== "text" && obj.type !== "image")) return;

    const colorEl = document.getElementById("outlineColor");
    const sizeEl = document.getElementById("outlineSize");
    const display = document.getElementById("outlineValueDisplay");
    
    if (display && sizeEl) {
        display.innerText = sizeEl.value;
    }

    obj.set({
        stroke: colorEl ? colorEl.value : "#000",
        strokeWidth: sizeEl ? parseFloat(sizeEl.value) : 0,
        strokeLineJoin: "round",
        paintFirst: 'stroke'
    });
    
    canvas.requestRenderAll();
};

// ================================
// REMOVE OUTLINE
// ================================
window.removeTextOutline = function () {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set({
        stroke: null,
        strokeWidth: 0
    });

    canvas.requestRenderAll();
};

// ================================
// EMBOSS EFFECT
// ================================
window.setEmbossEffect = function (color = "#000") {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set("shadow", new fabric.Shadow({
        color: color,
        blur: 1,
        offsetX: 2,
        offsetY: 2
    }));

    obj.set({
        stroke: "#ffffff",
        strokeWidth: 1
    });

    canvas.requestRenderAll();
};

// ================================
// CLEAR ALL EFFECTS
// ================================
window.clearTextEffects = function () {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set({
        shadow: null,
        stroke: null,
        strokeWidth: 0
    });

    canvas.requestRenderAll();
};

// ================================
// INITIALIZATION
// ================================
window.addEventListener("load", function () {
    // Canvas සූදානම් වූ විට පමණක් Event listeners එකතු කරන්න
    const checkCanvas = setInterval(() => {
        const canvas = getCanvas();
        if (canvas) {
            canvas.on("selection:created", updateTextUI);
            canvas.on("selection:updated", updateTextUI);
            canvas.on("object:modified", updateTextUI);
            clearInterval(checkCanvas);
        }
    }, 500);
});
