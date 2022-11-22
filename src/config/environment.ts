export default {
    port: parseInt(Deno.env.get('PORT') || '8080'),
    mongoURI: `${Deno.env.get('MONGO_URI')}`
}
