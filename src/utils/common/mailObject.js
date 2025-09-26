import { MAIL_ID } from '../../config/serverConfig.js';
export const workspaceJoinMail = function (workspace) {
  return {
    from: MAIL_ID,
    subject: 'You hace been added to a new workspace',
    text: `Congratulations! You have been added to a new workspace ${workspace.name}  `
  };
};
