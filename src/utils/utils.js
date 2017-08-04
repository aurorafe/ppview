/**
 * Created by FDD on 2017/7/31.
 * @desc 工具类
 */
import URLSearchParams from 'url-search-params'

/**
 * 获取两数值之间的随机值
 * @param t1 <下限>
 * @param t2 <上限>
 * @param t3 <需要保留的小数位, 不能大于十五位>
 * @returns {*}
 */
export const getrandom = (t1, t2, t3) => {
  if (!t1 || isNaN(t1)) {
    t1 = 0
  }
  if (!t2 || isNaN(t2)) {
    t2 = 1
  }
  if (!t3 || isNaN(t3)) {
    t3 = 0
  }
  t3 = t3 > 15 ? 15 : t3
  let [ra, du] = [(Math.random() * (t2 - t1) + t1), (Math.pow(10, t3))]
  ra = (Math.round(ra * du) / du)
  return ra
}

/**
 * 获取id
 * @returns {*|string|!Array.<T>}
 */
export const getuuid = () => {
  let [ s, hexDigits ] = [ [], '0123456789abcdef' ]
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return (s.join(''))
}

/**
 * 添加标识
 * @param obj
 * @returns {*}
 */
export const stamp = function (obj) {
  let key = '_p_id_'
  obj[key] = obj[key] || (getuuid())
  return obj[key]
}

/**
 * 去除字符串前后空格
 * @param str
 * @returns {*}
 */
export const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
}

/**
 * 将类名截取成数组
 * @param str
 * @returns {Array|*}
 */
export const splitWords = (str) => {
  return trim(str).split(/\s+/)
}

/**
 * 首字母大写(其他小写)
 * @param str
 * @returns {string}
 */
export const firstUpperToCase = (str) => {
  return (str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))
}
/**
 * 只转换第一个字母
 * @param str
 */
export const upperFirstChart = str => {
  return (str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))
}

/**
 * 合并对象
 * @returns {{}}
 */
export const merge = (/* obj1, obj2, obj3, ... */) => {
  let result = {}
  function assignValue (val, key) {
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
  /* eslint no-param-reassign:0 */
  forEach(fns, function transform (fn) {
    data = fn(data, headers)
  })
  return data
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
    /* eslint no-param-reassign:0 */
    obj = [obj]
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      /* eslint no-useless-call: 0 */
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        /* eslint no-useless-call: 0 */
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
  return val !== null && typeof val === 'object'
}

export const isURLSearchParams = (val) => {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * 获取静态资源相对路径
 * @returns {string}
 */
export const getRelativePath = () => {
  let [scripts, path] = [document.scripts, '']
  scripts = Array.prototype.slice.call(scripts, 0)
  if (scripts && scripts.length > 0) {
    scripts.every(scr => {
      if (scr['src']) {
        let index_ = scr['src'].toLowerCase().indexOf('panorama.')
        if (index_ >= 0) {
          path = scr['src'].substring(0, index_)
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    })
  }
  return path
}
