import _ from 'lodash'
import Db from '../../service/PouchDbService'
import tpl from './tpl.html'
import './style.less'

export default {
    template: tpl,

    data() {
        return {

            db: null,

            // page load or not
            loaded: false,

            // subscriptions list
            subscriptions: [],
        }
    },

    async mounted() {

        // Create feed database
        this.db = new Db('harsreader')

        // Fetch subscriptions list
        try {
            await this.db.fetchSetSubscriptions()
            this.subscriptions = await this.db.subscriptions()
            console.log(this.subscriptions);
        }
        catch (e) {
            console.log('fetchSetSubscriptions Error in `Rss`', e)
        }

        this.loaded = true

        // Fetch feeds
        try {
            this.subscriptions.forEach(s => {
                this.db.fetchSetFeeds(s.id)
            })
        }
        catch (e) {
            console.log('fetchSetFeeds Error in `Rss`', e)
        }

        // Observe pagination
        // setTimeout(() => {
        //     this.io = new IntersectionObserver(this.nextPage);
        //     this.io.observe(this.$refs.footer)
        // }, 0)

        // Auto sync feeds
        // this.intervalSync()
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
