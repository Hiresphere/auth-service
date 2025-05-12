import Fastify from 'fastify';

const app = Fastify();

app.get('/ping', async () => {
    return { message: 'Hello from Auth Service!' };
});

app.listen({ port: 5001 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`✅ Auth Service running at ${address}`);
});
