# Simple USSD Simulator

A basic USSD app simulator built in TypeScript, allowing you to navigate a menu structure via the command line.

## Prerequisites

Before running this app, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [TypeScript](https://www.typescriptlang.org/) (installed globally or via your project)
- [Bun](https://bun.sh/) (optional, alternative package manager)

## Installation

You can install dependencies using either:

```bash
bun install
```

or

```bash
npm install
```

## Build & Run

Compile the TypeScript code:

```bash
npx tsc
```

This generates JavaScript files from your TypeScript source.

Run the compiled JavaScript:

```bash
node index.js
```

## Usage

Follow the on-screen prompts to enter your choice for each menu option:

- Enter the code shown next to each menu item to navigate
- Enter 'b' to go back to the previous menu
- Enter 'm' to return to the main menu
- Enter 'x' to exit the app

## Code Structure

- **ussd.ts**: Defines the Menu and USSDService classes for menu logic and USSD session management.
- **menuList.ts**: Builds the menu structure and hierarchy.
- **menuBuilder.ts**: Connects menus and assembles the full menu tree.
- **index.ts**: Entry point that runs the USSD app.

## Notes

- The session times out after 30 seconds of inactivity.
- You can customize menus by editing menuList.ts and menuBuilder.ts.
