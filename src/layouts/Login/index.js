import { clientId, redirectURI } from '../../configs/oauth'
import tpl from './tpl.html'

import './style.less'

export default {
    template: tpl,

    data() {
        return {
            clientId,
            redirectURI,
            state: 'harsreader',
        }
    },

    computed: {
        oauthLink() {
            return `
                https://www.inoreader.com/oauth2/auth?
                    client_id=${this.clientId}
                    &redirect_uri=${encodeURIComponent(this.redirectURI)}
                    &response_type=code
                    &state=${this.state}
            `
        }
    },

    created() {

        // already log in 
        if (false) {
            this.$route.router.go({ path: '/feed/' })
        }
    }
}
