import type { FastifyReply, FastifyRequest } from 'fastify';
import { createAuthService } from '../services/auth.service';
import { ValidationError } from '../utils/errorHandler';
import {
    RegisterUserSchema,
    VerifyOtpSchema,
} from '../validations/auth.validation';

export const handleRegister = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const result = RegisterUserSchema.safeParse(request.body);

    if (!result.success) {
        throw new ValidationError('Invalid request body');
    }

    try {
        const authService = createAuthService(request.server);
        const res = await authService.registerUser(result.data);
        return reply.code(201).send(res);
    } catch (err: any) {
        return reply.code(400).send({ error: err.message });
    }
};

export async function handleVerifyOtp(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const result = VerifyOtpSchema.safeParse(request.body);

    if (!result.success) {
        throw new ValidationError('Invalid request body');
    }

    try {
        const authService = createAuthService(request.server);
        const response = await authService.verifyOtp(
            result.data.email,
            result.data.otp,
        );
        return reply.status(200).send(response);
    } catch (error: any) {
        return reply
            .status(400)
            .send({ error: error.message || 'OTP verification failed' });
    }
}
