/**
 * Created by FDD on 2017/7/28.
 * @desc TextSprite
 */
import {defaultPref} from '../config/baseConfig'
import isNumber from 'lodash/isNumber'
class TextSprite extends (THREE.Object3D) {
  constructor () {
    super()
    THREE.Object3D.call(this)
    /**
     * 当前默认样式
     */
    this.style = defaultPref['label']
    /**
     * 当前label偏移量
     * @type {[*]}
     */
    this.offset = [0, 0]
    /**
     * 当前文字
     * @type {string}
     */
    this.text = ''
  }

  /**
   * 重新设置样式
   * @param style
   */
  setStyle (style) {
    if (this.style) {
      for (let key in this.style) {
        if (key && style[key]) {
          this.style[key] = style[key]
        }
      }
      this.update()
    }
  }

  /**
   * 设置offset
   * @param offset
   */
  setOffset (offset) {
    if (offset && Array.isArray(offset) && offset.length === 2) {
      this.offset = offset
    } else if (arguments.length === 2 && isNumber(arguments[0]) && isNumber(arguments[1])) {
      this.offset = [arguments[0], arguments[1]]
    }
    this.update()
  }

  /**
   * 设置label文字
   * @param text
   */
  setText (text) {
    this.text = text
    this.update()
  }

  update () {
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
  }

  roundRect (t, e, i, n, r, a) {
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
  }
}
export default TextSprite