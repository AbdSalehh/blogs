import { useRouter } from "next/router";
import { usePostDetail } from "../../hooks/usePosts";
import PostForm from "../../components/PostForm";
import { Spin } from "antd";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const { data: post, isLoading } = usePostDetail(id);

  if (isLoading) return <Spin size="large" />;

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
