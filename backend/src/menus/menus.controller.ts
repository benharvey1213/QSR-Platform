import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Get()
    getMenu(): string {
        return this.menusService.getMenus();
    }

    @Post()
    addMenuItem(): string {
        return this.menusService.addMenuItem();
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
