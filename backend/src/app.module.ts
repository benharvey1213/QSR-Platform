import { Module } from '@nestjs/common';
import { MenusController } from './menus/menus.controller';
import { MenusService } from './menus/menus.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [],
    controllers: [MenusController, AuthController],
    providers: [MenusService, AuthService],
})

export class AppModule {}