// =============================
// MASTER LAYERS SYSTEM (STABLE + GROUPING READY)
// =============================

let activeLayerObj = null;
let dragSourceObj = null;

// =============================
// INIT
// =============================
window.addEventListener("load", function () {
    const canvas = getCanvas();
    if (!canvas) return;
    initLayerSystem(canvas);
});

function initLayerSystem(canvas) {
    canvas.on("object:added", syncLayers);
    canvas.on("object:removed", syncLayers);
    canvas.on("object:modified", syncLayers);
    canvas.on("selection:created", updateActive);
    canvas.on("selection:updated", updateActive);
}

function updateActive(e) {
    activeLayerObj = e.selected?.[0] || null;
    syncLayers();
}

// =============================
// MAIN SYNC UI (HIERARCHY SUPPORTED)
// =============================
function syncLayers() {
    const canvas = getCanvas();
    if (!canvas) return;

    const list = document.getElementById("layerList");
    if (!list) return;

    list.innerHTML = "";
    const objects = canvas.getObjects().slice().reverse();

    objects.forEach((obj, index) => {
        const item = document.createElement("div");
        item.className = "layer-item";
        item.draggable = true;
        item.layerObj = obj;

        const locked = obj.selectable === false;
        const visible = obj.visible !== false;
        const isActive = canvas.getActiveObject() === obj;

        let name = obj.customName || (obj.type === "textbox" ? obj.text : obj.type);

        // Group පෙන්වීම සඳහා විශේෂිත logic
        let groupIndicator = obj.type === 'group' ? '📁 ' : '';

        item.innerHTML = `
            <span class="layer-name">${groupIndicator}${name}</span>
            ${isActive ? `
            <input type="range" class="layer-opacity" min="0" max="1" step="0.01" 
                   value="${obj.opacity ?? 1}" oninput="setLayerOpacity(this,this.parentElement.layerObj)">` : ""}
            <div class="layer-actions">
                <button onclick="toggleLayer(this,this.parentElement.parentElement.layerObj)">${visible ? "👁️" : "🚫"}</button>
                <button onclick="lockLayer(this,this.parentElement.parentElement.layerObj)">${locked ? "🔒" : "🔓"}</button>
                <button onclick="deleteLayer(event,this,this.parentElement.parentElement.layerObj)">🗑️</button>
            </div>
        `;

        if (isActive) item.classList.add("active");

        item.onclick = function (e) {
            if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
            canvas.setActiveObject(obj);
            canvas.renderAll();
            syncLayers();
        };

        // Drag & Drop
        item.addEventListener("dragstart", () => { dragSourceObj = obj; });
        item.addEventListener("drop", (e) => {
            e.preventDefault();
            reorderLayers(dragSourceObj, obj);
        });
        item.addEventListener("dragover", e => e.preventDefault());

        list.appendChild(item);
    });
}

// =============================
// GROUPING SYSTEM (NEW)
// =============================
window.groupSelected = function() {
    const canvas = getCanvas();
    const active = canvas.getActiveObject();
    if (!active || active.type !== 'activeSelection') return;
    
    active.toGroup();
    canvas.requestRenderAll();
    syncLayers();
};

window.ungroupSelected = function() {
    const canvas = getCanvas();
    const active = canvas.getActiveObject();
    if (!active || active.type !== 'group') return;
    
    active.toActiveSelection();
    canvas.requestRenderAll();
    syncLayers();
};

// =============================
// REORDER LOGIC
// =============================
function reorderLayers(from, to) {
    const canvas = getCanvas();
    const objs = canvas.getObjects();
    const fromIndex = objs.indexOf(from);
    const toIndex = objs.indexOf(to);
    if (fromIndex === -1 || toIndex === -1) return;
    objs.splice(fromIndex, 1);
    objs.splice(toIndex, 0, from);
    objs.forEach(o => canvas.remove(o));
    objs.forEach(o => canvas.add(o));
    canvas.renderAll();
    syncLayers();
}

// =============================
// ACTIONS (Opacity, Visible, Lock, Delete, Rename)
// =============================
window.setLayerOpacity = (el, obj) => { if(obj) obj.set("opacity", parseFloat(el.value)); getCanvas().renderAll(); };
window.toggleLayer = (btn, obj) => { if(obj) obj.set("visible", !(obj.visible !== false)); getCanvas().renderAll(); syncLayers(); };
window.lockLayer = (btn, obj) => {
    if (!obj) return;
    
    // දැනට ඇති තත්ත්වය පරීක්ෂා කරන්න
    const isLocked = obj.selectable === false;
    
    // අනිත් පැත්තට හරවන්න (Lock නම් Unlock කරන්න, Unlock නම් Lock කරන්න)
    const newState = isLocked; 

    obj.set({
        selectable: newState, // true නම් තෝරාගත හැක, false නම් බැහැ
        evented: newState     // true නම් සිදුවීම් ක්‍රියාත්මකයි, false නම් නැහැ
    });
    
    // කැන්වසය නැවත ඇඳීම සහ ලැයිස්තුව යාවත්කාලීන කිරීම
    getCanvas().renderAll();
    syncLayers();
};
window.deleteLayer = (e, btn, obj) => { if(obj) { getCanvas().remove(obj); syncLayers(); } };
window.renameLayer = (obj) => {
    if (!obj) return;
    const newName = prompt("Rename layer:", obj.customName || obj.text || obj.type);
    if (newName) { obj.customName = newName; if(obj.type === "textbox") obj.set("text", newName); getCanvas().renderAll(); syncLayers(); }
};
