/**
 * Created by FDD on 2017/7/28.
 * @desc RotControl
 */
import * as Events from '../events/Events'
const RotControl = function (PerspectiveCamera, element) {
  this.PerspectiveCamera = PerspectiveCamera
  this.element = element
  this.PerspectiveCamera.target = new THREE.Vector3(0, 0, 0)
  this.isMouseDown = false
  this.enabled = false
  this.radius = Math.PI * 3 / 4
  this.offsetX = 0
  this.offsetY = 0
  Events.listen(element, 'mousemove', this.onMouseMove, this)
  Events.listen(element, 'mousedown', this.onMouseDown, this)
  Events.listen(element, 'mouseup', this.onMouseUp, this)
}
/**
 * 响应视角变化
 * @param PerspectiveCamera
 */
RotControl.prototype.onRot = function (PerspectiveCamera) {
}
/**
 * 鼠标移到事件
 * @param event
 */
RotControl.prototype.onMouseMove = function (event) {
  let [right, height] = [event.offsetX - this.offsetX, event.offsetY - this.offsetY]
  this.offsetX = event.offsetX
  this.offsetY = event.offsetY
  if (this.enabled === false) return
  if (event.buttons === 0) return
  if (!this.isMouseDown) return
  let c = .02 * this.PerspectiveCamera.fov * right / this.element.clientHeight
  let l = .02 * this.PerspectiveCamera.fov * height / this.element.clientHeight
  let u = this.PerspectiveCamera.getWorldDirection()
  let p = new THREE.Vector3(0, 0, 1)
  let d = new THREE.Vector3
  d.crossVectors(u, p)
  d.normalize()
  let f = new THREE.Quaternion
  f.setFromAxisAngle(d, l)
  let m = new THREE.Quaternion
  m.setFromAxisAngle(p, c)
  let v = new THREE.Vector3
  v.copy(u);
  v.applyQuaternion(f)
  if (Math.abs(v.z) < .9) u.applyQuaternion(f)
  u.applyQuaternion(m)
  let g = this.PerspectiveCamera.position
  let y = new THREE.Vector3
  y.addVectors(g, u)
  this.PerspectiveCamera.up.set(0, 0, 1)
  this.PerspectiveCamera.lookAt(y)
  let x = Math.atan2(u.x, u.y) * 180 / Math.PI
  let b = this.PerspectiveCamera.fov
  let M = Math.atan(Math.tan(b / 2) * this.PerspectiveCamera.aspect) * 2 * 180 / Math.PI
  let _ = {
    heading: x, 
    fovx: M
  }
  this.onRot(_)
}
/**
 * 鼠标按下事件
 */
RotControl.prototype.onMouseDown = function () {
  this.isMouseDown = true
}
/**
 * 鼠标抬起事件
 */
RotControl.prototype.onMouseUp = function () {
  this.isMouseDown = false
}
/**
 * 取消事件绑定
 * @param element
 */
RotControl.prototype.dispose = function (element) {
  Events.unlisten(element, 'mousemove', this.onMouseMove, this)
  Events.unlisten(element, 'mousedown', this.onMouseDown, this)
  Events.unlisten(element, 'mouseup', this.onMouseUp, this)
}
export default RotControl