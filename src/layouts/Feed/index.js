import _ from 'lodash'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    data() {
        return {
            subscriptions: []
        }
    },

    methods: {
        checkSub({ id }) {
            this.onCheckSub(id);
        },
    }
}
