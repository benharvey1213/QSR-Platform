import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Role } from '@prisma/client';

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
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() loginDto: LoginDTO) {
		return this.authService.signIn(loginDto.email, loginDto.password);
	}

	@Post('register')
	register(@Body() registerDto: RegisterDTO) {
		return this.authService.register(registerDto.email, registerDto.password, registerDto.role);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
