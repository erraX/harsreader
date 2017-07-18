import _ from 'lodash'
import Feeds from '../../models/Feeds'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    data() {
        return {

            // page load or not
            loaded: false,

            // current subscription id
            curSub: '',

            // subscriptions list
            subscriptions: [],

            // current subscription's feeds
            curItems: [],

            // Page size
            pageSize: 10,

            // Current page no
            pageNo: 1,

            // scroll height
            scrollHeight: 0,
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

    async mounted() {

        // Create feed database
        this.feed = new Feeds('subscriptions')

        // Fetch subscriptions list
        const subscriptions = await this.feed.fetchSubscriptions()
        this.loaded = true
        this.subscriptions = subscriptions

        // Observe pagination
        setTimeout(() => {
            this.io = new IntersectionObserver(this.nextPage);
            this.io.observe(this.$refs.footer)
        }, 0)

        // Auto sync feeds
        this.intervalSync()
    },

    methods: {
        async intervalSync() {
            await this.feed.fetchFeeds(this.subscriptions)

            if (this.curSub) {
                if (this.curSub === 'all') {
                    this.showAll()
                }
                else {
                    this.checkSub({ id: this.curSub })
                }
            }

            setTimeout(() => {
                this.intervalSync()
            }, 1000 * 60 * 5)
        },

        nextPage(entries) {

            // 如果不可见，就返回
            if (entries[0].intersectionRatio <= 0) {
                return;
            }

            this.pageNo++
        },

        async checkSub({ id }) {
            try {
                const items = await this.feed.feedsBySub(id)

                if (items && items.docs && items.docs.length) {
                    this.curItems = items.docs
                    this.curSub = id
                }

                this.pageNo = 1
            }
            catch(err) {
                console.log(err);
            }
        },

        async showAll() {
            try {
                const items = await this.feed.allFeeds();

                if (items && items.rows && items.rows.length) {
                    this.curItems = items.rows.map(row => row.doc)
                    this.curSub = 'all'
                }

                this.pageNo = 1
            }
            catch (err) {
                console.log('Error', err);
            }
        },
    },
}
