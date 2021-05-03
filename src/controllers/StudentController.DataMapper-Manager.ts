import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import Student from '../entities/Student.DataMapper'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getManager().find(Student, {
        select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const student = await getManager().findOne(Student, req.params.id, {
      select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
    })

    return res.status(student ? 200 : 404).json(student)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const manager = getManager()
    const student = manager.create(Student, req.body)
    const doc = await manager.save(Student, student)

    const { id, name, phone, createdAt, updatedAt } = doc

    return res.status(201).json({
      id,
      name,
      phone,
      createdAt,
      updatedAt
    })
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const manager = getManager()
    await manager.update(Student, req.params.id, req.body)
    const student = await manager.findOne(Student, req.params.id, {
      select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
    })

    return res.status(student ? 200 : 404).json(student)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getManager().delete(Student, req.params.id)

    return res.json(result)
  }
}
