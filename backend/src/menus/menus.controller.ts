import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenuItem } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('menus')
@UseGuards(RolesGuard)
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Get()
    @Roles('ADMIN', 'EDITOR')
    getMenu(): Promise<MenuItem[]> {
        return this.menusService.getMenus();
    }

    @Post()
    @Roles('ADMIN')
    addMenuItem(@Body() menuItem: Record<string, any>): Promise<MenuItem> {
        return this.menusService.addMenuItem(
            menuItem.name,
            menuItem.description,
            menuItem.price
        );
    }

    @Put(':id')
    @Roles('ADMIN')
    updateMenuItem(
        @Param('id') id: number,
        @Body() menuItem: Record<string, any>
    ): Promise<MenuItem> {
        return this.menusService.updateMenuItem(+id, menuItem.name, menuItem.description, menuItem.price);
    }

    @Delete(':id')
    @Roles('ADMIN')
    deleteMenuItem(@Param('id') id: number) {
        return this.menusService.deleteMenuItem(+id);
    }
}
