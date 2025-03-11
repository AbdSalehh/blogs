import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { Card, Spin } from "antd";
import Link from "next/link";
import dynamic from "next/dynamic";
import PostList from "@/components/PostList";

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
    <div className="bg-white">
      <WelcomeDialog
        open={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
      />
      <Link href="/create">Create New Post</Link>
      {isLoading ? <Spin size="large" /> : <PostList />}
    </div>
  );
}
