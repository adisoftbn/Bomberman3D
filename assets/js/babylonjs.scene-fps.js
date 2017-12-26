BABYLON.Scene.prototype.showFps = function (args) {
  args = args || {};
  var ioSpeed = args.ioSpeed || 30;
  var location = args.location || 'tl';
  var offset = {};
  args.offset = args.offset || {};
  offset.x = args.offset.x || 0;
  offset.y = args.offset.y || 0;

  var font = args.font || "Arial";
  var color = args.color || 'rgba(180,180,180,0.65)';
  var size = args.size || '12px';
  var padding = args.padding || '0.2em;'
  var background = args.background || 'rgba(10,10,10,0.65)';
  var n = document.createElement('div');
  n.setAttribute('id', 'fps-block');
  n.setAttribute('class', 'babylonjs-fps');

  n.innerHTML = "##&nbsp;fps";

  document.body.appendChild(n);

  var self = this;
  var pE = self._engine;

  function getFps() {
    var b = document.getElementById('fps-block');
    if (b) {
      b.innerHTML = pE.getFps().toFixed() + " fps";
      setTimeout(function () {
        getFps()
      }, 1000 / ioSpeed);
    }
  }

  getFps();


  return n;
}
