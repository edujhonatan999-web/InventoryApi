import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers?.authorization ?? '';
		const [scheme, token] = authHeader.split(' ');

		if (scheme !== 'Bearer' || !token) {
			throw new UnauthorizedException('Token no valido');
		}

		try {
			const payload = await this.jwtService.verifyAsync(token);
			request.user = payload;

			if (payload?.role_id !== 1) {
				throw new ForbiddenException('Solo admin puede crear usuarios');
			}

			return true;
		} catch (error) {
			if (error instanceof ForbiddenException) {
				throw error;
			}
			throw new UnauthorizedException('Token no valido');
		}
	}
}
