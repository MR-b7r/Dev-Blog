import Post from "@/components/Post";
import RecentPosts from "@/components/RecentPosts";
import { getPostBySLug } from "@/lib/actions/post.actions";
import React from "react";

const page = async ({ params, searchParams }: SearchParamProps) => {
  const slug = params.postSlug;
  const post = await getPostBySLug(slug!);

  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <Post post={post} />
      <RecentPosts />
    </section>
  );
};

export default page;
