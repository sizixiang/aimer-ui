
  /**
   * 对于任何数据进行一次深拷贝
   * 包括特殊对象以及undefined跟null
  */
  export const deepClone = (data) => {
    // 判断是否对象
    const isObject = isObject(data)
    // 判断是否数组
    const isArray = isArray(data)
    // 定义类型
    instanceof Object
    let define = isArray
    ? []
    : isObject
    ? {}
    : isDate(data)
    ? new Date(data)
    : isRegExp(data)
    ? new RegExp(data)
    : isFunction(data)
    ? new Function('return ' + data)
    : data
    // 数组/对象下,进行遍历/递归生成新数据
    if (isArray) {
      let eq = 0
      let len = data.length
      for (;eq < len; eq++) {
        define.push(deepClone(data[eq]))
      }
    } else if (isObject) {
      for (let i in data) {
        define[i] = deepClone(data[i])
      }
    }
    return define
  }
  /**
   * 判断是否类型为对象
  */
  export const isObject = (value) => judgeType(value) === 'Object'
  /**
   * 判断是否类型为数组
  */
  export const isArray = (value) => judgeType(value) === 'Array'
  /**
   * 判断是否类型为undefined
  */
  export const isUndefined = (value) => judgeType(value) === 'Undefined'
  /**
   * 判断是否类型为null
  */
  export const isNull = (value) => judgeType(value) === 'Null'
  /**
   * 判断是否类型为函数
  */
  export const isFunction = (value) => judgeType(value) === 'Function'
  /**
   * 判断是否类型为日期对象
  */
  export const isDate = (value) => judgeType(value) === 'Date'
  /**
   * 判断是否类型为字符串
  */
  export const isString = (value) => judgeType(value) === 'String'
  /**
   * 判断是否类型为symbol
  */
  export const isSymbol = (value) => judgeType(value) === 'Symbol'
  /**
   * 判断是否类型为数字
  */
  export const isNumber = (value) => judgeType(value) === 'Number'
  /**
   * 判断是否类型为整数
  */
  export const isBigInt = (value) => judgeType(value) === 'BigInt'
  /**
   * 判断是否类型为布尔值
  */
  export const isBoolean = (value) => judgeType(value) === 'Boolean'
  /**
   * 判断是否类型为正则
  */
  export const isRegExp = (value) => judgeType(value) === 'RegExp'
  /**
   * 判断是否为空(除了0之外, null/undefined/''/NaN/false都为空)
  */
  export const isEmpty = (value) => {
    let flag
    if (isObject(value)) {
      for (let i in value) {
        if (i) { flag = true }
      }
    } else if (isArray(value)) {
      if (value.length) flag = true
    } else if (value === 0) {
      flag = true
    } else {
      flag = Boolean(value)
    }
    return flag
  }

/**
 * 生成随机安全数
 * @param { Number } len 生成随机数个数
 */
export const generatingRandom = (len = 1) => {
  const hash = new Uint32Array(len);
  window.crypto.getRandomValues(hash);
  return hash
}
/**
 * 返回判断
*/
const judgeType = (single) => toString.call(single).slice(8, -1)
