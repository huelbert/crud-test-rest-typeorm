import { Field, InputType } from 'type-graphql'

import Reservation from './Reservation.DataMapper'

@InputType()
export default class ReservationUpdate implements Partial<Reservation> {
  @Field({ nullable: true })
  public returnDate?: Date
}
