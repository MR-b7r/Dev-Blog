"use server";
import bcryptjs from "bcryptjs";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user.model";
import { handleError, parseStringify } from "../utils";
import jwt from "jsonwebtoken";
import { auth, signIn, signOut } from "../auth";
import { persistor } from "../store";

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

export const google = async () => {
  try {
    await signIn("google", { redirect: false });
    const session = await auth();
    const response = await userSignIn(
      {
        email: session?.user?.email!,
        password: session?.user?.password,
      },
      true
    );
    return parseStringify(response);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user: User) => {
  try {
    await connectMongo();
    const { username, email, password, profilePicture } = user;
    const newUser = {
      username,
      email,
      password,
      profilePicture,
    };
    if (user && user._id) {
      const checkUser = await User.findById(user._id!);
      if (!checkUser) return;
      if (password !== null || password) {
        const hashedPassword = bcryptjs.hashSync(password, 8);
        newUser.password = hashedPassword;
      }
      if (username) {
        const customizeUsername = username
          .split(" ")
          .join("")
          .toLocaleLowerCase();
        if (!customizeUsername.match(/^[a-zA-Z0-9]+$/))
          throw new Error("username is not valid");
        newUser.username = customizeUsername;
      }
    }
    console.log(newUser);
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
    }
  } catch (error) {
    handleError(error);
  }
};
