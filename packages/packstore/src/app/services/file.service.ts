import { Store } from '../models/store.model';
import { handleUserNotInitialized } from './input.service';
import { loginCmd } from '../commands/login.command';
import { registerCmd } from '../commands/register.command';
import Conf, { Schema } from 'conf';

const schema: Schema<Store> = {
  user: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
};

export const Config = new Conf({ schema });

export const readConfigAndValidate = async (): Promise<Store | never> => {
  let store: Store = Config.store;
  if (store.user?.id) {
    return store;
  } else {
    const choice = await handleUserNotInitialized();

    if (choice === 'Login') {
      await loginCmd(undefined);
    } else if (choice === 'Register') {
      await registerCmd(undefined);
    }

    store = Config.store;

    return store.user?.id ? store : process.exit();
  }
};

export const writeConfig = (data: Store): void => {
  if (data) {
    Config.store = data;
  } else {
    console.log('PLEASE DEBUG ME');
  }
};

export const isUserConfiguredLocally = async (): Promise<boolean> => {
  const store: Store = Config.store;

  return store.user?.id !== undefined && store.user?.name !== undefined && store.user?.password !== undefined;
};
