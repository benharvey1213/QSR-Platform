import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';

describe('AuthService', () => {
	let authService: AuthService;
	let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
	let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

	beforeEach(async () => {
		usersService = {
			findOne: jest.fn(),
			create: jest.fn(),
			findByID: jest.fn(),
		}

		jwtService = {
			signAsync: jest.fn(),
			verify: jest.fn(),
		}

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: UsersService, useValue: usersService },
				{ provide: JwtService, useValue: jwtService },
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
	});

	describe('signIn', () => {
		it('should return an access token for valid credentials', async () => {
			const user = { id: 1, email: 'test@example.com', password: 'hashedpassword' }

			usersService.findOne.mockResolvedValue(user);
			jest.spyOn(authService, 'comparePassword').mockResolvedValue(true);
			jwtService.signAsync.mockResolvedValue('mocked_token');

			const result = await authService.signIn('test@example.com', 'password');

			expect(result).toEqual({ access_token: 'mocked_token' });
			expect(usersService.findOne).toHaveBeenCalledWith('test@example.com')
		})

		it('should throw UnauthorizedException for invalid email', async () => {
			usersService.findOne.mockResolvedValue(null);
			await expect(authService.signIn('invalid@example.com', 'password')).rejects.toThrow(UnauthorizedException);
		})

		it('should throw UnauthorizedException for invalid password', async () => {
			const user = { id: 1, email: 'test@example.com', password: 'hashedpassword' }
			usersService.findOne.mockResolvedValue(user);
			jest.spyOn(authService, 'comparePassword').mockResolvedValue(false);
			await expect(authService.signIn('test@example.com', 'wrongpassword')).rejects.toThrow(UnauthorizedException);
		})
	})

	describe('register', () => {
		it('should create a user and return an access token', async () => {
			const hashedPassword = 'hashedpassword';
			const user = { id: 1, email: 'test@example.com', password: hashedPassword, role: Role.ADMIN }
			jest.spyOn(authService, 'hashPassword').mockResolvedValue(hashedPassword);
			usersService.create.mockResolvedValue(user);
			jwtService.signAsync.mockResolvedValue('mocked_token');

			const result = await authService.register('test@example.com', 'password', Role.ADMIN);

			expect(result).toEqual({ access_token: 'mocked_token' });
			expect(usersService.create).toHaveBeenCalledWith('test@example.com', hashedPassword, Role.ADMIN);
		})
	})

	describe('getUserFromToken', () => {
		it('should return a user for a valid token', async () => {
			const user = { id: 1, email: 'test@example.com', role: Role.ADMIN }
			jwtService.verify.mockReturnValue({ sub: 1 });
			usersService.findByID.mockResolvedValue(user);

			const result = await authService.getUserFromToken('valid_token');

			expect(result).toEqual(user);
			expect(jwtService.verify).toHaveBeenCalledWith('valid_token');
			expect(usersService.findByID).toHaveBeenCalledWith(1);
		})

		it('should throw UnauthorizedException for invalid token', async () => {
			jwtService.verify.mockImplementation(() => {
				throw new Error('Invalid token');
			})

			await expect(authService.getUserFromToken('invalid_token')).rejects.toThrow(UnauthorizedException);
		})

		it('should throw UnauthorizedException if user is not found', async () => {
			jwtService.verify.mockReturnValue({ sub: 1 });
			usersService.findByID.mockResolvedValue(null);

			await expect(authService.getUserFromToken('valid_token')).rejects.toThrow(UnauthorizedException);
		})
	})

	describe('verifyToken', () => {
		it('should throw UnauthorizedException if token is missing', async () => {
			await expect(authService.verifyToken('')).rejects.toThrow(UnauthorizedException);
			await expect(authService.verifyToken('')).rejects.toThrow('Token missing');
		});

		it('should return a message if the token is valid', async () => {
			const token = 'valid-token';
			jwtService.verify.mockReturnValue(true); // Simulating a valid token
	  
			const result = await authService.verifyToken(token);
	  
			expect(result).toEqual({ message: 'Token is valid' });
			expect(jwtService.verify).toHaveBeenCalledWith(token); // Ensure verify was called with the token
		});

		it('should throw UnauthorizedException if the token is invalid', async () => {
			const token = 'invalid-token';
			jwtService.verify.mockImplementation(() => {
			  throw new Error('Invalid token'); // Simulating an invalid token
			});
	  
			await expect(authService.verifyToken(token)).rejects.toThrow(UnauthorizedException);
			await expect(authService.verifyToken(token)).rejects.toThrow('Invalid token');
		});
	})
});
