import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection
} from 'typeorm'

class Database {
  public isConnected(): boolean {
    try {
      return !!getConnection()
    } catch (e) {
      return false
    }
  }

  public async init(config: ConnectionOptions): Promise<Connection> {
    const connected = this.isConnected()

    if (connected) {
      return getConnection()
    }

    return createConnection(config)
  }
}

export default new Database()
