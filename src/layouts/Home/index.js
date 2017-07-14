import _ from 'lodash'
import PouchDB from 'pouchdb/dist/pouchdb'
import PouchDBFind from 'pouchdb-find'
import { getSbList, getContent } from '../../api'
import tpl from './tpl.html'
import './style.less'

PouchDB.plugin(PouchDBFind)

export default {
    template: tpl,

    data() {
        return {
            loaded: false,
            subscriptions: [],
            curItems: [],
            db: new PouchDB('subscriptions'),
        }
    },

    computed: {
        sortedItems() {
            return _.orderBy(this.curItems, ['timestampUsec'], ['desc']).slice(0, 100)
        }
    },

    async mounted() {
        await this.fetchSubscriptions()
        this.syncSubscriptions()
    },

    methods: {
        async fetchSubscriptions() {
            const res = await getSbList()

            this.loaded = true
            this.subscriptions = res.subscriptions

            return res
        },

        async syncSubscriptions() {
            await this.subscriptions.forEach(
                async ({ id: streamId }) => {
                    const content = await getContent({ streamId, n: 200 })
                    content.items.map(async item => {

                        let itemInDb
                        try {
                            itemInDb = await this.db.get(item.id)
                            // console.log(`item ${item.id} exists`);
                        }
                        catch (err) {
                            // console.log(`item ${item.id} inserted`);

                            return await this.db.put({
                                _id: item.id,
                                streamId: item.origin.streamId,
                                ...item
                            })
                        }
                    })
                }
            )
        },

        async checkSub(subscription) {
            const { id: streamId } = subscription

            try {
                const items = await this.db.find({
                    selector: { streamId }
                })

                if (items && items.docs && items.docs.length) {
                    this.curItems = items.docs
                }
            }
            catch(err) {}
        },

        async showAll() {
            try {
                const items = await this.db.allDocs({
                    include_docs: true,
                    attachments: true
                })

                if (items && items.rows && items.rows.length) {
                    this.curItems = items.rows.map(row => row.doc)
                }
            }
            catch (err) {
                console.log('Error', err);
            }
        },
    },
}
