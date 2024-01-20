import { useQuery } from '@tanstack/react-query';
import fetchMessages from '../api/fetchMessages.js';

const FetchMessagesMain = (groupId) => {
  const Results = useQuery({
    queryKey: ['messages', groupId],
    queryFn: fetchMessages,
  });
  const messages = Results?.data;
  return {
    messages,
    loading: Results?.isLoading,
  };
};

export default FetchMessagesMain;
