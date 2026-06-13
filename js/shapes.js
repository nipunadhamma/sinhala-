// ================================
// 🎨 SHAPES ENGINE (Canva Mini PRO)
// ================================

/*
  RULE:
  - ONLY shape logic here
  - NO canvas init
  - NO UI events hub
  - NO layers/history
*/

// ================================
// 🟦 ADD RECTANGLE
// ================================
window.addRect = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  const rect = new fabric.Rect({
    left: 150,
    top: 150,
    width: 120,
    height: 80,
    fill: "#3498db",
    stroke: "#000",
    strokeWidth: 0
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
};


// ================================
// 🔴 ADD CIRCLE
// ================================
window.addCircle = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 50,
    fill: "#e74c3c",
    stroke: "#000",
    strokeWidth: 0
  });

  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.renderAll();
};


// ================================
// 🔺 ADD TRIANGLE
// ================================
window.addTriangle = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  const triangle = new fabric.Triangle({
    left: 250,
    top: 250,
    width: 100,
    height: 100,
    fill: "#2ecc71",
    stroke: "#000",
    strokeWidth: 1
  });

  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  canvas.renderAll();
};


// ================================
// ❌ DELETE SELECTED OBJECT
// ================================
window.deleteObject = function () {

  const canvas = getCanvas();
  const obj = canvas.getActiveObject();

  if (!obj) return;

  canvas.remove(obj);
  canvas.renderAll();
};
