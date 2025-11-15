import messageRepository from '../repositories/messageRepository';

export const getMessageService = async (messageParams, page, limit) => {
  const messages = await messageRepository.getPaginatedMessages(
    messageParams,
    page,
    limit
  );
  console.log(messages);
  return messages;
};
