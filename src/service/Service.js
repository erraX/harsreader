import { getSbList, getContent } from '../api'

const OverrideError = new Error('Should be override')

export default class Service {

    /**
     * @constructor
     */
    constructor() {}

    /**
     * Get subscriptions
     *
     * @throws {OverrideError}
     */
    subscriptions() {
        throw OverrideError
    }

    /**
     * Set subscriptions
     *
     * @param {Array<Object>} subscriptions subscriptions
     * @throws {OverrideError}
     */
    setSubscriptions(subscriptions) {
        throw OverrideError
    }

    /**
     * Get subscriptions
     *
     * @throws {OverrideError}
     */
    feeds({ sId, pageNo, pageSize, from, to }) {
        throw OverrideError
    }

    /**
     * Get subscriptions
     *
     * @throws {OverrideError}
     */
    setFeeds(feeds) {
        throw OverrideError
    }
}
