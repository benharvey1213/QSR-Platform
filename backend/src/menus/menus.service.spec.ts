import { Test, TestingModule } from '@nestjs/testing';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MenuItem, Role } from '@prisma/client';
import { RolesGuard } from '../roles/roles.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';

describe('MenusController', () => {
	let controller: MenusController;
	let service: MenusService;

	const mockMenusService = {
		getMenus: jest.fn(),
		getMenuItem: jest.fn(),
		addMenuItem: jest.fn(),
		updateMenuItem: jest.fn(),
		deleteMenuItem: jest.fn(),
	};
	
	const mockAuthService = {
		getUserRole: jest.fn().mockResolvedValue(Role.ADMIN),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
		controllers: [MenusController],
		providers: [
			{
				provide: MenusService,
				useValue: mockMenusService,
			},
			RolesGuard,
			Reflector,
			{
				provide: AuthService,
				useValue: mockAuthService,
			}
		],
		}).compile();

		controller = module.get<MenusController>(MenusController);
		service = module.get<MenusService>(MenusService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getMenu', () => {
		it('should return a list of menu items', async () => {
		const result: MenuItem[] = [
			{
			id: 1,
			name: 'Item 1',
			description: 'Desc 1',
			price: 10,
			createdAt: new Date(),
			updatedAt: new Date(),
			},
		];
		mockMenusService.getMenus.mockResolvedValue(result);

		expect(await controller.getMenu()).toBe(result);
		expect(service.getMenus).toHaveBeenCalled();
		});
	});

	describe('getMenuItem', () => {
		it('should return a menu item', async () => {
			const result: MenuItem = {
				id: 1,
				name: 'Item 1',
				description: 'Desc 1',
				price: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			mockMenusService.getMenuItem.mockResolvedValue(result);

			expect(await controller.getMenuItem(1)).toBe(result);
			expect(service.getMenuItem).toHaveBeenCalledWith(1);
		})
	});

	describe('addMenuItem', () => {
		it('should add a menu item', async () => {
			const menuItem = { name: 'New Item', description: 'New Description', price: 14.99 }
			const result = { id: 1, ...menuItem, createdAt: new Date(), updatedAt: new Date() }
			mockMenusService.addMenuItem.mockResolvedValue(result);

			expect(await controller.addMenuItem(menuItem)).toBe(result);
			expect(service.addMenuItem).toHaveBeenCalledWith(menuItem.name, menuItem.description, menuItem.price);
		})
	});

	describe('updateMenuItem', () => {
		it('should upate a menu item', async () => {
			const menuItem = { name: 'Update Item', description: 'Updated Description', price: 15.99 }
			const result = { id: 1, ...menuItem, createdAt: new Date(), updatedAt: new Date() }
			mockMenusService.updateMenuItem.mockResolvedValue(result);

			expect(await controller.updateMenuItem(1, menuItem)).toBe(result);
			expect(service.updateMenuItem).toHaveBeenCalledWith(1, menuItem.name, menuItem.description, menuItem.price);
		})
	});

	describe('deleteMenuItem', () => {
		it('should delete a menu item', async () => {
			mockMenusService.deleteMenuItem.mockResolvedValue(true);

			expect(await controller.deleteMenuItem(1)).toBe(true);
			expect(service.deleteMenuItem).toHaveBeenCalledWith(1);
		})
	});
});
