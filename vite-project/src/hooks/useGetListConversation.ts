import { useQuery } from "@tanstack/vue-query";
import { get } from "../api";

export default () => {
  const { data } = useQuery({
    queryKey: ["listConversation"],
    queryFn: () => get("/chat/list-conversation", true),
    select: (response) => response.data,
  });
  return data;
};
