"use server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user.model";
import { handleError, parseStringify } from "../utils";
import { auth, signIn, signOut } from "../auth";
import { redirect } from "next/navigation";

export const userSignUp = async (user: SignUpParams) => {
  try {
    await connectMongo();

    const { username, email, password } = user;
    const hashedPassword = bcryptjs.hashSync(password, 8);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return parseStringify(newUser);
  } catch (error) {
    handleError(error);
  }
};

export const userSignIn = async (user: SignInParams, auth = false) => {
  try {
    await connectMongo();
    const { email, password } = user;
    const getUser = await User.findOne({ email });
    if (!getUser)
      return console.error(
        "cannot get the user. Email or Password is incorrect"
      );

    if (!auth) {
      const validPassword = bcryptjs.compareSync(password, getUser.password);
      if (!validPassword)
        return console.error(
          "cannot get the user. Email or Password is incorrect"
        );
    }

    // const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECTRET, {
    //   expiresIn: "7d",
    // });
    // localStorage.setItem("token", token);

    return parseStringify(getUser);
  } catch (error) {
    handleError(error);
  }
};
export const userSignOut = async () => {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
};

export const signDatabaseViaGoogle = async (email: string) => {
  try {
    await connectMongo();

    const getUser = await User.findOne({ email });
    if (!getUser) return console.error("Error with your Google account");
    console.log(getUser);
    return parseStringify(getUser);
  } catch (error) {
    console.error(error);
  }
};

export const google = async () => {
  try {
    await signIn("google", { redirect: true });
    const session = await auth();
    console.log(session?.user);
    const response = await signDatabaseViaGoogle(session?.user?.email);
    console.log(response);

    return parseStringify(response);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user: User) => {
  try {
    await connectMongo();
    const { username, email, password, profilePicture } = user;
    const newUser: UpdateUser = {
      username,
      email,
      profilePicture,
    };
    if (user && user._id) {
      const checkUser = await User.findById(user._id!);
      if (!checkUser) return;
      if (password !== undefined || password) {
        const hashedPassword = bcryptjs.hashSync(password, 8);
        newUser.password = hashedPassword;
      }
    }
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: newUser,
      },
      { new: true }
    );
    return parseStringify(updateUser);
  } catch (error) {
    handleError(error);
  }
};
export const deleteUser = async (user: User) => {
  try {
    // && user.isAdmin
    if (user && user?._id) {
      const deletedUser = await User.findByIdAndDelete(user._id!);
      redirect("/");
    }
  } catch (error) {
    handleError(error);
  }
};
