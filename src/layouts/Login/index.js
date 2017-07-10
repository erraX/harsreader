import { getSubscriptions } from '../../api'
import tpl from './tpl.html'

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
