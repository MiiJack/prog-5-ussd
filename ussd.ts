import * as readline from 'readline';

export interface IMenu {
  name: string;
  ussdCode: string;
  description?: string;
  parent?: IMenu;
  subMenus: IMenu[];
  addSubMenu(menu: IMenu): void;
  getNavigationOptions(): string;
}

export class Menu implements IMenu {
  public subMenus: IMenu[] = [];

  constructor(
    public name: string,
    public ussdCode: string,
    public parent?: IMenu,
    public description?: string,
  ) {}

   addSubMenu(menu: IMenu): void {
    this.subMenus.push(menu);
   }
  getNavigationOptions(): string {
    let options = `\nOptions:`;
    
    if (this.subMenus.length > 0) {
      options += `\n`;
      this.subMenus.forEach(menu => {
        options += `- Enter '${menu.ussdCode}' for ${menu.name}\n`;
      });
    }
    
    if (this.parent) {
      options += `- Enter 'b' to go back to ${this.parent.name}\n`;
    }
    
    options += `- Enter 'm' to return to Main Menu\n`;
    options += `- Enter 'x' to exit the app`;
    
    return options;
  }
}

export interface IUSSDService {
  send(ussdCode?: string): Promise<void>;
  cancel(): Promise<void>;
  exit(): Promise<void>;
}

export class USSDService implements IUSSDService {
  private currentMenu: IMenu;
  private mainMenu: IMenu;
  private rl: readline.Interface;
  private active: boolean = true;

  constructor(mainMenu: IMenu) {
    this.mainMenu = mainMenu;
    this.currentMenu = mainMenu;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async send(ussdCode?: string): Promise<void> {
    if (!this.active) return;
    
    if (ussdCode) {
      this.processCode(ussdCode);
      return;
    }

    try {
      this.displayCurrentMenu();
      
      const input = await this.getUserInput("\nEnter your choice: ");
      this.processCode(input);
    } catch (error) {
      console.error("Error processing menu:", error);
      this.exit();
    }
  }

  private displayCurrentMenu(): void {
    console.log(`\n== ${this.currentMenu.name} ==`);
    if (this.currentMenu.description) {
      console.log(this.currentMenu.description);
    }
    console.log(this.currentMenu.getNavigationOptions());
  }

  private processCode(code: string): void {
    if (code === 'x') {
      this.exit();
      return;
    }
  
    if (code === 'm') {
      this.currentMenu = this.mainMenu;
      this.send();
      return;
    }
    
    if (code === 'b') {
      if (this.currentMenu.parent) {
        this.currentMenu = this.currentMenu.parent;
      }
      this.send();
      return;
    }
    
    const targetMenu = this.currentMenu.subMenus.find(menu => menu.ussdCode === code);
    
    if (targetMenu) {
      this.currentMenu = targetMenu;
      this.send();
    } else {
      console.log("Invalid option. Please try again.");
      this.send();
    }
  }

  private getUserInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, (input) => {
        resolve(input.trim());
      });
    });
  }

  async cancel(): Promise<void> {
    console.log("USSD session cancelled.");
    this.currentMenu = this.mainMenu;
    this.send();
  }

  async exit(): Promise<void> {
    console.log("Exiting USSD application. Goodbye!");
    this.rl.close();
    this.active = false;
  }
}