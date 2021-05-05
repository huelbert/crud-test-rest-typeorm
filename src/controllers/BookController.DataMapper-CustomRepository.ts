import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import BookRepository from '../repositories/BookRepoitory'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    const book = await getCustomRepository(BookRepository).find({
      select: ['id', 'name', 'createdAt', 'updatedAt']
    })
    return res.json(book)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const book = await getCustomRepository(BookRepository).findOne(
      req.params.id,
      {
        select: ['id', 'name', 'createdAt', 'updatedAt']
      }
    )

    return res.status(book ? 200 : 404).json(book)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const book = await getCustomRepository(BookRepository).createAndReturn(
      req.body
    )

    return res.status(201).json(book)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const book = await getCustomRepository(BookRepository).updateAndReturn(
      { id: req.params.id },
      req.body
    )

    return res.status(book ? 200 : 404).json(book)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getCustomRepository(BookRepository).delete(
      req.params.id
    )

    return res.json(result)
  }
}
