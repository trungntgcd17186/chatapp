export type UserInfo = {
  id: string | number;
  first_name: string;
  last_name: string;
  avatar?: string;
  email?: string;
};

export type Message = {
  id: number;
  user: UserInfo;
  conversation_id: number;
  created_at: string;
  text: string;
};

export type Conversation = {
  created_at: string;
  id: number;
  members: UserInfo[];
};
