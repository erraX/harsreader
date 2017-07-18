import m from 'moment'

m.locale('zh-cn')

export const name = 'timediffs'
export const filter = timestamp =>  m(+timestamp / 1000).fromNow()

export default {
    name,
    filter,
}
