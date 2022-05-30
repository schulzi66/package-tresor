#!/usr/bin/env node

import { addCmd } from './app/commands/add.command';
import { registerCmd } from './app/commands/register.command';
import { Command } from 'commander';
import { loginCmd } from './app/commands/login.command';
import { listCmd } from './app/commands/list.command';
import { Config } from './app/services/file.service';
import { removeCmd } from './app/commands/remove.command';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBJRD-qjhtcWldBH_-RHiUL6S3aAPq_OC4',
    authDomain: 'packstore-api.firebaseapp.com',
    projectId: 'packstore-api',
    storageBucket: 'packstore-api.appspot.com',
    messagingSenderId: '289680057422',
    appId: '1:289680057422:web:11991338dcc1e896144f1f',
    measurementId: 'G-MR60SPER49',
  };

const cli = new Command();

(async () => {
  cli.description('Easily store and install your favourite packages without remembering them.');
  cli.name('packstore');
  cli.usage('<command>');
  cli.addHelpCommand(false);
  cli.helpOption(false);

  initializeApp(firebaseConfig);

  cli.command('reset', { hidden: true }).action(() => Config.clear());

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

  cli
    .command('remove')
    .description('Remove a package from your packstore')
    .argument('<name>')
    .action((name: string) => removeCmd(name));

  cli
    .command('list')
    .description('Lists your stored packages')
    .action(() => listCmd());

  cli.parse(process.argv);
})();

// main();

// Account anlegen

// Package(s) hinzufügen

// Package löschen

// Package abfragen

// Package installieren
// export {};
