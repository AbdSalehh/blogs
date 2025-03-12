import { Button } from "antd";
import { useRouter } from "next/router";
import Head from "next/head";
import PostForm from "@/components/PostForm";

export default function CreatePost() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create Blog</title>
        <meta name="description" content="Create a new blog post" key="desc" />
      </Head>

      <div className="mx-auto max-w-4xl px-2 py-10 lg:px-0">
        <Button onClick={() => router.push("/")} className="mb-4">
          Back
        </Button>
        <h1 className="mb-4 text-xl font-bold">Create new post</h1>
        <PostForm />
      </div>
    </>
  );
}
