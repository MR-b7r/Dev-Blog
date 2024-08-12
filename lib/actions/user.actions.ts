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
    await signIn("google", { redirect: true });
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
