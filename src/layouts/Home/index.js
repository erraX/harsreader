import _ from 'lodash'
import { getSubscriptions, getContents } from '../../api'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    data() {
        return {
            loaded: false,
            subscriptions: [],
            checkedSubscriptions: [],
        }
    },

    mounted() {
        getSubscriptions()
            .then(subscriptions => {
                this.subscriptions = subscriptions.body
                this.loaded = true
            })
    },

    methods: {
        checkAllSub() {
        
        },

        checkSub(subscription) {
            const { id: streamId } = subscription
            this.subscriptions
        },
    },
}
