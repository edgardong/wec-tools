###  简介

``wec-tools`` 是基于[koa2](https://koa.bootcss.com/)和[kou-router](https://github.com/ZijianHe/koa-router#readme)开发的工具类，目前包含验证器模块（WecValidator），用于API参数校验

![](https://img.shields.io/badge/node-%3E%3D%20v6.10.2-brightgreen)

![](https://img.shields.io/badge/npm-%3E%3D%20v6.10.3-brightgreen)

![](https://img.shields.io/npm/v/npm?label=npm)


### 快速开始

```` bash
  npm install wec-tools
````

#### 使用说明

###### 校验器（WecValidator）使用方法
校验器基于[validator.js](https://github.com/validatorjs/validator.js)做校验

validator.js
````javascript
  import {WecValidator, WecRule, WecException} from 'wec-tools'

  class PositiveIntegerValidator extends WecValidator {
  constructor() {
    super()

    // 属性校验器
    this.id = [
      new WecRule('isInt', 'id需要为正整数', {
        min: 1
      })
    ]
  }

  // 自定义校验器
  validatePassword(vals) {
    const pass1 = vals.password1
    const pass2 = vals.password2

    if (pass1 !== pass2) {
      throw new Error('两个密码必须相同')
    } else {
      return true
    }
  }
}
````

###### 注意
> - 自定义属性需要写在构造函数中，且必须为数组，数组的每一项必须为 `WecRule` 实例对象
> - 自定义方法必须以 `validate` 开头,接收一个参数对象，为所有API请求传入的所有参数（包括header、path、query及body中的参数）


router.js
````javascript
  import {PositiveIntegerValidator} from './validators/validate.js'

  const params = await new PositiveIntegerValidator().validate(ctx)
````

Tips
> - 校验成功会返回API请求的所有参数，在parmas中
> - 校验失败会自动抛出 `WecException` 异常

> - 修改lCalender插件, 位于`src`目录下

#### lisence
MIT
