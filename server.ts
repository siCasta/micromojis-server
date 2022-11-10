import app from 'src/settings.ts'
import env from 'config/environment.ts'

const port = env.port || 8080

app.addEventListener('listen', e => {
    const { port, secure, hostname } = e
    const protocol = secure ? 'https://' : 'http://'
    const url = `${protocol}${
        hostname === '0.0.0.0' ? 'localhost' : hostname
    }:${port}`

    console.log(`Server running on ${url}`)
})
app.listen({ port })
