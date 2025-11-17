export const successResponse = ({data, message = "Success"} : Record<string, any> ) => ({
    success: true,
    message,
    data,
  });
  
  export const errorResponse = (message: string, statusCode = 400) => ({
    success: false,
    message,
    statusCode
  });
  