

let undoStack = [];
let redoStack = [];
let isProcessing = false; // Undo/Redo ක්‍රියාවලියකදී ස්වයංක්‍රීයව save වීම වැළැක්වීමට

// undoredo.js ෆයිල් එකේ මෙය ලියා ඇති බව 
window.initHistoryEvents = function() {
    const canvas = getCanvas();
    if (!canvas) return;

    canvas.on("object:added", () => setTimeout(saveState, 50));
    canvas.on("object:modified", () => setTimeout(saveState, 50));
    canvas.on("object:removed", () => setTimeout(saveState, 50));
};

// SAVE STATE (අලුත් එකතු කිරීම්)
window.saveState = function() {
    if (isProcessing) return; // Undo/Redo අතරතුර save නොකරන්න

    const canvas = getCanvas(); // Canvas එක ලබා ගැනීමට ඔබේ helpers.js හි ඇති function එක පාවිච්චි කරන්න
    if (!canvas) return;

    const json = JSON.stringify(canvas.toJSON());

    // එකම තත්ත්වය නැවත save කිරීම වැළැක්වීම
    if (undoStack.length > 0 && undoStack[undoStack.length - 1] === json) {
        return;
    }

    undoStack.push(json);
    redoStack = []; // අලුත් වෙනසක් කළ විට Redo ඉතිහාසය මැකේ

    // memory limit (අවශ්‍ය නම් පමණක්)
    if (undoStack.length > 30) undoStack.shift();
};

// RESTORE STATE
function restore(state) {
    const canvas = getCanvas();
    if (!canvas) return;

    isProcessing = true; // පාලනය සක්‍රීය කරන්න
    canvas.loadFromJSON(state, function () {
        canvas.renderAll();
        if (typeof updateLayers === 'function') updateLayers();
        isProcessing = false; // පාලනය අක්‍රීය කරන්න
    });
}

// UNDO
window.undo = function() {
    if (undoStack.length <= 1) return;

    isProcessing = true;
    const current = undoStack.pop();
    redoStack.push(current);

    const prev = undoStack[undoStack.length - 1];
    restore(prev);
    isProcessing = false;
};

// REDO
window.redo = function() {
    if (redoStack.length === 0) return;

    isProcessing = true;
    const state = redoStack.pop();
    undoStack.push(state);
    restore(state);
    isProcessing = false;
};
