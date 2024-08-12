/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  __v: number;
};

declare type SignUpParams = {
  username: string;
  email: string;
  password: string;
};
declare type SignInParams = {
  email: string;
  password: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};
