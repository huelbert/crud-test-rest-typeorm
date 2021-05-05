import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { getRepository } from 'typeorm'

import Student from '../../entities/Student.DataMapper'
import StudentCreate from '../../entities/StudentCreate'
import StudentUpdate from '../../entities/StudentUpdate'
import Result from '../../entities/Result'

@Resolver(() => Student)
export default class StudentResolver {
  private readonly studentRepo = getRepository(Student)

  @Query(() => [Student])
  public async students(): Promise<Student[]> {
    return this.studentRepo.find()
  }

  @Query(() => Student, { nullable: true })
  public async student(
    @Arg('id', () => ID) id: string
  ): Promise<Student | undefined> {
    return this.studentRepo.findOne(id)
  }

  @Mutation(() => Student)
  public async createStudent(
    @Arg('student') input: StudentCreate
  ): Promise<Student> {
    const student = this.studentRepo.create(input)
    return this.studentRepo.save(student)
  }

  @Mutation(() => Student, { nullable: true })
  public async updateStudent(
    @Arg('id', () => ID) id: string,
    @Arg('student') input: StudentUpdate
  ): Promise<Student | undefined> {
    await this.studentRepo.update({ id }, input)
    return this.studentRepo.findOne({ id })
  }

  @Mutation(() => Result)
  public async deleteStudent(@Arg('id', () => ID) id: string): Promise<Result> {
    const result = await this.studentRepo.delete(id)

    return { status: !!result.affected }
  }
}
