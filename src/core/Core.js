import {LocateState, eventName} from '../config/baseConfig'
import {getRelativePath} from '../utils/utils'
class Core {
  /**
   * 第三种类型加载方式
   * @param data
   * @param flag
   */
  actionLoadTypeThree (data, type, flag) {
    if (!data) {
      this.dispatch(eventName.LOCATE, LocateState.dataError)
      this.disContinueFlag = false
      console.warn(data)
    } else {
      if (typeof data !== 'object') {
        data = JSON.parse(data)
      }
      if (data) {
        let curDate = data['Currentframe']
        if (!curDate) {
          this.dispatch(eventName.LOCATE, LocateState.dataError)
          this.disContinueFlag = false
          console.warn(data)
        } else {
          let picUrl = curDate['Pictureurl']
          let _index = picUrl.lastIndexOf('/')
          let _serverUrl = picUrl.substr(0, _index) + '/' + this.options['thumb'] + picUrl.substr(_index)
          this._loadPic(_serverUrl, picUrl, data, type, flag)
        }
      }
    }
  }

  /**
   * get方式加载数据
   * @param data
   * @param flag
   */
  actionLoadTypeGet (data, flag) {
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
      } else {
        let thumb = getRelativePath + 'ppv/train/' + curDate.train + '/images/' + this.options['thumb'] + '/' + curDate.image
        let train = getRelativePath + 'ppv/train/' + curDate.train + '/images/' + curDate.image
        this._loadPic(thumb, train, this.Ge, data, flag)
      }
    }
  }

  /**
   * we
   * @param _serverUrl
   * @param picUrl
   * @param data
   * @param type
   * @param flag
   * @constructor
   */
  _loadPic (_serverUrl, picUrl, data, type, flag) {
    switch (type) {
      case -1:
        this.loadType = data['cur']['type']
        break
      case 0:
        this.loadType = data['Currentframe']['Type']
        break
      case 3:
        this.loadType = 2
        break
      case 4:
        this.loadType = 1
        break
    }
    // url, onLoad, onProgress, onError
    this.textureLoader.load(_serverUrl, function (t) {
      console.log(t)
      // var e = q.material.map;
      // if (s === 1) {
      //   e = X.material.map;
      //   this.threeGroup.children = []
      //   this.threeGroup.add(X)
      // } else {
      //   this.threeGroup.children = []
      //   this.threeGroup.add(q)
      // }
      // e.image = t.image
      // e.needsUpdate = true
      // n(r, a)
    }, null)
  }

  // ne (t, e, i, n, r, a, o, s) {
  //   var h = new THREE.MeshBasicMaterial({
  //     color: 16777215,
  //     transparent: true,
  //     alphaTest: .1,
  //     side: THREE.DoubleSide,
  //     shading: THREE.SmoothShading
  //   })
  //   if (r == null) {
  //     h.map = new THREE.Texture
  //   } else if (r instanceof String) {
  //     h.map = E.load(r)
  //   } else if (r instanceof THREE.Texture) {
  //     h.map = r
  //   }
  //   rt(h.map)
  //   if (n != null) {
  //     h.color.setHex(n)
  //   }
  //   var c = new THREE.Mesh(e, h);
  //   c.currentHex = h.color.getHex();
  //   if (i != null) c.name = i;
  //   if (o != null) c.rotation.copy(o);
  //   if (s != null) c.scale.copy(s);
  //   if (a != null) c.position.copy(a);
  //   t.add(c);
  //   return c
  // }
}

export default Core
