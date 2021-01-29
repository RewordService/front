import axios from 'axios';

export const StorageDelete = (): void => {
  localStorage.removeItem('sign');
  window.history.pushState('', '', '/');
  window.location.reload();
};

export const SignOut = (): void => {
  axios.delete('/api/auth/sign_out').catch((err) => console.log(err));
  StorageDelete();
};
