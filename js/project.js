

// =======================
// OPEN / CLOSE
// =======================
window.openNewProject = function () {
  document.getElementById("newProjectPopup").classList.remove("hidden");
};

window.closeNewProject = function () {
  document.getElementById("newProjectPopup").classList.add("hidden");
};

// =======================
// TEMPLATE SELECT
// =======================
window.setTemplate = function (w, h) {
  document.getElementById("projWidth").value = w;
  document.getElementById("projHeight").value = h;
};

// =======================
// CREATE NEW PROJECT
// =======================
window.createNewProject = function () {

  const c = window.canvas;
  if (!c) return alert("Canvas not ready!");

  const w = parseInt(document.getElementById("projWidth").value);
  const h = parseInt(document.getElementById("projHeight").value);

  // clear canvas
  c.clear();

  // set new size
  c.setWidth(w);
  c.setHeight(h);

  // default background
  c.setBackgroundColor("#ffffff", c.renderAll.bind(c));

  closeNewProject();
};
