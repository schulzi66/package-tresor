import fs from 'fs';
import { Store } from '../models/store.model';
import path from 'path';

const fileDescriptor = 'packstore.json';
const packagePathDescriptor = 'packstore';
let configDirPath: string;

export const tryInitConfig = async (): Promise<void> => {
  configDirPath = getConfigDir();
  createConfigDirIfNotExists();

  if (!(await configExistsInConfigDir())) {
    writeConfig();
  }
};

export const readConfig = (): Store => {
  const rawData: string = fs.readFileSync(getConfigPath(), 'utf8');
  const store: Store = JSON.parse(rawData === '' ? '{}' : rawData);

  return store;
};

export const writeConfig = (data?: Store | undefined): void => {
  fs.writeFileSync(getConfigPath(), JSON.stringify(data ?? {}, null, 2), 'utf8');
};

export const isUserConfiguredLocally = async (): Promise<boolean> => {
  const store: Store = readConfig();

  return store.user?.id !== undefined && store.user?.name !== undefined && store.user?.password !== undefined;
};

const configExistsInConfigDir = async (): Promise<boolean> => {
  return new Promise((r) => fs.access(getConfigPath(), fs.constants.F_OK | fs.constants.W_OK, (e) => r(!e)));
};

const createConfigDirIfNotExists = (): void => {
  if (!fs.existsSync(configDirPath)) {
    fs.mkdirSync(configDirPath, { recursive: true });
  }
};

const getConfigDir = (): string => {
  const platform = process.platform;
  const homeDir = process.env[platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  let configDir;

  if (platform === 'win32') {
    configDir = path.join(homeDir!, 'AppData/Roaming', packagePathDescriptor);
  } else {
    configDir = path.join(homeDir!, '.', packagePathDescriptor);
  }

  return configDir;
};

const getConfigPath = (): string => {
  return `${configDirPath}/${fileDescriptor}`;
};
