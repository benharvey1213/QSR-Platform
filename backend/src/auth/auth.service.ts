import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

	async signIn(email: string, pass: string): Promise<{ access_token: string, role: Role }> {
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
			role: user.role,
		}
	}

	async register(email: string, password: string, role: Role): Promise<{ access_token: string }> {
		const hashedPassword = await this.hashPassword(password);

		if (await this.usersService.findOne(email)) {
			throw new UnauthorizedException('User already exists');
		}

		if (!role) {
			throw new BadRequestException('Role missing');
		}

		if (!Role[role]) {
			throw new BadRequestException('Invalid role');
		}

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
		  	throw new BadRequestException('Token missing');
		}

		let decodedToken : any;

		try {
		  	decodedToken = this.jwtService.verify(token);
		}
		catch (error) {
		  	throw new UnauthorizedException('Invalid token');
		}

		const userId = decodedToken.sub;

		if (!userId) {
			throw new BadRequestException('User ID missing in token')
		}

		const user = await this.usersService.findByID(userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async verifyToken(token: string) {
		if (!token) {
			throw new BadRequestException('Token missing');
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