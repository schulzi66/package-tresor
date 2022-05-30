import fetch, { Headers } from 'node-fetch';
import { handleInvalidApiStatus } from './input.service';
import { User } from '../models/user.model';
import { Config } from './file.service';
import { Auth, connectAuthEmulator, createUserWithEmailAndPassword, getAuth, indexedDBLocalPersistence, setPersistence, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

const createHeaders = (withAuth = true): Headers => {
  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (withAuth) {
    headers.append('Auth', JSON.stringify(Config.get('user')));
  }

  return headers;
};

export const createUser = async (userName: string, password: string): Promise<any> => {
//   try {
      const auth: Auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost:9099');

      const credentials: UserCredential = await createUserWithEmailAndPassword(auth, userName, password);

      return credentials.user;
    //    signInWithEmailAndPassword(auth, userName, password).then((user: UserCredential) => {
    //        console.log(user);
    //    });
    //   setPersistence(auth, indexedDBLocalPersistence).then(() => {
    //       return  signInWithEmailAndPassword(auth, userName, password);
    //   });



//     const response = await fetch('http://localhost:7000/api/auth/register', {
//       method: 'post',
//       body: JSON.stringify({ name: userName, password: password }),
//       headers: createHeaders(false),
//     });

//     if (!response.ok) {
//       return Promise.reject(await handleInvalidApiStatus(response));
//     }

//     const user: User = JSON.parse(await response.text());

//     return user;
//   } catch (error) {
//     return Promise.reject(error);
//   }
};

export const loginUser = async (userName: string, password: string): Promise<User> => {
  try {
    const response = await fetch('http://localhost:7000/api/auth/login', {
      method: 'post',
      body: JSON.stringify({ name: userName, password: password }),
      headers: createHeaders(false),
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
      headers: createHeaders(),
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

export const removePackage = async (userId: string, packageName: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:7000/api/store', {
      method: 'delete',
      body: JSON.stringify({ userId, packageName }),
      headers: createHeaders(),
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
    const response = await fetch(url, { method: 'get', headers: createHeaders() });

    if (!response.ok) {
      return Promise.reject(await handleInvalidApiStatus(response));
    }

    const data = (await response.json()) as string[];

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
