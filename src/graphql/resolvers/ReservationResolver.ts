import {
  Arg,
  FieldResolver,
  ID,
  Info,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { getRepository } from 'typeorm'

import Reservation from '../../entities/Reservation.DataMapper'
import ReservationCreate from '../../entities/ReservationCreate'
import ReservationUpdate from '../../entities/ReservationUpdate'
import Result from '../../entities/Result'
import Book from '../../entities/Book.DataMapper'
import Student from '../../entities/Student.DataMapper'

import fs from 'fs'

@Resolver(() => Reservation)
export default class ReservationResolver {
  private readonly reservationRepo = getRepository(Reservation)
  private readonly bookRepo = getRepository(Book)
  private readonly studentRepo = getRepository(Student)

  @Query(() => [Reservation])
  public async reservations(): Promise<Reservation[]> {
    return this.reservationRepo.find()
  }

  @Query(() => Reservation, { nullable: true })
  public async reservation(
    @Arg('id', () => ID) id: string
  ): Promise<Reservation | undefined> {
    return this.reservationRepo.findOne(id)
  }

  @Mutation(() => Reservation)
  public async createReservation(
    @Arg('reservation') input: ReservationCreate
  ): Promise<Reservation> {
    const reservation = this.reservationRepo.create(input)
    return this.reservationRepo.save(reservation)
  }

  @Mutation(() => Reservation, { nullable: true })
  public async updateReservation(
    @Arg('id', () => ID) id: string,
    @Arg('reservation') input: ReservationUpdate
  ): Promise<Reservation | undefined> {
    await this.reservationRepo.update({ id }, input)
    return this.reservationRepo.findOne({ id })
  }

  @Mutation(() => Result)
  public async deleteReservation(
    @Arg('id', () => ID) id: string
  ): Promise<Result> {
    const result = await this.reservationRepo.delete(id)

    return { status: !!result.affected }
  }

  @FieldResolver(() => Book)
  public async book(@Root() parent: Reservation): Promise<Book> {
    const book = await this.bookRepo.findOneOrFail({ id: parent.bookId })

    return book
  }

  @FieldResolver(() => Student)
  public async student(@Root() parent: Reservation): Promise<Student> {
    const student = await this.studentRepo.findOneOrFail({
      where: { id: parent.studentId }
    })

    return student
  }
}
