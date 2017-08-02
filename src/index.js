/**
 * Created by FDD on 2017/8/1.
 * @desc 核心算法
 */
import merge from 'lodash/merge'
import './polyfill/assign'
import {Tool, FullMode, SampleMode, LocateState, defaultPref} from './config/baseConfig'
import mixin from './utils/mixin'
import RotControl from './core/RotControl'
import TextSprite from './core/TextSprite'
import * as ajaxUtils from './utils/ajaxUtils'
import * as Events from './events/Events'
import Observable from './events/Observable'
class Panorama extends mixin(Observable) {
  constructor (ele, params) {
    super()
    /**
     * 当前版本
     * @type {string}
     */
    this.version = '1.0.0'

    /**
     * 事件中心
     * @type {{}}
     */
    this.Events = {}
    this.__cnt = 0
    this.hasOwnKey = Function.call.bind(Object.hasOwnProperty)
    this.slice = Function.call.bind(Array.prototype.slice)

    /**
     *
     * @type {Element}
     */
    this.targetElement = typeof ele === 'string' ? document.getElementById(ele) : ele
    /**
     * 当前配置
     * @type {*}
     */
    this.options = params || {}
    if (this.options && typeof this.options === 'object') {
      this.options = merge(defaultPref, this.options)
    }
    /**
     * 当前是否在播放
     * @type {boolean}
     */
    this.isPlaying = false
  }

  /**
   * 获取当前版本
   * @returns {string}
   */
  getVersion () {
    return this.version
  }

  /**
   * 获取当前目标对象
   * @returns {*}
   */
  getTargetElement () {
    if (this.targetElement) {
      return this.targetElement
    } else {
      return null;
    }
  }

  /**
   * 设置当前服务地址
   * @param url
   */
  setServer (url) {
    if (url) {
      this.options['server'] = url
    } else {
      throw new Error('服务地址错误！')
    }
  }

  setPref () {

  }

  /**
   * 返回当前配置
   * @returns {*}
   */
  getPref () {
    return (this.options['pref'] || defaultPref)
  }

  /**
   * 判断当前是否在播放
   * @returns {boolean}
   */
  isPlay () {
    return this.isPlaying
  }
}

export default Panorama
