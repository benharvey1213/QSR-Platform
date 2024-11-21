import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async signIn(email: string, pass: string): Promise<{ access_token: string }> {
		const user = await this.usersService.findOne(email);

		if (!user) {
			throw new UnauthorizedException();
		}

		const comparedPassword = await this.comparePassword(pass, user.password);

		if (!user || !comparedPassword) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, email: user.email }

		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}

	async hashPassword(password: string) : Promise<string> {
		return hash(password, 10);
	}

	async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
		return compare(plainPassword, hashedPassword);
	}
}