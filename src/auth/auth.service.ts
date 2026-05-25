import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './auth-register.dto';
import { UserLoginDto } from './auth-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly UserService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register({username, password, role_id}: RegisterUserDto) {
        const existingUser = await this.UserService.findByUsername(username);
        if (existingUser) {
            throw new BadRequestException('Este nombre de usuario ya está en uso');
        }
       const user = await this.UserService.create({
        username, 
        password: await bcrypt.hash(password, 10), // Hash de la contraseña
        role_id
        
    });
       return user;
    }

    async login({username, password}: UserLoginDto) {
        const user = await this.UserService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = {
            username: user.username,
            sub: user.id,
            role_id: user.role_id,
            role_name: user.role?.name
        };
        const token = await this.jwtService.signAsync(payload);
        return{
            access_token: token,
            user: {
                id: user.id,
                username: user.username,
                role_id: user.role_id,
                role_name: user.role?.name
            }
        }
        
    }
}
