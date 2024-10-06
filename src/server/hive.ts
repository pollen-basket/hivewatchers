import express from 'express'
// @ts-ignore
import { getUserInfo } from './hive-lib.js'

const router = express.Router()

router.post('/stats', async (req, res, next) => {
  const userInfo = await getUserInfo(req.body.username)
  res.json(userInfo)
  next()
})

export default router
