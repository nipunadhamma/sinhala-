window.setBackgroundColor = function (color) {
  canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
};

window.setBackgroundImage = function (file) {

  const reader = new FileReader();

  reader.onload = function (e) {

    fabric.Image.fromURL(e.target.result, function (img) {

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });

    });

  };

  reader.readAsDataURL(file);
};

window.setGradientBackground = function () {

  const gradient = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'percentage',
    coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
    colorStops: [
      { offset: 0, color: '#ff0000' },
      { offset: 1, color: '#0000ff' }
    ]
  });

  canvas.setBackgroundColor(gradient, canvas.renderAll.bind(canvas));
};

window.lockBackground = function () {
  canvas.backgroundColor = canvas.backgroundColor;
  canvas.renderAll();
};window.lockBackground = function () {
  canvas.backgroundColor = canvas.backgroundColor;
  canvas.renderAll();
};
