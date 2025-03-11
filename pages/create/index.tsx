import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useCreatePost } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/router";
import WelcomeDialog from "@/components/WelcomeDialog";

export default function CreatePost() {
  const router = useRouter();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(true);
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
        error.response?.data?.[0]?.message || "Failed to create a post"
      );
    }
  };

  return (
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
        label="title"
        rules={[{ required: true, message: "Title is required!" }]}
      >
        <Input placeholder="Masukkan judul post" />
      </Form.Item>

      <Form.Item
        name="body"
        label="title"
        rules={[{ required: true, message: "Content is required!" }]}
      >
        <Input.TextArea rows={4} placeholder="Content of the post" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={createPost.isPending}>
          Create Post
        </Button>
      </Form.Item>
    </Form>
  );
}
