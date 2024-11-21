import { Injectable } from '@nestjs/common';
import { MenuItem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenusService {
	constructor(private readonly prisma: PrismaService) {}

	async getMenus(): Promise<MenuItem[]> {
		return await this.prisma.menuItem.findMany();
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

	updateMenuItem(): string {
		return 'Menu Item Updated!';
	}

	deleteMenuItem(): string {
		return 'Menu Item Deleted!';
	}
}
