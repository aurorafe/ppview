/**
 * Created by FDD on 2017/7/28.
 * @desc TextSprite
 */
const TextSprite = function (t) {
  THREE.Object3D.call(this);
  var e = new THREE.Texture;
  e.minFilter = THREE.LinearFilter;
  e.magFilter = THREE.LinearFilter;
  var i = new THREE.SpriteMaterial({map: e, depthTest: false});
  this.sprite = new THREE.Sprite(i);
  this.add(this.sprite);
  this.text = "";
  this.offset = [0, 0];
  this.style = {
    fontface: "微软雅黑",
    fontsize: 15,
    textColor: "#000000",
    borderThickness: 1,
    borderFillet: 6,
    borderColor: "rgba(0,0,0,0.8)",
    backgroundColor: "rgba(255,255,255,0.8)"
  };
  if (t != null) {
    if (t.text != null) {
      this.text = t.text
    }
    if (t.offset != null) {
      this.offset[0] = t.offset[0];
      this.offset[1] = t.offset[1]
    }
    if (t.style != null) {
      if (t.style.fontface != null) this.style.fontface = t.style.fontface;
      if (t.style.fontsize != null) this.style.fontsize = t.style.fontsize;
      if (t.style.textColor != null) this.style.textColor = t.style.textColor;
      if (t.style.borderThickness != null) this.style.borderThickness = t.style.borderThickness;
      if (t.style.borderFillet != null) this.style.borderFillet = t.style.borderFillet;
      if (t.style.borderColor != null) this.style.borderColor = t.style.borderColor;
      if (t.style.backgroundColor != null) this.style.backgroundColor = t.style.backgroundColor
    }
  }
  this.update()
};
TextSprite.prototype = new THREE.Object3D;
TextSprite.prototype.setStyle = function (t) {
  if (t.fontface != null) this.style.fontface = t.fontface;
  if (t.fontsize != null) this.style.fontsize = t.fontsize;
  if (t.textColor != null) this.style.textColor = t.textColor;
  if (t.borderThickness != null) this.style.borderThickness = t.borderThickness;
  if (t.borderFillet != null) this.style.borderFillet = t.borderFillet;
  if (t.borderColor != null) this.style.borderColor = t.borderColor;
  if (t.backgroundColor != null) this.style.backgroundColor = t.backgroundColor;
  this.update()
};
TextSprite.prototype.setOffset = function (t, e) {
  this.offset[0] = t;
  this.offset[1] = e;
  this.update()
};
TextSprite.prototype.setText = function (t) {
  this.text = t;
  this.update()
};
TextSprite.prototype.update = function () {
  var t = this.style.fontsize + "px " + this.style.fontface;
  var e = document.createElement("canvas");
  var i = e.getContext("2d");
  i.font = t;
  var n = i.measureText(this.text);
  var r = n.width;
  var a = Math.round(this.style.fontsize * .2) + this.style.borderThickness;
  var o = r + 2 * a;
  var s = this.style.fontsize + 2 * a;
  var e = document.createElement("canvas");
  var i = e.getContext("2d");
  i.canvas.width = o;
  i.canvas.height = s;
  i.font = t;
  if (this.style.borderThickness > 0) {
    i.fillStyle = this.style.backgroundColor;
    i.strokeStyle = this.style.borderColor;
    i.lineWidth = this.style.borderThickness;
    this.roundRect(i, this.style.borderThickness / 2, this.style.borderThickness / 2, o - this.style.borderThickness, s - this.style.borderThickness, this.style.borderFillet);
    i.fillStyle = this.style.textColor;
    i.fillText(this.text, a, this.style.fontsize + a / 2)
  } else {
    i.strokeStyle = this.style.backgroundColor;
    i.strokeText(this.text, a, this.style.fontsize + a / 2);
    i.fillStyle = this.style.textColor;
    i.fillText(this.text, a, this.style.fontsize + a / 2)
  }
  var h = new THREE.Texture(e);
  h.minFilter = THREE.LinearFilter;
  h.magFilter = THREE.LinearFilter;
  h.needsUpdate = true;
  this.sprite.material.map = h;
  var c = s / this.style.fontsize;
  var l = o / s * c;
  var u = 1 * c;
  var p = this.offset[0] / this.style.fontsize;
  var d = this.offset[1] / this.style.fontsize;
  this.sprite.scale.set(l, u, 1);
  this.sprite.position.set(p, 0, d)
};
TextSprite.prototype.roundRect = function (t, e, i, n, r, a) {
  n--;
  t.beginPath();
  t.moveTo(e + a, i);
  t.lineTo(e + n - a, i);
  t.quadraticCurveTo(e + n, i, e + n, i + a);
  t.lineTo(e + n, i + r - a);
  t.quadraticCurveTo(e + n, i + r, e + n - a, i + r);
  t.lineTo(e + a, i + r);
  t.quadraticCurveTo(e, i + r, e, i + r - a);
  t.lineTo(e, i + a);
  t.quadraticCurveTo(e, i, e + a, i);
  t.closePath();
  t.fill();
  t.stroke()
};
export default TextSprite