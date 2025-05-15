import crypto from 'node:crypto';
import type { FastifyRedis } from '@fastify/redis';
// import { sendOtpEmail } from './email';

export function generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

export async function checkOtpLimits(redis: FastifyRedis, email: string) {
    if (await redis.get(`otp_lock:${email}`)) {
        throw new Error(
            'Account is locked due to multiple failed attempts. Try again later.',
        );
    }

    if (await redis.get(`otp_spam_lock:${email}`)) {
        throw new Error('Too many OTP requests. Please wait an hour.');
    }

    if (await redis.get(`otp_cooldown:${email}`)) {
        throw new Error('Please wait before requesting another OTP.');
    }

    const requestKey = `otp_request_count:${email}`;
    const requests = Number(await redis.get(requestKey)) || 0;

    if (requests >= 2) {
        await redis.set(`otp_spam_lock:${email}`, 'true', 'EX', 3600);
        throw new Error('Too many OTP requests. Locked for 1 hour.');
    }

    await redis.set(requestKey, (requests + 1).toString(), 'EX', 3600);
}

export async function verifyOtpCode(
    redis: FastifyRedis,
    email: string,
    inputOtp: string,
) {
    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp) throw new Error('Invalid or expired OTP');

    const attempts = Number(await redis.get(`otp_attempts:${email}`)) || 0;

    if (storedOtp !== inputOtp) {
        if (attempts >= 2) {
            await redis.set(`otp_lock:${email}`, 'true', 'EX', 1800);
            await redis.del(`otp:${email}`, `otp_attempts:${email}`);
            throw new Error(
                'Account locked due to failed attempts. Try later.',
            );
        }

        await redis.set(
            `otp_attempts:${email}`,
            (attempts + 1).toString(),
            'EX',
            300,
        );
        throw new Error(`Incorrect OTP. ${2 - attempts} attempts remaining`);
    }

    await redis.del(`otp:${email}`, `otp_attempts:${email}`);
    return { message: 'OTP verified successfully' };
}
