export const internalErrorresponse = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: 'Internal server error'
  };
};
export const customErrorresponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalErrorresponse(error);
  }
  return {
    success: false,
    err: error.explanation,
    data: {},
    message: error.message
  };
};

export const successResponse = (data, message) => {
  return {
    success: true,
    message,
    data,
    err: {}
  };
};
