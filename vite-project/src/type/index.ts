export type UserInfo = {
  id: string | number;
  first_name: string;
  last_name: string;
  avatar?: string;
  email?: string;
};

export type Message = {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  conversation_id: number;
  created_at: string;
  text: string;
};