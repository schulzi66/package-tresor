import fetch from 'node-fetch';
import { User } from './models/user.model';

export const createUser = async (userName: string, password: string): Promise<User> => {
  const response = await fetch('http://localhost:7000/api/auth/register', {
    method: 'post',
    body: JSON.stringify({ name: userName, password: password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const user: User = JSON.parse(await response.text());

  return user;
};

export const addPackage = async (userName: string, packageName: string): Promise<boolean> => {
  const response = await fetch('http://localhost:7000/api/store', {
    method: 'post',
    body: JSON.stringify({ userName, packageName }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = (await response.json()) as boolean;
  console.log(data);

  return data;
};
