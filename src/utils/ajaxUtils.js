/**
 * Created by FDD on 2017/7/31.
 * @desc 请求结构
 */
import * as utils from './utils'

/**
 * 编码
 * @param val
 * @returns {string}
 */
export const encode = (val) => {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * creat req
 * @returns {*}
 */
export const createXMLHttpRequest = function () {
  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else if (window.ActiveXObject) {
    try {
      xhr = new window.ActiveXObject('Msxml2.XMLHTTP')
    } catch (e) {
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
  } else {
    this.container.textContent = 'XHR is not supported, update your browser!'
    return false
  }
  return xhr
}
/**
 * 格式化url
 * @param url
 * @param params
 * @param paramsSerializer
 * @returns {*}
 */
export const buildURL = (url, params, paramsSerializer) => {
  /* eslint no-param-reassign:0 */
  if (!params) {
    return url
  }
  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    let parts = []
    utils.forEach(params, function serialize (val, key) {
      if (val === null || typeof val === 'undefined') {
        return
      }
      if (Array.isArray(val)) {
        key = key + '[]'
      }
      if (!Array.isArray(val)) {
        val = [val]
      }
      utils.forEach(val, function parseValue (v) {
        if (utils.isDate(v)) {
          v = v.toISOString()
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(encode(key) + '=' + encode(v))
      })
    })
    serializedParams = parts.join('&')
  }
  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

/**
 * get 请求
 * @param url
 * @returns {Promise}
 */
export const get = (url, params) => {
  let xhr = createXMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText || xhr.response))
      }
    }
    xhr.onerror = () => {
      reject('Network Error')
      xhr = null
    }
    xhr.ontimeout = () => {
      reject('timeout')
      xhr = null
    }
    xhr.open('GET', url, true)
    xhr.send(null)
  })
}

/**
 * post 请求
 * @param url
 * @param params
 * @returns {Promise}
 */
export const post = (url, params) => {
  let xhr = createXMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText || xhr.response))
      }
    }
    xhr.onerror = () => {
      reject('Network Error')
      xhr = null
    }
    xhr.ontimeout = () => {
      reject('timeout')
      xhr = null
    }
    xhr.open('POST', url, true)
    let _headers = Object.assign({
      'Content-Type': 'application/json;charset=UTF-8'
    }, (params['header'] || {}))
    for (let key in _headers) {
      if (key && _headers[key]) {
        xhr.setRequestHeader(key, _headers[key])
      }
    }
    xhr.send(JSON.stringify(params['data']))
  })
}
