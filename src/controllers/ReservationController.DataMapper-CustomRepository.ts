import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import ReservationRepository from '../repositories/ReservationRepoitory'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    const reservation = await getCustomRepository(ReservationRepository).find({
      select: [
        'id',
        'studentId',
        'bookId',
        'reservationDate',
        'returnDate',
        'createdAt',
        'updatedAt'
      ]
    })

    return res.json(reservation)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const reservation = await getCustomRepository(
      ReservationRepository
    ).findOne(req.params.id, {
      select: [
        'id',
        'studentId',
        'bookId',
        'reservationDate',
        'returnDate',
        'createdAt',
        'updatedAt'
      ]
    })

    return res.status(reservation ? 200 : 404).json(reservation)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const reservation = await getCustomRepository(
      ReservationRepository
    ).createAndReturn(req.body)

    return res.status(201).json(reservation)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const reservation = await getCustomRepository(
      ReservationRepository
    ).updateAndReturn({ id: req.params.id }, req.body)

    return res.status(reservation ? 200 : 404).json(reservation)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getCustomRepository(ReservationRepository).delete(
      req.params.id
    )

    return res.json(result)
  }
}
