import { config } from 'dotenv'

const env = config()

export default {
    port: parseInt(Deno.env.get('PORT') || env.PORT),
    mongoURI: `${Deno.env.get('MONGO_URI') || env.MONGO_URI}`
}
