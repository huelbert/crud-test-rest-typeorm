import { Field, InputType } from 'type-graphql'

import Reservation from './Reservation.DataMapper'

@InputType()
export default class ReservationCreate extends Reservation {
  @Field()
  public studentId: string

  @Field()
  public bookId: string
}
