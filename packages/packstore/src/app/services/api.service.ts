import fetch from 'node-fetch';
import { handleInvalidApiStatus } from './input.service';
import { User } from '../models/user.model';

export const createUser = async (userName: string, password: string): Promise<User> => {
  try {
    const response = await fetch('http://localhost:7000/api/auth/register', {
      method: 'post',
      body: JSON.stringify({ name: userName, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return Promise.reject(await handleInvalidApiStatus(response));
    }

    const user: User = JSON.parse(await response.text());

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const loginUser = async (userName: string, password: string): Promise<User> => {
  try {
    const response = await fetch('http://localhost:7000/api/auth/login', {
      method: 'post',
      body: JSON.stringify({ name: userName, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return Promise.reject(await handleInvalidApiStatus(response));
    }

    const user: User = JSON.parse(await response.text());

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPackage = async (userId: string, packageName: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:7000/api/store', {
      method: 'post',
      body: JSON.stringify({ userId, packageName }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return Promise.reject(await handleInvalidApiStatus(response));
    }

    const data = (await response.json()) as boolean;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const listPackages = async (userId: string): Promise<string[]> => {
  try {
    const url = `http://localhost:7000/api/store?${new URLSearchParams({ userId })}`;
    const response = await fetch(url);

    if (!response.ok) {
      return Promise.reject(await handleInvalidApiStatus(response));
    }

    const data = (await response.json()) as string[];

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
