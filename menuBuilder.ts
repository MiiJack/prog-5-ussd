import { IMenu } from "./ussd";

export function buildMenuStructureFromArray(menus: IMenu[]): IMenu {
  if (!menus || menus.length === 0) {
    throw new Error("Menu array cannot be empty");
  }
  
  let mainMenu: IMenu | undefined;
  
  // Find the main menu (without parent)
  for (const menu of menus) {
    if (!menu.parent) {
      mainMenu = menu;
      break;
    }
  }
  
  if (!mainMenu) {
    throw new Error("No main menu found (menu without parent)");
  }

  // Connect all submenus to their parents
  for (const menu of menus) {
    if (menu.parent && menu !== mainMenu) {
      menu.parent.addSubMenu(menu);
    }
  }
  
  return mainMenu;
}