import { validate, ValidationSchema } from "../../../validator/validate";

export const signupValidationRule: ValidationSchema = {
  name: { required: true, type: "string",message: "Name is Empty" },
  email: {
    required: true,
    type: "string",
    validate: (v: string) => /^\S+@\S+\.\S+$/.test(v),
    message: "Email is invalid",
  },
  password: {
    required: true,
    type: "string",
    validate: (v: string) => v.length >= 6,
    message: "Password must be at least 6 characters",
  },
  tenantName: { required: true, type: "string",message: "TenantName is Empty" },
};


export const signupFormDataValidation = (data: Record<string, any>): boolean => {
  return validate(data, signupValidationRule)

}