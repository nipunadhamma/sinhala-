// ============================
// KEYBOARD SHORTCUTS SYSTEM
// ============================

document.addEventListener('keydown', (e) => {
    // Undo: Ctrl + Z
    if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault(); // බ්‍රව්සරයේ default undo ක්‍රියාවලිය නැවැත්වීම
        if (typeof undo === 'function') undo();
    }

    // Redo: Ctrl + Y
    if (e.ctrlKey && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        if (typeof redo === 'function') redo();
    }
    
    // අවශ්‍ය නම් වෙනත් shortcuts මෙතනට එකතු කරන්න
    // උදා: Delete key එකෙන් object එක මකා දැමීමට
    if (e.key === 'Delete' || e.key === 'Backspace') {
        const canvas = getCanvas();
        if (canvas && canvas.getActiveObject() && !canvas.getActiveObject().isEditing) {
            canvas.remove(canvas.getActiveObject());
        }
    }
});
