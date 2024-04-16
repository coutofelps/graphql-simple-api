import { ApolloServer, gql } from 'apollo-server'
import { randomUUID } from 'node:crypto'

/**
 * Problemas resolvidos pelo GraphQL
 *
 * Under fetching
 * Rota HTTP que retorna dados de menos
 *
 * Over fetching
 * Rota HTTP retorna mais dados do que precisamos
 */

/**
 * Utilizando schema first approach aqui
 */

// Queries (leituras) e mutations (escrita)
const typeDefs = gql`
    type User {
        id: String!,
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name: String): User!
    }
`

interface User {
    id: string,
    name: string
}

const users: User[] = []

const server = new ApolloServer({
    typeDefs,
    resolvers: /* Controllers do REST */ {
        Query: {
            users: () => {
                return users
            }
        },

        Mutation: {
            createUser: (_, args) => {
                const user = {
                    id: randomUUID(),
                    name: args.name
                }

                users.push(user)

                return user
            }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`🦖 HTTP server running on ${url}`)
})
