/**
 * Created by FDD on 2017/4/14.
 * @desc 实景三维核心代码
 */

import './polyfill/assign'
import {Tool, FullMode, SampleMode, LocateState} from './baseConfig'
import RotControl from './RotControl'
import TextSprite from './TextSprite'
import * as ajaxUtils from './ajaxUtils'
import * as Events from './Events'
const PPV = function (t) {
  var e = this;
  var control = null
  this.getVersion = function () {
    return "20170707"
  };
  var i = document.getElementById(t);
  var n = document.getElementById(t);
  var r;
  var a = "";
  var o = 3;
  var s = 1;
  var h = Tool.none;
  var c = SampleMode.photo;
  var l = false;
  var u = false;
  var p = 0;
  var d;
  var f;
  var m = -1.45;
  var v = 50;
  var g = 100;
  var y = 8.4456;
  var x = 7.0656;
  var b = 5;
  var M = 1.1953125;

  function _ () {
    var t = document.scripts;
    var e = "";
    for (var i = t.length - 1; i >= 0; i--) {
      var n = t[i].src;
      var r = n.toLowerCase().indexOf("ppv/js/ppv.");
      if (r >= 0) {
        e = n.substring(0, r);
        break
      }
    }
    return e
  }

  var w = _();
  var E = new THREE.TextureLoader;
  var T;
  var S;
  var R;
  var A;
  var L = new THREE.Group;
  var P = new THREE.Group;
  var C = new THREE.Group;
  var I = new THREE.Group;
  var N = new THREE.Group;
  var z = new THREE.Group;
  var D = new THREE.Group;
  var U = new THREE.Group;
  var O = new THREE.Group;
  var H = new THREE.Group;
  var F = new THREE.Group;
  var B = new THREE.Group;
  var k = "+proj=merc +lat_0=0 +lon_0=0 +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs ";
  var G = proj4(k);
  var j = new THREE.Vector3;
  var V = new THREE.Vector3;
  var W = new THREE.Group;
  var q;
  var X;
  var Y = new THREE.PlaneBufferGeometry(1, 1);
  var Z = new THREE.SphereBufferGeometry(1, 32, 32);
  var Q = new THREE.MeshLambertMaterial({color: 16711935, side: THREE.FrontSide, shading: THREE.SmoothShading});
  var J = new THREE.SphereBufferGeometry(1, 100, 50);
  var K = new THREE.MeshBasicMaterial({color: 16777215, side: THREE.DoubleSide, shading: THREE.SmoothShading});
  var tt = new THREE.RingGeometry(1, 1.2, 64);
  var et = new THREE.MeshBasicMaterial({color: 16777215, side: THREE.DoubleSide, transparent: true, opacity: .6});
  var it = new THREE.Mesh(tt, et);
  var nt = new TextSprite({style: {textColor: "#ffff88", borderThickness: 0, backgroundColor: "#000000"}});
  F.add(it);
  F.add(nt);
  function rt (t) {
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.mapping = THREE.UVMapping
  }

  var at = E.load(w + "ppv/icon/arrow-e.png");
  rt(at);
  var ot = E.load(w + "ppv/icon/arrow-w.png");
  rt(ot);
  var st = E.load(w + "ppv/icon/arrow-s.png");
  rt(st);
  var ht = E.load(w + "ppv/icon/arrow-n.png");
  rt(ht);
  var ct = E.load(w + "ppv/icon/arrow-ne.png");
  rt(ct);
  var lt = E.load(w + "ppv/icon/arrow-nw.png");
  rt(lt);
  var ut = E.load(w + "ppv/icon/arrow-se.png");
  rt(ut);
  var pt = E.load(w + "ppv/icon/arrow-sw.png");
  rt(pt);
  var dt = E.load(w + "ppv/icon/history.png");
  rt(pt);
  function ft (t) {
    if (t >= -22.5 && t < 22.5)return ht; else if (t >= 22.5 && t < 67.5)return ct; else if (t >= 67.5 && t < 112.5)return at; else if (t >= 112.5 && t < 157.5)return ut; else if (t >= 157.5 || t < -157.5)return st; else if (t >= -157.5 && t < -112.5)return pt; else if (t >= -112.5 && t < -67.5)return ot; else if (t >= -67.5 && t < -22.5)return lt
  }

  var mt = w + "ppv/icon/error-imaj.jpg";
  var vt = E.load(mt);
  rt(vt);
  var error_360_url = w + "ppv/icon/error-360.jpg";
  var gt = E.load(error_360_url);
  rt(gt);
  var yt = new THREE.Raycaster;
  var xt = new THREE.Vector2;
  var bt = new THREE.Vector2(-1, -1);
  var Mt = new THREE.Vector2(-1, -1);
  var _t = new THREE.Vector2(0, 0);
  var wt;
  var Et;
  var Tt = {
    bgcolor: 0,
    fullView: FullMode.fill,
    enableArrow: true,
    enableHistory: true,
    scope: 100,
    thumb: "Middle",
    magnifier: {size: 256, zoom: 5, fix: false},
    arrows: {forward: 5, below: 1.8, lean: 15},
    key: {del: 46, play: 32, fforward: 33, fbackward: 34, forward: 38, backward: 40, fullscreen: 120},
    label: {
      fontface: "微软雅黑",
      fontsize: 15,
      textColor: "#000000",
      borderThickness: 1,
      borderFillet: 6,
      borderColor: "rgba(0,0,0,0.8)",
      backgroundColor: "rgba(255,255,255,0.8)"
    }
  };
  this.setPref = function (t) {
    if (t.bgcolor != null) {
      Tt.bgcolor = t.bgcolor;
      A.setClearColor(Tt.bgcolor)
    }
    if (t.fullView != null) {
      Tt.fullView = t.fullView
    }
    if (t.enableArrow != null) {
      Tt.enableArrow = t.enableArrow;
      I.visible = Tt.enableArrow
    }
    if (t.enableHistory != null) {
      Tt.enableHistory = t.enableHistory;
      N.visible = Tt.enableArrow
    }
    if (t.scope != null) {
      Tt.scope = t.scope;
      g = Tt.scope / b;
      var e = new THREE.Vector3(0, b * g, 0);
      var i = new THREE.Euler(Math.PI / 2, 0, 0);
      var n = new THREE.Vector3(y * g, x * g, 1);
      var n = new THREE.Vector3(y * g, x * g, 1);
      q.rotation.copy(i);
      q.scale.copy(n);
      q.position.copy(e)
    }
    if (t.arrows) {
      if (t.arrows.forward != null) {
        Tt.arrows.forward = t.arrows.forward
      }
      if (t.arrows.below != null) {
        Tt.arrows.below = t.arrows.below
      }
      if (t.arrows.lean != null) {
        Tt.arrows.lean = t.arrows.lean
      }
    }
    if (t.magnifier) {
      if (t.magnifier.size != null) {
        Tt.magnifier.size = t.magnifier.size
      }
      if (t.magnifier.zoom != null) {
        Tt.magnifier.zoom = t.magnifier.zoom
      }
      if (t.magnifier.fix != null) {
        Tt.magnifier.fix = t.magnifier.fix
      }
    }
    if (t.key) {
      if (t.key.del != null) {
        Tt.key.del = t.key.del
      }
      if (t.key.play != null) {
        Tt.key.play = t.key.play
      }
      if (t.key.fforward != null) {
        Tt.key.fforward = t.key.fforward
      }
      if (t.key.fbackward != null) {
        Tt.key.fbackward = t.key.fbackward
      }
      if (t.key.forward != null) {
        Tt.key.forward = t.key.forward
      }
      if (t.key.backward != null) {
        Tt.key.backward = t.key.backward
      }
      if (t.key.fullscreen != null) {
        Tt.key.fullscreen = t.key.fullscreen
      }
    }
    if (t.label) {
      if (t.label.fontface != null) Tt.label.fontface = t.label.fontface;
      if (t.label.fontsize != null) Tt.label.fontsize = t.label.fontsize;
      if (t.label.textColor != null) Tt.label.textColor = t.label.textColor;
      if (t.label.borderThickness != null) Tt.label.borderThickness = t.label.borderThickness;
      if (t.label.borderFillet != null) Tt.label.borderFillet = t.label.borderFillet;
      if (t.label.borderColor != null) Tt.label.borderColor = t.label.borderColor;
      if (t.label.backgroundColor != null) Tt.label.backgroundColor = t.label.backgroundColor
    }
  };
  this.getPref = function () {
    return Tt
  };
  this.isPlaying = function () {
    return l
  };
  this.setServer = function (t) {
    a = t
  };
  this.locate = function (t, e, i, n) {
    r = n;
    if (u) {
      var s = {state: LocateState.busy};
      this.onLocate(s);
      return
    }
    u = true;
    Be();
    o = t;
    switch (o) {
      case -1:
        let [h, c] = [50, 15]
        ajaxUtils.get(w + 'ppv/php/locate.php', {
          lon: e,
          lat: i,
          tol: h,
          angle: c
        }).then(res => {
          qe(res, true)
        })
        break
      case 0:
        ajaxUtils.post(a + '/GetBranchByCoord', {
          data: {
            type: o,
            x: e,
            y: i,
            key: r
          }
        }).then(res => {
          console.log(res)
          je(res.d, true)
        }).catch(error => {
          console.warn(error)
          u = false
        })
        break
      case 3:
        ajaxUtils.post(a + '/GetBranchByCoord', {
          data: {
            type: o,
            x: e,
            y: i,
            key: r
          }
        }).then(res => {
          console.log(res)
          Xe(res.d, true)
        }).catch(error => {
          console.warn(error)
          u = false
        })
        break
      case 4:
        ajaxUtils.post(a + '/GetBranchByCoord', {
          data: {
            type: o,
            x: e,
            y: i,
            key: r
          }
        }).then(res => {
          console.log(res)
          Ye(res.d, true)
        }).catch(error => {
          console.warn(error)
          u = false
        })
        break
    }
  }
  this.locateByID = function (t, e, i) {
    r = i;
    if (u) {
      var n = {state: LocateState.busy};
      this.onLocate(n);
      return
    }
    u = true;
    Be();
    o = t;
    switch (o) {
      case -1:
        let [s, h] = [50, 15]
        ajaxUtils.get(w + 'ppv/php/locate_by_id.php', {
          id: e,
          tol: s,
          angle: h
        }).then(res => {
          qe(res, true)
        })
        break
      case 0:
        ajaxUtils.post(a + '/GetBranchByID', {
          data: {
            type: o,
            id: e,
            step: 1,
            key: r
          }
        }).then(res => {
          je(res.d, true)
        }).catch(error => {
          console.warn(error)
          u = false
        })
        break
      case 3:
        ajaxUtils.post(a + '/GetBranchByID', {
          data: {
            type: o,
            id: e,
            step: 1,
            key: r
          }
        }).then(res => {
          Xe(res.d, true)
        }).catch(error => {
          console.warn(error)
          u = false
        })
        break
      case 4:
        ajaxUtils.post(a + '/GetBranchByID', {
          data: {
            type: o,
            id: e,
            step: 1,
            key: r
          }
        }).then(res => {
          Ye(res.d, true)
        }).catch(error => {
          console.warn(error)
          u = false
        })
        break
    }
  }
  function St (t, e) {
    if (u) {
      return
    }
    u = true;
    Be();
    setTimeout(function () {
      switch (o) {
        case -1:
          let [e, i] = [50, 15]
          ajaxUtils.get(w + 'ppv/php/locate_by_id.php', {
            id: t,
            tol: e,
            angle: i
          }).then(res => {
            qe(res, true)
          })
          break
        case 0:
          ajaxUtils.post(a + '/GetBranchByID', {
            data: {
              type: o,
              id: t,
              step: 1,
              key: r
            }
          }).then(res => {
            je(res.d, true)
          }).catch(error => {
            console.warn(error)
            u = false
          })
          break
        case 3:
          ajaxUtils.post(a + '/GetBranchByID', {
            data: {
              type: o,
              id: t,
              step: 1,
              key: r
            }
          }).then(res => {
            Xe(res.d, true)
          }).catch(error => {
            console.warn(error)
            u = false
          })
          break
        case 4:
          ajaxUtils.post(a + '/GetBranchByID', {
            data: {
              type: o,
              id: t,
              step: 1,
              key: r
            }
          }).then(res => {
            Ye(res.d, true)
          }).catch(error => {
            console.warn(error)
            u = false
          })
          break
      }
    }, 100)
  }

  function Rt (t) {
    if (d != null) {
      if (t == 1) {
        switch (o) {
          case-1:
            if (d.next)return d.next.id;
            break;
          case 0:
            if (d.Nextframe)return d.Nextframe.ImgId;
            break;
          case 3:
            if (d.Nextframe)return d.Nextframe.PmId;
            break;
          case 4:
            if (d.Nextframe)return d.Nextframe.Id;
            break
        }
      } else if (t == -1) {
        switch (o) {
          case-1:
            if (d.prev)return d.prev.id;
            break;
          case 0:
            if (d.Prevframe)return d.Prevframe.ImgId;
            break;
          case 3:
            if (d.Prevframe)return d.Prevframe.PmId;
            break;
          case 4:
            if (d.Prevframe)return d.Prevframe.Id;
            break
        }
      } else {
      }
    }
    return p + t
  }

  this.step = function (t) {
    if (l)return;
    St(Rt(t))
  };
  this.play = function () {
    if (l)return;
    var t = {tool: Tool.play};
    this.onTool(t);
    l = true;
    St(Rt(1))
  };
  this.stop = function () {
    l = false;
    var t = {tool: Tool.stop};
    this.onTool(t)
  };
  this.setTool = function (t) {
    ae(t)
  };
  this.getTool = function () {
    return h
  };
  this.setSampleMode = function (t) {
    c = t
  };
  this.getSampleMode = function () {
    return c
  };
  this.getFrame = function () {
    return p
  };
  this.lookAt = function (t, e, i) {
    if (!we())return;
    var n = [t, e];
    var r = G.forward(n);
    var a = new THREE.Vector3(r[0] - j.x, r[1] - j.y, i - j.z);
    var o = T.getWorldDirection();
    var s = new THREE.Vector3;
    s.subVectors(a, T.position);
    s.normalize();
    var h = o.distanceTo(s);
    if (h < .1) {
      var c = 0;
      var l = 30;
      var u = new THREE.Vector3;
      var p = setInterval(function () {
        if (++c == l) {
          clearInterval(p)
        }
        var t = 1 * c / l;
        u.x = o.x + (s.x - o.x) * t;
        u.y = o.y + (s.y - o.y) * t;
        u.z = o.z + (s.z - o.z) * t;
        u.normalize();
        var e = new THREE.Vector3(0, 0, 1);
        T.position.set(0, 0, 0);
        T.up.copy(e);
        T.lookAt(u);
        T.position.copy(V);
        ke()
      }, 20)
    } else {
      var c = 0;
      var l = 30;
      var u = new THREE.Vector3;
      var d = new THREE.Quaternion;
      var f = new THREE.Quaternion;
      f.setFromUnitVectors(o, s);
      var p = setInterval(function () {
        if (++c == l) {
          clearInterval(p)
        }
        var t = 1 * c / l;
        d.slerp(f, t);
        u.copy(o);
        u.applyQuaternion(d);
        u.normalize();
        var e = new THREE.Vector3(0, 0, 1);
        T.position.set(0, 0, 0);
        T.up.copy(e);
        T.lookAt(u);
        T.position.copy(V);
        ke()
      }, 20)
    }
  };
  this.undo = function () {
    var t = {button: 1};
    switch (h) {
      case Tool.measurePoint:
        Xt(xt, t);
        break;
      case Tool.measureLength:
        Yt(xt, t);
        break;
      case Tool.measureArea:
        Qt(xt, t);
        break;
      case Tool.measureZ:
        Jt(xt, t);
        break;
      case Tool.measureFacade:
        Kt(xt, t);
        break;
      case Tool.measureAngle:
        $t(xt, t);
        break;
      case Tool.measureSlope:
        te(xt, t);
        break;
      case Tool.createPoint:
        Vt(xt, t);
        break;
      case Tool.createPolyline:
        Wt(xt, t);
        break;
      case Tool.createPolygon:
        qt(xt, t);
        break;
      case Tool.pick:
        Gt(xt, t);
        break;
      case Tool.remove:
        jt(xt, t);
        break
    }
  };
  this.finish = function () {
    var t = {button: 2};
    switch (h) {
      case Tool.measurePoint:
        Xt(xt, t);
        break;
      case Tool.measureLength:
        Yt(xt, t);
        break;
      case Tool.measureArea:
        Qt(xt, t);
        break;
      case Tool.measureZ:
        Jt(xt, t);
        break;
      case Tool.measureFacade:
        Kt(xt, t);
        break;
      case Tool.measureAngle:
        $t(xt, t);
        break;
      case Tool.measureSlope:
        te(xt, t);
        break;
      case Tool.createPoint:
        Vt(xt, t);
        break;
      case Tool.createPolyline:
        Wt(xt, t);
        break;
      case Tool.createPolygon:
        qt(xt, t);
        break;
      case Tool.pick:
        Gt(xt, t);
        break;
      case Tool.remove:
        jt(xt, t);
        break
    }
  };
  this.addLayer = function (t) {
    var e = B.getObjectByName(name);
    if (e = null)return;
    e = new THREE.Group;
    e.name = t.name;
    e.userData = t;
    if (t.type == "Point") {
      var i = t.icon;
      if (i == null) {
        i = w + "ppv/icon/disc.png"
      }
      e.texture = E.load(i)
    }
    B.add(e);
    return e
  };
  this.findLayer = function (t) {
    var e = B.getObjectByName(t);
    if (e == null)return;
    return e
  };
  this.getLayer = function (t) {
    var e = t;
    return e.userData
  };
  this.setLayer = function (t, e) {
    var i = t;
    i.name = e.name;
    i.userData = e;
    if (e.type == "Point") {
      var n = e.icon;
      if (n == null) {
        n = w + "ppv/icon/disc.png"
      }
      i.texture = E.load(n)
    }
    for (var r = 0; r < i.children.length; r++) {
      var a = i.children[r];
      this.setFeature(a, a.userData)
    }
  };
  this.removeLayer = function (t) {
    var e = t;
    B.remove(e)
  };
  this.removeAllLayers = function () {
    B.children = []
  };
  this.needsUpdate = false;
  function At (t, e, i) {
    var n = t.userData;
    var r = e.geometry.coordinates;
    var a = G.forward(r);
    var o = new THREE.Vector3(0, 0, 0);
    if (e.toGround != null) {
      o.set(a[0] - j.x, a[1] - j.y, T.position.z + e.toGround + m)
    } else {
      o.set(a[0] - j.x, a[1] - j.y, r[2] - j.z)
    }
    var s = new THREE.SpriteMaterial({map: t.texture, color: n.color, opacity: n.opacity});
    t.material = s;
    var h = new THREE.Sprite(t.material);
    h.position.copy(o);
    h.updateMatrixWorld(true);
    i.add(h);
    if (e.name != null && e.name.length > 0) {
      var c = new TextSprite({text: e.name, offset: [0, -(n.fontSize * 1.2 + n.size) / 2], style: Tt.label});
      c.setStyle({fontsize: n.fontSize});
      c.position.copy(o);
      c.updateMatrixWorld(true);
      i.add(c)
    }
    return i
  }

  function Lt (t, e, i) {
    var n = e.geometry.coordinates;
    var r = new THREE.Vector3(0, 0, 0);
    var a = 0;
    for (var o = 0; o < n.length; o++) {
      var s = n[o];
      var h = G.forward(s);
      var c = new THREE.Vector3(0, 0, 0);
      if (e.toGround != null) {
        c.set(h[0] - j.x, h[1] - j.y, T.position.z + e.toGround + m)
      } else {
        c.set(h[0] - j.x, h[1] - j.y, s[2] - j.z)
      }
      r.add(c);
      a++;
      var l = new THREE.Vector3(0, 0, 0);
      if (t.offset != null) l.set(t.offset[0] / t.size, 0, t.offset[1] / t.size);
      if (t.icon != null) {
        var u = E.load(t.icon);
        var p = new THREE.SpriteMaterial({map: u, color: t.color, opacity: t.opacity});
        var d = new THREE.Sprite(p);
        d.position.copy(l);
        var f = new THREE.Group;
        f.add(d);
        f.position.copy(c);
        i.add(f)
      } else {
        var v = new THREE.MeshStandardMaterial({
          color: t.color,
          opacity: t.opacity,
          side: THREE.FrontSide,
          shading: THREE.SmoothShading
        });
        var g = new THREE.Mesh(Z, v);
        g.position.copy(c);
        i.add(g)
      }
    }
    if (e.name != null && e.name.length > 0) {
      var y = new TextSprite({text: e.name, offset: [0, -(t.fontSize * 1.2 + t.size) / 2], style: Tt.label});
      y.setStyle({fontsize: t.fontSize});
      r.x /= a;
      r.y /= a;
      r.z /= a;
      y.position.copy(r);
      i.add(y)
    }
    return i
  }

  function Pt (t, e, i) {
    var n = e.geometry.coordinates;
    var r = new THREE.Geometry;
    for (var a = 0; a < n.length; a++) {
      var o = n[a];
      var s = G.forward(o);
      if (e.toGround != null) {
        var h = new THREE.Vector3(s[0] - j.x, s[1] - j.y, T.position.z + e.toGround + m);
        r.vertices.push(h)
      } else {
        var h = new THREE.Vector3(s[0] - j.x, s[1] - j.y, o[2] - j.z);
        r.vertices.push(h)
      }
    }
    var c = new THREE.LineBasicMaterial({color: t.color, opacity: t.opacity, linewidth: t.lineWidth});
    var l = new THREE.Line(r, c);
    i.add(l);
    if (e.name != null && e.name.length > 0) {
      var u = new TextSprite({text: e.name, style: Tt.label});
      u.setStyle({fontsize: t.fontSize});
      r.computeBoundingBox();
      var p = r.boundingBox.getCenter();
      u.position.copy(p);
      i.add(u)
    }
    return i
  }

  function Ct (t, e, i) {
    var n = e.geometry.coordinates;
    var r = new THREE.Vector3(0, 0, 0);
    var a = 0;
    for (var o = 0; o < n.length; o++) {
      var s = n[o];
      var h = new THREE.Geometry;
      for (var c = 0; c < s.length; c++) {
        var l = s[c];
        var u = G.forward(l);
        var p = new THREE.Vector3(0, 0, 0);
        if (e.toGround != null) {
          p.set(u[0] - j.x, u[1] - j.y, T.position.z + e.toGround + m)
        } else {
          p.set(u[0] - j.x, u[1] - j.y, l[2] - j.z)
        }
        r.add(p);
        a++;
        h.vertices.push(p)
      }
      var d = new THREE.LineBasicMaterial({color: t.color, opacity: t.opacity, linewidth: t.lineWidth});
      var f = new THREE.Line(h, d);
      i.add(f)
    }
    if (e.name != null && e.name.length > 0) {
      var v = new TextSprite({text: e.name, style: Tt.label});
      v.setStyle({fontsize: t.fontSize});
      r.x /= a;
      r.y /= a;
      r.z /= a;
      v.position.copy(r);
      i.add(v)
    }
    return i
  }

  function It (t, e, i) {
    var n = e.geometry.coordinates;
    var r = new THREE.LineBasicMaterial({color: t.color, opacity: t.opacity, linewidth: t.lineWidth});
    var a;
    for (var o = 0; o < n.length; o++) {
      var s = n[o];
      var h = new THREE.Geometry;
      for (var c = 0; c < s.length; c++) {
        var l = s[c];
        var u = G.forward(l);
        if (e.toGround != null) {
          var p = new THREE.Vector3(u[0] - j.x, u[1] - j.y, T.position.z + e.toGround + m);
          h.vertices.push(p)
        } else {
          var p = new THREE.Vector3(u[0] - j.x, u[1] - j.y, l[2] - j.z);
          h.vertices.push(p)
        }
      }
      var d = new THREE.Line(h, r);
      i.add(d);
      if (e.toGround != null) {
        var f = h.vertices[0];
        var v = [];
        for (var c = 0; c < h.vertices.length; c++) {
          var g = new THREE.Vector3;
          g.copy(h.vertices[c]);
          g.sub(f);
          v.push(g)
        }
        if (!a) {
          a = new THREE.Shape(v)
        } else {
          var y = new THREE.Path(v);
          a.holes.push(y)
        }
      }
    }
    if (a) {
      var x = new THREE.ShapeBufferGeometry(a);
      var r = new THREE.MeshBasicMaterial({color: 65535, transparent: true, opacity: .5, side: THREE.DoubleSide});
      var b = new THREE.Mesh(x, r);
      b.position.copy(f);
      i.add(b)
    }
    if (e.name != null && e.name.length > 0) {
      var M = new TextSprite({text: e.name, style: Tt.label});
      M.setStyle({fontsize: t.fontSize});
      var h = i.children[0].geometry;
      h.computeBoundingBox();
      var _ = h.boundingBox.getCenter();
      M.position.copy(_);
      i.add(M)
    }
    return i
  }

  function Ct (t, e, i) {
    console.warn("N/A: MultiLineString")
  }

  function Nt (t, e, i) {
    console.warn("N/A: GeometryCollection")
  }

  this.addFeature = function (t, e) {
    var i = t;
    var n = i.userData;
    var r = new THREE.Group;
    r.userData = e;
    var a = e.type;
    if (a == "Feature") {
      var o = e.geometry.type;
      if (o == "Point") {
        At(i, e, r)
      } else if (o == "LineString") {
        Pt(n, e, r)
      } else if (o == "Polygon") {
        It(n, e, r)
      } else if (o == "MultiPoint") {
        Lt(n, e, r)
      } else if (o == "MultiLineString") {
        Ct(n, e, r)
      } else if (o == "MultiPolygon") {
        parseMultiPolygon(n, e, r)
      } else if (o == "GeometryCollection") {
        Nt(n, e, r)
      }
    } else if (a == "FeatureCollection") {
    }
    i.add(r);
    return r
  };
  this.findFeature = function (t) {
    for (var e = 0; e < B.children.length; e++) {
      var i = B.children[e];
      for (var n = 0; n < i.children.length; n++) {
        var r = i.children[n];
        if (r.userData.fid == t)return r
      }
    }
  };
  this.getFeature = function (t) {
    var e = t;
    return e.userData
  };
  this.setFeature = function (t, e) {
    var i = t;
    i.children = [];
    var n = i.parent;
    var r = n.userData;
    i.userData = e;
    var a = e.type;
    if (a == "Feature") {
      var o = e.geometry.type;
      if (o == "Point") {
        At(n, e, i)
      } else if (o == "LineString") {
        Pt(r, e, i)
      } else if (o == "Polygon") {
        It(r, e, i)
      } else if (o == "MultiPoint") {
        Lt(r, e, i)
      } else if (o == "MultiLineString") {
        Ct(r, e, i)
      } else if (o == "MultiPolygon") {
        parseMultiPolygon(r, e, i)
      } else if (o == "GeometryCollection") {
        Nt(r, e, i)
      }
    } else if (a == "FeatureCollection") {
    }
    if (Et == i) {
      Bt(Et)
    }
    return i
  };
  this.removeFeature = function (t) {
    var e = t;
    e.parent.remove(e)
  };
  this.removeAllFeatures = function (t) {
    var e = t;
    e.children = []
  };
  this.selectFeature = function (t) {
    var e = t;
    if (Et != e) {
      if (Et) Et.children[0].material.color.setHex(Et.children[0].currentHex);
      Et = e;
      Et.children[0].currentHex = Et.children[0].material.color.getHex();
      Et.children[0].material.color.setHex(16711680)
    }
  };
  this.visible = function (t, e) {
    t.visible = e
  };
  this.onLocate = function (t) {
  };
  this.onPosition = function (t) {
  };
  this.onEye = function (t) {
  };
  this.onFeatureCreate = function (t) {
  };
  this.onFeatureSelect = function (t) {
  };
  this.onFeatureRemove = function (t) {
  };
  this.onMeasure = function (t) {
  };
  this.onTool = function (t) {
  };
  this.onRender = function (t) {
  };
  function zt (t) {
    if (Tt.magnifier.fix) {
      var e = {
        x: Mt.x - Tt.magnifier.size * .5,
        y: Mt.y - Tt.magnifier.size * .5,
        w: Tt.magnifier.size,
        h: Tt.magnifier.size
      };
      var i = new THREE.Vector2;
      i.x = (t.x - e.x) / e.w * 2 - 1;
      i.y = (t.y - e.y) / e.h * 2 - 1;
      return i
    } else {
      var r = new THREE.Vector2(Mt.x + (t.x - Mt.x) / Tt.magnifier.zoom, Mt.y + (t.y - Mt.y) / Tt.magnifier.zoom);
      var a = new THREE.Vector2;
      r.x = r.x / n.clientWidth * 2 - 1;
      r.y = r.y / n.clientHeight * 2 - 1;
      return r
    }
  }

  function Dt (t) {
    xt.x = t.offsetX / n.clientWidth * 2 - 1;
    xt.y = -(t.offsetY / n.clientHeight) * 2 + 1
  }

  function Ut (t, e, i, n) {
    var r = 1 / Math.tan(e / 2) / i;
    r = r * n / 2;
    return t * r
  }

  function Ot (t) {
    switch (c) {
      case SampleMode.photo:
        return Ht(t);
      case SampleMode.ground:
        return Ft(t)
    }
  }

  function Ht (t) {
    if (S.visible) {
      yt.setFromCamera(_t, S)
    } else {
      yt.setFromCamera(t, T)
    }
    var e = yt.ray;
    if (D.children.length == 0) {
      var i = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
      var n = new THREE.Vector3;
      n.copy(e.direction);
      n.setLength(100);
      i[0].copy(T.position);
      i[1].copy(T.position).add(n);
      var r = new THREE.LineBasicMaterial({
        color: 16777215,
        opacity: 1,
        linewidth: 3,
        vertexColors: THREE.VertexColors
      });
      var a = new THREE.Geometry;
      a.vertices = i;
      a.colors.push(new THREE.Color(65280), new THREE.Color(16711680));
      var o = new THREE.Line(a, r);
      D.add(o);
      var s = Rt(-1);
      St(s);
      return null
    } else {
      var h = D.children[0].geometry;
      var c = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
      var l = e.distanceSqToSegment(h.vertices[0], h.vertices[1], c[0], c[1]);
      var u = c[0].lerp(c[1], .5);
      D.children = [];
      var s = Rt(1);
      St(s);
      return u
    }
  }

  function Ft (t) {
    if (S.visible) {
      yt.setFromCamera(_t, S)
    } else {
      yt.setFromCamera(t, T)
    }
    var e = yt.ray;
    var i = new THREE.Plane(new THREE.Vector3(0, 0, -1), T.position.z + m);
    var n = e.intersectPlane(i);
    return n
  }

  function Bt (t) {
    for (var e = 0; e < t.children.length; e++) {
      var i = t.children[e];
      if (i.material) {
        i.currentHex = i.material.color.getHex();
        i.material.color.setHex(16711680)
      }
      Bt(i)
    }
  }

  function kt (t) {
    for (var e = 0; e < t.children.length; e++) {
      var i = t.children[e];
      if (i.material) {
        i.material.color.setHex(i.currentHex)
      }
      kt(i)
    }
  }

  function Gt (t, i) {
    if (S.visible) {
      yt.setFromCamera(_t, S)
    } else {
      yt.setFromCamera(t, T)
    }
    var n = yt.intersectObject(B, true);
    if (n.length > 0) {
      var r = n[0].object;
      while (!r.userData.geometry) {
        r = r.parent
      }
      if (Et != r) {
        if (Et) {
          kt(Et)
        }
        Et = r;
        Bt(Et);
        var i = {layer: r.parent, feature: r, layername: r.parent.name, fid: r.userData.fid};
        e.onFeatureSelect(i)
      }
    } else {
      if (Et) {
        kt(Et)
      }
      Et = null
    }
  }

  function jt (t, i) {
    switch (i.button) {
      case 0: {
        Gt(t, i)
      }
        break;
      case 1: {
      }
        break;
      case 2: {
        if (Et) {
          var n = Et;
          var i = {layer: n.parent, feature: n, layername: n.parent.name, fid: n.userData.fid};
          e.onFeatureRemove(i);
          if (i.cancel)return;
          e.removeFeature(n);
          Et = null
        }
      }
        break
    }
  }

  function Vt (t, i) {
    var n = Ot(t);
    if (n == null)return;
    var r = [n.x + j.x, n.y + j.y];
    var a = G.inverse(r);
    a[2] = n.z + j.z;
    var o = {type: "Feature", geometry: {type: "Point", coordinates: a}};
    ie();
    e.onFeatureCreate(o)
  }

  function Wt (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.add(o)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o)
        }
        var s = new THREE.Mesh(Z, Q);
        s.position.copy(n);
        U.add(s)
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          a.vertices.pop();
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children.pop()
        }
      }
        break;
      case 2: {
        if (z.children.length == 0)return;
        var a = z.children[0].geometry;
        if (a.vertices.length < 2)return;
        var h = [];
        for (var c = 0; c < a.vertices.length; c++) {
          var l = a.vertices[c];
          var u = [l.x + j.x, l.y + j.y];
          var p = G.inverse(u);
          p[2] = l.z + j.z;
          h[c] = p
        }
        var d = {type: "Feature", geometry: {type: "LineString", coordinates: h}};
        ie();
        e.onFeatureCreate(d)
      }
        break
    }
  }

  function qt (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          a.vertices.push(a.vertices[0]);
          var o = new THREE.Line(a, r);
          z.add(o)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.pop();
          a.vertices.push(n);
          a.vertices.push(a.vertices[0]);
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o)
        }
        var s = new THREE.Mesh(Z, Q);
        s.position.copy(n);
        U.add(s)
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          a.vertices.pop();
          a.vertices.pop();
          a.vertices.push(a.vertices[0]);
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children.pop()
        }
      }
        break;
      case 2: {
        if (z.children.length == 0)return;
        var a = z.children[0].geometry;
        if (a.vertices.length < 2)return;
        var h = [];
        for (var c = 0; c < a.vertices.length; c++) {
          var l = a.vertices[c];
          var u = [l.x + j.x, l.y + j.y];
          var p = G.inverse(u);
          p[2] = l.z + j.z;
          h[c] = p
        }
        var d = {type: "Feature", geometry: {type: "Polygon", coordinates: [h]}};
        ie();
        e.onFeatureCreate(d)
      }
        break
    }
  }

  function Xt (t, i) {
    var n = Ot(t, i);
    if (n == null)return;
    var r = [n.x + j.x, n.y + j.y, n.z + j.z];
    var a = G.inverse(r);
    var o = "经度 " + a[0].toFixed(8) + "° 纬度 " + a[1].toFixed(8) + "° 高程 " + r[2].toFixed(2) + " m";
    var s = new TextSprite({text: o, offset: [0, Tt.label.fontsize * 1.2], style: Tt.label});
    s.position.copy(n);
    ee();
    H.add(s);
    var h = new THREE.Mesh(Z, Q);
    h.position.copy(n);
    U.children = [];
    U.add(h);
    var i = {lonlat: [a[0], a[1], n.z + j.z]};
    e.onMeasure(i)
  }

  function Yt (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.add(o)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          if (a.vertices.length > 1) {
            var s = 0;
            for (var h = 1; h < a.vertices.length; h++) {
              var c = a.vertices[h - 1];
              var l = a.vertices[h];
              s += c.distanceTo(l)
            }
            var u = s.toFixed(2) + " m";
            var p = new TextSprite({text: u, style: Tt.label});
            a.computeBoundingBox();
            var d = a.boundingBox.getCenter();
            p.position.copy(d);
            ee();
            H.add(p);
            var i = {length: s};
            e.onMeasure(i)
          } else {
            ee()
          }
        }
        var f = new THREE.Mesh(Z, Q);
        f.position.copy(n);
        U.add(f)
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          a.vertices.pop();
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children.pop();
          if (a.vertices.length > 1) {
            var s = 0;
            for (var h = 1; h < a.vertices.length; h++) {
              var c = a.vertices[h - 1];
              var l = a.vertices[h];
              s += c.distanceTo(l)
            }
            var u = s.toFixed(2) + " m";
            var p = new TextSprite({text: u, style: Tt.label});
            a.computeBoundingBox();
            var d = a.boundingBox.getCenter();
            p.position.copy(d);
            ee();
            H.add(p);
            var i = {length: s};
            e.onMeasure(i)
          } else {
            ee()
          }
        }
      }
        break;
      case 2: {
      }
        break
    }
  }

  function Zt (t, e, i, n) {
    var r = new THREE.Vector3(0, 0, 0);
    var a = new THREE.Vector3(0, 0, 0);
    if (i) {
      r.z = 1
    } else {
      var o = [Math.abs(t.x), Math.abs(t.y), Math.abs(t.z)];
      if (o[0] < o[1]) {
        if (o[0] < o[2]) r.x = 1; else r.z = 1
      } else {
        if (o[1] < o[2]) r.y = 1; else r.z = 1
      }
    }
    a.crossVectors(t, r).normalize();
    r.crossVectors(a, t).normalize();
    var s = new THREE.Matrix4;
    if (n != null) {
      if (n == "z" || n == "xy") s.makeBasis(r, a, t); else if (n == "y" || n == "xz") s.makeBasis(a, t, r); else if (n == "x" || n == "yz") s.makeBasis(t, r, a)
    } else {
      s.makeBasis(a, t, r)
    }
    var h = new THREE.Quaternion;
    h.setFromRotationMatrix(s);
    if (e != null) {
      var c = new THREE.Matrix4;
      c.getInverse(s);
      e.setFromRotationMatrix(c)
    }
    return h
  }

  function Qt (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.add(o)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          if (a.vertices.length < 2) {
            a.vertices.push(n)
          } else if (a.vertices.length == 2) {
            a.vertices.push(n);
            a.vertices.push(a.vertices[0])
          } else {
            a.vertices.pop();
            a.vertices.push(n);
            a.vertices.push(a.vertices[0])
          }
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          var s = a.vertices.length;
          if (s > 3) {
            var h = a.vertices[0];
            var c = a.vertices[1];
            var l = a.vertices[2];
            var u = new THREE.Vector3;
            var p = new THREE.Vector3;
            var d = new THREE.Vector3;
            u.subVectors(c, h).normalize();
            p.subVectors(l, h).normalize();
            d.crossVectors(u, p).normalize();
            var f = new THREE.Plane;
            f.setFromNormalAndCoplanarPoint(d, h);
            var m = new THREE.Quaternion;
            var v = Zt(d, m, null, "z");
            var g = [];
            for (var y = 0; y < a.vertices.length; y++) {
              var x = new THREE.Vector3;
              x.copy(a.vertices[y]);
              x.sub(h);
              x.applyQuaternion(m);
              g.push(new THREE.Vector2(x.x, x.y))
            }
            var b = Math.abs(THREE.ShapeUtils.area(g));
            var M = b.toFixed(2) + " m²";
            a.computeBoundingBox();
            var _ = a.boundingBox.getCenter();
            var w = new TextSprite({text: M, style: Tt.label});
            w.position.copy(_);
            ee();
            H.add(w);
            var i = {area: b};
            e.onMeasure(i)
          }
        }
        var E = new THREE.Mesh(Z, Q);
        E.position.copy(n);
        U.add(E)
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          if (a.vertices.length > 4) {
            a.vertices.pop();
            a.vertices.pop();
            a.vertices.push(a.vertices[0])
          } else if (a.vertices.length > 3) {
            a.vertices.pop();
            a.vertices.pop()
          } else {
            a.vertices.pop()
          }
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children.pop();
          if (a.vertices.length > 3) {
            var h = a.vertices[0];
            var c = a.vertices[1];
            var l = a.vertices[2];
            var u = new THREE.Vector3;
            var p = new THREE.Vector3;
            var d = new THREE.Vector3;
            u.subVectors(c, h);
            u.normalize();
            p.subVectors(l, h);
            p.normalize();
            d.crossVectors(u, p);
            d.normalize();
            var f = new THREE.Plane;
            f.setFromNormalAndCoplanarPoint(d, h);
            var m = new THREE.Quaternion;
            var v = Zt(d, m, null, "z");
            var g = [];
            for (var y = 0; y < a.vertices.length; y++) {
              var x = new THREE.Vector3;
              x.copy(a.vertices[y]);
              x.sub(h);
              x.applyQuaternion(m);
              g.push(new THREE.Vector2(x.x, x.y))
            }
            var T = new THREE.Shape(g);
            var S = new THREE.ShapeBufferGeometry(T);
            var r = new THREE.MeshBasicMaterial({color: 65535, transparent: true, opacity: .5, side: THREE.DoubleSide});
            var R = new THREE.Mesh(S, r);
            R.position.copy(h);
            R.quaternion.copy(v);
            o.add(R);
            var b = Math.abs(THREE.ShapeUtils.area(g));
            var M = b.toFixed(2) + " m²";
            a.computeBoundingBox();
            var _ = a.boundingBox.getCenter();
            var w = new TextSprite({text: M, style: Tt.label});
            w.position.copy(_);
            ee();
            H.add(w);
            var i = {area: b};
            e.onMeasure(i)
          } else {
            ee()
          }
        }
      }
        break;
      case 2: {
      }
        break
    }
  }

  function Jt (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.add(o);
          var s = new THREE.Mesh(Z, Q);
          s.position.copy(n);
          U.add(s)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          var h = z.children[0].geometry.vertices[0];
          var c;
          var l;
          if (h.z > n.z) {
            c = h;
            l = n
          } else {
            c = n;
            l = h
          }
          var u = new THREE.Vector3(c.x, c.y, l.z);
          a.vertices.push(c);
          a.vertices.push(l);
          a.vertices.push(u);
          a.vertices.push(c);
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children = [];
          {
            var s = new THREE.Mesh(Z, Q);
            s.position.copy(c);
            U.add(s)
          }
          {
            var s = new THREE.Mesh(Z, Q);
            s.position.copy(l);
            U.add(s)
          }
          ee();
          var i = {};
          {
            var p = c.distanceTo(l);
            var d = p.toFixed(2) + " m";
            i.length = p;
            var f = new TextSprite({text: d, style: Tt.label});
            f.position.copy(c);
            H.add(f)
          }
          {
            var p = l.distanceTo(u);
            var d = p.toFixed(2) + " m";
            i.lengthXY = p;
            var f = new TextSprite({text: d, style: Tt.label});
            var m = new THREE.Vector3;
            m.lerpVectors(l, u, .5);
            f.position.copy(m);
            H.add(f)
          }
          {
            var p = c.distanceTo(u);
            var d = p.toFixed(2) + " m";
            i.lengthZ = p;
            var f = new TextSprite({text: d, style: Tt.label});
            var m = new THREE.Vector3;
            m.lerpVectors(c, u, .5);
            f.position.copy(m);
            H.add(f)
          }
          e.onMeasure(i)
        }
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          z.children = [];
          U.children = [];
          ee()
        }
      }
        break;
      case 2: {
      }
        break
    }
  }

  function Kt (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.add(o);
          var s = new THREE.Mesh(Z, Q);
          s.position.copy(n);
          U.add(s)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          var h = z.children[0].geometry.vertices[0];
          var c = n;
          var l = new THREE.Vector3(h.x, h.y, c.z);
          var u = new THREE.Vector3(c.x, c.y, h.z);
          a.vertices.push(h);
          a.vertices.push(l);
          a.vertices.push(c);
          a.vertices.push(u);
          a.vertices.push(h);
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children = [];
          {
            var s = new THREE.Mesh(Z, Q);
            s.position.copy(h);
            U.add(s)
          }
          {
            var s = new THREE.Mesh(Z, Q);
            s.position.copy(c);
            U.add(s)
          }
          ee();
          var i = {};
          {
            var p = h.distanceTo(l);
            var d = p.toFixed(2) + " m";
            i.height = p;
            var f = new TextSprite({text: d, style: Tt.label});
            var m = new THREE.Vector3;
            m.lerpVectors(h, l, .5);
            f.position.copy(m);
            H.add(f)
          }
          {
            var p = h.distanceTo(u);
            var d = p.toFixed(2) + " m";
            i.width = p;
            var f = new TextSprite({text: d, style: Tt.label});
            var m = new THREE.Vector3;
            m.lerpVectors(h, u, .5);
            f.position.copy(m);
            H.add(f)
          }
          {
            var v = h;
            var g = new THREE.Vector3;
            var y = new THREE.Vector3;
            var x = new THREE.Vector3;
            g.subVectors(u, h);
            g.normalize();
            y.subVectors(l, h);
            y.normalize();
            x.crossVectors(g, y);
            x.normalize();
            var b = new THREE.Plane;
            b.setFromNormalAndCoplanarPoint(x, h);
            var M = new THREE.Quaternion;
            var _ = Zt(x, M, null, "z");
            var w = [];
            for (var E = 0; E < a.vertices.length; E++) {
              var T = new THREE.Vector3;
              T.copy(a.vertices[E]);
              T.sub(v);
              T.applyQuaternion(M);
              w.push(new THREE.Vector2(T.x, T.y))
            }
            var S = new THREE.Shape(w);
            var R = new THREE.ShapeBufferGeometry(S);
            var r = new THREE.MeshBasicMaterial({color: 65535, transparent: true, opacity: .5, side: THREE.DoubleSide});
            var A = new THREE.Mesh(R, r);
            A.position.copy(v);
            A.quaternion.copy(_);
            o.add(A);
            var L = Math.abs(THREE.ShapeUtils.area(w));
            var P = L.toFixed(2) + " m²";
            i.area = L;
            var f = new TextSprite({text: P, style: Tt.label});
            var m = new THREE.Vector3;
            m.lerpVectors(h, c, .5);
            f.position.copy(m);
            H.add(f)
          }
          e.onMeasure(i)
        }
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          z.children = [];
          U.children = [];
          ee()
        }
      }
        break;
      case 2: {
      }
        break
    }
  }

  function $t (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.add(o)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          if (z.children[0].geometry.vertices.length == 3) U.children = []; else a.vertices = z.children[0].geometry.vertices.slice(0);
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          if (a.vertices.length == 3) {
            var s = a.vertices[0];
            var h = a.vertices[1];
            var c = a.vertices[2];
            var l = new THREE.Vector3;
            var u = new THREE.Vector3;
            l.subVectors(s, h);
            u.subVectors(c, h);
            var p = l.angleTo(u) * 180 / Math.PI;
            var d = p.toFixed(2) + "°";
            var f = new TextSprite({text: d, style: Tt.label});
            a.computeBoundingBox();
            var m = a.boundingBox.getCenter();
            f.position.copy(m);
            ee();
            H.add(f);
            var i = {angle: p};
            e.onMeasure(i)
          } else {
            ee()
          }
        }
        var v = new THREE.Mesh(Z, Q);
        v.position.copy(n);
        U.add(v)
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          a.vertices.pop();
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children.pop();
          ee()
        }
      }
        break;
      case 2: {
      }
        break
    }
  }

  function te (t, i) {
    switch (i.button) {
      case 0: {
        var n = Ot(t);
        if (n == null)return;
        if (z.children.length == 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices.push(n);
          var o = new THREE.Line(a, r);
          z.add(o)
        } else {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          if (z.children[0].geometry.vertices.length == 4) U.children = []; else a.vertices = z.children[0].geometry.vertices.slice(0);
          if (a.vertices.length < 2) {
            a.vertices.push(n)
          } else if (a.vertices.length == 2) {
            a.vertices.push(n);
            a.vertices.push(a.vertices[0])
          } else {
            a.vertices.pop();
            a.vertices.push(n);
            a.vertices.push(a.vertices[0])
          }
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          if (a.vertices.length == 4) {
            var s = a.vertices[0];
            var h = a.vertices[1];
            var c = a.vertices[2];
            var l = new THREE.Vector3;
            var u = new THREE.Vector3;
            var p = new THREE.Vector3;
            l.subVectors(h, s);
            l.normalize();
            u.subVectors(c, s);
            u.normalize();
            p.crossVectors(l, u);
            p.normalize();
            var d = new THREE.Plane;
            d.setFromNormalAndCoplanarPoint(p, s);
            var f = new THREE.Quaternion;
            var m = Zt(p, f, null, "z");
            var v = [];
            for (var g = 0; g < a.vertices.length; g++) {
              var y = new THREE.Vector3;
              y.copy(a.vertices[g]);
              y.sub(s);
              y.applyQuaternion(f);
              v.push(new THREE.Vector2(y.x, y.y))
            }
            var x = new THREE.Shape(v);
            var b = new THREE.ShapeBufferGeometry(x);
            var r = new THREE.MeshBasicMaterial({color: 65535, transparent: true, opacity: .5, side: THREE.DoubleSide});
            var M = new THREE.Mesh(b, r);
            M.position.copy(s);
            M.quaternion.copy(m);
            o.add(M);
            var _ = new THREE.Vector3(0, 0, 1);
            var w = p.angleTo(_) * 180 / Math.PI;
            var E = w.toFixed(2) + "°";
            var T = new TextSprite({text: E, style: Tt.label});
            a.computeBoundingBox();
            var S = a.boundingBox.getCenter();
            T.position.copy(S);
            ee();
            H.add(T);
            var i = {slope: w};
            e.onMeasure(i)
          } else {
            ee()
          }
        }
        var R = new THREE.Mesh(Z, Q);
        R.position.copy(n);
        U.add(R)
      }
        break;
      case 1: {
        if (z.children.length > 0) {
          var r = new THREE.LineBasicMaterial({color: 16711935, opacity: 1, linewidth: 3});
          var a = new THREE.Geometry;
          a.vertices = z.children[0].geometry.vertices.slice(0);
          if (a.vertices.length > 4) {
            a.vertices.pop();
            a.vertices.pop();
            a.vertices.push(a.vertices[0])
          } else if (a.vertices.length > 3) {
            a.vertices.pop();
            a.vertices.pop()
          } else {
            a.vertices.pop()
          }
          var o = new THREE.Line(a, r);
          z.children = [];
          z.add(o);
          U.children.pop();
          ee()
        }
      }
        break;
      case 2: {
      }
        break
    }
  }

  function ee () {
    H.children = []
  }

  function ie () {
    z.children = [];
    D.children = [];
    U.children = [];
    O.children = [];
    ee();
    if (Et) {
      kt(Et)
    }
    Et = null;
    Be()
  }

  function ne (t, e, i, n, r, a, o, s) {
    var h = new THREE.MeshBasicMaterial({
      color: 16777215,
      transparent: true,
      alphaTest: .1,
      side: THREE.DoubleSide,
      shading: THREE.SmoothShading
    });
    if (r == null) {
      h.map = new THREE.Texture
    } else if (r instanceof String) {
      h.map = E.load(r)
    } else if (r instanceof THREE.Texture) {
      h.map = r
    }
    rt(h.map);
    if (n != null) {
      h.color.setHex(n)
    }
    var c = new THREE.Mesh(e, h);
    c.currentHex = h.color.getHex();
    if (i != null) c.name = i;
    if (o != null) c.rotation.copy(o);
    if (s != null) c.scale.copy(s);
    if (a != null) c.position.copy(a);
    t.add(c);
    return c
  }

  function re (t, e, i) {
    var n = E.load(i);
    n.minFilter = THREE.LinearFilter;
    n.magFilter = THREE.LinearFilter;
    n.generateMipmaps = false;
    n.mapping = THREE.UVMapping;
    var r = new THREE.MeshBasicMaterial({color: 16777215, map: n});
    r.transparent = true;
    var a = new THREE.Mesh(e, r);
    t.add(a);
    return a
  }

  function ae (t) {
    ie();
    h = t;
    console.debug("cur_tool: %d", h);
    var i = {tool: t};
    e.onTool(i)
  }

  function oe (t) {
    t.stopPropagation();
    ae(Tool.measurePoint)
  }

  function se (t) {
    t.stopPropagation();
    ae(Tool.measureLength)
  }

  function he (t) {
    t.stopPropagation();
    ae(Tool.measureArea)
  }

  function ce (t) {
    t.stopPropagation();
    ae(Tool.measureZ)
  }

  function le (t) {
    t.stopPropagation();
    ae(Tool.measureFacade)
  }

  function ue (t) {
    t.stopPropagation();
    ae(Tool.measureAngle)
  }

  function pe (t) {
    t.stopPropagation();
    ae(Tool.measureSlope)
  }

  function de (t) {
    t.stopPropagation();
    ae(Tool.createPoint)
  }

  function fe (t) {
    t.stopPropagation();
    ae(Tool.createPolyline)
  }

  function me (t) {
    t.stopPropagation();
    ae(Tool.createPolygon)
  }

  function ve (t) {
    t.stopPropagation();
    ae(Tool.pick)
  }

  function ge (t) {
    t.stopPropagation();
    ae(Tool.remove)
  }

  function ye (t) {
    t.stopPropagation()
  }

  function xe () {
    var t = document.createElement("div");
    t.setAttribute("class", "ppv_toolbar");
    n.appendChild(t);
    var e = document.createElement("img");
    e.setAttribute("src", "icon/查询坐标.png");
    e.setAttribute("title", "查询坐标");
    e.setAttribute("class", "ppv_button");
    e.addEventListener("mousedown", oe, false);
    t.appendChild(e);
    var i = document.createElement("img");
    i.setAttribute("src", "icon/测量长度.png");
    i.setAttribute("title", "测量长度");
    i.setAttribute("class", "ppv_button");
    i.addEventListener("mousedown", se, false);
    t.appendChild(i);
    var r = document.createElement("img");
    r.setAttribute("src", "icon/测量面积.png");
    r.setAttribute("title", "测量面积");
    r.setAttribute("class", "ppv_button");
    r.addEventListener("mousedown", he, false);
    t.appendChild(r);
    var a = document.createElement("img");
    a.setAttribute("src", "icon/测量垂距.png");
    a.setAttribute("title", "测量垂距");
    a.setAttribute("class", "ppv_button");
    a.addEventListener("mousedown", ce, false);
    t.appendChild(a);
    var o = document.createElement("img");
    o.setAttribute("src", "icon/测量立面.png");
    o.setAttribute("title", "测量立面");
    o.setAttribute("class", "ppv_button");
    o.addEventListener("mousedown", le, false);
    t.appendChild(o);
    var s = document.createElement("img");
    s.setAttribute("src", "icon/测量角度.png");
    s.setAttribute("title", "测量角度");
    s.setAttribute("class", "ppv_button");
    s.addEventListener("mousedown", he, false);
    t.appendChild(s);
    var h = document.createElement("img");
    h.setAttribute("src", "icon/测量坡度.png");
    h.setAttribute("title", "测量坡度");
    h.setAttribute("class", "ppv_button");
    h.addEventListener("mousedown", pe, false);
    t.appendChild(h);
    var c = document.createElement("img");
    c.setAttribute("src", "icon/创建点.png");
    c.setAttribute("title", "创建点");
    c.setAttribute("class", "ppv_button");
    c.addEventListener("mousedown", de, false);
    t.appendChild(c);
    var l = document.createElement("img");
    l.setAttribute("src", "icon/创建线.png");
    l.setAttribute("title", "创建线");
    l.setAttribute("class", "ppv_button");
    l.addEventListener("mousedown", fe, false);
    t.appendChild(l);
    var u = document.createElement("img");
    u.setAttribute("src", "icon/创建面.png");
    u.setAttribute("title", "创建面");
    u.setAttribute("class", "ppv_button");
    u.addEventListener("mousedown", me, false);
    t.appendChild(u);
    var p = document.createElement("img");
    p.setAttribute("src", "icon/选择对象.png");
    p.setAttribute("title", "选择对象");
    p.setAttribute("class", "ppv_button");
    p.addEventListener("mousedown", ve, false);
    t.appendChild(p);
    var d = document.createElement("img");
    d.setAttribute("src", "icon/删除选中对象.png");
    d.setAttribute("title", "删除选中对象");
    d.setAttribute("class", "ppv_button");
    d.addEventListener("mousedown", ge, false);
    t.appendChild(d);
    var f = document.createElement("img");
    f.setAttribute("src", "icon/LRS.png");
    f.setAttribute("title", "线性参考系");
    f.setAttribute("class", "ppv_button");
    f.addEventListener("mousedown", ye, false);
    t.appendChild(f)
  }

  function be () {
    E.crossOrigin = "anonymous";
    R = new THREE.Scene;
    T = new THREE.PerspectiveCamera(45, 1, .1, 1e4);
    S = new THREE.PerspectiveCamera(45, 1, .1, 1e4);
    S.visible = false;
    T.position.set(0, 0, 0);
    var t = T.position;
    T.up.set(0, 1, 0);
    T.lookAt(new THREE.Vector3(t.x + 0, t.y + 1, t.z + 0));
    R.add(T);
    control = new RotControl(T, n);
    control.onRot = function (t) {
      ke();
      e.onEye(t);
      if (d != null) {
        var i = T.getWorldDirection();
        var n = Math.atan2(i.x, i.y);
        var r = 0;
        switch (o) {
          case-1:
            r = -d.cur.heading;
            break;
          case 0:
            r = -d.Currentframe.Heading;
            break;
          case 3:
            r = d.Currentframe.Yaw * Math.PI / 180;
            break;
          case 4:
            r = d.Currentframe.Heading * Math.PI / 180;
            break
        }
        f = r - n
      }
    };
    var r = [];
    r[0] = new THREE.DirectionalLight(16777215, .8);
    r[1] = new THREE.DirectionalLight(16777215, .8);
    r[2] = new THREE.DirectionalLight(16777215, .8);
    r[3] = new THREE.AmbientLight(16777215, .8);
    r[4] = new THREE.PointLight(16777215, .8);
    r[0].position.set(-1, 1, 1);
    r[1].position.set(0, 1, 1);
    r[2].position.set(0, -1, 1);
    T.add(r[0]);
    T.add(r[1]);
    R.add(r[3]);
    R.add(C);
    R.add(L);
    L.add(B);
    R.add(P);
    P.add(I);
    P.add(N);
    P.add(z);
    P.add(D);
    P.add(U);
    P.add(O);
    P.add(H);
    P.add(F);
    g = Tt.scope / b;
    var t = new THREE.Vector3(0, b * g, 0);
    var a = new THREE.Euler(Math.PI / 2, 0, 0);
    var s = new THREE.Vector3(y * g, x * g, 1);
    q = ne(W, Y, "camgroup", 16777215, null, t, a, s);
    C.add(W);
    X = new THREE.Mesh(J, K);
    K.map = new THREE.Texture;
    X.scale.set(-Tt.scope, Tt.scope, Tt.scope);
    var h = new THREE.Vector3(0, -1, 0);
    X.up.set(0, 0, 1);
    X.lookAt(h);
    A = new THREE.WebGLRenderer({alpha: true, antialias: true});
    A.setClearColor(Tt.bgcolor, 0);
    A.setPixelRatio(window.devicePixelRatio);
    n.appendChild(A.domElement);
    Events.listen(i, 'contextmenu', Le, this)
    Events.listen(i, 'touchstart', Pe, this)
    Events.listen(i, 'mousedown', ze, this)
    Events.listen(i, 'mouseup', De, this)
    Events.listen(i, 'mousemove', Ue, this)
    Events.listen(i, 'mousewheel', Oe, this)
    Events.listen(document, 'keydown', Ae, this)
    Me()
  }

  function Me () {
    requestAnimationFrame(Me);
    _e()
  }

  function _e () {
    Ee();
    {
      var t = T.position.distanceTo(nt.getWorldPosition());
      var i = Ut(1, T.fov * Math.PI / 180, t, A.domElement.clientHeight);
      var n = nt.style.fontsize / i;
      nt.scale.set(n, n, n)
    }
    for (var r = 0; r < H.children.length; r++) {
      var a = H.children[r];
      {
        var t = T.position.distanceTo(a.getWorldPosition());
        var i = Ut(1, T.fov * Math.PI / 180, t, A.domElement.clientHeight);
        var n = a.style.fontsize / i;
        a.scale.set(n, n, n)
      }
    }
    for (var r = 0; r < U.children.length; r++) {
      var a = U.children[r];
      var t = T.position.distanceTo(a.getWorldPosition());
      var i = Ut(1, T.fov * Math.PI / 180, t, A.domElement.clientHeight);
      var n = 5 / i;
      a.scale.set(n, n, n)
    }
    for (var r = 0; r < B.children.length; r++) {
      var o = B.children[r];
      var s = o.userData;
      if (s.fixSize)continue;
      for (var h = 0; h < o.children.length; h++) {
        var c = o.children[h];
        c.visible = true;
        for (var l = 0; l < c.children.length; l++) {
          var a = c.children[l];
          if (a instanceof TextSprite) {
            var t = T.position.distanceTo(a.getWorldPosition());
            var i = Ut(1, T.fov * Math.PI / 180, t, A.domElement.clientHeight);
            var n = s.fontSize / i;
            a.scale.set(n, n, n)
          } else if (a instanceof THREE.Sprite) {
            var t = T.position.distanceTo(a.getWorldPosition());
            if (t > Tt.scope) {
              c.visible = false;
              break
            }
            var i = Ut(1, T.fov * Math.PI / 180, t, A.domElement.clientHeight);
            var n = s.size / i;
            a.scale.set(n, n, n)
          }
        }
      }
    }
    if (u) {
      I.visible = false;
      N.visible = false
    } else {
      I.visible = Tt.enableArrow;
      N.visible = Tt.enableHistory
    }
    var p = A.getSize();
    var d = A.userData;
    A.setViewport(0, 0, p.width, p.height);
    A.setScissor(d.left, d.top, d.width, d.height);
    A.setScissorTest(true);
    A.render(R, T);
    var f = {canvas: A.domElement};
    e.onRender(f);
    if (S.visible) {
      U.visibleTemp = U.visible;
      z.visibleTemp = z.visible;
      I.visibleTemp = I.visible;
      N.visibleTemp = N.visible;
      F.visibleTemp = F.visible;
      U.visible = false;
      z.visible = false;
      I.visible = false;
      N.visible = false;
      F.visible = false;
      var m = Tt.magnifier.size / 2;
      if (Tt.magnifier.fix) {
        A.setViewport(Mt.x - m, Mt.y - m, Tt.magnifier.size, Tt.magnifier.size);
        A.setScissor(Mt.x - m, Mt.y - m, Tt.magnifier.size, Tt.magnifier.size)
      } else {
        A.setViewport(bt.x - m, bt.y - m, Tt.magnifier.size, Tt.magnifier.size);
        A.setScissor(bt.x - m, bt.y - m, Tt.magnifier.size, Tt.magnifier.size)
      }
      A.setScissorTest(true);
      A.render(R, S);
      U.visible = U.visibleTemp;
      z.visible = z.visibleTemp;
      I.visible = I.visibleTemp;
      N.visible = N.visibleTemp;
      F.visible = F.visibleTemp
    }
  }

  function we () {
    if (W.children.length > 0 && W.children[0] == X)return true; else return false
  }

  function Ee () {
    var t = Re();
    var e = n.clientWidth;
    var i = n.clientHeight;
    var r = e / i;
    var a = {top: 0, left: 0, width: e, height: i};
    A.userData = a;
    T.aspect = r;
    if (we()) {
    } else {
      var o = x;
      switch (Tt.fullView) {
        case FullMode.fill: {
          if (r > M) {
          } else {
            o = y / r
          }
          T.aspect = r
        }
          break;
        case FullMode.trans: {
          if (r > M) {
            a.left = (e - i * M) / 2;
            a.width = i * M
          } else {
            a.top = (i - e / M) / 2;
            a.height = e / M;
            o = y / r
          }
        }
          break;
        case FullMode.clip: {
          if (r > M) {
            o = y / r
          }
        }
          break;
        case FullMode.stretch: {
          T.aspect = M
        }
          break
      }
      var s = 2 * Math.atan(o / 2 / b) * 180 / Math.PI;
      T.fov = s
    }
    T.updateProjectionMatrix();
    if (S.visible) {
      S.fov = T.fov * Tt.magnifier.size / i / Tt.magnifier.zoom;
      S.updateProjectionMatrix()
    }
    A.setSize(e, i)
  }

  function Te (t) {
    if (t.requestFullscreen) {
      t.requestFullscreen()
    } else if (t.mozRequestFullScreen) {
      t.mozRequestFullScreen()
    } else if (t.webkitRequestFullscreen) {
      t.webkitRequestFullscreen()
    } else if (t.msRequestFullscreen) {
      t.msRequestFullscreen()
    }
  }

  function Se () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  function Re () {
    var t = document.mozFullScreen;
    var e = document.webkitIsFullScreen;
    var i = document.fullscreen;
    var n = document.msFullscreen;
    return t || e || i || n
  }

  function Ae (t) {
    switch (t.keyCode) {
      case 27: {
        ae(Tool.none)
      }
        break;
      case Tt.key.del:
        if (Et) {
          var i = Et;
          var t = {layer: i.parent, feature: i, layername: i.parent.name, fid: i.userData.fid};
          e.onFeatureRemove(t);
          if (t.cancel)return;
          e.removeFeature(i);
          Et = null
        }
        break;
      case Tt.key.play: {
        if (l) e.stop(); else e.play()
      }
        break;
      case Tt.key.fforward: {
        e.step(10)
      }
        break;
      case Tt.key.fbackward: {
        e.step(-10)
      }
        break;
      case Tt.key.forward: {
        e.step(1)
      }
        break;
      case Tt.key.backward: {
        e.step(-1)
      }
        break;
      case Tt.key.fullscreen: {
        if (Re()) Se(); else Te(n)
      }
        break
    }
  }

  function Le (t) {
    t.preventDefault()
  }

  function Pe (t) {
    t.preventDefault();
    if (t.touches.length == 1) De(t.touches[0])
  }

  var Ce = false;
  var Ie = false;
  var Ne = {x: 0, y: 0};

  function ze (t) {
    t.preventDefault();
    Dt(t);
    control.enabled = we();
    Ce = true;
    Ie = false;
    Ne.x = t.offsetX;
    Ne.y = t.offsetY
  }

  function De (t) {
    t.preventDefault();
    Dt(t);
    Ie = false;
    if (!Ce)return;
    yt.setFromCamera(xt, T);
    var e = yt.intersectObject(I, true);
    if (e.length > 0) {
      if (e[0].object.name == "history") {
        Fe(e[0].object.userData)
      } else {
        var i = e[0].object.name;
        St(i)
      }
    } else {
      console.debug("onPPVisionMouseUp cur_tool: %d", h);
      switch (h) {
        case Tool.none:
          He(xt, t);
          break;
        case Tool.measurePoint:
          Xt(xt, t);
          break;
        case Tool.measureLength:
          Yt(xt, t);
          break;
        case Tool.measureArea:
          Qt(xt, t);
          break;
        case Tool.measureZ:
          Jt(xt, t);
          break;
        case Tool.measureFacade:
          Kt(xt, t);
          break;
        case Tool.measureAngle:
          $t(xt, t);
          break;
        case Tool.measureSlope:
          te(xt, t);
          break;
        case Tool.createPoint:
          Vt(xt, t);
          break;
        case Tool.createPolyline:
          Wt(xt, t);
          break;
        case Tool.createPolygon:
          qt(xt, t);
          break;
        case Tool.pick:
          Gt(xt, t);
          break;
        case Tool.remove:
          jt(xt, t);
          break
      }
    }
  }

  function Ue (t) {
    t.preventDefault();
    Dt(t);
    if (t.buttons > 0) {
      if (!Ie) {
        var e = t.offsetX - Ne.x;
        var i = t.offsetY - Ne.y;
        if (Math.abs(e) > 3 || Math.abs(i) > 3) {
          Ie = true;
          Ce = false
        }
      }
    }
    F.visible = false;
    bt.x = t.offsetX;
    bt.y = n.clientHeight - t.offsetY;
    if (t.ctrlKey) {
      if (!S.visible) {
        S.visible = true;
        Mt.copy(bt);
        if (Tt.magnifier.fix) {
          yt.setFromCamera(xt, T);
          var r = yt.ray;
          S.position.set(0, 0, 0);
          S.up.copy(T.up);
          S.lookAt(r.direction);
          S.position.copy(T.position)
        }
      }
      if (Tt.magnifier.fix) {
        _t = zt(bt)
      } else {
        _t.set(0, 0);
        var a = zt(bt);
        yt.setFromCamera(a, T);
        var r = yt.ray;
        S.position.set(0, 0, 0);
        S.up.copy(T.up);
        S.lookAt(r.direction);
        S.position.copy(T.position)
      }
      return
    } else {
      S.visible = false
    }
    yt.setFromCamera(xt, T);
    var o = yt.intersectObject(I, true);
    if (o.length > 0) {
      if (wt != o[0].object) {
        if (wt) wt.material.color.setHex(wt.currentHex);
        wt = o[0].object;
        wt.currentHex = wt.material.color.getHex();
        wt.material.color.setHex(16711680)
      }
      return
    } else {
      if (wt) wt.material.color.setHex(wt.currentHex);
      wt = null
    }
    if (h == Tool.none) {
      var s = Ft(xt);
      if (s == null) {
        F.visible = false
      } else {
        var c = s.distanceTo(T.position);
        var l = c;
        if (l > 5 && l < 100) {
          F.visible = true;
          F.position.copy(s);
          if (c > 0) nt.setText("前进 " + l.toFixed(0) + "m"); else nt.setText("后退 " + l.toFixed(0) + "m")
        } else {
          F.visible = false
        }
      }
    }
  }

  function Oe (t) {
    t.preventDefault();
    if (we()) {
      if (t.deltaY > 0 && T.fov > 5) {
        T.fov *= .8;
        T.updateProjectionMatrix()
      } else if (t.deltaY < 0 && T.fov < 90) {
        T.fov *= 1.2;
        T.updateProjectionMatrix()
      }
    } else {
      if (t.deltaY > 0) {
        e.step(1)
      } else {
        e.step(-1)
      }
    }
  }

  function He (t, i) {
    if (!F.visible)return;
    var n = [F.position.x + j.x, F.position.y + j.y, F.position.z + j.z];
    var a = G.inverse(n);
    e.locate(o, a[0], a[1], r)
  }

  function Fe (t) {
    var e = Be();
    if (e == null)return;
    var i = document.createElement("div");
    e.appendChild(i);
    i.id = "history";
    i.className = "history";
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      var a = document.createElement("img");
      a.id = "history_item_" + n;
      a.className = "history_item";
      a.setAttribute("src", r.thumb);
      a.setAttribute("title", r.date);
      a.userData = r;
      a.thumbError = false;
      a.addEventListener("error", function () {
        if (!this.thumbError) {
          this.thumbError = true;
          this.src = this.userData.img
        } else {
          this.src = mt
        }
      }, false);
      a.addEventListener("click", function () {
        St(this.userData.id)
      }, false);
      i.appendChild(a)
    }
  }

  function Be () {
    var t = document.getElementById("history_container");
    if (t != null) {
      var e = document.getElementById("history");
      if (e != null) {
        t.removeChild(e)
      }
    }
    return t
  }

  function ke () {
    var t = T.position;
    var e = T.getWorldDirection();
    var i = new THREE.Vector3(0, 0, 1);
    var n = new THREE.Vector3;
    n.crossVectors(e, i);
    n.normalize();
    e.setLength(Tt.arrows.forward);
    I.position.set(0, 0, -Tt.arrows.below);
    I.position.add(t);
    I.position.add(e);
    I.quaternion.setFromAxisAngle(n, Math.PI / Tt.arrows.lean)
  }

  function Ge (t, i) {
    var n = t.cur;
    var r;
    if (i) {
      ie();
      var a = "+proj=tmerc +lat_0=" + n.lat + " +lon_0=" + n.lon + " +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs ";
      G = proj4(a);
      r = G.forward([n.lon, n.lat]);
      j.x = r[0];
      j.y = r[1];
      j.z = n.alt;
      e.needsUpdate = true
    } else {
      r = G.forward([n.lon, n.lat])
    }
    V.set(r[0], r[1], n.alt);
    V.sub(j);
    var o = new THREE.Euler(n.pitch, n.roll, n.yaw, "ZXY");
    W.position.copy(V);
    W.rotation.copy(o);
    if (we()) {
      var s = T.getWorldDirection();
      var h = Math.atan2(s.x, s.y);
      var c = -n.heading;
      var d = c - h;
      if (f != null) {
        var m = f - d;
        var v = new THREE.Euler(0, 0, m);
        var g = new THREE.Quaternion;
        g.setFromEuler(v);
        T.quaternion.premultiply(g)
      }
    } else {
      var y = new THREE.Vector3(0, 1, 0);
      var x = new THREE.Vector3(0, 0, 1);
      y.applyEuler(o);
      x.applyEuler(o);
      T.position.set(0, 0, 0);
      T.up.copy(x);
      T.lookAt(y)
    }
    T.position.copy(V);
    ke();
    I.children = [];
    var b = {lon: n.lon, lat: n.lat, alt: n.alt};
    if (t.history != null && t.history.length > 0) {
      if (t.next == null) {
        t.next = t.history.shift()
      } else if (t.prev == null) {
        t.prev = t.history.shift()
      }
    }
    var M = .01;
    var _ = new THREE.Vector3(0, 1, 0);
    var E = t.next;
    if (E != null) {
      var y = G.forward([E.lon, E.lat]);
      var s = new THREE.Vector3(y[0] - r[0], y[1] - r[1], 0).normalize();
      var S = Math.atan2(s.x, s.y);
      var c = S * 180 / Math.PI;
      var R = new THREE.Group;
      I.add(R);
      R.rotation.set(0, 0, -S);
      var A = ne(R, Y, E.id, 16772846, ft(c));
      A.position.copy(_);
      _.z += .01;
      b.next = {id: E.id, heading: c}
    }
    var E = t.prev;
    if (E != null) {
      var y = G.forward([E.lon, E.lat]);
      var s = new THREE.Vector3(y[0] - r[0], y[1] - r[1], 0).normalize();
      var S = Math.atan2(s.x, s.y);
      var c = S * 180 / Math.PI;
      var R = new THREE.Group;
      I.add(R);
      R.rotation.set(0, 0, -S);
      var A = ne(R, Y, E.id, 15663086, ft(c));
      A.position.copy(_);
      _.z += .01;
      b.prev = {id: E.id, heading: c}
    }
    if (t.branch != null) {
      b.branch = [];
      for (var L = 0; L < t.branch.length; L++) {
        var E = t.branch[L];
        if (E != null) {
          var S = -E.heading;
          var c = S * 180 / Math.PI;
          var P = Math.abs(n.heading - E.heading) * 180 / Math.PI;
          while (P > 360) {
            P -= 360
          }
          if (P > 150) {
            b.back = {id: E.id, heading: c};
            continue
          }
          var R = new THREE.Group;
          I.add(R);
          R.rotation.set(0, 0, -S);
          var A = ne(R, Y, E.id, 15658751, ft(c));
          A.position.copy(_);
          _.z += .01;
          b.branch.push({id: E.id, heading: c})
        }
      }
    }
    var C = false;
    if (t.history != null) {
      if (t.history.length > 0) {
        var A = ne(I, Y, "history", 16777215, dt);
        A.scale.set(.7, .7, .7);
        A.userData = [];
        b.history = [];
        for (var L = 0; L < t.history.length; L++) {
          var E = t.history[L];
          if (E != null) {
            var N = w + "ppv/train/" + E.train + "/images/" + Tt.thumb + "/" + E.image;
            var z = w + "ppv/train/" + E.train + "/images/" + E.image;
            var D = {id: E.id, date: E.train, thumb: N, img: z};
            A.userData.push(D);
            var U = {id: E.id, date: E.train};
            b.history.push(U)
          }
        }
      }
    }
    e.onPosition(b);
    if (e.needsUpdate) {
      e.needsUpdate = false;
      for (var L = 0; L < B.children.length; L++) {
        var O = B.children[L];
        e.setLayer(O, O.userData)
      }
    }
    {
      var s = T.getWorldDirection();
      var c = Math.atan2(s.x, s.y) * 180 / Math.PI;
      var H = T.fov;
      var F = Math.atan(Math.tan(H / 2) * T.aspect) * 2 * 180 / Math.PI;
      var k = {heading: c, fovx: F};
      e.onEye(k)
    }
    p = n.id;
    var q = {state: LocateState.success};
    e.onLocate(q);
    u = false;
    if (l) {
      St(Rt(1))
    }
  }

  function je (t, i) {
    d = null;
    if (t == "") {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var r = JSON.parse(t);
    if (r == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var a = r.Currentframe;
    if (a == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    d = r;
    var o = a.Imgurl;
    var s = o.lastIndexOf("/");
    var h = o.substr(0, s) + "/" + Tt.thumb + o.substr(s);
    We(h, o, Ve, r, i)
  }

  function Ve (t, i) {
    var n = t.Currentframe;
    var r;
    if (i) {
      ie();
      var a = "+proj=tmerc +lat_0=" + n.Lat + " +lon_0=" + n.Lon + " +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs ";
      G = proj4(a);
      r = G.forward([n.Lon, n.Lat]);
      j.x = r[0];
      j.y = r[1];
      j.z = n.Alt;
      e.needsUpdate = true
    } else {
      r = G.forward([n.Lon, n.Lat])
    }
    V.set(r[0], r[1], n.Alt);
    V.sub(j);
    var o = new THREE.Euler(n.Pitch, n.Roll, n.Yaw, "ZXY");
    W.position.copy(V);
    W.rotation.copy(o);
    if (we()) {
      var s = T.getWorldDirection();
      var h = Math.atan2(s.x, s.y);
      var c = -n.Heading;
      var d = c - h;
      if (f != null) {
        var m = f - d;
        var v = new THREE.Euler(0, 0, m);
        var g = new THREE.Quaternion;
        g.setFromEuler(v);
        T.quaternion.premultiply(g)
      }
    } else {
      var y = new THREE.Vector3(0, 1, 0);
      var x = new THREE.Vector3(0, 0, 1);
      y.applyEuler(o);
      x.applyEuler(o);
      T.position.set(0, 0, 0);
      T.up.copy(x);
      T.lookAt(y)
    }
    T.position.copy(V);
    ke();
    I.children = [];
    var b = {lon: n.Lon, lat: n.Lat, alt: n.Alt};
    if (t.Historyframe != null && t.Historyframe.length > 0) {
      if (t.next == null) {
        t.next = t.Historyframe.shift()
      } else if (t.prev == null) {
        t.prev = t.Historyframe.shift()
      }
    }
    var M = .01;
    var _ = new THREE.Vector3(0, 1, 0);
    var w = t.Nextframe;
    if (w != null) {
      var y = G.forward([w.Lon, w.Lat]);
      var s = new THREE.Vector3(y[0] - r[0], y[1] - r[1], 0).normalize();
      var E = Math.atan2(s.x, s.y);
      var c = E * 180 / Math.PI;
      var S = new THREE.Group;
      I.add(S);
      S.rotation.set(0, 0, -E);
      var R = ne(S, Y, w.ImgId, 16772846, ft(c));
      R.position.copy(_);
      _.z += .01;
      b.next = {id: w.ImgId, heading: c}
    }
    var w = t.Prevframe;
    if (w != null) {
      var y = G.forward([w.Lon, w.Lat]);
      var s = new THREE.Vector3(y[0] - r[0], y[1] - r[1], 0).normalize();
      var E = Math.atan2(s.x, s.y);
      var c = E * 180 / Math.PI;
      var S = new THREE.Group;
      I.add(S);
      S.rotation.set(0, 0, -E);
      var R = ne(S, Y, w.ImgId, 15663086, ft(c));
      R.position.copy(_);
      _.z += .01;
      b.prev = {id: w.ImgId, heading: c}
    }
    if (t.Branchframe != null) {
      b.branch = [];
      for (var A = 0; A < t.Branchframe.length; A++) {
        var w = t.Branchframe[A];
        if (w != null) {
          var E = -w.Heading;
          var c = E * 180 / Math.PI;
          var L = Math.abs(n.Heading - w.Heading) * 180 / Math.PI;
          while (L > 360) {
            L -= 360
          }
          if (L > 150) {
            b.back = {id: w.ImgId, heading: c};
            continue
          }
          var S = new THREE.Group;
          I.add(S);
          S.rotation.set(0, 0, -E);
          var R = ne(S, Y, w.ImgId, 15658751, ft(c));
          R.position.copy(_);
          _.z += .01;
          b.branch.push({id: w.ImgId, heading: c})
        }
      }
    }
    var P = false;
    if (t.Historyframe != null) {
      if (t.Historyframe.length > 0) {
        var R = ne(I, Y, "history", 16777215, dt);
        R.scale.set(.7, .7, .7);
        R.userData = [];
        b.history = [];
        for (var A = 0; A < t.Historyframe.length; A++) {
          var w = t.Historyframe[A];
          if (w != null) {
            var C = n.Imgurl;
            var y = C.lastIndexOf("/");
            var N = C.substr(0, y) + "/" + Tt.thumb + C.substr(y);
            var z = {id: w.ImgId, date: w.Train, thumb: N, img: C};
            R.userData.push(z);
            var D = {id: w.ImgId, date: w.Train};
            b.history.push(D)
          }
        }
      }
    }
    e.onPosition(b);
    if (e.needsUpdate) {
      e.needsUpdate = false;
      for (var A = 0; A < B.children.length; A++) {
        var U = B.children[A];
        e.setLayer(U, U.userData)
      }
    }
    {
      var s = T.getWorldDirection();
      var c = Math.atan2(s.x, s.y) * 180 / Math.PI;
      var O = T.fov;
      var H = Math.atan(Math.tan(O / 2) * T.aspect) * 2 * 180 / Math.PI;
      var F = {heading: c, fovx: H};
      e.onEye(F)
    }
    p = n.ImgId;
    var k = {state: LocateState.success};
    e.onLocate(k);
    u = false;
    if (l) {
      St(Rt(1))
    }
  }

  function We (t, i, n, r, a) {
    if (d != null) {
      switch (o) {
        case-1:
          s = d.cur.type;
          break;
        case 0:
          s = d.Currentframe.Type;
          break;
        case 3:
          s = 2;
          break;
        case 4:
          s = 1;
          break
      }
    }
    E.load(t, function (t) {
      var e = q.material.map;
      if (s == 1) {
        e = X.material.map;
        W.children = [];
        W.add(X)
      } else {
        W.children = [];
        W.add(q)
      }
      e.image = t.image;
      e.needsUpdate = true;
      n(r, a);
      if (l)return;
      u = true;
      E.load(i, function (t) {
        var e = q.material.map;
        if (s == 1) {
          e = X.material.map;
          W.children = [];
          W.add(X)
        } else {
          W.children = [];
          W.add(q)
        }
        e.image = t.image;
        e.needsUpdate = true;
        u = false
      }, null, function () {
        u = false
      })
    }, null, function () {
      E.load(i, function (t) {
        var e = q.material.map;
        if (s == 1) {
          e = X.material.map;
          W.children = [];
          W.add(X)
        } else {
          W.children = [];
          W.add(q)
        }
        e.image = t.image;
        e.needsUpdate = true;
        n(r, a)
      }, null, function () {
        var t = {state: LocateState.imageError};
        e.onLocate(t);
        if (s == 1) {
          var i = X.material.map;
          W.children = [];
          W.add(X);
          i.image = gt.image;
          i.needsUpdate = true
        } else {
          var i = q.material.map;
          W.children = [];
          W.add(q);
          i.image = vt.image;
          i.needsUpdate = true
        }
        n(r, a)
      })
    })
  }

  function qe (t, i) {
    d = null;
    if (t == "") {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var r = JSON.parse(t);
    if (r == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var a = r.cur;
    if (a == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    d = r;
    var o = w + "ppv/train/" + a.train + "/images/" + Tt.thumb + "/" + a.image;
    var s = w + "ppv/train/" + a.train + "/images/" + a.image;
    We(o, s, Ge, r, i)
  }

  function Xe (t, i) {
    d = null;
    if (t == "") {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var r = JSON.parse(t);
    if (r == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var a = r.Currentframe;
    if (a == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    d = r;
    var o = a.Pictureurl;
    var s = o.lastIndexOf("/");
    var h = o.substr(0, s) + "/" + Tt.thumb + o.substr(s);
    We(h, o, Ze, r, i)
  }

  function Ye (t, i) {
    d = null;
    if (t == "") {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var r = JSON.parse(t);
    if (r == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    var a = r.Currentframe;
    if (a == null) {
      var n = {state: LocateState.dataError};
      e.onLocate(n);
      console.warn(t);
      u = false;
      return
    }
    d = r;
    var o = a.Pictureurl;
    var s = o.lastIndexOf("/");
    var h = o.substr(0, s) + "/" + Tt.thumb + o.substr(s);
    We(h, o, Qe, r, i)
  }

  function Ze (t, i, n) {
    var r = t.Currentframe;
    var a;
    if (i) {
      ie();
      var o = "+proj=tmerc +lat_0=" + r.Latitude + " +lon_0=" + r.Longitude + " +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs ";
      G = proj4(o);
      a = G.forward([r.Longitude, r.Latitude]);
      j.x = a[0];
      j.y = a[1];
      j.z = r.Altitude;
      e.needsUpdate = true
    } else {
      a = G.forward([r.Longitude, r.Latitude])
    }
    V.set(a[0], a[1], r.Altitude);
    V.sub(j);
    var s = new THREE.Euler(-r.Pitch * Math.PI / 180, r.Roll * Math.PI / 180, r.Yaw * Math.PI / 180, "ZXY");
    var h = new THREE.Vector3(0, b, 0);
    var c = new THREE.Vector3(0, 0, 1);
    h.applyEuler(s);
    c.applyEuler(s);
    if (!we()) {
      T.position.set(0, 0, 0);
      T.up.set(c.x, c.y, c.z);
      T.lookAt(h)
    }
    T.position.copy(V);
    W.position.copy(V);
    W.rotation.copy(s);
    ke();
    I.children = [];
    var d = {lon: r.Longitude, lat: r.Latitude, alt: r.Altitude};
    if (t.Historyframe != null && t.Historyframe.length > 0) {
      if (t.Nextframe == null) {
        t.Nextframe = t.Historyframe.shift()
      } else if (t.Prevframe == null) {
        t.Prevframe = t.Historyframe.shift()
      }
    }
    var f = new THREE.Vector3(0, 1, 0);
    var m = t.Nextframe;
    if (m != null) {
      var h = G.forward([m.Longitude, m.Latitude]);
      var v = new THREE.Vector3(h[0] - a[0], h[1] - a[1], 0).normalize();
      var g = Math.atan2(v.x, v.y);
      var y = g * 180 / Math.PI;
      var x = new THREE.Group;
      I.add(x);
      x.rotation.set(0, 0, -g);
      var M = ne(x, Y, m.PmId, 16772846, ft(y));
      M.position.copy(f);
      f.z += .01;
      d.next = {id: m.PmId, heading: y}
    }
    var m = t.Prevframe;
    if (m != null) {
      var h = G.forward([m.Longitude, m.Latitude]);
      var v = new THREE.Vector3(h[0] - a[0], h[1] - a[1], 0).normalize();
      var g = Math.atan2(v.x, v.y);
      var y = g * 180 / Math.PI;
      var x = new THREE.Group;
      I.add(x);
      x.rotation.set(0, 0, -g);
      var M = ne(x, Y, m.PmId, 15663086, ft(y));
      M.position.copy(f);
      f.z += .01;
      d.prev = {id: m.PmId, heading: y}
    }
    var _;
    if (t.Branchframe != null) {
      d.branch = [];
      for (var w = 0; w < t.Branchframe.length; w++) {
        var m = t.Branchframe[w];
        if (m != null) {
          var y = -m.Yaw;
          var g = y * Math.PI / 180;
          var E = Math.abs(r.Yaw - m.Yaw);
          while (E > 360) {
            E -= 360
          }
          if (E > 150) {
            d.back = {id: m.PmId, heading: y};
            continue
          }
          var x = new THREE.Group;
          I.add(x);
          x.rotation.set(0, 0, -g);
          var M = ne(x, Y, m.PmId, 15658751, ft(y));
          M.position.copy(f);
          f.z += .01;
          d.branch.push({id: m.PmId, heading: y})
        }
      }
    }
    var S = false;
    if (t.Historyframe != null) {
      if (t.Historyframe.length > 0) {
        var M = ne(I, Y, "history", 16777215, dt);
        M.scale.set(.7, .7, .7);
        M.userData = [];
        d.history = [];
        for (var w = 0; w < t.Historyframe.length; w++) {
          var m = t.Historyframe[w];
          if (m != null) {
            var R = r.Pictureurl;
            var h = R.lastIndexOf("/");
            var A = R.substr(0, h) + "/" + Tt.thumb + R.substr(h);
            var L = {id: m.PmId, date: m.Importtime, thumb: A, img: R};
            M.userData.push(L);
            var P = {id: m.PmId, date: m.Importtime};
            d.history.push(P)
          }
        }
      }
    }
    e.onPosition(d);
    if (e.needsUpdate) {
      e.needsUpdate = false;
      for (var w = 0; w < B.children.length; w++) {
        var C = B.children[w];
        e.setLayer(C, C.userData)
      }
    }
    {
      var v = T.getWorldDirection();
      var y = Math.atan2(v.x, v.y) * 180 / Math.PI;
      var N = T.fov;
      var z = Math.atan(Math.tan(N / 2) * T.aspect) * 2 * 180 / Math.PI;
      var D = {heading: y, fovx: z};
      e.onEye(D)
    }
    p = r.PmId;
    var U = {state: LocateState.success};
    e.onLocate(U);
    u = false;
    if (l) {
      St(Rt(1))
    }
  }

  function Qe (t, i, n) {
    var r = t.Currentframe;
    var a;
    if (i) {
      ie();
      var o = "+proj=tmerc +lat_0=" + r.Latitude + " +lon_0=" + r.Longitude + " +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs ";
      G = proj4(o);
      a = G.forward([r.Longitude, r.Latitude]);
      j.x = a[0];
      j.y = a[1];
      j.z = r.Height;
      e.needsUpdate = true
    } else {
      a = G.forward([r.Longitude, r.Latitude])
    }
    V.set(a[0], a[1], r.Height);
    V.sub(j);
    var s = new THREE.Euler(0, 0, -(r.Heading + 90) * Math.PI / 180, "ZXY");
    W.position.copy(V);
    W.rotation.copy(s);
    var h = T.getWorldDirection();
    var c = Math.atan2(h.x, h.y);
    var d = r.Heading * Math.PI / 180;
    var m = d - c;
    if (f != null) {
      var v = f - m;
      var g = new THREE.Euler(0, 0, v);
      var y = new THREE.Quaternion;
      y.setFromEuler(g);
      T.quaternion.premultiply(y)
    }
    T.position.copy(V);
    ke();
    I.children = [];
    var x = {lon: r.Longitude, lat: r.Latitude, alt: r.Height};
    if (t.Historyframe != null && t.Historyframe.length > 0) {
      if (t.Nextframe == null) {
        t.Nextframe = t.Historyframe.shift()
      } else if (t.Prevframe == null) {
        t.Prevframe = t.Historyframe.shift()
      }
    }
    var b = new THREE.Vector3(0, 1, 0);
    var M = t.Nextframe;
    if (M != null) {
      var _ = G.forward([M.Longitude, M.Latitude]);
      var h = new THREE.Vector3(_[0] - a[0], _[1] - a[1], 0).normalize();
      var w = Math.atan2(h.x, h.y);
      var d = w * 180 / Math.PI;
      var E = new THREE.Group;
      I.add(E);
      E.rotation.set(0, 0, -w);
      var S = ne(E, Y, M.Id, 16772846, ft(d));
      S.position.copy(b);
      b.z += .01;
      x.next = {id: M.Id, heading: d}
    }
    var M = t.Prevframe;
    if (M != null) {
      var _ = G.forward([M.Longitude, M.Latitude]);
      var h = new THREE.Vector3(_[0] - a[0], _[1] - a[1], 0).normalize();
      var w = Math.atan2(h.x, h.y);
      var d = w * 180 / Math.PI;
      var E = new THREE.Group;
      I.add(E);
      E.rotation.set(0, 0, -w);
      var S = ne(E, Y, M.Id, 15663086, ft(d));
      S.position.copy(b);
      b.z += .01;
      x.prev = {id: M.Id, heading: d}
    }
    var R;
    if (t.Branchframe != null) {
      x.branch = [];
      for (var A = 0; A < t.Branchframe.length; A++) {
        var M = t.Branchframe[A];
        if (M != null) {
          var d = -M.Heading * Math.PI / 180;
          var w = d * Math.PI / 180;
          var L = Math.abs(r.Heading - M.Heading);
          while (L > 360) {
            L -= 360
          }
          if (L > 150) {
            x.back = {id: M.Id, heading: d};
            continue
          }
          var E = new THREE.Group;
          I.add(E);
          E.rotation.set(0, 0, -w);
          var S = ne(E, Y, M.Id, 15658751, ft(d));
          S.position.copy(b);
          b.z += .01;
          x.branch.push({id: M.Id, heading: d})
        }
      }
    }
    var P = false;
    if (t.Historyframe != null) {
      if (t.Historyframe.length > 0) {
        var S = ne(I, Y, "history", 16777215, dt);
        S.scale.set(.7, .7, .7);
        S.userData = [];
        x.history = [];
        for (var A = 0; A < t.Historyframe.length; A++) {
          var M = t.Historyframe[A];
          if (M != null) {
            var C = r.Pictureurl;
            var _ = C.lastIndexOf("/");
            var N = C.substr(0, _) + "/" + Tt.thumb + C.substr(_);
            var z = {id: M.Id, date: M.Datetime, thumb: N, img: C};
            S.userData.push(z);
            var D = {id: M.Id, date: M.Datetime};
            x.history.push(D)
          }
        }
      }
    }
    e.onPosition(x);
    if (e.needsUpdate) {
      e.needsUpdate = false;
      for (var A = 0; A < B.children.length; A++) {
        var U = B.children[A];
        e.setLayer(U, U.userData)
      }
    }
    {
      var h = T.getWorldDirection();
      var d = Math.atan2(h.x, h.y) * 180 / Math.PI;
      var O = T.fov;
      var H = Math.atan(Math.tan(O / 2) * T.aspect) * 2 * 180 / Math.PI;
      var F = {heading: d, fovx: H};
      e.onEye(F)
    }
    p = r.Id;
    var k = {state: LocateState.success};
    e.onLocate(k);
    u = false;
    if (l) {
      St(Rt(1))
    }
  }

  be()
}
export default PPV