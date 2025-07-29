import { StatusCodes } from 'http-status-codes';
import Workspace from '../schema/workspace';
import ClientError from '../utils/errors/clientError';
import crudRepository from './crudRepository';

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
  addMemberToWorkspace: async function () {},
  addChannelToWorkspace: async function () {},
  fechAllWorkspaceByMemberId: async function () {}
};
export default workspaceRepository;
