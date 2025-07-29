import { StatusCodes } from 'http-status-codes';
import Workspace from '../schema/workspace';
import ClientError from '../utils/errors/clientError';
import crudRepository from './crudRepository';
import User from '../schema/user';

const workspaceRepository = {
  ...crudRepository(Workspace),
  getWorkspaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({ name: workspaceName });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({ joinCode });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client ',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  addMemberToWorkspace: async function (memberId, role, workspaceId) {
    const workspace = Workspace.findById({ workspaceId });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isValidUser = await User.findById({ memberId });
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId == memberId
    );
    if (!isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }
    workspace.members.push({ memberId, role });
    return workspace;
  },
  addChannelToWorkspace: async function () {},
  fechAllWorkspaceByMemberId: async function () {}
};
export default workspaceRepository;
