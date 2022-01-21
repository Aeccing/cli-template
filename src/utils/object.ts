// 对象的判断方法

/**
 * 判断对象是否为空 (null | undefined | obj)
 * @param obj
 */
export function isNull(obj: any) {
  return obj === null || obj === undefined || obj === '';
}
