import { clientId, clientSecret } from '../../configs/oauth'
import { getToken } from '../../api'
import tpl from './tpl.html'

import './style.less'

export default {
    template: tpl,

    mounted() {
        const queryArr = location.search.substr(1).split('&')

        if (queryArr.length) {
            const code = queryArr[0].split('=')[1]

            getToken({
                code: code,
                redirect_uri: 'http://localhost:3000',
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                scope: ''
            })
        }
    }
}
