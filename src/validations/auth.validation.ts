import { z } from 'zod';

export const RegisterUserSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/,
            'Password must include uppercase, lowercase, number, and special character',
        ),
});

export const VerifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;
export type VerifyOtpDTO = z.infer<typeof VerifyOtpSchema>;
