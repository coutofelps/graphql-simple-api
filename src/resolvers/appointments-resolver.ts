import { AppointmentModel } from '../dtos/models/appointment-model'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { CreateAppointmentInput } from '../dtos/inputs/create-appointment-input'
import { CustomerModel } from '../dtos/models/customer-model'

@Resolver(() => AppointmentModel)
export class AppointmentsResolver {
    @Query(() => [AppointmentModel])
    async appointments() {
        return [
            {
                startsAt: new Date(),
                endsAt: new Date()
            }
        ]
    }

    @Mutation(() => AppointmentModel)
    async createAppointment(@Arg('data') data: CreateAppointmentInput) {
        // Chamada para saving no banco de dados pode ser aqui

        const appointment = {
            startsAt: data.startsAt,
            endsAt: data.endsAt
        }

        return appointment
    }

    @FieldResolver(() => CustomerModel)
    async customer(@Root() appoitment: AppointmentModel) {
        console.log(appoitment)

        return {
            name: 'John Doe'
        }
    }
}
