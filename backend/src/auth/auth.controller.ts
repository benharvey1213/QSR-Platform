import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { Role } from '@prisma/client';

import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from 'src/roles/roles.decorator';

class LoginDTO {
	email: string;
	password: string;
}

class RegisterDTO {
	email: string;
	password: string;
	role: Role;
}

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService, private userService: UsersService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() loginDto: LoginDTO) {
		return this.authService.signIn(loginDto.email, loginDto.password);
	}

	@Roles('ADMIN')
	@Post('register')
	register(@Body() registerDto: RegisterDTO) {
		console.log(registerDto);
		return this.authService.register(registerDto.email, registerDto.password, registerDto.role);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return this.userService.getProfile(req.user);
	}
}
