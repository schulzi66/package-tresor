#!/usr/bin/env node

import { addCmd } from './app/commands/add.command';
import { registerCmd } from './app/commands/register.command';
// import { createUser } from './app/api.service';

// import chalk from 'chalk';
// import inquirer from 'inquirer';
// import gradient from 'gradient-string';
// import chalkAnimation from 'chalk-animation';
// import figlet from 'figlet';
// import { createSpinner } from 'nanospinner';
import { Command } from 'commander';
import { tryInitConfig } from './app/file.service';
const cli = new Command();

(async () => {
  await tryInitConfig();

  cli.description('Store and easily install your favourite packages without remembering them.');
  cli.name('packstore');
  cli.usage('<command>');
  cli.addHelpCommand(false);
  cli.helpOption(false);

  cli
    .command('register')
    .description('Registers a new user')
    .arguments('[user] [pwd]')
    .action((name: string, pwd: string) => registerCmd(name, pwd));

  cli
    .command('add')
    .description('Add a package to your packstore')
    .arguments('<name>')
    .action((name: string) => addCmd(name));

  cli.parse(process.argv);

  // console.log(process.argv);

  //   await initCli();
  //   parseArgumentsIntoOptions(process.argv);

  //   const name = await askName();
  //   const password = await askPassword();

  //   await createUser(name, password);
})();

// main();

// Account anlegen

// Package(s) hinzufügen

// Package löschen

// Package abfragen

// Package installieren
// export {};
