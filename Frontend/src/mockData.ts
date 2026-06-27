// src/mockData.ts
import type { PostType, User } from './types';

export const userManan: User = {
  id: 'user_01',
  username: 'manan_street',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  bio: 'Sleeping with the blanket on.. 🛌',
  postCount: 1,
  followerCount: 1240
};

export const userAlex: User = {
  id: 'user_02',
  username: 'alex_codes',
  avatarUrl: 'https://i.pravatar.cc/150?img=2',
  bio: 'Building things on the internet 🚀',
  postCount: 1,
  followerCount: 890
};

export const userSarah: User = {
  id: 'user_03',
  username: 'sarah_clicks',
  avatarUrl: 'https://i.pravatar.cc/150?img=3',
  bio: 'Capturing moments through a lens 📷',
  postCount: 1,
  followerCount: 3400
};

export const currentUser: User = {
  id: 'user_me',
  username: 'my_account',
  avatarUrl: 'https://i.pravatar.cc/150?img=5',
};

export const mockPosts: PostType[] = [
  {
    id: 'post_1',
    user: userManan,
    imageUrl: 'https://picsum.photos/seed/post1/600/600',
    caption: 'First post on BuildGram!',
    likes: 142,
    timestamp: '2 hours ago',
    comments: [
      {
        id: 'comment_1',
        user: userAlex,
        text: 'This is awesome! Keep rocking.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'post_2',
    user: userAlex,
    imageUrl: 'https://picsum.photos/seed/post2/600/600',
    caption: 'Coding until sunrise 🚀 #javascript',
    likes: 89,
    timestamp: '5 hours ago',
    comments: [
      {
        id: 'comment_2',
        user: userSarah,
        text: 'Clean setup! What IDE theme is that?',
        timestamp: '4 hours ago'
      }
    ]
  }
];  