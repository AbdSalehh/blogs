import { useRouter } from "next/router";
import { usePostDetail } from "../../hooks/usePosts";
import { Button, Card, Spin } from "antd";
import Head from "next/head";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: post, isLoading } = usePostDetail(id);

  if (isLoading)
    return (
      <div className="mt-10 flex w-full items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body} key="desc" />
      </Head>
      <div className="mx-auto max-w-4xl px-2 py-10 lg:px-0">
        <Button onClick={() => router.push("/")} className="mb-4">
          Back
        </Button>
        <Card title={post.title}>
          <p>{post.body}</p>
          <p className="mt-2">
            <strong>Author ID:</strong> {post.user_id}
          </p>
        </Card>
      </div>
    </>
  );
}
