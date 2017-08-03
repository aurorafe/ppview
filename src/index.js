/**
 * Created by FDD on 2017/8/1.
 * @desc 核心算法
 */
import merge from 'lodash/merge'
import './polyfill/assign'
import {defaultPref, eventName, LocateState, Tool, SampleMode} from './config/baseConfig'
import mixin from './utils/mixin'
import * as utils from './utils/utils'
// import * as constants from './constants'
// import RotControl from './core/RotControl'
import TextSprite from './core/TextSprite'
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

    /**
     * 默认动态更新
     * @type {boolean}
     */
    this.needsUpdate = false
    /**
     * 默认为摄影测量法
     * @type {number}
     */
    this.sampleMode = SampleMode.photo
    /**
     * 加载类型
     * @type {number}
     */
    this.loadType = 1
    /**
     * 初始化
     */
    this._init()
  }

  /**
   * 获取当前版本
   * @returns {string}
   */
  getVersion () {
    return this.version
  }

  /**
   * 初始化
   */
  _init () {
    this.threeGroup = new THREE.Group()
    this.textureLoader = new THREE.TextureLoader()
    this.threeVector3 = new THREE.Vector3()
    this.planeBuffer = new THREE.PlaneBufferGeometry(1, 1)
    this.sphereBuffer = new THREE.SphereBufferGeometry(1, 32, 32)
    this.meshLambert = new THREE.MeshLambertMaterial({
      color: 16711935,
      side:
      THREE.FrontSide,
      shading:
      THREE.SmoothShading
    })
    this.ring = new THREE.RingGeometry(1, 1.2, 64)
    this.mesh = new THREE.Mesh(new THREE.RingGeometry(1, 1.2, 64), new THREE.MeshBasicMaterial({
      color: 16777215,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    }))
    this.threeGroup.add(this.mesh)
    this.threeGroup.add(new TextSprite({
      style: {
        textColor: '#ffff88',
        borderWidth: 0,
        backgroundColor: '#000000'
      }
    }))
    // if (this.options['scope']) {
    //   let scopeFloat = this.options['scope'] / constants.scopeClip
    //   q.rotation.copy(new THREE.Euler(Math.PI / 2, 0, 0))
    //   q.scale.copy(new THREE.Vector3(y * scopeFloat, x * scopeFloat, 1))
    //   q.position.copy(new THREE.Vector3(0, constants.scopeClip * scopeFloat, 0))
    // }
  }

  /**
   * 初始化实例
   * @private
   */
  _initThree () {
    this.textureLoader.crossOrigin = 'anonymous'
    this._scene = new THREE.Scene()
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1e4)
    this.perspectiveCamera.position.set(0, 0, 0)
    this.perspectiveCamera.up.set(0, 1, 0)
    // this.perspectiveCamera.lookAt(new THREE.Vector3(t.x + 0, t.y + 1, t.z + 0))
    this.scene.add(this.perspectiveCamera)
    let r = [
      new THREE.DirectionalLight(16777215, 0.8),
      new THREE.DirectionalLight(16777215, 0.8),
      new THREE.DirectionalLight(16777215, 0.8),
      new THREE.AmbientLight(16777215, 0.8),
      new THREE.PointLight(16777215, 0.8)
    ]
    r[0].position.set(-1, 1, 1)
    r[1].position.set(0, 1, 1)
    r[2].position.set(0, -1, 1)
    this.perspectiveCamera.add(r[0])
    this.perspectiveCamera.add(r[1])
    this._scene.add(r[3])
    this._scene.add(this.threeGroup)
    // g = Tt.scope / b;
    // var t = new THREE.Vector3(0, b * g, 0);
    // var a = new THREE.Euler(Math.PI / 2, 0, 0);
    // var s = new THREE.Vector3(y * g, x * g, 1);
    // q = ne(W, Y, "camgroup", 16777215, null, t, a, s);
    // C.add(W);
    // X = new THREE.Mesh(J, K);
    // K.map = new THREE.Texture;
    // X.scale.set(-Tt.scope, Tt.scope, Tt.scope);
    // var h = new THREE.Vector3(0, -1, 0);
    // X.up.set(0, 0, 1);
    // X.lookAt(h);
    this._webGLRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this._webGLRenderer.setClearColor(this.options['backgroundColor'], 0)
    this._webGLRenderer.setPixelRatio(window.devicePixelRatio)
    this.targetElement.appendChild(this._webGLRenderer.domElement)
    // Events.listen(i, 'contextmenu', Le, this)
    // Events.listen(i, 'touchstart', Pe, this)
    // Events.listen(i, 'mousedown', ze, this)
    // Events.listen(i, 'mouseup', De, this)
    // Events.listen(i, 'mousemove', Ue, this)
    // Events.listen(i, 'mousewheel', Oe, this)
    // Events.listen(document, 'keydown', Ae, this)
  }

  /**
   * 添加方向控制
   * @private
   */
  _addArrowControl () {
    let arrowe = this.textureLoader.load(utils.getRelativePath() + 'static/img/arrow-e.png')
    this._createImage(arrowe)
  }

  /**
   * 创建图片场景
   * @param image
   * @private
   */
  _createImage (image) {
    image.minFilter = THREE.LinearFilter
    image.magFilter = THREE.LinearFilter
    image.generateMipmaps = false
    image.mapping = THREE.UVMapping
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
   * 设置当前测量模式
   * @param mode
   */
  setSampleMode (mode) {
    this.sampleMode = mode
  }

  /**
   * 返回当前测量模式
   * @returns {number|*}
   */
  getSampleMode () {
    return this.sampleMode
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
   * @param coordinates
   * @param type
   */
  locate (coordinates, type) {
    if (this.disContinueFlag) {
      this.dispatch(eventName.LOCATE, LocateState.busy)
    } else {
      this.disContinueFlag = true
      switch (type) {
        case -1:
          let [h, c] = [50, 15]
          ajaxUtils.get(utils.getRelativePath() + 'ppv/php/locate.php', {
            lon: coordinates[0],
            lat: coordinates[1],
            tol: h,
            angle: c
          }).then(res => {
            this.actionLoadTypeGet(res, true)
          }).catch(error => {
            console.warn(error)
          })
          break
        case 0:
          ajaxUtils.post(this.options['server'] + '/GetBranchByCoord', {
            data: {
              type: type,
              x: coordinates[0],
              y: coordinates[1],
              key: this.key
            }
          }).then(res => {
            console.log(res)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
        case 3:
          ajaxUtils.post(this.options['server'] + '/GetBranchByCoord', {
            data: {
              type: type,
              x: coordinates[0],
              y: coordinates[1],
              key: this.key
            }
          }).then(res => {
            this.actionLoadTypeThree(res.d, type, true)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
        case 4:
          ajaxUtils.post(this.options['server'] + '/GetBranchByCoord', {
            data: {
              type: type,
              x: coordinates[0],
              y: coordinates[1],
              key: this.key
            }
          }).then(res => {
            console.log(res)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
      }
    }
  }

  /**
   * 根据id定位实景照片
   * @param type
   * @param id
   */
  locateByID (type, id) {
    if (this.disContinueFlag) {
      this.dispatch(eventName.LOCATE, LocateState.busy)
    } else {
      this.disContinueFlag = true
      switch (type) {
        case -1:
          let [h, c] = [50, 15]
          ajaxUtils.get(utils.getRelativePath() + 'ppv/php/locate_by_id.php', {
            id: id,
            tol: h,
            angle: c
          }).then(res => {
            this.actionLoadTypeGet(res, true)
          }).catch(error => {
            console.warn(error)
          })
          break
        case 0:
          ajaxUtils.post(this.options['server'] + '/GetBranchByCoord', {
            data: {
              type: type,
              id: id,
              step: 1,
              key: this.key
            }
          }).then(res => {
            console.log(res)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
        case 3:
          ajaxUtils.post(this.options['server'] + '/GetBranchByCoord', {
            data: {
              type: type,
              id: id,
              step: 1,
              key: this.key
            }
          }).then(res => {
            console.log(res)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
        case 4:
          ajaxUtils.post(this.options['server'] + '/GetBranchByCoord', {
            data: {
              type: type,
              id: id,
              step: 1,
              key: this.key
            }
          }).then(res => {
            console.log(res)
          }).catch(error => {
            console.warn(error)
            this.disContinueFlag = false
          })
          break
      }
    }
  }

  /**
   * 向前或者向后移动
   * @param step
   */
  step (step) {
    if (this.isPlaying) return
  }

  /**
   * 播放
   */
  play () {
    if (!this.isPlaying) {
      this.dispatch(eventName.TOOL, Tool.play)
      this.isPlaying = true
    }
  }

  /**
   * 暂停
   */
  stop () {
    this.isPlaying = false
    this.dispatch(eventName.TOOL, Tool.play)
  }
}

export default Panorama
