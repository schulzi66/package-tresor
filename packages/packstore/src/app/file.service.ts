import fs from 'fs';
import { Store } from './models/store.model';

const fileDescriptor = 'store.json';

export const tryInitConfig = async (): Promise<void> => {
  if (!(await fileExistsInCwd())) {
    writeConfig();
  }
};

export const readConfig = async (): Promise<Store> => {
  let store: Store = {};

  fs.readFile(fileDescriptor, 'utf8', (err, data) => {
    if (err) throw err;
    store = JSON.parse(data);
  });

  return store;
};

const fileExistsInCwd = async (): Promise<boolean> => {
  return new Promise((r) => fs.access(`${process.cwd()}/${fileDescriptor}`, fs.constants.F_OK | fs.constants.W_OK, (e) => r(!e)));
};

export const writeConfig = async (data?: Store | undefined): Promise<void> => {
  fs.writeFile(fileDescriptor, JSON.stringify(data ?? {}), 'utf8', (err) => console.error(err));
};
