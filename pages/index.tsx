import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { Spin } from "antd";
import Link from "next/link";
import dynamic from "next/dynamic";
import PostList from "@/components/PostList";
import Head from "next/head";

const WelcomeDialog = dynamic(() => import("../components/WelcomeDialog"), {
  ssr: false,
});

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("goRestToken");
    if (!token) {
      setIsDialogVisible(true);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl bg-white p-4 text-black">
      <Head>
        <title>Home | My Blog</title>
        <meta
          name="description"
          content="A blog created with Next.js and GoREST API"
          key="desc"
        />
      </Head>
      <WelcomeDialog
        open={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
      />
      <Link
        href="/create"
        className="rounded-md border border-blue-700 bg-blue-500 px-6 py-2 text-lg font-bold text-white"
      >
        Create New Post
      </Link>
      {isLoading ? (
        <div className="mt-4 flex w-full items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <PostList />
      )}
    </div>
  );
}
