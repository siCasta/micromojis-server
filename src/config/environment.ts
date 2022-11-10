import { config } from 'dotenv'

const env = config()

export default {
    port: parseInt(env.PORT!),
    mongoURI: env.MONGO_URI
}
