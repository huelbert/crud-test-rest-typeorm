import { ConnectionOptions } from 'typeorm'

import { DB_HOST, DB_PORT, DB_BASE, DB_USER, DB_PASS } from '../utils/constants'

const config: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_BASE,
  username: DB_USER,
  password: DB_PASS,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations'
  }
}

export default config
