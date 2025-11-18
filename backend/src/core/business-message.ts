export const BUSINESS_MESSAGES = {
  OTP: {
    INVALID: "Invalid OTP.",
    EXPIRED: "OTP expired.",
    VERIFIED: "OTP verified successfully.",
    SENT: "OTP sent successfully.",
  },

  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password.",
    UNAUTHORIZED: "You are not authorized to access this resource.",
    TOKEN_EXPIRED: "Token expired.",
    LOG_IN_SUCCESSFULL: "Log in Sucessfull "
  },

  USER: {
    EXISTS: "User already exists.",
    NOT_FOUND: "User not found.",
    EMAIL_REQUIRED: "Email is required.",
  },

  TENANT: {
    NOT_FOUND: "Tenant not found.",
    NAME_EXISTS: "Tenant already exists.",
  },

  COMMON: {
    REQUIRED_FIELDS: "Required fields are missing.",
    BAD_REQUEST: "Invalid request data.",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    ROUTE_NOT_FOUND: "The requested endpoint does not exist."
  }
} as const;
