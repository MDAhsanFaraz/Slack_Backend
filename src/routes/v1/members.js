import express from 'express';

import { isMemberPartOfWorkSpaceController } from '../../controllers/memberController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.get(
  '/workspace/:workspaceId',
  isAuthenticated,
  isMemberPartOfWorkSpaceController
);
export default router;
