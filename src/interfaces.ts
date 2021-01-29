/* eslint-disable camelcase */
export interface ISign {
  data: { data: IUser };
  headers: ITokenHeaders;
}
export interface IRewords {
  [key: string]: number;
  total: number;
}
export interface ITokenHeaders {
  ['content-type']: string;
  accesstoken: string; // TODO: change accesstoken to access-token
  client: string;
  uid: string;
}

export interface IUser {
  ['allow_password_change']?: false;
  ['birth_year']?: string;
  email?: string;
  id?: number;
  image?: { url: string };
  intro?: string; // TODO: change intro to introduce
  memberstatus?: boolean;
  name: string;
  nickname?: string;
  sex?: boolean; // TODO: chenge sex to gender & change boolean to number
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

export interface ISignResponse {
  data: IUser;
  headers: ITokenHeaders;
}

export interface IErrorSignInResponse {
  errors: string[];
}
export interface IErrorSignOutResponse {
  errors: string[];
}

export interface IErrorSignUpResponse {
  errors: { ['full_messages']: string[] };
}
