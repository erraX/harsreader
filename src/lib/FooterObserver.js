export default class FooterObserver {
    constructor({ $el, cb = () => {}, onlyVisible = true }) {
        this.$el = $el
        this.cb = cb
        this.onlyVisible = onlyVisible

        this.observe()
    }

    observe() {
        if (!this.$el) {
            return
        }

        const cb = {
            visible: ::this.visibleCb,
            normal: this.cb
        }[this.onlyVisible ? 'visible' : 'normal']

        this.io = new IntersectionObserver(cb)
        this.io.observe(this.$el)
    }

    visibleCb(entries) {
        if (!this.isVisible(entries)) {
            return
        }

        this.cb(entries)
    }

    isVisible(entries) {
        return entries[0].intersectionRatio > 0
    }
}
