import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Role } from '@prisma/client';

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

	async register(email: string, password: string, role: Role): Promise<{ access_token: string }> {
		const hashedPassword = await this.hashPassword(password);

		const user = await this.usersService.create(email, hashedPassword, role);

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

	async getUserFromToken(token: string) {
		if (!token) {
		  	throw new UnauthorizedException('Token missing');
		}

		let decodedToken : any;

		try {
		  	decodedToken = this.jwtService.verify(token); // Verify the token
		}
		catch (error) {
		  	throw new UnauthorizedException('Invalid token');
		}

		const userId = decodedToken.sub;

		if (!userId) {
			throw new UnauthorizedException('User ID missing in token')
		}

		const user = await this.usersService.findByID(userId);

		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		return user;
	}

	async verifyToken(token: string) {
		if (!token) {
			throw new UnauthorizedException('Token missing');
		}

		try {
			this.jwtService.verify(token);
			return {
				message: 'Token is valid',
			};
		}
		catch (error) {
			throw new UnauthorizedException('Invalid token');
		}
	}
}