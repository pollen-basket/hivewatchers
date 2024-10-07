import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import { remult } from 'remult'
import { Report } from '@/server/shared/report.ts'
import { Verification } from '@/server/shared/verification.ts'
import { Access } from '@/server/shared/access'
import axios from 'axios'

const reportRepo = remult.repo(Report)
const verificationRepo = remult.repo(Verification)
const accessRepo = remult.repo(Access)

export const useMainStore = defineStore('blacklist-store', {
  state: () => ({
    blacklistUsers: null,
    isFetching: false,
    isBlacklistUserFetching: false,
    isUserDataFetching: false,
    blacklistUserData: {
      name: null,
      entries: null,
      hive: null,
      hbd: null,
      hp: null,
      rep: null,
      numberOfPosts: null,
      created: null,
      link: null,
      comments: null
    },
    comments: null,
    abuses: null,
    verifiedUsers: null,
    reports: null,
    transactions: null,
    transactionsCurrentPage: 1,
    transactionsTotalCount: 1,
    transactionsTotalPages: 1
  }),
  actions: {
    async getIP() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json')
        return response.data.ip
      } catch (error) {
        console.error('Error fetching IP address:', error)
        return null
      }
    },

    async checkAccess(ip) {
      const access = await accessRepo.find()
      const blockedIP = access.map(({ ip_address }) => ip_address)

      return blockedIP.includes(ip)
    },
    async guard() {
      const currentIp = await this.getIP()
      return await this.checkAccess(currentIp)
    },

    async fetchBlacklistUsers() {
      this.isBlacklistUserFetching = true

      // TODO: Endpoint must be changed
      const { data, isFetching } = await useFetch(import.meta.env.VITE_BLACKLIST_ENDPOINT)
        .get()
        .json()
      this.blacklistUsers = data.value.result
      this.isBlacklistUserFetching = isFetching.value
    },

    async fetchUserStats(username) {
      this.isFetching = true
      this.isUserDataFetching = true

      this.comments = await axios.get('https://hive-api-production.up.railway.app/api/comments', {
        params: { targetUser: username }
      })

      this.blacklistUserData.entries = this.comments.data.length

      const { data, isFetching } = await useFetch(import.meta.env.VITE_STATS_ENDPOINT)
        .post({ username })
        .json()

      if (data && data.value) {
        this.blacklistUserData.name = `@${username}`
        this.blacklistUserData.hive = data.value.hiveBalance
        this.blacklistUserData.hbd = data.value.hbdBalance
        this.blacklistUserData.hp = data.value.hivePower
        this.blacklistUserData.rep = data.value.reputation
        this.blacklistUserData.created = data.value.created
        this.blacklistUserData.numberOfPosts = data.value.post_count
      }

      this.isFetching = isFetching.value
      this.isUserDataFetching = false
    },

    async postAbuse({
      abuse_type,
      details,
      post_url,
      reported_by_username,
      supporting_link,
      author_username
    }) {
      const accessDenied = await this.guard()

      if (accessDenied) {
        return true
      }

      return await reportRepo.insert({
        abuse_type,
        details,
        post_url,
        reported_by_username,
        supporting_link,
        author_username,
        status: 'unstarted'
      })
    },

    async searchReports(criteria) {
      this.isFetching = true
      if (criteria.abuseType === 'all' || criteria.abuseType === 'All') {
        criteria.abuseType = ''
      }

      const currentCriteria = {}

      Object.entries(criteria).forEach(([criteriaProp, criteriaValue]) => {
        if (criteriaValue) {
          currentCriteria[criteriaProp] = { $contains: criteriaValue }
        }
      })

      if (Object.entries(currentCriteria).length === 0) {
        return []
      }

      this.reports = await reportRepo.find({ where: currentCriteria })
      this.isFetching = false
    },

    async postVerification(verification) {
      const accessDenied = await this.guard()

      if (accessDenied) {
        return true
      }

      return await verificationRepo.insert(verification)
    },

    async getVerifiedUsers(searchString) {
      this.verifiedUsers = await verificationRepo.find({
        where: {
          username: { $contains: searchString },
          status: 'verified'
        },
        orderBy: {
          username: 'ASC'
        }
      })
    },

    async searchTransactions(query) {
      // TODO: Temporary solution until local Haf SQL will be implemented

      try {
        const results = await axios.get(
          'https://hive-api-production-6b8d.up.railway.app/api/transactions',
          { params: { ...query } }
        )
        this.transactionsCurrentPage = results.data.currentPage
        this.transactionsTotalCount = results.data.totalCount
        this.transactionsTotalPages = results.data.totalPages
        this.transactions = results.data.data
      } catch (err) {
        if (err) {
          this.transactions = [];
        }
      }
    }
  }
})
