let canvas;

// =======================
// INIT CANVAS
// =======================
window.initCanvas = function () {

  canvas = new fabric.Canvas("canvas", {
    preserveObjectStacking: true
  });

  canvas.setWidth(900);
  canvas.setHeight(500);

  canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));

  window.canvas = canvas;

  bindCanvasEvents(); // ⭐ IMPORTANT
};

// =======================
// EVENTS BINDING
// =======================
function bindCanvasEvents() {

  canvas.on("selection:created", (e) => {
    if (e.selected && e.selected[0]?.type === "textbox") {
      showTextPanel();
    } else {
      hideTextPanel();
    }
  });

  canvas.on("selection:updated", (e) => {
    if (e.selected && e.selected[0]?.type === "textbox") {
      showTextPanel();
    } else {
      hideTextPanel();
    }
  });

  canvas.on("selection:cleared", hideTextPanel);
}
