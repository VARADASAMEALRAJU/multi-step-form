import { z } from 'zod';

export const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  // Requirement: valid phone number format
  phone: z.string().regex(/^\d{10,}$/, "Phone must be at least 10 digits"),
  // Requirement: minimum age of 18 years
  age: z.coerce.number().min(18, "You must be at least 18 years old"),
});

export const addressSchema = z.object({
  address: z.string().min(5, "Street address is required"),
  // CRITICAL: This line forces the restriction for the country selection
  country: z.string().min(1, "Please select a country"), 
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "Zip code must be at least 5 digits"),
});

export const accountSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  // Requirement: Strong password policy
  password: z.string()
    .min(8, "Password must be 8+ characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match", // Requirement: Confirm Password field matches
  path: ["confirmPassword"],
});