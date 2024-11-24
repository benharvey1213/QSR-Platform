import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MenuItem } from '@prisma/client';

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MenusService {
	constructor(private readonly prisma: PrismaService) {}

	async getMenus(): Promise<MenuItem[]> {
		return await this.prisma.menuItem.findMany();
	}

	async getMenuItem(id: number): Promise<MenuItem> {
		const menuItem = await this.prisma.menuItem.findUnique({
			where: { id }
		});

		if (!menuItem) {
			throw new NotFoundException('Menu item not found');
		}

		return menuItem;
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
		if (!id) {
			throw new BadRequestException('No ID provided');
		}
		
		let updateData = {};

		if (name) updateData['name'] = name;
		if (description) updateData['description'] = description;
		if (price !== undefined && price !== null) updateData['price'] = +price;

		// check if menu item exists
		const menuItem = await this.prisma.menuItem.findUnique({
			where: { id }
		});

		if (!menuItem) {
			throw new NotFoundException('Menu item not found');
		}

		return await this.prisma.menuItem.update({
			where: { id },
			data: updateData
		});
	}

	async deleteMenuItem(id: number) {
		if (!id) {
			throw new BadRequestException('No ID provided');
		}

		const menuItem = await this.prisma.menuItem.findUnique({
			where: { id }
		});

		if (!menuItem) {
			throw new NotFoundException('Menu item not found');
		}

		return this.prisma.menuItem.delete({
			where: { id }
		});
	}
}
