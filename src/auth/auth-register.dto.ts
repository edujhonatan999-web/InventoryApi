import { Transform } from "class-transformer"
import { IsInt, IsString, Min, MinLength } from "class-validator"


export class RegisterUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    username!: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    password!: string

    @IsInt()
    role_id!: number
}