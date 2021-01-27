/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export async function AuthPost(data, url) {
  let result;
  await axios
    .post(url, data)
    .then((res) => {
      console.log(res);
      localStorage.setItem('Reword', JSON.stringify(res));
      window.history.pushState('', '', '/');
      window.location.reload();
    })
    .catch((err) => {
      if (url === '/api/auth') result = err.response.data.errors.full_messages;
      if (url === '/api/auth/sign_in') result = err.response.data.errors;
    });
  return result;
}

export async function AuthDelete() {
  axios.delete('/api/auth/sign_out');
  StorageDelete();
}

export function StorageDelete() {
  localStorage.removeItem('Reword');
  window.history.pushState('', '', '/');
  window.location.reload();
}
