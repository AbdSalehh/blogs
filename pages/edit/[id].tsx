import { useRouter } from "next/router";
import { usePostDetail } from "../../hooks/usePosts";
import PostForm from "../../components/PostForm";
import { Button, Spin } from "antd";
import Head from "next/head";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const { data: post, isLoading } = usePostDetail(id);

  if (isLoading) return <Spin size="large" />;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body} key="desc" />
      </Head>
      <div className="max-w-4xl mx-auto py-10">
        <Button onClick={() => router.push("/")} style={{ marginBottom: 10 }}>
          Back
        </Button>
        <h1 className="font-bold">Edit Post</h1>
        <PostForm post={post} />
      </div>
    </>
  );
}
