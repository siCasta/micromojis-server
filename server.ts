import app from 'src/settings.ts'

const port = parseInt(Deno.env.get('PORT')!) || 8080

app.listen({ port: parseInt(Deno.env.get('PORT')!) || 8080 })
console.log(`Sever running ${port}`)
