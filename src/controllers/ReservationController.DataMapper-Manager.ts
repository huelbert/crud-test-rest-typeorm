import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import Reservation from '../entities/Reservation.DataMapper'

export default class ReservationController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getManager().find(Reservation, {
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
    const reservation = await getManager().findOne(Reservation, req.params.id, {
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
    const manager = getManager()
    const reservation = manager.create(Reservation, req.body)
    const doc = await manager.save(Reservation, reservation)

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
    const manager = getManager()
    await manager.update(Reservation, req.params.id, req.body)
    const reservation = await manager.findOne(Reservation, req.params.id, {
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
    const result = await getManager().delete(Reservation, req.params.id)

    return res.json(result)
  }
}
