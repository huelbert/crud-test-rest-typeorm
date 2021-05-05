import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import StudentRepository from '../repositories/StudentRepoitory'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    const student = await getCustomRepository(StudentRepository).find({
      select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
    })
    return res.json(student)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const student = await getCustomRepository(StudentRepository).findOne(
      req.params.id,
      {
        select: ['id', 'name', 'phone', 'createdAt', 'updatedAt']
      }
    )

    return res.status(student ? 200 : 404).json(student)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const student = await getCustomRepository(
      StudentRepository
    ).createAndReturn(req.body)

    return res.status(201).json(student)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const student = await getCustomRepository(
      StudentRepository
    ).updateAndReturn({ id: req.params.id }, req.body)

    return res.status(student ? 200 : 404).json(student)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getCustomRepository(StudentRepository).delete(
      req.params.id
    )

    return res.json(result)
  }
}
