import fetch from 'node-fetch';
import { handleInvalidApiStatus } from './input.service';
import { User } from '../models/user.model';

export const createUser = async (userName: string, password: string): Promise<User | undefined> => {
  try {
    const response = await fetch('http://localhost:7000/api/auth/register', {
      method: 'post',
      body: JSON.stringify({ name: userName, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      handleInvalidApiStatus(response);

      return;
    }

    const user: User = JSON.parse(await response.text());

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPackage = async (userId: string, packageName: string): Promise<boolean | undefined> => {
  try {
    const response = await fetch('http://localhost:7000/api/store', {
      method: 'post',
      body: JSON.stringify({ userId, packageName }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      handleInvalidApiStatus(response);

      return;
    }

    const data = (await response.json()) as boolean;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
