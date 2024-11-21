import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenuItem } from '@prisma/client';

@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Get()
    getMenu(): Promise<MenuItem[]> {
        return this.menusService.getMenus();
    }

    @Post()
    addMenuItem(@Body() menuItem: Record<string, any>): Promise<MenuItem[]> {
        return this.menusService.addMenuItem(
            menuItem.name,
            menuItem.description,
            menuItem.price
        );
    }

    @Put()
    updateMenuItem(): string {
        return this.menusService.updateMenuItem();
    }

    @Delete()
    deleteMenuItem(): string {
        return this.menusService.deleteMenuItem();
    }
}
