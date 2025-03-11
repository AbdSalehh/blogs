import { useRouter } from "next/router";
import { usePostDetail } from "../../hooks/usePosts";
import { Button, Card, Spin } from "antd";
import Head from "next/head";

export default function PostDetail() {
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
        <Button onClick={() => router.push("/")} className="mb-4">
          Back
        </Button>
        <Card title={post.title}>
          <p>{post.body}</p>
          <p>
            <strong>Author ID:</strong> {post.user_id}
          </p>
        </Card>
      </div>
    </>
  );
}
