/* eslint-disable camelcase */
export interface ISign {
  data: { data: IUser };
  headers: ITokenHeaders;
}
export interface IRewords {
  [key: string]: number;
}
export interface ITokenHeaders {
  ['content-type']: string;
  accesstoken: string;
  client: string;
  uid: string;
}

export interface IUser {
  ['allow_password_change']: false;
  ['birth_year']?: string;
  email: string;
  id: number;
  image?: { url: string };
  intro?: string;
  memberstatus: boolean;
  name: string;
  nickname?: string;
  sex?: boolean;
  ['created_date']?: string;
  rewords?: [IRewords];
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export interface ISignUpFormValues extends ISignInFormValues {
  name: string;
  passwordConfirmation: string;
}
