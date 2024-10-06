import dhive from '@hiveio/dhive'
import hive from '@hiveio/hive-js'
import { DateTime } from 'luxon'

const client = new dhive.Client(['https://api.hive.blog'])

function formatDate(date) {
  return DateTime.fromISO(date).toFormat('dd/MM/yyyy')
}

function getReputation(username) {
  return new Promise((resolve, reject) => {
    hive.api.getAccountReputations(username, 1, function (err, data) {
      if (err) {
        reject(err)
      }

      resolve(hive.formatter.reputation(data[0].reputation))
    })
  })
}

async function getUserInfo(username) {
  try {
    const account = await client.database.getAccounts([username])
    if (account.length === 0) {
      return
    }

    const user = account[0]

    const hiveBalance = user.balance
    const hbdBalance = user.hbd_balance
    const vestingShares = parseFloat(user.vesting_shares.split(' ')[0])
    const globalProperties = await client.database.getDynamicGlobalProperties()
    const totalVestingShares = parseFloat(globalProperties.total_vesting_shares.split(' ')[0])
    const totalVestingFundHive = parseFloat(globalProperties.total_vesting_fund_hive.split(' ')[0])
    const hivePower = (vestingShares / totalVestingShares) * totalVestingFundHive
    const reputation = await getReputation(username)
    const post_count = user.post_count
    const created = user.created

    return {
      post_count,
      hiveBalance: parseFloat(hiveBalance).toPrecision(3),
      hbdBalance: parseFloat(hbdBalance).toPrecision(3),
      hivePower: parseFloat(hivePower).toPrecision(3),
      reputation,
      created: formatDate(created)
    }
  } catch (error) {
    console.error('Error during fetching stats:', error)
  }
}

export { getUserInfo }
