import { ApolloServer } from 'apollo-server-express'
import { resolve } from 'path'
import { buildSchema } from 'type-graphql'

async function graphql(): Promise<ApolloServer> {
  const resolvers = resolve(__dirname, 'resolvers', '*')

  const schema = await buildSchema({ resolvers: [resolvers] })

  return new ApolloServer({ schema })
}

export default graphql
