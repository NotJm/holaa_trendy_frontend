export interface IUser {
  username: string;
  email: string;
  password: string;
  phone: string;
}
export interface IUserAddress {
  address: string;
  postCode: string;
  state: string;
  municipality: string;
  town: string;
  colony: string;
  description: string;
}

export type IUserCredentials = Omit<IUser, 'email'>;
export type IUserEmail = Omit<IUser, 'username' | 'password' | 'phone'>;
export type IUserWithoutUsername = Omit<IUser, 'username'>;
export type IUserWithAvatar = Omit<IUser, 'phone' | 'password'> & Partial<{ avatar: string }>;
