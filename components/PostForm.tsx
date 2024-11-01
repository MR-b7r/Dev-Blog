"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { postForm } from "@/lib/utils";
import { createNewPost, getPost, updatePost } from "@/lib/actions/post.actions";
import { FileUploader } from "./FileUploader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function PostForm({
  type,
  postId,
  post,
}: {
  type: "edit" | "create";
  postId?: string;
  post?: Post;
}) {
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = postForm();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: type === "edit" && post?.title,
      category: type === "edit" && post?.category,
      content: type === "create" ? "Type about something new!" : post?.content,
      image:
        type === "create"
          ? "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
          : post?.image,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "create") {
        setIsLoading(true);
        const userId = currentUser?._id;
        const username = currentUser?.username;
        const newData = { ...data, userId, username };
        const newPost = await createNewPost(newData);
        toast.success(`Blug is created succesfully`);
        router.push("/dashboard?tab=posts");
      }
      if (type === "edit") {
        setIsLoading(true);
        const updateData = {
          _id: postId!,
          userId: currentUser?._id!,
          category: data.category,
          title: data.title,
          content: data.content,
          image: data?.image,
        };
        const editPost = await updatePost(updateData);
        toast.success(`Blug is Edited succesfully`);
        router.push("/dashboard?tab=posts");
      }
    } catch (error: any) {
      toast.error(`Something went wrong, make sure all fields are valid`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormControl>
                <Input
                  className="flex-1 text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-500 placeholder:text-gray-500 dark:text-white dark:border-gray-200 dark:placeholder:text-gray-300 focus-visible:ring-blue-400 dark:bg-gray-700 focus:border-none"
                  type="text"
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="reactjs">React.js</SelectItem>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  type="post"
                  imageUrl={field.value}
                />
              </FormControl>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormControl>
              <ReactQuill theme="snow" className="h-72 mb-12" {...field} />
            </FormControl>
          )}
        />

        <Button
          type="submit"
          className="text-16 rounded-lg logo-gradient font-semibold text-white"
        >
          {type === "create" ? "Publish" : "Update"}
        </Button>
      </form>
    </Form>
  );
}
