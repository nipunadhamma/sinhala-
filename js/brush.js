// ================================
// 🖌 BRUSH + ERASER ENGINE
// ================================

let brushMode = false;
let eraserMode = false;

// ================================
// 🖌 ENABLE BRUSH
// ================================
window.enableBrush = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  brushMode = true;
  eraserMode = false;

  canvas.isDrawingMode = true;

  canvas.freeDrawingBrush.color = "#000000";
  canvas.freeDrawingBrush.width = 5;
};

// ================================
// 🧽 ENABLE ERASER
// ================================
window.enableEraser = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  brushMode = false;
  eraserMode = true;

  canvas.isDrawingMode = true;

  // Fabric eraser trick (new versions)
  canvas.freeDrawingBrush.color = "#ffffff";
  canvas.freeDrawingBrush.width = 20;
};

// ================================
// 🖱 DISABLE BRUSH (BACK TO SELECT MODE)
// ================================
window.disableBrush = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  brushMode = false;
  eraserMode = false;

  canvas.isDrawingMode = false;
};

// ================================
// 🎨 CHANGE BRUSH SIZE
// ================================
window.setBrushSize = function (size) {

  const canvas = getCanvas();
  if (!canvas) return;

  canvas.freeDrawingBrush.width = parseInt(size);
};

// ================================
// 🎨 CHANGE BRUSH COLOR
// ================================
window.setBrushColor = function (color) {

  const canvas = getCanvas();
  if (!canvas) return;

  canvas.freeDrawingBrush.color = color;
};
// ================================
// 🎛 BRUSH POPUP CONTROLLER
// ================================

window.toggleBrushPopup = function () {

  const popup = document.getElementById("brushPopup");

  if (!popup) return;

  popup.classList.toggle("hidden");
};

window.closeBrushPopup = function () {

  const popup = document.getElementById("brushPopup");

  if (popup) popup.classList.add("hidden");
};
