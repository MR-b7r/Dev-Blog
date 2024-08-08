"use server";
import bcryptjs from "bcryptjs";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user.model";
import { handleError, parseStringify } from "../utils";
import jwt from "jsonwebtoken";

export const signUp = async (user: SignUpParams) => {
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

export const signIn = async (user: SignInParams) => {
  try {
    await connectMongo();
    const { email, password } = user;
    const getUser = await User.findOne({ email });
    if (!getUser)
      return console.error(
        "cannot get the user. Email or Password is incorrect"
      );

    const validPassword = bcryptjs.compareSync(password, getUser.password);
    if (!validPassword)
      return console.error(
        "cannot get the user. Email or Password is incorrect"
      );

    // const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECTRET, {
    //   expiresIn: "7d",
    // });
    // localStorage.setItem("token", token);
    return parseStringify(getUser);
  } catch (error) {
    handleError(error);
  }
};
