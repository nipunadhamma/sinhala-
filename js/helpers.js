window.canvas = null;

function initCanvas() {
    window.canvas = new fabric.Canvas('canvas', {
        width: 900,
        height: 500,
        backgroundColor: '#ffffff'
    });
    console.log("Canvas initialized successfully!");
}

function getCanvas() {
    if (!window.canvas) {
        console.warn("Canvas not initialized!");
        return null;
    }
    return window.canvas;
}