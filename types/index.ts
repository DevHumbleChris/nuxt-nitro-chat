import type {
  File,
  Group,
  Media,
  Member,
  Message,
  Profile,
} from "@prisma/client";

export type ModalType = "signin";

export type GroupInfo =
  | (Group & {
      members: Member[];
      medias: Media[];
      files: File[];
    })
  | null;

export interface SocketMessage {
  user: {
    name: string;
    imgUrl: string;
    profileId: string;
  };
  message: {
    id: string;
    content: string;
    createdAt: Date;
    fileUrl: string;
    imageUrl: string;
    deleted: boolean;
  };
}

export type GroupWithMessages = Group & {
  messages: Message[];
};

export interface SelectedImage {
  name: string;
  imageUrl: string;
  size: string;
}
export interface SelectedFile {
  name: string;
  fileUrl: string;
  size: string;
}

export interface SentSocketMessage {
  content: string;
  file: {
    url: string;
    name: string;
    size: string;
  };
  image: {
    url: string;
    name: string;
    size: string;
  };
}
