import { getSubscriptions } from '../../api'
import tpl from './template.tpl'

import './style.less'

export default {
    data () {
        return {}
    },

    template: tpl,

    methods: {
        login () {
            getSubscriptions()
        }
    }
}
