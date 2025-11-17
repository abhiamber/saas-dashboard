import AppError from "../core/app-error";
import { BUSINESS_CODES } from "../core/business-code";
import { BUSINESS_MESSAGES } from "../core/business-message";
import { BUSINESS_STATUS } from "../core/status-code";

export interface ValidationRule {
    required?: boolean;
    type?: "string" | "number" | "boolean" | "array" | "object" | "undefined";
    validate?: (value: any) => boolean;
    message?: string;
}

export type ValidationSchema = Record<string, ValidationRule>;

export const validate = (data: Record<string, any>, rules: ValidationSchema): true => {
    const errors: Record<string, string> = {};

    for (const key in rules) {
        const rule = rules[key];
        const value = data[key];

        // 1. Required check
        if (rule.required && (value === undefined || value === null || value === "")) {
            errors[key] = `${key} is required`;
            continue;
        }

        // Skip if field optional & not provided
        if (!rule.required && value === undefined) continue;

        // 2. Type check
        if (rule.type) {
            const actualType = Array.isArray(value) ? "array" : typeof value;

            if (actualType !== rule.type) {
                errors[key] = `${key} must be of type ${rule.type}, but received ${actualType}`;
                continue;
            }
        }

        // 3. Custom validator
        if (rule.validate && !rule.validate(value)) {
            errors[key] = rule.message || `${key} is invalid`;
        }
    }

    if (Object.keys(errors).length > 0) {
        throw new AppError(errors, BUSINESS_CODES.REQUIRED_FIELDS, BUSINESS_STATUS.COMMON.REQUIRED_FIELDS);
    }

    return true;
};
