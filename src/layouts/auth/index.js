import { login } from '../../api'
import tpl from './tpl.html'

import './style.less'

export default {
    template: tpl,

    mounted() {
        console.log(this.$router.query.code);
        console.log(this.$router.query.state);
    }
}
