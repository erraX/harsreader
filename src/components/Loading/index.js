import tpl from './tpl.html'

import './style.less'

export default {
    template: tpl,

    data() {
        return {
            msg: '请稍候,正在同步中',
            step: 0,
            timeout: null
        }
    },

    computed: {
        loadingText() {
            var ellipsis = ''
            for (let i = 0; i < this.step - 1; i++) {
                ellipsis += '.'
            }

            return this.msg + ellipsis
        }
    },

    mounted() {
        this.nextStep(500)
    },

    methods: {
        nextStep(interval) {
            setTimeout(() => {
                if (this.step > 3) {
                    this.step = 0
                }
                this.step++;

                this.nextStep(interval)
            }, interval)
        }
    }
}
