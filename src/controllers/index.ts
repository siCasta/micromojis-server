import { RouterContext } from 'oak'

export const welcome = (ctx: RouterContext<'/'>) => {
    const { response: res, request: req } = ctx

    res.status = 200
    res.body = {
        message: 'Welcome to micromojis 😊',
        info: 'It is an api to get Microsoft Emojis in .svg files',
        usage: {
            info: 'You can get the emojis with these endpoints, all emojis are in alp',
            routes: [
                {
                    pathname: '/emojis',
                    info: 'Use this route to get all the emojis',
                    url: `${req.url.origin}/emojis`,
                    queryParams: {
                        page: 'The page you are looking for, the value is a number',
                        emojis: 'The quantity of emojis you want to get, the value is a number'
                    }
                },
                {
                    pathname: '/emojis/:es',
                    info: 'Use this route to get a single emoji',
                    usage: 'You have to put the specific name of the emoji in :es',
                    url: `${req.url.origin}/emojis/ice_cream`
                },
                {
                    pathname: '/search/:es',
                    info: 'Use this route for searching emojis with a word',
                    usage: 'Just put a word in :es and it will search the emojis with that word',
                    url: `${req.url.origin}/search/ice`,
                    queryParams: {
                        page: 'The page you are looking for, the value is a number',
                        emojis: 'The quantity of emojis you want to get, the value is a number'
                    }
                }
            ]
        },
        myInfo: {
            name: 'Juan Sebastian Castañeda Burbano',
            nickname: 'siCasta',
            github: 'https://github.com/siCasta',
            linkedin: 'https://www.linkedin.com/in/castanedaburbanoj/'
        },
        extra: 'Made with ❤️ and hope you like it'
    }
}
