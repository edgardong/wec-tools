import koa from 'koa'
export declare class Validator {

  constructor()
  /**
   * 校验规则
   * @param ctx 上下文
   * @param alias 别名
   */
  validate(ctx: koa.Context, alias?: Object): Object
}