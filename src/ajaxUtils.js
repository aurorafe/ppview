/**
 * Created by FDD on 2017/7/31.
 * @desc 请求结构
 */
import * as utils from './utils'
export const encode = (val) => {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

export const createXMLHttpRequest = function () {
  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject('Msxml2.XMLHTTP')
    } catch (e) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
  } else {
    this.container.textContent = 'XHR is not supported, update your browser!'
    return false
  }
  return xhr
}

export const buildURL = (url, params, paramsSerializer) => {
  /*eslint no-param-reassign:0*/
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
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return
      }
      if (Array.isArray(val)) {
        key = key + '[]'
      }
      if (!Array.isArray(val)) {
        val = [val]
      }
      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
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
export const get = (url) => {
  let xhr = createXMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject('error')
      }
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
        resolve(xhr.responseText)
      } else {
        reject('error')
      }
    }
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.setRequestHeader('contentType', 'text/html;charset=uft-8') // 指定发送的编码
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');  // 设置请求头信息
    xhr.open('POST', url, true)
    xhr.send(null)
  })
}