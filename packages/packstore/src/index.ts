#!/usr/bin/env node

import { addCmd } from './app/commands/add.command';
import { registerCmd } from './app/commands/register.command';
// import { createUser } from './app/api.service';

import { Command } from 'commander';
import { tryInitConfig } from './app/services/file.service';
import { loginCmd } from './app/commands/login.command';
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
    .argument('[name]')
    .action((name: string) => registerCmd(name));

  cli
    .command('login')
    .description('Login with an existing user')
    .argument('[name]')
    .action((name: string) => loginCmd(name));

  cli
    .command('add')
    .description('Add a package to your packstore')
    .argument('<name>')
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
