export const fileExists = async (path: string) => {
    try {
        const stats = await Deno.lstat(path)

        return stats && stats.isFile
    } catch (e) {
        if (e && e instanceof Deno.errors.NotFound) return false
        else return e
    }
}
