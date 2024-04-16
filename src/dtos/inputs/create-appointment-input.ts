import { Field, InputType } from 'type-graphql'
import { IsString, IsDate } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
    @Field()
    @IsString()
    customerId: string;

    @Field()
    @IsDate()
    startsAt: Date;

    @Field()
    @IsDate()
    endsAt: Date;
}
