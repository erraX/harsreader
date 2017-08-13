import _ from 'lodash'
import PouchDB from 'pouchdb/dist/pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchDBUpsert from '../plugins/pouchdb/pouchdb.upsert'
import { COLLECTION_NAME } from '../configs/db'
import { getSbList, getFeeds } from '../api'

import Service from './Service'

PouchDB.plugin(PouchDBFind)
PouchDB.plugin(PouchDBUpsert)

function getId(name, id) {
    if (!COLLECTION_NAME.hasOwnProperty(name)) {
        throw new Error('Collection not found')
    }

    return `${COLLECTION_NAME[name]}_${id}`
}

export default class PouchDBService extends Service {
    constructor(dbName) {
        super()

        this.dbName = dbName
        this.db = new PouchDB(dbName)

        this.continuos = null
    }

    async allDocs(name, options = {}) {
        options.startKey = COLLECTION_NAME[name]
        options.endKey = `${COLLECTION_NAME[name]}\ufff0`

        const result = await this.db.allDocs(options)

        return result
    }

    /**
     * Fetch subscriptions
     *
     */
    async fetchSubscriptions() {
        return await getSbList()
    }

    async subscriptions() {
        const result = await this.db.find({
            selector: {
                _id: { '$regex': '^subscriptions_'}
            }
        })

        if (result && result.docs && result.docs.length) {
            return result.docs
        }

        return []
    }

    async fetchSetSubscriptions() {
        const subscriptions = (await this.fetchSubscriptions()).subscriptions
        await this.setSubscriptions(subscriptions)
    }

    /**
     * Set subscriptions
     *
     * @param {Array<Object>} subscriptions subscriptions
     */
    async setSubscriptions(subscriptions) {
        if (!_.isArray(subscriptions)) {
            subscriptions = [subscriptions]
        }

        return Promise.all(subscriptions.map(
            async s => {
                const id = getId('subscriptions', s.id)
                return this.db.upsert(id, doc => s)
            }
        ))
    }

    /**
     * Get feed
     *
     */
    // async fetchFeed({ sId, pageNo, pageSize, from, to }) {
    //     return await getFeeds({ streamId: sId })
    // }

    async fetchFeed(sId) {
        return await getFeeds({ streamId: sId })
    }

    /**
     * Get feeds
     *
     */
    async fetchFeeds(subId) {
        return 
    }

    async feeds(subId) {
        let selector = {
            _id: { '$regex': '^feeds_'}
        }

        if (subId !== 'all') {
            selector.streamId = subId
        }

        const result = await this.db.find({ selector })

        if (result && result.docs && result.docs.length) {
            return result.docs
        }

        return []
    }

    async fetchSetFeeds(sId) {
        const feed = (await this.fetchFeed(sId)).items
        await this.setFeeds(feed)
    }

    /**
     * Set feeds
     *
     */
    setFeeds(feeds) {
        if (!_.isArray(feeds)) {
            feeds = [feeds]
        }

        return Promise.all(feeds.map(
            async f => {
                const id = getId('feeds', f.id)

                return this.db.upsert(id, doc => ({
                    streamId: f.origin.streamId,
                    ...f,
                }))
            }
        ))
    }
}
