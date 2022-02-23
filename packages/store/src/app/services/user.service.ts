import { User } from '../common/user';
import { randomUUID, createHash } from 'crypto';

const userDb: Array<User> = [];

export const registerUser = async (name: string, password: string): Promise<User> => {
  const foundUser: User | undefined = userDb.find((user: User) => user.name === name);
  if (foundUser) {
    return new Promise((_resolve, reject) => reject('User already defined'));
  } else {
    const newUser: User = {
      id: randomUUID(),
      name: name,
      password: createHash('sha256').update(password).digest('hex'),
    };

    // console.log(newUser.password.digest('hex'));

    userDb.push(newUser);

    console.log(newUser)

    return newUser;
  }
};
