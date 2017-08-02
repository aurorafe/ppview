import {LocateState, eventName} from '../config/baseConfig'
class Core {
  actionLoadTypeGet (data, flag) {
    d = null;
    if (!data) {
      this.dispatch(eventName.LOCATE, LocateState.dataError)
      this.disContinueFlag = false
      console.warn(data)
    } else {
      let curDate = data['cur']
      if (!curDate) {
        this.dispatch(eventName.LOCATE, LocateState.dataError)
        this.disContinueFlag = false
        console.warn(data)
      }
    }
    d = r;
    var o = w + "ppv/train/" + a.train + "/images/" + Tt.thumb + "/" + a.image;
    var s = w + "ppv/train/" + a.train + "/images/" + a.image;
    We(o, s, Ge, r, flag)
  }
}

export default Core
