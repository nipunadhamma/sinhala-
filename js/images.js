// ================================
// 🖼 IMAGE ENGINE (Canva Mini PRO)
// ================================

/*
  RULE:
  - ONLY image logic here
  - NO canvas init
  - NO shapes/text logic
  - NO layers/history
*/

// ================================
// 🟢 IMAGE UPLOAD
// ================================
document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("imgUpload");
  if (!input) return;

  input.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

      fabric.Image.fromURL(event.target.result, function (img) {

        const canvas = getCanvas();
        if (!canvas) return;

        // Auto scale (Canva style)
        img.scaleToWidth(300);

        img.set({
          left: 100,
          top: 100,
          selectable: true
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

      });

    };

    reader.readAsDataURL(file);
  });

});
