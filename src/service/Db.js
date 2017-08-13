import m from 'moment'
import PouchDB from 'pouchdb/dist/pouchdb'
import PouchDBFind from 'pouchdb-find'
import { getSbList, getContent } from '../api'

PouchDB.plugin(PouchDBFind)

export default class Db {
    constructor(name) {
        this.sDb = new PouchDB('subscriptions')
        this.fDb = new PouchDB('feeds')
    }

    async subscriptions() {
        return await this.sDb.get('subscriptions')
    }

    async fetchSubscriptions() {
        let res
        try {
            res = await getSbList()
        }
        catch (e) {
            console.log(e);
        }

        return res && res.subscriptions
    }

    async allFeeds() {
        const startTime = Date.now()
        const allDocs = await this.fDb.allDocs({
            include_docs: true,
            attachments: true,
        })
        const endTime = Date.now()

        console.log('Get all docs in:', endTime - startTime)

        return allDocs
    }

    async feedsBySub(feedId) {
        return await this.fDb.find({
            selector: { streamId: feedId }
        })
    }

    async fetchFeeds(subscriptions, options = {}) {
        return Promise.all(subscriptions.map(
            async ({ id: streamId }) => {
                let content
                try {
                    content = await getContent({ streamId, ...options })
                }
                catch (e) {
                    console.log(e)
                }

                if (content && content.items && content.items.length) {
                    return Promise.all(content.items.map(::this.storeFeed))
                }

                return null
            }
        ))
    }

    async storeFeed(feed) {
        let feedInDb
        try {
            feedInDb = await this.fDb.get(feed.id)
        }
        catch (err) {
            return await this.fDb.put({
                _id: feed.id,
                streamId: feed.origin.streamId,
                ...feed
            })
        }
    }
}
