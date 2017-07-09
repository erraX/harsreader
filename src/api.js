import Vue from 'vue'

const endpoint = 'http://localhost:3001/v3'

export const getAuthCode = (data, options) => Vue.http.get(`${endpoint}/auth/auth`)
export const getToken = (data, options) => Vue.http.get(`${endpoint}/auth/token`)

export const getProfile = (data, options) => Vue.http.get(`${endpoint}/profile`)

export const getSubscriptions = (data, options) => Vue.http.get(`${endpoint}/subscriptions`)
export const getSubscriptionsToFeed = (data, options) => Vue.http.post(`${endpoint}/subscriptions`)
