/**
 * CANVA MINI PRO - INITIALIZATION SYSTEM
 */

window.onload = function () {
    try {
        // ======================================
        // 1. INITIALIZE CANVAS (Essential)
        // ======================================
        initCanvas();

        const canvas = getCanvas();
        if (!canvas) throw new Error("Canvas initialization failed!");

        // ======================================
        // 2. TEXT UI EVENTS
        // ======================================
        canvas.on("selection:created", updateTextUI);
        canvas.on("selection:updated", updateTextUI);
        canvas.on("object:modified", updateTextUI);
        canvas.on("selection:cleared", updateTextUI);

        // ======================================
        // 3. LAYERS SYSTEM (Syncs when changes occur)
        // ======================================
        canvas.on("object:added", syncLayers);
        canvas.on("object:removed", syncLayers);
        canvas.on("object:modified", syncLayers);
        
        // Initial Layer Render
        syncLayers();

        // ======================================
        // 4. HISTORY SYSTEM (Optional/Safe Call)
        // ======================================
        if (typeof initHistoryEvents === "function") {
            initHistoryEvents();
        }
        if (typeof saveState === "function") {
            saveState();
        }

        // ======================================
        // 5. FONTS & UI TOOLS
        // ======================================
        if (typeof loadFonts === 'function') {
            loadFonts();
        }

        // ======================================
        // 6. CONTEXT MENU
        // ======================================
        if (typeof createContextMenu === 'function') {
            createContextMenu();
        }
        if (typeof bindContextMenu === 'function') {
            bindContextMenu(canvas);
        }

        console.log("Editor loaded and ready.");

    } catch (err) {
        console.error("Initialization error:", err.message);
        // අවශ්‍ය නම් පරිශීලකයාට දෝෂයක් ඇති බව පෙන්වීමට මෙතනදී UI එකක් ඇමතිය හැක
    }
};

/**
 * අතිරේක: Canvas එක Resize වන විට එය පාලනය කිරීමට
 */
window.addEventListener('resize', () => {
    const canvas = getCanvas();
    if (canvas) {
        canvas.requestRenderAll();
    }
});
