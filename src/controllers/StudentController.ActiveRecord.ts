import { Request, Response } from 'express'

import Student from '../entities/Student.ActiveRecord'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await Student.find({
        select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const student = await Student.findOne(req.params.id, {
      select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
    })

    return res.status(student ? 200 : 404).json(student)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const body: Student = req.body
    const student = Student.create(body)
    const doc = await Student.save(student)

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
    await Student.update(req.params.id, req.body)
    const student = await Student.findOne(req.params.id, {
      select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
    })

    return res.status(student ? 200 : 404).json(student)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await Student.delete(req.params.id)

    return res.json(result)
  }
}
