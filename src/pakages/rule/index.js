class Rule {
  /**
   * 构造函数
   * @param {String} valiateFunction 验证方式
   * @param {String} errorMessage 错误信息
   * @param {Object} options 其他选项
   */
  constructor(valiateFunction, errorMessage, options) {
    this.valiateFunction = valiateFunction
    this.msg = errorMessage
    this.options = options
  }
}

module.exports = Rule