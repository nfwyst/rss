import * as sha1 from 'sha1';
import { MenuItem, TMenu } from '../interfaces/menu';

export default class Menu implements TMenu {
  constructor(private ns: string) {}
  /**
   * 私有方法, 保存菜单数据到 localStorage
   */
  private save(): void {
    localStorage.setItem(this.ns, JSON.stringify(this.items));
  }
  items: Array<MenuItem> = [];
  clear(): void {
    this.items = [];
    this.save();
  }
  remove(url: string): Array<MenuItem> {
    this.items = this.items.filter(item => item.url !== url);
    this.save();
    return this.items;
  }
  add(url: string, title: string): Array<MenuItem> {
    // 根据 url 生成 id
    const id = <string>sha1(url);
    this.items.push({id, url, title});
    this.save();
    return this.items;
  }
  load(index: number): MenuItem {
    this.items = JSON.parse(localStorage.getItem(this.ns) || '[]');
    return this.items[index];
  }
}
