import { StatusCodes } from 'http-status-codes';
import { signUpService } from '../service/userService';
import {
  customErrorresponse,
  internalErrorresponse,
  successResponse
} from '../utils/errors/common/responseObjects';

export const signup = async function (req, res) {
  try {
    const user = await signUpService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User created successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorresponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorresponse(error));
  }
};
