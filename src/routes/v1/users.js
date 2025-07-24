import express from 'express';

import { signIn, signUp } from '../../controllers/userController.js';
import {
  userSignInSchema,
  userSignUpSchema
} from '../../validators/userSchema.js';
import { valdiate } from '../../validators/zodValidator.js';
const router = express.Router();

router.post('/signup', valdiate(userSignUpSchema), signUp);
router.post('/signin', valdiate(userSignInSchema), signIn);
export default router;
