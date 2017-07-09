import { getSubscriptions } from '../../api'
import tpl from './template.tpl'

import './style.less'

export default {
    data () {
        return {
            subscriptions: []
        }
    },

    template: tpl,

    mounted() {
        getSubscriptions()
            .then(subscriptions => {
                this.subscriptions = subscriptions.body
            })
    },

    methods: {
        onClickSubscription(subscription) {
            console.log('select', subscription)
        }
    }
}
