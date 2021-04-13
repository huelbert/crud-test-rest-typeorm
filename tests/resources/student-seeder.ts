import { getManager } from 'typeorm'

export const id = '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170'

export const studentData = {
  name: 'Fulano de tal',
  phone: '+5535999998888'
}

export function createStudent(): Promise<any> {
  const student = [
    id,
    studentData.name,
    studentData.phone,
    new Date(), // createdAt
    new Date() // updatedAt
  ]

  const sql = `INSERT INTO STUDENTS 
  (id, name, phone, created_at, updated_at) VALUES 
  ($1, $2, $3, $4, $5)`

  return getManager().query(sql, student)
}

export function clearTableStudent(): Promise<any> {
  return getManager().query('DELETE FROM STUDENTS')
}
