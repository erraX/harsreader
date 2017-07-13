import PouchDB from 'pouchdb/dist/pouchdb'
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
            db: new PouchDB('subscriptions'),
        }
    },

    mounted() {
        this.db.put({
            _id: new Date().toISOString(),
            title: 'haha',
            completed: false
        })
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
