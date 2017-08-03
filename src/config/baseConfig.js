/**
 * Created by FDD on 2017/7/28.
 * @desc baseConfig
 */
export const Tool = { // 相关工具
  none: 0,
  measurePoint: 1,
  measureLength: 2,
  measureArea: 3,
  measureZ: 4,
  measureFacade: 5,
  measureAngle: 6,
  measureSlope: 7,
  createPoint: 11,
  createPolyline: 12,
  createPolygon: 13,
  caliplane: 14,
  pick: 21,
  remove: 22,
  fullscreen: 23,
  lrs: 24,
  play: 31,
  stop: 32,
  next: 33,
  prev: 34,
  branch: 35,
  back: 36,
  history: 37
}
export const FullMode = { // 全屏模式
  fill: 1,
  trans: 2,
  clip: 3,
  stretch: 4
}
export const SampleMode = { // 采样模式
  none: 0,
  cloud: 1,
  photo: 2,
  ground: 3,
  plane: 4,
  object: 5,
  depth: 6
}
export const LocateState = { // 加载标识
  success: 0,
  typeError: 1,
  dataError: 2,
  imageError: 3,
  busy: 4
}
export const ControlType = { // 控制类型
  arrow: 0,
  history: 1
}
export const defaultPref = {
  backgroundColor: 0,
  fullView: FullMode.fill,
  enableArrow: true,
  enableHistory: true,
  scope: 100,
  thumb: 'Middle',
  magnifier: {
    size: 256,
    zoom: 5,
    fix: false
  },
  arrows: {
    forward: 5,
    below: 1.8,
    lean: 15
  },
  key: {
    del: 46,
    play: 32,
    fforward: 33,
    fbackward: 34,
    forward: 38,
    backward: 40,
    fullscreen: 120
  },
  label: {
    fontFamily: '微软雅黑',
    fontSize: 15,
    textColor: '#000000',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(0, 0, 0, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
}
export const eventName = {
  LOCATE: 'LOCATE',
  TOOL: 'TOOL'
}
window.Tool = Tool
