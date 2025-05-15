import type { FastifyRedisPluginOptions } from '@fastify/redis';

// Helper function to validate required environment variables
function getRequiredEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

// Create the redis configuration with validation
export const redisConfig: FastifyRedisPluginOptions = {
    host: getRequiredEnvVar('REDIS_HOST'),
    port: Number(getRequiredEnvVar('REDIS_PORT')),
    username: getRequiredEnvVar('REDIS_USERNAME'),
    password: getRequiredEnvVar('REDIS_PASSWORD'),
    family: Number(getRequiredEnvVar('REDIS_FAMILY')),
    tls: {},
};
