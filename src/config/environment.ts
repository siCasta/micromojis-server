import { config } from 'dotenv'

const env = config()

export default {
    port: Deno.env.get('PORT') || parseInt(env.PORT!),
    mongoURI: Deno.env.get('MONGO_URI') || env.MONGO_URI
}
