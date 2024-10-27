import { PostForm } from "@/components/PostForm";
import React from "react";

const page = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Blug</h1>
      <PostForm type="create" />
    </div>
  );
};

export default page;
