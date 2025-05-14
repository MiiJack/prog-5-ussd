import { USSDService } from './ussd';
import { buildMenuStructure } from './menuList';

async function runUSSDApp() {
  const mainMenu = buildMenuStructure();
  const ussdService = new USSDService(mainMenu);
  await ussdService.send();
}
runUSSDApp();