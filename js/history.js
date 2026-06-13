// ================================
// 🔁 HISTORY ENGINE (UNDO / REDO)
// ================================

let historyStack = [];
let redoStack = [];

// ================================
// 💾 SAVE STATE
// ================================
function saveState() {

  const canvas = getCanvas();
  if (!canvas) return;

  // clear redo when new action happens
  redoStack = [];

  const state = JSON.stringify(canvas.toJSON());

  historyStack.push(state);

  // memory limit (avoid crash)
  if (historyStack.length > 30) {
    historyStack.shift();
  }
}

// ================================
// ⬅ UNDO
// ================================
window.undo = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  if (historyStack.length === 0) return;

  const currentState = JSON.stringify(canvas.toJSON());

  redoStack.push(currentState);

  const prevState = historyStack.pop();

  canvas.loadFromJSON(prevState, function () {
    canvas.renderAll();
  });
};

// ================================
// ➡ REDO
// ================================
window.redo = function () {

  const canvas = getCanvas();
  if (!canvas) return;

  if (redoStack.length === 0) return;

  const currentState = JSON.stringify(canvas.toJSON());

  historyStack.push(currentState);

  const nextState = redoStack.pop();

  canvas.loadFromJSON(nextState, function () {
    canvas.renderAll();
  });
};

// ================================
// 🎯 AUTO SAVE EVENTS
// ================================
function initHistoryEvents() {

  const canvas = getCanvas();
  if (!canvas) return;

  canvas.on("object:added", function () {
    saveState();
  });

  canvas.on("object:modified", function () {
    saveState();
  });

  canvas.on("object:removed", function () {
    saveState();
  });
}
