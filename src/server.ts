import fastifyRedis from '@fastify/redis';
import { sql } from 'drizzle-orm';
import Fastify from 'fastify';
import { db } from './config/db';
import { redisConfig } from './config/redis';
import { authRoutes } from './routes/auth.route';

async function startServer() {
    const app = Fastify({ logger: true });

    // Register Redis plugin
    try {
        await app.register(fastifyRedis, redisConfig);
        const pong = await app.redis.ping();
        if (pong === 'PONG') {
            app.log.info('Redis connected successfully');
        } else {
            app.log.error('Redis ping failed');
            process.exit(1);
        }
    } catch (err) {
        app.log.error('❌ Redis connection failed:', err);
        process.exit(1);
    }

    // Register routes
    app.register(authRoutes);

    // Health check route
    app.get('/ping', async () => {
        try {
            await db.execute(sql`SELECT 1`);
            return { message: 'Database connection successful!' };
        } catch (error) {
            app.log.error('Database connection error:', error);
            return { message: 'Database connection failed!' };
        }
    });

    // Start server
    try {
        const address = await app.listen({ port: 5001 });
        app.log.info(`Auth Service running at ${address}`);
    } catch (err) {
        app.log.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer();
