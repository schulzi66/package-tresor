import { createUser } from '../services/api.service';
import { isUserConfiguredLocally, writeConfig } from '../services/file.service';
import { User } from '../models/user.model';
import { askName, askPassword, askOverrideConfiguredUser } from '../services/input.service';

export const registerCmd = async (name: string | undefined): Promise<void> => {
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

  await createUser(name!, pwd!)
    .then((user: User) => {
      writeConfig({ user: user });
      console.log('TODO: Improve output', user);
    })
    .catch((error) => console.log(error));
};
