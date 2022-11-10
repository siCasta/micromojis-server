export default {
    port: parseInt(Deno.env.get('PORT')!),
    mongoURI: `${Deno.env.get('MONGO_URI')}`
}
