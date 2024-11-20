import { Injectable } from '@nestjs/common';

@Injectable()
export class MenusService {
	getMenus(): string {
		return 'Hello Menus!';
	}

	addMenuItem(): string {
		return 'Menu Item Added!';
	}

	updateMenuItem(): string {
		return 'Menu Item Updated!';
	}

	deleteMenuItem(): string {
		return 'Menu Item Deleted!';
	}
}
