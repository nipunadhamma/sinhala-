// ================================
// GRADIENT SYSTEM (FIXED VERSION)
// ================================

// 1. Modal පාලනය
window.openGradientModal = function() {
    const modal = document.getElementById('gradientEditor');
    if (modal) modal.classList.remove('hidden');
};

window.closeGradientModal = function() {
    const modal = document.getElementById('gradientEditor');
    if (modal) modal.classList.add('hidden');
};

// 2. Gradient Apply කිරීම (Fabric.js v5+ සඳහා නිවැරදි ක්‍රමය)
window.applyGradient = function() {
    const canvas = getCanvas();
    const obj = canvas.getActiveObject();
    if (!obj) return alert("Select an object!");

    const color1 = document.getElementById("gradColor1").value;
    const color2 = document.getElementById("gradColor2").value;

    const gradient = new fabric.Gradient({
        type: 'linear',
        gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: obj.width, y2: 0 },
        colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 }
        ]
    });

    obj.set("fill", gradient);
    canvas.requestRenderAll();
    if (typeof saveState === "function") saveState();
};

// එක පැත්තක් සම්පූර්ණයෙන්ම Transparent කිරීමට
window.applyFadeEffect = function() {
    const canvas = getCanvas();
    const obj = canvas.getActiveObject();
    if (!obj) return;

    const color1 = document.getElementById("gradColor1").value;

    const gradient = new fabric.Gradient({
        type: 'linear',
        gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: obj.width, y2: 0 },
        colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: 'rgba(0,0,0,0)' }
        ]
    });

    obj.set("fill", gradient);
    canvas.requestRenderAll();
};