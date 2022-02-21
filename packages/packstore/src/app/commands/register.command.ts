import { createUser } from '../api.service';
import { writeConfig } from '../file.service';
import { User } from '../models/user.model';
import { askName, askPassword } from './../input.service';

export const registerCmd = async (name: string | undefined, pwd: string | undefined) => {
  if (!name) {
    name = await askName();
  }

  if (!pwd) {
    pwd = await askPassword();
  }

  const user: User = await createUser(name!, pwd!);


  console.log(user);
  writeConfig({ user: user });
};
