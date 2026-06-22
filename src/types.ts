// src/types.ts
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  postCount?: number;
  followerCount?: number;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface PostType {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}