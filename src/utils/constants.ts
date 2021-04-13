import env from 'env-var'

export const DB_HOST = env.get('DB_HOST').required().asString()

export const DB_PORT = env.get('DB_PORT').required().asInt()

export const DB_BASE = env.get('DB_BASE').required().asString()

export const DB_USER = env.get('DB_USER').required().asString()

export const DB_PASS = env.get('DB_PASS').required().asString()
