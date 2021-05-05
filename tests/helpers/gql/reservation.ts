import { GQL, Variables } from '../interfaces/graphql'

export const RESERVATIONS = (variables?: Variables): GQL => ({
  query: `
    query reservations {
      reservations {
        student {
          name
          phone
        }
        book {
          name
        }
        reservationDate
        returnDate
      }
    }
  `,
  variables
})

export const RESERVATION = (variables?: Variables): GQL => ({
  query: `
    query reservation($id: ID!) {
      reservation(id: $id) {
        student {
          name
          phone
        }
        book {
          name
        }
        reservationDate
        returnDate
      }
    }
  `,
  variables
})

export const CREATE_RESERVATION = (variables?: Variables): GQL => ({
  query: `
    mutation createReservation($studentId: String!, $bookId: String!) {
      createReservation(reservation: { studentId: $studentId, bookId: $bookId }) {
        student {
          name
          phone
        }
        book {
          name
        }
      }
    }
  `,
  variables
})

export const UPDATE_RESERVATION = (variables?: Variables): GQL => ({
  query: `
    mutation updateReservation($id: ID!, $returnDate: DateTime!) {
      updateReservation(id: $id, reservation: { returnDate: $returnDate }) {
        student {
          name
          phone
        }
        book {
          name
        }
        returnDate
      }
    }
  `,
  variables
})

export const DELETE_RESERVATION = (variables?: Variables): GQL => ({
  query: `
    mutation deleteReservation($id: ID!) {
      deleteReservation(id: $id) {
        status
      }
    }
  `,
  variables
})
