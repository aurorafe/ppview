/**
 * Created by FDD on 2017/7/31.
 * @desc 工具类
 */
import URLSearchParams from 'url-search-params'
/**
 * 合并对象
 * @returns {{}}
 */
export const merge = (/* obj1, obj2, obj3, ... */) => {
  let result = {}
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val)
    } else {
      result[key] = val
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue)
  }
  return result
}
/**
 * 转换查询数据
 * @param data
 * @param headers
 * @param fns
 * @returns {*}
 */
export const transformData = (data, headers, fns) => {
  /*eslint no-param-reassign:0*/
  forEach(fns, function transform(fn) {
    data = fn(data, headers)
  })
  return data
}
/**
 * 构造trim方法
 * @param str
 */
export const trim = (str) => {
  return str.replace(/^\s*/, '').replace(/\s*$/, '')
}
/**
 * 构造ForEach方法，es6(for...of可进行对象迭代)
 * @param obj
 * @param fn
 */
export const forEach = (obj, fn) => {
  if (obj === null || typeof obj === 'undefined') {
    return
  }
  if (typeof obj !== 'object' && !Array.isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj]
  }
  if (Array.isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}

/**
 * 判断是否是时间类型
 * @param val
 * @returns {boolean}
 */
export const isDate = (val) => {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断是否是对象
 * @param val
 * @returns {boolean}
 */
export const isObject = (val) => {
  return val !== null && typeof val === 'object';
}

export const isURLSearchParams = (val) => {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}