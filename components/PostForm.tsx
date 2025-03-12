import { useState, useEffect } from "react";
import { Input, Button, Form, message, Select } from "antd";
import { useCreatePost, useUpdatePost } from "../hooks/usePosts";
import { useRouter } from "next/router";
import { Post } from "@/types/Post";
import { useUsers } from "@/hooks/useUsers";

const PostForm = ({ post }: { post?: Post }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const router = useRouter();

  const { data: users, isLoading: isLoadingUsers } = useUsers();

  useEffect(() => {
    if (post) {
      form.setFieldsValue(post);
    }
  }, [post, form]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      if (post) {
        await updatePost.mutateAsync({ id: post.id, ...values });
      } else {
        await createPost.mutateAsync(values);
      }
      router.push("/");
    } catch (error) {
      message.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={post || {}}>
      {!post && (
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
      )}
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="body"
        label="Body"
        rules={[{ required: true, message: "Body is required" }]}
      >
        <Input.TextArea placeholder="Body" rows={4} />
      </Form.Item>
      <Button type="primary" loading={isLoading} htmlType="submit">
        {post ? "Update Post" : "Create Post"}
      </Button>
    </Form>
  );
};

export default PostForm;
