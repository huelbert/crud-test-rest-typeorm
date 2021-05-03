import { GQL, Variables } from '../interfaces/graphql'

export const BOOKS = (variables?: Variables): GQL => ({
  query: `
    query books {
      books {
        name
      }
    }
  `,
  variables
})

export const BOOK = (variables?: Variables): GQL => ({
  query: `
    query book($id: ID!) {
      book(id: $id) {
        name
      }
    }
  `,
  variables
})

export const CREATE_BOOK = (variables?: Variables): GQL => ({
  query: `
    mutation createBook($name: String!) {
      createBook(book: { name: $name }) {
        name
      }
    }
  `,
  variables
})

export const UPDATE_BOOK = (variables?: Variables): GQL => ({
  query: `
    mutation updateBook($id: ID!, $name: String) {
      updateBook(id: $id, book: { name: $name }) {
        name
      }
    }
  `,
  variables
})

export const DELETE_BOOK = (variables?: Variables): GQL => ({
  query: `
    mutation deleteBook($id: ID!) {
      deleteBook(id: $id) {
        status
      }
    }
  `,
  variables
})
