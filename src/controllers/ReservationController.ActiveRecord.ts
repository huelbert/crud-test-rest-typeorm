import { Request, Response } from 'express'

import Reservation from '../entities/Reservation.ActiveRecord'

export default class ReservationController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await Reservation.find({
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
    const reservation = await Reservation.findOne(req.params.id, {
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
    const body: Reservation = req.body
    const book = Reservation.create(body)
    const doc = await Reservation.save(book)

    const { id, studentId, bookId, createdAt, updatedAt } = doc

    return res.status(201).json({
      id,
      studentId,
      bookId,
      createdAt,
      updatedAt
    })
  }

  static async update(req: Request, res: Response): Promise<Response> {
    await Reservation.update(req.params.id, req.body)
    const reservation = await Reservation.findOne(req.params.id, {
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
    const result = await Reservation.delete(req.params.id)

    return res.json(result)
  }
}
