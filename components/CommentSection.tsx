"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authFormSchema, commentschema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import CustomForm from "./CustomForm";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const CommentSection = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    error: errorMessage,
    currentUser,
  } = useAppSelector((state) => state.user);

  const router = useRouter();
  const formSchema = commentschema();
  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
    } catch (error: any) {
    } finally {
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="profile Photo"
          />
          <Link
            href={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-center"
        >
          <CustomForm
            control={form.control}
            name="comment"
            placeholder="Add a comment..."
          />

          <div className="flex justify-between items-center gap-3">
            <p className="text-gray-500 text-xs">200 characters remaining</p>
            <Button
              disabled={loading}
              type="submit"
              className="text-14 rounded-lg logo-gradient  text-white "
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentSection;
