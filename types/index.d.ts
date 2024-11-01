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
  isAdmin: boolean;
};
declare type Post = {
  _id: string;
  userId: string;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  username: string;
};
declare type getPosts = {
  startIndex: string;
  limit: string;
  order: string;
};
declare type EditPost = {
  _id: string;
  userId: string;
  content: string;
  title: string;
  image: string;
  category: string;
};

declare interface UpdateUser {
  username: string;
  email: string;
  profilePicture: string;
  password?: string; // Optional, can be added later
}
declare interface UpdatePost {
  content: string;
  title: string;
  image: string;
  category: string;
}

declare type CreatePost = {
  content: string;
  title: string;
  image: string;
  category: string;
  userId: string;
  username: string;
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

declare type searchFiterParams = {
  searchTerm: string;
  sort: string;
  category: string;
};
