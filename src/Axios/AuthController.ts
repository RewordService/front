import axios from 'axios';
import { SubmitHandler } from 'react-hook-form';
import { ISignInFormValues, ISignUpFormValues, IUser } from '../interfaces';

export const Sign = (
  data: SubmitHandler<ISignInFormValues> | SubmitHandler<ISignUpFormValues>,
  url: '/api/auth/sign_in' | '/api/auth'
): Promise<any> =>
  axios
    .post(url, data)
    .then((res: { data: { data: IUser } }) =>
      localStorage.setItem('sign', JSON.stringify(res))
    )
    .catch((err) => console.log(err));

export const StorageDelete = (): void => {
  localStorage.removeItem('sign');
  window.history.pushState('', '', '/');
  window.location.reload();
};

export const SignOut = (): void => {
  axios.delete('/api/auth/sign_out').catch((err) => console.log(err));
  StorageDelete();
};
