import m from 'moment'
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
            feeds: [],
        }
    },

    async mounted() {
        const res = await getSubscriptions()
        this.subscriptions = res.body
        this.loaded = true
    },

    methods: {
        checkAllSub() {},

        async checkSub(subscription) {
            var body
            const { id: streamId } = subscription
            body = (await getContents({ streamId })).body

            while(body.items && body.items.length) {
                const continuation = body.continuation
                this.feeds.concat(body.items)
                body = (await getContents({ streamId })).body
            }
        },
    },
}
