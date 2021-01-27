/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import TokenHeaders from './TokenHeaders';
import { CurrentUser } from './UsersController';
import { SignOut } from './AuthController';
import { IUser } from '../interfaces';

export const GamePost = (num: number, string: string): void => {
  const ordinal = [
    '',
    '',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
  ];
  const data = {
    [ordinal[num] + string]: 1,
    user_id: CurrentUser(),
  };

  axios.post('/rewords', data, TokenHeaders()).catch((err) => {
    console.log(err);
    SignOut();
  });
};

export const GameIndex = (): Promise<IUser> =>
  axios.get('/rewords').then((res) => res.data);
