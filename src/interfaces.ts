export interface IUser {
  id: number;
  name: string;
  image?: {url: string};
  createdDate?: string;
  intro?: string;
  rewords?: [{total: number}];
}
