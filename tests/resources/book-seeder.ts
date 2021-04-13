import { getManager } from 'typeorm'

export const id = '180a1b2a-66f5-4ed6-859b-8f411d9ce170'

export const bookData = {
  name: 'Livro X'
}

export function createBook(): Promise<any> {
  const book = [
    id,
    bookData.name,
    new Date(), // createdAt
    new Date() // updatedAt
  ]

  const sql = `INSERT INTO BOOKS 
  (id, name, created_at, updated_at) VALUES 
  ($1, $2, $3, $4)`

  return getManager().query(sql, book)
}

export function clearTableBook(): Promise<any> {
  return getManager().query('DELETE FROM BOOKS')
}
