// 菜单项接口
export interface MenuItem {
  url: string,
  title: string,
  id: string,
}

// 菜单接口
export interface TMenu {
  // 菜单的所有菜单项
  items: Array<MenuItem>;
  // 清除方法
  clear(): void;
  // 删除菜单项
  remove(url: string): Array<MenuItem>;
  // 添加菜单项
  add(url: string, title: string): Array<MenuItem>;
  // 初始化从 localStorage 加载
  load(index: number): MenuItem;
}
