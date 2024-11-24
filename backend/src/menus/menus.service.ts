import { Injectable } from '@nestjs/common';
import { MenuItem } from '@prisma/client';

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MenusService {
	constructor(private readonly prisma: PrismaService) {}

	async getMenus(): Promise<MenuItem[]> {
		return await this.prisma.menuItem.findMany();
	}

	async getMenuItem(id: number): Promise<MenuItem> {
		return await this.prisma.menuItem.findUnique({
			where: { id }
		});
	}

	async addMenuItem(name: string, description: string, price: number): Promise<MenuItem> {
		return await this.prisma.menuItem.create({
			data: {
				name,
				description,
				price
			}
		});
	}

	async updateMenuItem(id: number, name?: string, description?: string, price?: number): Promise<MenuItem> {
		if (!id) return null;
		
		let updateData = {};

		if (name) updateData['name'] = name;
		if (description) updateData['description'] = description;
		if (price !== undefined && price !== null) updateData['price'] = +price;

		return await this.prisma.menuItem.update({
			where: { id },
			data: updateData
		});
	}

	deleteMenuItem(id: number) {
		return this.prisma.menuItem.delete({
			where: { id }
		});
	}
}
