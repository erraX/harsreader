export default function objToQueryStr(obj) {
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
