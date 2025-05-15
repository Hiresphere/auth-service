import crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { db } from '../config/db';
import { users } from '../schema/user';
import { sendOtpEmail } from '../utils/email';
import { checkOtpLimits, generateOtp, verifyOtpCode } from '../utils/otp';
import type { RegisterUserDTO } from '../validations/auth.validation';

class AuthService {
    constructor(private app: FastifyInstance) {}

    async registerUser(input: RegisterUserDTO) {
        const { email, password, firstName, lastName } = input;

        const existing = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        if (existing.length > 0) {
            throw new Error('User already exists');
        }

        const hashedPassword = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        const [user] = await db
            .insert(users)
            .values({
                email,
                firstName,
                lastName,
                passwordHash: hashedPassword,
            })
            .returning();

        // OTP Throttle Check
        await checkOtpLimits(this.app.redis, email);

        // Generate and send OTP
        const otp = generateOtp();
        await this.app.redis.set(`otp:${email}`, otp, 'EX', 300); // 5 min
        await this.app.redis.set(`otp_cooldown:${email}`, 'true', 'EX', 60); // 1 min
        await sendOtpEmail(email, firstName, otp);

        return {
            message: 'User registered. Verify OTP to continue.',
            user,
        };
    }

    async verifyOtp(email: string, otp: string) {
        const result = await verifyOtpCode(this.app.redis, email, otp);
        if (result) {
            // Update user's emailVerified field
            await db
                .update(users)
                .set({ emailVerified: true })
                .where(eq(users.email, email));
        }
        return result;
    }
}

export const createAuthService = (app: FastifyInstance) => new AuthService(app);
