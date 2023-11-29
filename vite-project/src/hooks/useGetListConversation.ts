import { useQuery } from '@tanstack/vue-query';
import { get } from '../api';
import { ref } from 'vue';

export default () => {
  const listConversation = ref();
  useQuery({
    queryKey: ['listConversation'],
    queryFn: () => get('/chat/list-conversation', true),
    select: (response) => (listConversation.value = response.data),
  });
  return listConversation;
};
