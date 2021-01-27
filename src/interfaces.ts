export interface ISign {
  data: { data: IUser };
  headers: ITokenHeaders;
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
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export interface ISignUpFormValues extends ISignInFormValues {
  name: string;
  passwordConfirmation: string;
}
