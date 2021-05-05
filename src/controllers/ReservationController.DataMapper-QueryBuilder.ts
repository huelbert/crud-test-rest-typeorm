import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'

import Reservation from '../entities/Reservation.DataMapper'
import uuid from '../utils/uuid'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    const reservations = await createQueryBuilder()
      .select([
        'reservations.id',
        'reservations.studentId',
        'reservations.bookId',
        'reservations.reservationDate',
        'reservations.returnDate',
        'reservations.createdAt',
        'reservations.updatedAt'
      ])
      .from(Reservation, 'reservations')
      .getMany()

    return res.json(reservations)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const reservation = await createQueryBuilder()
      .select([
        'reservation.id',
        'reservation.studentId',
        'reservation.bookId',
        'reservation.reservationDate',
        'reservation.returnDate',
        'reservation.createdAt',
        'reservation.updatedAt'
      ])
      .from(Reservation, 'reservation')
      .where('reservation.id = :id', { id: req.params.id })
      .getOne()

    return res.status(reservation ? 200 : 404).json(reservation)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .insert()
      .into(Reservation)
      .values({
        ...req.body,
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning([
        'id',
        'studentId',
        'bookId',
        'reservationDate',
        'returnDate',
        'createdAt',
        'updatedAt'
      ])
      .execute()

    const reservation = result.generatedMaps[0]

    return res.status(201).json(reservation)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    await createQueryBuilder()
      .update(Reservation)
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .returning([
        'id',
        'studentId',
        'bookId',
        'reservationDate',
        'returnDate',
        'createdAt',
        'updatedAt'
      ])
      .execute()

    const reservation = await createQueryBuilder()
      .select([
        'reservation.id',
        'reservation.studentId',
        'reservation.bookId',
        'reservation.reservationDate',
        'reservation.returnDate',
        'reservation.createdAt',
        'reservation.updatedAt'
      ])
      .from(Reservation, 'reservation')
      .where('reservation.id = :id', { id: req.params.id })
      .getOne()

    return res.status(reservation ? 200 : 404).json(reservation)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .delete()
      .from(Reservation)
      .where('id = :id', { id: req.params.id })
      .execute()

    return res.json(result)
  }
}
