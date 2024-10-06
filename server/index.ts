import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// TODO: To remove
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // Usuń lub zakomentuj to
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

import { api } from './api.js'
import router from './hive'

app.use(api)
app.use(router)

app.listen(3002, () => console.log('Server started.'))
