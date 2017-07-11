import $ from 'jquery'
import _ from 'lodash'
import { getUserInfo, getContents } from '../../api'
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
        $.ajax({
            url: '/reader/api/0/user-info',
            // url: 'http://localhost:3001/reader/api/0/subscription/list',
            beforeSend(xhr) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
                xhr.setRequestHeader('Authorization', 'Bearer e48b369d6329341d4853e1f72b5cc141498e7f44')
            }
        })

        // this.$http.get('http://localhost:3001/reader/api/0/user-info', { emulateJSON: true })
        //     .then(
        //         res => console.log(res),
        //         err => console.log(err)
        //     )
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
