import type { FastifyInstance } from 'fastify';
import {
    handleRegister,
    handleVerifyOtp,
} from '../controllers/auth.controller';

export async function authRoutes(app: FastifyInstance) {
    app.post('/auth/register', handleRegister);
    app.post('/auth/verify-otp', handleVerifyOtp);
}
