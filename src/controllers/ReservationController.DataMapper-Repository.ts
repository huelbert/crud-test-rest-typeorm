import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Reservation from '../entities/Reservation.DataMapper'

export default class ReservationController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getRepository(Reservation).find({
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
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const reservation = await getRepository(Reservation).findOne(
      req.params.id,
      {
        select: [
          'id',
          'studentId',
          'bookId',
          'reservationDate',
          'returnDate',
          'createdAt',
          'updatedAt'
        ]
      }
    )

    return res.status(reservation ? 200 : 404).json(reservation)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const body: Reservation = req.body
    const repository = getRepository(Reservation)
    const reservation = repository.create(body)
    const doc = await repository.save(reservation)

    const {
      id,
      studentId,
      bookId,
      reservationDate,
      returnDate,
      createdAt,
      updatedAt
    } = doc

    return res.status(201).json({
      id,
      studentId,
      bookId,
      reservationDate,
      returnDate,
      createdAt,
      updatedAt
    })
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Reservation)
    await repository.update(req.params.id, req.body)
    const reservation = await repository.findOne(req.params.id, {
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

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getRepository(Reservation).delete(req.params.id)

    return res.json(result)
  }
}
