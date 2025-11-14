import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import workspaceRepository from '../repositories/workspaceRepository.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';
import ClientError from '../utils/errors/clientError.js';

export const isMemberPartOfWorkSpaceService = async function (
  workspaceId,
  memberId
) {
  const workspace = await workspaceRepository.getById(workspaceId);
  const isUserAMember = isUserMemberOfWorkspace(workspace, memberId);
  if (!isUserAMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'User is not member of the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }
  const user = await userRepository.getById(memberId);
  return user;
};
