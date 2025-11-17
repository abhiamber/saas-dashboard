export const BUSINESS_STATUS = {
    OTP: {
      INVALID: 400,
      EXPIRED: 400,
    },
  
    AUTH: {
      INVALID_CREDENTIALS: 401,
      UNAUTHORIZED: 401,
      TOKEN_EXPIRED: 401,
    },
  
    USER: {
      EXISTS: 409,    
      NOT_FOUND: 404,
      EMAIL_REQUIRED: 400,
    },
  
    TENANT: {
      NOT_FOUND: 404,
      NAME_EXISTS: 409,
    },
  
    COMMON: {
      REQUIRED_FIELDS: 400,
      BAD_REQUEST: 400,
      SOMETHING_WENT_WRONG: 500,
    },
  } as const;
  