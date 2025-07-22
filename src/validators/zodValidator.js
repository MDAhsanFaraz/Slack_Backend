import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/common/responseObjects.js';
import { z } from 'zod';

export const valdiate = (schema) => {
  return async function (req, res, next) {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log('Validation error in zod validator', error.name);
      let explanation = [];
      let errorMessge = '';
      const tree = z.treeifyError(error);
      console.log('tree=>', tree.properties);
      Object.keys(tree.properties).forEach((key) => {
        tree.properties[key].errors.forEach((msg) => {
          explanation.push(key + ' ' + msg);
          errorMessge += ':' + key + ' ' + msg;
        });
      });
      console.log('expalantion', explanation);

      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation error' + errorMessge,
          explanation: explanation
        })
      );
    }
  };
};
