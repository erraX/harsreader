import Vue from 'vue'
import objToQueryStr from './utils/objToQueryStr'

function request(method, url) {
    return async (data, options) => {
        try {
            const res = await Vue.http[method](url, data, options)
            return res.body
        }
        catch (err) {
            if (err.status === 401 || err.status === 403) {
                location.href = '/#/login'
            }

            throw new Error(err.body)
        }
    }
}

const PREFIX = `rss/reader/api/0`

export const getUserInfo = request(`get`, `${PREFIX}/user-info`)
export const getSbList = request(`get`, `${PREFIX}/subscription/list`)
export const getFeeds = (data, options) => {
    const streamId = data.streamId
    delete data.streamId

    return request(`get`, `${PREFIX}/stream/contents/${streamId}?${objToQueryStr(data)}`)()
}

export const getUnreadCounts = request(`get`, `${PREFIX}/unread-count`)
