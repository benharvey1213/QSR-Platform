import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';

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
}
