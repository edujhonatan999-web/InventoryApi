import { IsString, IsNotEmpty, MaxLength, IsInt } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsInt()
  role_id!: number;
}