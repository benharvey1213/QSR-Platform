import { Injectable } from '@nestjs/common';
import { MenuItem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenusService {
	constructor(private readonly prisma: PrismaService) {}

	async getMenus(): Promise<MenuItem[]> {
		const menus = await this.prisma.menuItem.findMany();
		return menus;
	}

	async addMenuItem(name: string, description: string, price: number): Promise<MenuItem> {
		const menuItem = await this.prisma.menuItem.create({
			data: {
				name,
				description,
				price
			}
		});

		return menuItem;
	}

	updateMenuItem(): string {
		return 'Menu Item Updated!';
	}

	deleteMenuItem(): string {
		return 'Menu Item Deleted!';
	}
}
