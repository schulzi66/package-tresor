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
import { tryInitConfig } from './app/services/file.service';
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
    .description('Register a new user')
    .arguments('[user]')
    .action((name: string) => registerCmd(name));

  cli
    .command('add')
    .description('Add a package to your packstore')
    .arguments('<name>')
    .action((name: string) => addCmd(name));

  cli.parse(process.argv);
})();

// main();

// Account anlegen

// Package(s) hinzufügen

// Package löschen

// Package abfragen

// Package installieren
// export {};
