import { useState } from "react";
import { Input, Card, Spin, Pagination, Modal } from "antd";
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

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action cannot be undone.",
      onOk: () => deletePost.mutate(id),
    });
  };

  return (
    <div className="mt-5">
      <Input
        placeholder="Search posts by title"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      {isLoading ? (
        <div className="mt-4 flex w-full items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 text-red-200 sm:grid-cols-2">
            {posts.data?.map((post: any) => (
              <Card
                key={post.id}
                title={post.title}
                className="relative mb-3 flex-col justify-between gap-3"
              >
                <p className="pb-5">{post.body}</p>
                <div className="absolute bottom-2 right-0 flex items-end justify-end gap-4">
                  <Link
                    className="rounded-md px-4 py-1 font-medium text-blue-500"
                    href={`/post/${post.id}`}
                  >
                    Read More
                  </Link>
                  <Link
                    className="rounded-md px-4 py-1 font-medium text-orange-500"
                    href={`/edit/${post.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="rounded-md px-4 py-1 font-medium text-red-500"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
          <Pagination
            current={page}
            pageSize={perPage}
            onChange={(p) => handlePageChange(p)}
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
