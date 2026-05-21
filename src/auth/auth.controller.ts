import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './auth-register.dto';
import { UserLoginDto } from './auth-login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() UserLoginDto: UserLoginDto) {
        return this.authService.login(UserLoginDto);
    }

    @Post('register')
    @UseGuards(AuthGuard)
    async register(@Body() RegisterUserDto: RegisterUserDto) {
        return this.authService.register(RegisterUserDto);
    }
}
