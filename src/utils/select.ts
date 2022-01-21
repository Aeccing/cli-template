import { isNull } from './object';
import inquirer from 'inquirer';

export interface SelectOption<T = string> {
  name: string;
  value: T;
}

/**
 * node 控制台用户选择
 * @param message 提示信息
 * @param options 选项
 * @param defaultValue 默认值
 * @example
 * const value = await select('请选择性别: ', ['男', '女']);
 */
export async function select<T = string>(
  message: string,
  options: SelectOption<T>[] | T[],
  defaultValue?: T,
): Promise<T> {
  const defaultIndex = !isNull(defaultValue) ? options.findIndex((item: SelectOption<T> | T) => {
    if (typeof item === 'object') {
      return (item as SelectOption<T>).value === defaultValue;
    }

    return item === defaultValue;
  }) : null;


  const result = await inquirer.prompt([{
    type: 'list',
    name: 'value',
    message,
    choices: options,
    default: defaultIndex,
  }]);

  return result.value;
}