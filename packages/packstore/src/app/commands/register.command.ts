import { createUser } from '../services/api.service';
import { isUserRegisteredLocally, writeConfig } from '../services/file.service';
import { User } from '../models/user.model';
import { askName, askPassword, askOverrideRegisteredUser } from '../services/input.service';

export const registerCmd = async (name: string | undefined): Promise<void> => {
  if (await isUserRegisteredLocally()) {
    if (!(await askOverrideRegisteredUser())) {
      return;
    }

    name = undefined;
  }

  if (!name) {
    name = await askName();
  }

  const pwd = await askPassword();
  await createUser(name!, pwd!)
    .then((user: User | undefined) => {
      writeConfig({ user: user });
      console.log('TODO: Improve output');
    })
    .catch((error) => console.log(error));
};
