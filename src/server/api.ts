import { remultExpress } from 'remult/remult-express'
import { Report } from './shared/report'
import { Verification } from './shared/verification'
import { Access } from './shared/access'

import { createPostgresDataProvider } from 'remult/postgres'

// @ts-ignore
import dotenv from 'dotenv'

dotenv.config()

export const api = remultExpress({
  entities: [Report, Verification, Access],
  dataProvider: createPostgresDataProvider({
    // eslint-disable-next-line no-undef
    connectionString: process.env.DB_STRING
  })
})
