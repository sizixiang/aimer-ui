const lib = {
  /**
   * 对于任何数据进行一次深拷贝
   * 包括特殊对象以及undefined跟null
  */
  deepClone: (data) => {
    // 判断是否对象
    const isObject = lib.isObject(data)
    // 判断是否数组
    const isArray = lib.isArray(data)
    // 定义类型
    instanceof Object
    let define = isArray
    ? []
    : isObject
    ? {}
    : lib.isDate(data)
    ? new Date(data)
    : lib.isRegExp(data)
    ? new RegExp(data)
    : lib.isFunction(data)
    ? new Function('return ' + data)
    : data
    // 数组/对象下,进行遍历/递归生成新数据
    if (isArray) {
      let eq = 0
      let len = data.length
      for (;eq < len; eq++) {
        define.push(lib.deepClone(data[eq]))
      }
    } else if (isObject) {
      for (let i in data) {
        // 防止原型进行污染
        if (data.hasOwnProperty(i)) {
          define[i] = lib.deepClone(data[i])
        }
      }
    }
    return define
  },
  /**
   * 判断是否类型为对象
  */
  isObject: (value) => judgeType(value) === 'Object',
  /**
   * 判断是否类型为数组
  */
  isArray: (value) => judgeType(value) === 'Array',
  /**
   * 判断是否类型为undefined
  */
  isUndefined: (value) => judgeType(value) === 'Undefined',
  /**
   * 判断是否类型为null
  */
  isNull: (value) => judgeType(value) === 'Null',
  /**
   * 判断是否类型为函数
  */
  isFunction: (value) => judgeType(value) === 'Function',
  /**
   * 判断是否类型为日期对象
  */
  isDate: (value) => judgeType(value) === 'Date',
  /**
   * 判断是否类型为字符串
  */
  isString: (value) => judgeType(value) === 'String',
  /**
   * 判断是否类型为symbol
  */
  isSymbol: (value) => judgeType(value) === 'Symbol',
  /**
   * 判断是否类型为数字
  */
  isNumber: (value) => judgeType(value) === 'Number',
  /**
   * 判断是否类型为整数
  */
  isBigInt: (value) => judgeType(value) === 'BigInt',
  /**
   * 判断是否类型为布尔值
  */
  isBoolean: (value) => judgeType(value) === 'Boolean',
  /**
   * 判断是否类型为正则
  */
  isRegExp: (value) => judgeType(value) === 'RegExp',
  /**
   * 判断是否为空(除了0之外, null/undefined/''/NaN/false都为空)
  */
  isEmpty: (value) => {
    let flag
    if (lib.isObject(value)) {
      for (let i in value) {
        if (i) { flag = true }
      }
    } else if (lib.isArray(value)) {
      if (value.length) flag = true
    } else if (value === 0) {
      flag = true
    } else {
      flag = Boolean(value)
    }
    return flag
  }
}
/**
 * 返回判断
*/
const judgeType = (single) => toString.call(single).slice(8, -1)

export default lib
