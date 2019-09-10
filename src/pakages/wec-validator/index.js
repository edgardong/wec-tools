const WecRule = require('../rule')
const WecException = require('../exception')
const validator = require('validator')

// 方法名前缀
const prefix = 'validate'
/**
 * 验证器类
 */
class WecValidator {

  constructor() {
    this.validators = {
      vals: [],
      funs: []
    }
    // 数据集合
    this.data = {}
    // 错误信息对象集合
    this.errors = {}
  }

  /**
   * 校验所有的参数
   * @param {Object} ctx 需要校验的对象上下文
   * @param {Object} alias 别名
   */
  async validate(ctx, alias) {
    // 获取所有参数,组成一个集合
    this.data = Object.assign(ctx.request.header, ctx.params, ctx.request.query, ctx.request.body)
    // 所有的自定义验证方法
    this.validators.funs = this.getAllMethodNames(this)
    // 所有的自定义属性
    this.validators.vals = this.getAllProperties(this)
    // 处理校验
    await this.handleCheck()

    if (Object.keys(this.errors).length > 0) {
      throw new WecException(this.errors, 40004)
    }
    return this.data
  }

  /**
   * 处理验证
   */
  async handleCheck() {
    let _this = this
    let vals = this.validators.vals
    if (vals.length > 0) {
      vals.forEach(key => {
        // 获取到rules
        let rules = _this[key] // 获取所有需要验证的规则
        let ruleValue = _this.data[key] //获取该字段的输入值
        let defaultValue = ''
        let isOptional = rules[0].valiateFunction === 'isOptional'
        if (isOptional) {
          defaultValue = rules[0].options
          rules.splice(0, 1)
          if (ruleValue !== null && ruleValue !== undefined && ruleValue !== '') {
            rules.forEach(rule => {
              if (!validator[rule.valiateFunction](ruleValue, rule.options)) {
                _this.setErrors(key, rule.msg)
              } else if (rule.valiateFunction == 'isInt') {
                _this.data[key] = parseInt(ruleValue)
              }
            })
          } else {
            _this.data[key] = defaultValue
          }
        } else {
          if (ruleValue === null || ruleValue === undefined || ruleValue === '') {
            _this.setErrors(key, ruleValue + '不能为空')
          } else {
            rules.forEach(rule => {
              if (!validator[rule.valiateFunction](ruleValue, rule.options)) {
                _this.setErrors(key, rule.msg)
              }
            })
          }
        }
      })
    }

    // 校验所有的自定义校验方法
    let funs = this.validators.funs
    if (funs.length > 0) {
      funs.forEach(fun => {
        let key = fun.replace(prefix, '')
        try {
          this[fun](_this.data)
        } catch (error) {
          _this.setErrors(key, error.message)
        }
      })
    }
  }

  /**
   * 设置错误信息
   * @param {String} key 错误字段
   * @param {String} msg 错误信息
   */
  setErrors(key, msg) {
    if (!this.errors[key]) {
      this.errors[key] = [msg]
    } else {
      this.errors[key].push(msg)
    }
  }

  /**
   * 获取对象下所有需要验证的属性
   * @param {Object} obj 实例对象
   */
  getAllProperties(obj) {
    let keys = Object.keys(obj)
    return keys.filter(k => {
      let key = this[k]
      if (key instanceof Array) {
        if (key.length == 0) {
          return false
        } else {
          for (const it of key) {
            if (!(it instanceof WecRule)) {
              throw new Error('Every item must be a instance of WecRule');
            }
          }
          return true;
        }
      } else {
        return key instanceof WecRule
      }
    })
  }

  /**
   * 获取某个实例类的所有方法
   * @param {Object} obj 实例类对象
   */
  getAllMethodNames(obj) {
    let methods = new Set();
    while ((obj = Reflect.getPrototypeOf(obj))) {
      let keys = Reflect.ownKeys(obj);
      keys.forEach(k => methods.add(k));
    }
    let keys = Array.from(methods.values());
    keys = keys.filter(k => {
      return k.startsWith(prefix) && k !== prefix
    })
    return keys
  }

}

module.exports = WecValidator