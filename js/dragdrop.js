// ================================
// 📦 DRAG & DROP IMAGE SUPPORT
// ================================

document.addEventListener("DOMContentLoaded", function () {

  const dropZone = document.getElementById("canvasArea");

  if (!dropZone) return;

  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  dropZone.addEventListener("drop", function (e) {

    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onload = function (event) {

      fabric.Image.fromURL(event.target.result, function (img) {

        const canvas = getCanvas();
        if (!canvas) return;

        img.scaleToWidth(300);

        img.set({
          left: 150,
          top: 150
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

      });

    };

    reader.readAsDataURL(file);
  });

});
