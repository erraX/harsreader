import $ from 'jquery'
import _ from 'lodash'
import { getSbList, getContent } from '../../api'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    data() {
        return {
            loaded: false,
            subscriptions: [],
            curSubscriptions: [],
            curItems: [],
        }
    },

    mounted() {
        getSbList()
            .then(
                data => {
                    this.loaded = true
                    this.subscriptions = data.subscriptions
                }
            )
    },

    methods: {
        checkAllSub() {
        
        },

        checkSub(subscription) {
            const { id: streamId } = subscription
            getContent({
                streamId,
                n: 100,
            })
            .then(
                data => {
                    this.curItems = data.items
                }
            )
        },
    },
}
