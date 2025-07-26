import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log(
      'User service error keys:',
      '-->',
      error.errors,
      '++',
      error.message,
      '++',
      error.name,
      '++',
      error.code
    );
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    if (error.name === 'MongooseError') {
      throw new ValidationError(
        {
          error: ['A user with same email or username already exists']
        },
        'A user with same email or username already exists'
      );
    }
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'No registered user found with this email',
        statusbarCode: StatusCodes.NOT_FOUND
      });
    }
    // match the incoming password with the hashed password
    const isMatch = bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Incorrect password, please try again',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    return {
      username: user.username,
      email: user.email,
      avator: user.avatar,
      token: createJWT({
        userId: user._id,
        email: user.email
      })
    };
  } catch (error) {
    console.log('User service error', error);
    throw error;
  }
};
