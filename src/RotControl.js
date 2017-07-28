/**
 * Created by FDD on 2017/7/28.
 * @desc RotControl
 */
const RotControl = function (t, e) {
  var i = this;
  var n = $(e);
  t.target = new THREE.Vector3(0, 0, 0);
  this.onRot = function (t) {
  };
  var r = Math.PI * 3 / 4;
  var a = false;
  var o = 0;
  var s = 0;
  var h = function (t) {
    a = true
  };
  var c = function (t) {
    a = false
  };
  var l = function (n) {
    var r = n.offsetX - o;
    var h = n.offsetY - s;
    o = n.offsetX;
    s = n.offsetY;
    if (i.enabled == false)return;
    if (n.buttons == 0)return;
    if (!a)return;
    var c = .02 * t.fov * r / e.clientHeight;
    var l = .02 * t.fov * h / e.clientHeight;
    var u = t.getWorldDirection();
    var p = new THREE.Vector3(0, 0, 1);
    var d = new THREE.Vector3;
    d.crossVectors(u, p);
    d.normalize();
    var f = new THREE.Quaternion;
    f.setFromAxisAngle(d, l);
    var m = new THREE.Quaternion;
    m.setFromAxisAngle(p, c);
    var v = new THREE.Vector3;
    v.copy(u);
    v.applyQuaternion(f);
    if (Math.abs(v.z) < .9) u.applyQuaternion(f);
    u.applyQuaternion(m);
    var g = t.position;
    var y = new THREE.Vector3;
    y.addVectors(g, u);
    t.up.set(0, 0, 1);
    t.lookAt(y);
    var u = t.getWorldDirection();
    var x = Math.atan2(u.x, u.y) * 180 / Math.PI;
    var b = t.fov;
    var M = Math.atan(Math.tan(b / 2) * t.aspect) * 2 * 180 / Math.PI;
    var _ = {heading: x, fovx: M};
    i.onRot(_)
  };
  this.dispose = function () {
    n.unbind("mousemove", l);
    n.unbind("mousedown", h);
    n.unbind("mouseup", c)
  };
  n.bind("mousemove", l);
  n.bind("mousedown", h);
  n.bind("mouseup", c);
  this.enabled = false
};
export default RotControl