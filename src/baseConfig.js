/**
 * Created by FDD on 2017/7/28.
 * @desc baseConfig
 */
export const Tool = {
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
};
export const FullMode = {fill: 1, trans: 2, clip: 3, stretch: 4};
export const SampleMode = {none: 0, cloud: 1, photo: 2, ground: 3, plane: 4, object: 5, depth: 6};
export const LocateState = {success: 0, typeError: 1, dataError: 2, imageError: 3, busy: 4};
export const ControlType = {arrow: 0, history: 1};
window.Tool = Tool