import { StatusCodes } from 'http-status-codes';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';
import { getChannelByIdService } from '../services/channelService.js';
export const getChannelByIdController = async (req, res) => {
  try {
    console.log('===---------->', req.params.channelId, req.user);
    const response = await getChannelByIdService(
      req.params.channelId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Channel fetched successfully'));
  } catch (error) {
    console.log('Get Channel by id controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
