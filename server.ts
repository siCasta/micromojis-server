import app from 'src/settings.ts'

app.listen({ port: Deno.env.get('PORT') as unknown as number })
console.log(`Sever running ${Deno.env.get('PORT')}`)
