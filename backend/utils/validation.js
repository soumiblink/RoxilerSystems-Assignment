const { z } = require("zod");

const validateSignup = z.object({
  name: z
    .string()
    .min(20, { message: "name must be at least 20 characters long" })
    .max(60, { message: "name must be less than 60 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "passwoard must be at least 8 characters long" })
    .max(16, { message: "password must be at most 16 characters long" })
    .refine((val) => /[a-z]/.test(val), {
      message: "password must contain at least 1 lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "password must contain at least 1 uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "password must contain at least 1 numeric character",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "password must contain at least 1 special character",
    }),
  address: z
    .string()
    .max(400, { message: "address must be less than 400 characters long" }),
});

const validateNewPassword = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "new password must be at least 8 characters long" })
    .refine((val) => /[a-z]/.test(val), {
      message: "new password must contain at least 1 lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "new password must contain at least 1 uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "new password must contain at least 1 numeric character",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "new password must contain at least 1 special character",
    }),
});

const validateStore = z.object({
  name: z
    .string()
    .min(20, { message: "name must be at least 20 characters long" })
    .max(60, { message: "name must be less than 60 characters long" }),
  email: z.string().email(),
  address: z
    .string()
    .min(20, { message: "address must be at least 20 characters long" })
    .max(400, { message: "address must be less than 400 characters long" }),
  ownerId: z.string(),
});

const validateUser = z.object({
  name: z
    .string()
    .min(20, { message: "name must be at least 20 characters long" })
    .max(60, { message: "name must be less than 60 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "passwoard must be at least 8 characters long" })
    .refine((val) => /[a-z]/.test(val), {
      message: "password must contain at least 1 lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "password must contain at least 1 uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "password must contain at least 1 numeric character",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "password must contain at least 1 special character",
    }),
  address: z
    .string()
    .min(20, { message: "address must be at least 20 characters long" })
    .max(400, { message: "address must be less than 400 characters long" }),
  role: z.enum(["STORE_OWNER", "SYSTEM_ADMIN", "NORMAL_USER"]),
});

const validateRating = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
});

module.exports = {
  validateSignup,
  validateNewPassword,
  validateStore,
  validateUser,
  validateRating,
};
