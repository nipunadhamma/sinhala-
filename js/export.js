// =======================
// EXPORT SYSTEM (CLEAN FINAL)
// =======================

let includeBG = false;

// =======================
// OPEN / CLOSE EXPORT POPUP
// =======================
window.openExportPopup = function () {
  document.getElementById("exportPopup").classList.remove("hidden");
};

window.closeExportPopup = function () {
  document.getElementById("exportPopup").classList.add("hidden");
};

// =======================
// MAIN EXPORT CONTROLLER
// =======================
window.startExport = function () {

  const c = window.canvas;
  if (!c) return alert("Canvas not ready!");

  const type = document.getElementById("exportType").value;
  const scale = parseInt(document.getElementById("exportScale").value);
  const transparent = document.getElementById("transparentBG").checked;

  includeBG = !transparent;

  // ================= PNG EXPORT =================
  if (type === "png") {

    const oldBg = c.backgroundColor;
    const oldImg = c.backgroundImage;

    if (!includeBG) {
      c.backgroundColor = null;
      c.backgroundImage = null;
      c.renderAll();
    }

    requestAnimationFrame(() => {

      const dataURL = c.toDataURL({
        format: "png",
        multiplier: scale
      });

      download(dataURL, "design.png");

      // restore background
      c.backgroundColor = oldBg;
      c.backgroundImage = oldImg;
      c.renderAll();

    });

  }

  // ================= JPG EXPORT =================
  else if (type === "jpg") {

    const dataURL = c.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: scale
    });

    download(dataURL, "design.jpg");
  }

  // ================= WEBP EXPORT =================
  else if (type === "webp") {

    const dataURL = c.toDataURL({
      format: "webp",
      quality: 1,
      multiplier: scale
    });

    download(dataURL, "design.webp");
  }

  // ================= PDF EXPORT =================
  else {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF(
      "landscape",
      "px",
      [c.width, c.height]
    );

    const img = c.toDataURL("image/png");

    pdf.addImage(img, "PNG", 0, 0, c.width, c.height);
    pdf.save("design.pdf");
  }

  closeExportPopup();
};

// =======================
// DOWNLOAD HELPER
// =======================
function download(dataURL, fileName) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataURL;
  link.click();
}
