import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import { CreatePostData, Post } from "@/types/Post";
import { message } from "antd";

export const usePosts = (searchTerm = "", page?: number, perPage?: number) => {
  return useQuery({
    queryKey: ["posts", { searchTerm, page, perPage }],
    queryFn: async () => {
      try {
        const params: any = {};

        if (searchTerm) {
          params.title = searchTerm;
        } else {
          if (page) params.page = page;
          if (perPage) params.per_page = perPage;
        }

        const response = await api.get(`/posts`, { params });
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          message.error("Token invalid.");
        }
        throw error;
      }
    },
    staleTime: Infinity,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPost: CreatePostData) => {
      try {
        const response = await api.post("/posts", newPost);
        return response.data;
      } catch (error: any) {
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
        if (error.response?.status === 401) {
          message.error("Token invalid.");
        }

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
