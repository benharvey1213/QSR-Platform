import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private authService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
    	const authHeader = request.headers.authorization;
		const token = authHeader.split(' ')[1];

		try {
			const user = await this.authService.getUserFromToken(token);
			return roles.some((role) => user?.role === role);
		}
		catch (error) {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
