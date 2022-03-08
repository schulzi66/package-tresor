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
      password: createPasswordHash(password),
    };

    userDb.push(newUser);

    console.log(newUser);

    return newUser;
  }
};

export const loginUser = async (name: string, password: string): Promise<User> => {
  const foundUser: User | undefined = userDb.find((user: User) => user.name === name && user.password === createPasswordHash(password));
  if (foundUser) {
    return foundUser;
  } else {
    return new Promise((_resolve, reject) => reject('Username or password not correct'));
  }
};

const createPasswordHash = (password: string): string => createHash('sha256').update(password).digest('hex');
