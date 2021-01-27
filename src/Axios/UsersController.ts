/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import TokenHeaders from './TokenHeaders';
import { SignOut } from './AuthController';
import { ISign, IUser } from '../interfaces';

/* helper */
export const CurrentUser = (): number =>
  (JSON.parse(localStorage.sign) as ISign).data.data.id;

export const IsSignedIn = (): boolean => !!localStorage.getItem('sign');

/* index */
export const Users = (search: string): Promise<IUser[]> =>
  axios
    .get('/users', { params: { name_cont: search } })
    .then((res) => res.data);

/* new users */
export const newUsers = (): Promise<IUser[]> =>
  axios.get('/users/new_users').then((res) => res.data);

/* total users */
export const totalUsers = (): Promise<IUser[]> =>
  axios.get('/users/total_users').then((res) => res.data);

/* show */
export const UserInfo = (id: number): Promise<IUser> => {
  if (IsSignedIn()) {
    /* if loggedin , add header */
    return axios
      .get(`/users/${id}`, TokenHeaders())
      .then((res) => res.data)
      .catch((err) => {
        SignOut();
        console.log(err);
      });
  }
  /* unless loggedin,header none */
  return axios
    .get(`/users/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      SignOut();
      console.log(err);
    });
};

/* patch */
export const UserPatch = (data): Promise<IUser> =>
  axios
    .patch('api/auth', data, TokenHeaders())
    .then((res) => res.data)
    .catch((err) => {
      SignOut();
      console.log(err);
    });

/* password patch */
export const PasswordPatch = (data): void => {
  axios.put('/api/auth/password', data, TokenHeaders()).catch((err) => {
    SignOut();
    console.log(err);
  });
};

/* delete */
export const UserDelete = (): void => {
  axios.delete('/cards', TokenHeaders()).catch((err) => console.log(err));
  axios.delete('/api/auth', TokenHeaders()).catch((err) => console.log(err));
  SignOut();
};
