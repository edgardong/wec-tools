class Exception extends Error {

  constructor(msg, errorCode) {
    super()
    this.msg = msg || '服务器未知错误'
    this.code = 200
    this.errorCode = errorCode || 50001
  }
}

module.exports = Exception