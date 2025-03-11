import { useState, useEffect } from "react";
import { Input, Button, Form, message } from "antd";
import { useCreatePost, useUpdatePost } from "../hooks/usePosts";
import { useRouter } from "next/router";

type Post = {
  id: number;
  title: string;
  body: string;
};

const PostForm = ({ post }: { post?: Post }) => {
  const [form] = Form.useForm();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const router = useRouter();

  useEffect(() => {
    if (post) {
      form.setFieldsValue(post);
    }
  }, [post, form]);

  const handleSubmit = async (values: any) => {
    try {
      if (post) {
        await updatePost.mutateAsync({ id: post.id, ...values });
      } else {
        await createPost.mutateAsync(values);
      }
      router.push("/");
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={post || {}}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="body"
        rules={[{ required: true, message: "Body is required" }]}
      >
        <Input.TextArea placeholder="Body" rows={4} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
