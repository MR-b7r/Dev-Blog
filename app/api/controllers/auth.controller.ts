import connectMongo from "@/lib/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const signup = async (req: { body: any }, res: any) => {
  await connectMongo();
  console.log(req.body);
  try {
    const user = await User.find({});
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
