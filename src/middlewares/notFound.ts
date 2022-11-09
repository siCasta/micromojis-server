import { Context } from 'oak'

const notFound = (ctx: Context, _next: () => Promise<unknown>) => {
    ctx.throw(404, 'Oppss! Not found 😶‍🌫️')
}

export default notFound
