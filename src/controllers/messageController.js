import { StatusCodes } from 'http-status-codes';

import { getMessageService } from '../services/messageService';
import { successResponse } from '../utils/common/responseObjects';

export const getMessagesController = async (req, res) => {
  try {
    const messages = await getMessageService(
      { channelId: req.params.channelId },
      req.query.page || 1,
      req.query.limit || 20
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(messages, 'Messages fetched successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
