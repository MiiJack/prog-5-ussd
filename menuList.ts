import { buildMenuStructureFromArray } from "./menuBuilder";
import { IMenu, Menu } from "./ussd";

export function buildMenuStructure(): IMenu {
  const mainMenu = new Menu(
    "Main Menu",
    "0",
    undefined,
    "Welcome to Orange's USSD Service"
  );

  const rechargeMenu = new Menu(
    "Recharger",
    "1",
    mainMenu
  );

  const achatMenu = new Menu(
    "Achats de Forfait",
    "2",
    mainMenu
  );

  const serviceMenu = new Menu(
    "Services",
    "3", 
    mainMenu
  );

  const compteMenu = new Menu(
    "Mon Compte",
    "4",
    mainMenu
  );

  const rechargeCarteGratter = new Menu(
    "Par carte à gratter",
    "1",
    rechargeMenu
  );

  const lanyCredit = new Menu(
    "Lany Credit",
    "2",
    rechargeMenu
  );

  const be = new Menu(
    "Be (Appels/SMS/Internet)",
    "1",
    achatMenu
  );

  const beConnect = new Menu(
    "Be Connect (Internet)",
    "2",
    achatMenu
  );

  const appelSMS = new Menu(
    "Appels & SMS",
    "3", 
    achatMenu
  );

  const phoneMoi = new Menu(
    "Enovyer un Phone Moi",
    "1",
    serviceMenu
  );

  const partageCredit = new Menu(
    "Partager mon Crédit",
    "2",
    serviceMenu
  );

  const partageForfait = new Menu(
    "Partager mon Forfait SMS",
    "3",
    serviceMenu
  );

  const kalaza = new Menu(
    "KALAZA",
    "4",
    serviceMenu
  );

  const orangeMoney = new Menu(
    "Orange Money",
    "5",
    serviceMenu
  );

  const offreActuelle = new Menu(
    "Mon Offre Actuelle",
    "1",
    compteMenu
  );

  const numeroFamille = new Menu(
    "Numéros de Famille",
    "2",
    compteMenu
  );

  const changerLangue = new Menu(
    "Changer de Langue",
    "3",
    compteMenu
  );

  const allMenus = [
    mainMenu,
    rechargeMenu,
    achatMenu,
    serviceMenu,
    compteMenu,
    rechargeCarteGratter,
    lanyCredit,
    be,
    beConnect,
    appelSMS,
    phoneMoi,
    partageCredit,
    partageForfait,
    kalaza,
    orangeMoney,
    offreActuelle,
    numeroFamille,
    changerLangue
  ];

  return buildMenuStructureFromArray(allMenus);
}