import _ from 'lodash'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    props: ['db'],

    data() {
        return {
            // current subscription id
            curSubId: '',

            // current subscription's feeds
            curItems: [],

            subscriptions: [],

            // Page size
            pageSize: 50,

            // Current page no
            pageNo: 1,

            // scroll height
            scrollHeight: 0,
        }
    },

    watch: {
        '$route'(to, from) {
            this.curSubId = to.params.feedId
        },

        async curSubId(id) {
            this.curItems = await this.db.feeds(id)
        }
    },

    computed: {

        // sort publish time desc
        sortedItems() {
            return  _.orderBy(this.curItems, ['timestampUsec'], ['desc'])
                .filter(item => item && item.canonical && item.summary)
        },

        // pagniation items
        displayItems() {
            return this.sortedItems.slice(0, this.pageNo * this.pageSize)
        }
    },

    methods: {}
}
