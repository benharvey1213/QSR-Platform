import { Module } from '@nestjs/common';
import { MenusController } from './menus/menus.controller';
import { MenusService } from './menus/menus.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
    imports: [AuthModule, UsersModule, PrismaModule],
    controllers: [MenusController, AuthController],
    providers: [MenusService, AuthService, PrismaService],
})

export class AppModule {}