export interface CreatePostData {
  title: string;
  body: string;
  user_id: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}
