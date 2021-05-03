import { getManager } from 'typeorm'

export const bookId = '180a1b2a-66f5-4ed6-859b-8f411d9ce170'

export const bookData = {
  id: bookId,
  name: 'Livro X'
}

export function createBook(): Promise<any> {
  const book = [
    bookData.id,
    bookData.name,
    new Date(2021, 0, 1, 10, 30, 0), // createdAt
    new Date(2021, 0, 1, 10, 30, 0) // updatedAt
  ]

  const sql = `INSERT INTO BOOKS 
  (id, name, created_at, updated_at) VALUES 
  ($1, $2, $3, $4)`

  return getManager().query(sql, book)
}

export function clearTableBook(): Promise<any> {
  return getManager().query('DELETE FROM BOOKS')
}
