import { loginUser } from '../services/api.service';
import { isUserConfiguredLocally, writeConfig } from '../services/file.service';
import { User } from '../models/user.model';
import { askName, askPassword, askOverrideConfiguredUser } from '../services/input.service';

export const loginCmd = async (name: string | undefined): Promise<void> => {
  if (await isUserConfiguredLocally()) {
    if (!(await askOverrideConfiguredUser())) {
      return;
    }

    name = undefined;
  }

  if (!name) {
    name = await askName();
  }

  const pwd = await askPassword();

  await loginUser(name!, pwd!)
    .then((user: User) => {
      writeConfig({ user: user });
      console.log('TODO LOGIN Success: Improve output login', user);
    })
    .catch((error) => {
      console.error('TODO IMPROVE Login error', error);
    });
};
