/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import TokenHeaders from './TokenHeaders';
import { CurrentUser } from './UsersController';
import { AuthDelete } from './AuthAction';

export function GamePost(num, string, redirect) {
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

  axios.post('/rewords', data, TokenHeaders()).catch((error) => {
    AuthDelete();
  });
}

let data;
export async function GameIndex() {
  await axios.get('/rewords').then((res) => {
    data = res.data;
  });
  return data;
}
