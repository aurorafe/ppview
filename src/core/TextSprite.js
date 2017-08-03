/**
 * Created by FDD on 2017/7/28.
 * @desc 文字label和边框样式
 */
import {defaultPref} from '../config/baseConfig'
import isNumber from 'lodash/isNumber'
class TextSprite extends (THREE.Object3D) {
  constructor (params) {
    super()
    let texture = new THREE.Texture()
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    let material = new THREE.SpriteMaterial({
      map: texture,
      depthTest: false
    })
    this.sprite = new THREE.Sprite(material)
    this.add(this.sprite)
    /**
     * 当前配置
     * @type {*}
     */
    this.options = params || {}

    /**
     * 当前默认样式
     */
    if (!this.options['style']) {
      this.options['style'] = defaultPref['label']
    }
    /**
     * 当前label偏移量
     * @type {[*]}
     */
    if (!this.options['offset']) {
      this.options['offset'] = [0, 0]
    }
    /**
     * 默认text不能为空或者未定义
     */
    if (this.options['text'] === undefined || this.options['text'] === null) {
      this.options['text'] = ''
    }
  }

  /**
   * 重新设置样式
   * @param style
   */
  setStyle (style) {
    if (this.options['style']) {
      for (let key in this.options['style']) {
        if (key && style[key]) {
          this.options['style'][key] = style[key]
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
      this.options['offset'] = offset
    } else if (arguments.length === 2 && isNumber(arguments[0]) && isNumber(arguments[1])) {
      this.options['offset'] = [arguments[0], arguments[1]]
    }
    this.update()
  }

  /**
   * 设置label文字
   * @param text
   */
  setText (text) {
    this.options['text'] = text
    this.update()
  }

  /**
   * 更新当前label样式
   */
  update () {
    let element = document.createElement('canvas')
    let ctx = element.getContext('2d')
    ctx.font = this.options['style'].fontSize + 'px ' + this.options['style']['fontFamily']
    let bbox = ctx.measureText(this.options['text'])
    let fontWidth = Math.round(this.options['style']['fontSize'] * 0.2) + this.options['style']['borderWidth']
    ctx.canvas.width = bbox.width + 2 * fontWidth
    ctx.canvas.height = this.options['style'].fontSize + 2 * fontWidth
    if (this.options['style']['borderWidth'] && this.options['style']['borderWidth'] > 0) {
      ctx.fillStyle = this.options['style'].backgroundColor
      ctx.strokeStyle = this.options['style'].borderColor
      ctx.lineWidth = this.options['style'].borderWidth
      this.roundRect(ctx, this.options['style'].borderWidth / 2, this.options['style'].borderWidth / 2, ctx.canvas.width - this.options['style'].borderWidth, ctx.canvas.height - this.options['style'].borderWidth, this.options['style'].borderRadius)
      ctx.fillStyle = this.options['style']['textColor']
      ctx.fillText(this.options['text'], fontWidth, this.options['style'].fontSize + fontWidth / 2)
    } else {
      ctx.strokeStyle = this.options['style'].backgroundColor
      ctx.strokeText(this.options['text'], fontWidth, this.options['style'].fontSize + fontWidth / 2)
      ctx.fillStyle = this.options['style']['textColor']
      ctx.fillText(this.options['text'], fontWidth, this.options['style'].fontSize + fontWidth / 2)
    }
    let texture = new THREE.Texture(element)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.needsUpdate = true
    this.sprite.material.map = texture
    let scale = ctx.canvas.height / this.options['style']['fontSize']
    let padding = ctx.canvas.width / ctx.canvas.height * scale
    let [ptx, pty] = [this.options['offset'][0] / this.options['style']['fontSize'], this.options['offset'][1] / this.options['style']['fontSize']]
    this.sprite.scale.set(padding, scale, 1)
    this.sprite.position.set(ptx, 0, pty)
  }

  /**
   * 画矩形边框
   * @param t
   * @param e
   * @param i
   * @param n
   * @param r
   * @param a
   */
  roundRect (t, e, i, n, r, a) {
    n--
    t.beginPath()
    t.moveTo(e + a, i)
    t.lineTo(e + n - a, i)
    t.quadraticCurveTo(e + n, i, e + n, i + a)
    t.lineTo(e + n, i + r - a)
    t.quadraticCurveTo(e + n, i + r, e + n - a, i + r)
    t.lineTo(e + a, i + r)
    t.quadraticCurveTo(e, i + r, e, i + r - a)
    t.lineTo(e, i + a)
    t.quadraticCurveTo(e, i, e + a, i)
    t.closePath()
    t.fill()
    t.stroke()
  }
}

export default TextSprite
