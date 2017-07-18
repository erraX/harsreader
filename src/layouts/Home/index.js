import _ from 'lodash'
import Feeds from '../../models/Feeds'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    data() {
        return {
            loaded: false,
            subscriptions: [],
            curItems: [],
            pageSize: 10,
            pageNo: 1,
        }
    },

    computed: {
        sortedItems() {
            return  _.orderBy(this.curItems, ['timestampUsec'], ['desc'])
                .filter(item => item && item.canonical && item.summary)
        },

        displayItems() {
            return this.sortedItems.slice(0, this.pageNo * this.pageSize)
        }
    },

    async mounted() {
        this.feed = new Feeds('subscriptions')

        const subscriptions = await this.feed.fetchSubscriptions()
        this.loaded = true
        this.subscriptions = subscriptions

        this.intervalSync()

        setTimeout(() => {
            this.io = new IntersectionObserver(this.nextPage);
            this.io.observe(this.$refs.footer)
        }, 0)
    },

    methods: {
        intervalSync() {
            this.feed.fetchFeeds(this.subscriptions)
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
                    console.log('Check items', items.docs);
                    this.curItems = items.docs
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
                }

                this.pageNo = 1
            }
            catch (err) {
                console.log('Error', err);
            }
        },
    },
}
