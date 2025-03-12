import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useCreatePost } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/router";
import WelcomeDialog from "@/components/WelcomeDialog";
import Head from "next/head";

export default function CreatePost() {
  const router = useRouter();
  const createPost = useCreatePost();
  const { data: users, isLoading: isLoadingUsers, error } = useUsers();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await createPost.mutateAsync({
        title: values.title,
        body: values.body,
        user_id: values.user_id,
      });

      router.push("/");
    } catch (error: any) {
      message.error(
        error.response?.data?.[0]?.message || "Failed to create a post",
      );
    }
  };

  return (
    <>
      <Head>
        <title>Create Blog</title>
        <meta name="description" content="Create a new blog post" key="desc" />
      </Head>

      <div className="mx-auto max-w-4xl px-2 py-10 lg:px-0">
        <Button onClick={() => router.push("/")} className="mb-4">
          Back
        </Button>
        <h1 className="mb-4 text-xl font-bold">Create new post</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="user_id"
            label="Select User"
            rules={[{ required: true, message: "User is required!" }]}
          >
            <Select loading={isLoadingUsers} placeholder="Select a user">
              {users?.map((user: any) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input placeholder="Masukkan judul post" />
          </Form.Item>

          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: "Content is required!" }]}
          >
            <Input.TextArea rows={4} placeholder="Content of the post" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createPost.isPending}
            >
              Create Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
