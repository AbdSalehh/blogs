import { useState, useEffect } from "react";
import { Input, Card, Spin, Pagination, Flex, Layout, Modal } from "antd";
import { useDeletePost, usePosts } from "../hooks/usePosts";
import Link from "next/link";
import debounce from "lodash.debounce";

const PostList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const deletePost = useDeletePost();
  const perPage = 10;

  const { data: posts, isLoading } = usePosts(searchTerm, page, perPage);

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 500);

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action cannot be undone.",
      onOk: () => deletePost.mutate(id),
    });
  };

  return (
    <div>
      <Input
        placeholder="Search posts by title"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 text-red-200">
            {posts.data?.map((post: any) => (
              <Card
                key={post.id}
                title={post.title}
                style={{ marginBottom: 10 }}
              >
                <p>{post.body}</p>
                <Link href={`/post/${post.id}`}>Read More</Link>
                <Link href={`/edit/${post.id}`}>Edit</Link>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </Card>
            ))}
          </div>
          <Pagination
            current={page}
            pageSize={perPage}
            onChange={(p) => setPage(p)}
            total={posts.meta.pagination.total}
            showSizeChanger={false}
            style={{ marginTop: 20 }}
          />
        </>
      )}
    </div>
  );
};

export default PostList;
