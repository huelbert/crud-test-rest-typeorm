import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Student from '../entities/Student.DataMapper'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getRepository(Student).find({
        select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const student = await getRepository(Student).findOne(req.params.id, {
      select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
    })

    return res.status(student ? 200 : 404).json(student)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const body: Student = req.body
    const repository = getRepository(Student)
    const student = repository.create(body)
    const doc = await repository.save(student)

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
    const repository = getRepository(Student)
    await repository.update(req.params.id, req.body)
    const student = await repository.findOne(req.params.id, {
      select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
    })

    return res.status(student ? 200 : 404).json(student)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getRepository(Student).delete(req.params.id)

    return res.json(result)
  }
}
