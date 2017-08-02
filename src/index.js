/**
 * Created by FDD on 2017/8/1.
 * @desc 核心算法
 */
import merge from 'lodash/merge'
import './polyfill/assign'
import {defaultPref, eventName, LocateState} from './config/baseConfig'
import mixin from './utils/mixin'
// import * as utils from './utils/utils'
// import RotControl from './core/RotControl'
// import TextSprite from './core/TextSprite'
import * as ajaxUtils from './utils/ajaxUtils'
// import * as Events from './events/Events'
import Core from './core/Core'
import Observable from './events/Observable'
class Panorama extends mixin(Observable, Core) {
  constructor (ele, params, key) {
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
    /**
     * 当前秘钥
     */
    this.key = key

    /**
     * 标识
     * @type {boolean}
     */
    this.disContinueFlag = false
  }

  /**
   * 获取当前版本
   * @returns {string}
   */
  getVersion () {
    return this.version
  }

  init () {

  }

  /**
   * 获取当前目标对象
   * @returns {*}
   */
  getTargetElement () {
    if (this.targetElement) {
      return this.targetElement
    } else {
      return null
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

  /**
   * 设置参数
   * @param pref
   */
  setPref (pref) {
    for (let key in this.options) {
      if (key && pref[key]) {
        this.options[key] = pref[key]
      }
    }
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

  /**
   * 根据坐标定位
   * @param type
   * @param ptx
   * @param pty
   */
  locate (type, ptx, pty) {
    if (this.disContinueFlag) {
      this.dispatch(eventName.LOCATE, LocateState.busy)
    } else {
      this.disContinueFlag = true
      switch (type) {
        case -1:
          let [h, c] = [50, 15]
          ajaxUtils.get(w + 'ppv/php/locate.php', {
            lon: ptx,
            lat: pty,
            tol: h,
            angle: c
          }).then(res => {
            this.actionLoadTypeGet(res, true)
          }).catch(error => {
            console.warn(error)
          })
          break
        case 0:
          ajaxUtils.post(a + '/GetBranchByCoord', {
            data: {
              type: type,
              x: ptx,
              y: pty,
              key: this.key
            }
          }).then(res => {
            console.log(res)
            je(res.d, true)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
        case 3:
          ajaxUtils.post(a + '/GetBranchByCoord', {
            data: {
              type: type,
              x: ptx,
              y: pty,
              key: this.key
            }
          }).then(res => {
            console.log(res)
            Xe(res.d, true)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
        case 4:
          ajaxUtils.post(a + '/GetBranchByCoord', {
            data: {
              type: type,
              x: ptx,
              y: pty,
              key: this.key
            }
          }).then(res => {
            console.log(res)
            Ye(res.d, true)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
      }
    }
  }
}

export default Panorama
