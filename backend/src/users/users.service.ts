import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	hashPassword(password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			resolve(password);
		});
	}

	async create(email: string, hashedPassword: string, role: Role): Promise<User> {
		return this.prisma.user.create({
			data: {
				email: email,
				password: hashedPassword,
				role,
			},
		});
	}

	async findOne(email: string): Promise<User | undefined> {
		if (!email) {
			return undefined;
		}
		
		return this.prisma.user.findUnique({
			where: {
				email: email,
			},
		});
	}

	async findByID(id: number): Promise<User | undefined> {
		return this.prisma.user.findUnique({
			where: {
				id: id,
			},
		});
	}

	async getProfile(user: any): Promise<User | undefined> {
		const thisUser = await this.prisma.user.findUnique({
			where: {
				id: user.sub,
			},
		});

		return {
			...user,
			role: thisUser?.role,
		}
	}
}
