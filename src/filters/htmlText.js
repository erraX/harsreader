export const name = 'html-text'
export const filter = value => value.replace(/<[^>]*>/g, '')

export default {
    name,
    filter,
}
