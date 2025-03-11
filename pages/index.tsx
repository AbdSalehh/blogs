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
    <div className="bg-white max-w-4xl mx-auto p-4 text-black">
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
      <Link href="/create" className="font-bold py-6 px-2 text-lg rounded-md">
        Create New Post
      </Link>
      {isLoading ? <Spin size="large" /> : <PostList />}
    </div>
  );
}
