import Vue from 'vue'

function objToQueryStr(obj) {
    if (!obj) {
        return ''
    }

    let queryArray = []
    for (let key in obj) {
        if (obj[key]) {
            queryArray.push(key + '=' + encodeURIComponent(obj[key]))
        }
    }

    return queryArray.join('&')
}

function request(method, url) {
    return async (data, options) => {
        try {
            const res = await Vue.http[method](url, data, options)
            return res.body
        }
        catch (err) {
            if (err.status === 401) {
                location.href = '/#/login'
            }

            // throw new Error(JSON.stringify(err))
            throw new Error(err.body)
        }
    }
}

export const getUserInfo = request(`get`, `/rss/reader/api/0/user-info`)
export const getSbList = request(`get`, `rss/reader/api/0/subscription/list`)
export const getContent = (data, options) => {
    const streamId = data.streamId
    delete data.streamId

    return request(`get`, `rss/reader/api/0/stream/contents/${streamId}?${objToQueryStr(data)}`)()
}
