import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    addMenuItem(@Body() menuItem: Record<string, any>): Promise<MenuItem> {
        return this.menusService.addMenuItem(
            menuItem.name,
            menuItem.description,
            menuItem.price
        );
    }

    @Put(':id')
    updateMenuItem(
        @Param('id') id: number,
        @Body() menuItem: Record<string, any>
    ): Promise<MenuItem> {
        return this.menusService.updateMenuItem(+id, menuItem.name, menuItem.description, menuItem.price);
    }

    @Delete(':id')
    deleteMenuItem(@Param('id') id: number) {
        return this.menusService.deleteMenuItem(+id);
    }
}
