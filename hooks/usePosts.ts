import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, setAuthToken } from "../utils/api";
import { CreatePostData, Post } from "@/types/Post";
import { message } from "antd";
import { useRouter } from "next/router";

export const usePosts = (searchTerm = "", page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const response = await api.get(`/posts`, {
          params: {
            title: searchTerm,
            page,
            per_page: perPage,
          },
        });

        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          message.error("Token invalid.");
        }
        throw error;
      }
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPost: CreatePostData) => {
      try {
        const token = localStorage.getItem("goRestToken");
        if (!token) {
          throw new Error("Token not found");
        }

        setAuthToken(token);

        if (!newPost.user_id) {
          throw new Error("User ID required");
        }

        const response = await api.post("/posts", newPost);
        return response.data;
      } catch (error: any) {
        message.error(
          "Create post error:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    onSuccess: () => {
      message.success("Post successfully created!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const usePostDetail = (id: any) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        return response.data.data;
      } catch (error: any) {
        throw error;
      }
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title, body }: Post) => {
      try {
        const response = await api.put(`/posts/${id}`, {
          title,
          body,
        });

        return response.data;
      } catch (error: any) {
        message.error("Update post error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post updated successfully");
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: any) => {
      try {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
      } catch (error: any) {
        message.error("Delete post error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post deleted successfully");
    },
  });
};
