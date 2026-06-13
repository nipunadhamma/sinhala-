// ===============================
// CONTEXT MENU ENGINE (PRO)
// ===============================

let contextTarget = null;

// ===============================
// CREATE MENU ONCE
// ===============================
function createContextMenu() {

    const menu = document.createElement("div");
    menu.id = "contextMenu";

    menu.style.position = "absolute";
    menu.style.background = "#222";
    menu.style.color = "white";
    menu.style.padding = "8px";
    menu.style.borderRadius = "8px";
    menu.style.display = "none";
    menu.style.zIndex = "99999";
    menu.style.minWidth = "160px";
    menu.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";

    document.body.appendChild(menu);
}

// ===============================
// SHOW MENU
// ===============================
function showContextMenu(x, y, obj) {

    const menu = document.getElementById("contextMenu");
    if (!menu) return;

    contextTarget = obj;

    menu.innerHTML = `
        <button onclick="cmDuplicate()">Duplicate</button>
        <button onclick="cmRename()">Rename</button>
        <button onclick="cmBringFront()">Bring Front</button>
        <button onclick="cmSendBack()">Send Back</button>
        <hr>
        <button onclick="cmDelete()">Delete</button>
    `;

    menu.style.left = x + "px";
    menu.style.top = y + "px";
    menu.style.display = "block";
}

// ===============================
// HIDE MENU
// ===============================
function hideContextMenu() {
    const menu = document.getElementById("contextMenu");
    if (menu) menu.style.display = "none";
}

// ===============================
// EVENTS (CANVAS BIND)
// ===============================
function bindContextMenu(canvas) {

    canvas.upperCanvasEl.addEventListener("contextmenu", function (e) {

        e.preventDefault();

        const pointer = canvas.getPointer(e);

        const obj = canvas.findTarget(e, false);

        if (!obj) return;

        showContextMenu(e.clientX, e.clientY, obj);
    });

    document.addEventListener("click", hideContextMenu);
}

// ===============================
// ACTIONS
// ===============================

function cmDuplicate() {

    const canvas = getCanvas();
    if (!contextTarget) return;

    contextTarget.clone(function (cloned) {

        cloned.set({
            left: cloned.left + 20,
            top: cloned.top + 20
        });

        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.requestRenderAll();
    });

    hideContextMenu();
}

function cmRename() {

    if (!contextTarget) return;

    const newName = prompt("Rename:", contextTarget.text || contextTarget.type);

    if (newName && contextTarget.type === "textbox") {
        contextTarget.text = newName;
        getCanvas().requestRenderAll();
    }

    hideContextMenu();
}

function cmBringFront() {

    const canvas = getCanvas();
    if (!contextTarget) return;

    canvas.bringToFront(contextTarget);
    canvas.requestRenderAll();
    hideContextMenu();
}

function cmSendBack() {

    const canvas = getCanvas();
    if (!contextTarget) return;

    canvas.sendToBack(contextTarget);
    canvas.requestRenderAll();
    hideContextMenu();
}

function cmDelete() {

    const canvas = getCanvas();
    if (!contextTarget) return;

    canvas.remove(contextTarget);
    canvas.requestRenderAll();
    hideContextMenu();
}
