import { useRouter } from "next/router";
import { usePostDetail } from "../../hooks/usePosts";
import { Card, Spin } from "antd";
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
      <Card title={post.title}>
        <p>{post.body}</p>
        <p>
          <strong>Author ID:</strong> {post.user_id}
        </p>
      </Card>
    </>
  );
}
