import { GQL, Variables } from '../interfaces/graphql'

export const STUDENTS = (variables?: Variables): GQL => ({
  query: `
    query students {
      students {
        name
        phone
      }
    }
  `,
  variables
})

export const STUDENT = (variables?: Variables): GQL => ({
  query: `
    query student($id: ID!) {
      student(id: $id) {
        name
        phone
      }
    }
  `,
  variables
})

export const CREATE_STUDENT = (variables?: Variables): GQL => ({
  query: `
    mutation createStudent($name: String!, $phone: String) {
      createStudent(student: { name: $name, phone: $phone }) {
        name
        phone
      }
    }
  `,
  variables
})

export const UPDATE_STUDENT = (variables?: Variables): GQL => ({
  query: `
    mutation updateStudent($id: ID!, $name: String, $phone: String) {
      updateStudent(id: $id, student: { name: $name, phone: $phone }) {
        name
        phone
      }
    }
  `,
  variables
})

export const DELETE_STUDENT = (variables?: Variables): GQL => ({
  query: `
    mutation deleteStudent($id: ID!) {
      deleteStudent(id: $id) {
        status
      }
    }
  `,
  variables
})
