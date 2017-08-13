import _ from 'lodash'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    props: ['db', 'subscriptions'],

    methods: {
        showAll() {
            this.$router.push({path: 'all'})
        },

        checkSub({ id }) {
            this.$router.push({path: encodeURIComponent(id)})
        },
    }
}
