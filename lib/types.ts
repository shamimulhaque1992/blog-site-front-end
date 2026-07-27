export interface IPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  isPremium: boolean;
  status: IPostStatus;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: IAuthor;
  comments: IComment[];
  _count: {
    comments: number;
  };
}

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  activeStatus: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  id: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  authorId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export type IPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
    role: string;
    profile: {
      id: string;
      bio: string;
      userId: string;
      profilePhoto: string;
    };
  };
};