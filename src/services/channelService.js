import { StatusCodes } from 'http-status-codes';
import channelRepository from '../repositories/channelRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel =
      await channelRepository.getChannelWithWorspaceDetails(channelId);
    console.log(channel);
    if (!channel) {
      throw new ClientError({
        message: 'Channel not found with the provided id',
        explanation: 'Please provide a valid channel id',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isUserPartofWorkspace = isUserMemberOfWorkspace(
      channel.workspaceId,
      userId
    );
    if (!isUserPartofWorkspace) {
      throw new ClientError({
        message:
          'User is not a member of the workspace and hence cannot access the channel',
        explanation: 'User is not a part of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }
    return channel;
  } catch (error) {
    console.log('Get Channel by id service error', error);
    throw error;
  }
};
