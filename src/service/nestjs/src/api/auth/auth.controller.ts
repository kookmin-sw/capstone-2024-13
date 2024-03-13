import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Request,
	Response,
	UseGuards,
} from '@nestjs/common';
import { AuthService, CookieService } from './service';
import { ConfigService } from '@nestjs/config';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../common';
import * as Dto from './dto';
import { User } from 'src/common/database/schema';

@Controller('auth')
@ApiTags('auth')
class AuthController {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
		private readonly cookieService: CookieService,
	) {}

	@Get('google')
	@UseGuards(Auth.Guard.GoogleOAuth2)
	@ApiOperation({ summary: 'Google OAuth2', description: 'Google OAuth2' })
	async googleOAuth2(): Promise<void> {
		return;
	}

	@Get('google/callback')
	@UseGuards(Auth.Guard.GoogleOAuth2)
	@ApiOperation({ summary: 'Google OAuth2 callback', description: 'Google OAuth2 callback' })
	async googleOAuth2Callback(@Request() req, @Response() res): Promise<void> {
		try {
			const jwt = await this.cookieService.createJwt(req.user);
			const cookieOption = this.cookieService.getCookieOption();

			res.cookie('google-token', jwt, cookieOption);
			res.redirect(`${this.configService.getOrThrow('NESTJS_URL')}/auth/login`);
		} catch (error) {
			throw new BadRequestException(
				`Google OAuth2 callback failed: ${error.status}: ${error.message}`,
			);
		}
	}

	@Get('login')
	@UseGuards(Auth.Guard.GoogleJwt)
	@ApiOperation({ summary: 'Login', description: 'Login to service' })
	async login(@Request() req, @Response() res) {
		try {
			const user = await this.authService.login(req.user.email);
			if (!user) {
				res.redirect(
					`${this.configService.getOrThrow('NEXTJS_URL')}/auth/register?nickname=${req.user.nickname}`,
				);
			}

			const jwt = await this.cookieService.createJwt({
				email: user.email,
				nickname: user.nickname,
			});
			const cookieOption = this.cookieService.getCookieOption();

			res.cookie('accessToken', jwt, cookieOption);
			res.redirect(`${this.configService.getOrThrow('NEXTJS_URL')}/auth/login/callback`);
		} catch (error) {
			throw new BadRequestException(`Login failed: ${error.status}: ${error.message}`);
		}
	}

	@Post('register')
	@UseGuards(Auth.Guard.GoogleJwt)
	@ApiOperation({ summary: 'Register', description: 'Register to service' })
	@ApiBadRequestResponse({ description: 'User already registered' })
	@ApiBadRequestResponse({ description: 'Failed to register' })
	@ApiOkResponse({ type: User })
	async register(
		@Request() req,
		@Body() registerRequestDto: Dto.Request.Register,
		@Response() res,
	) {
		try {
			let user = await this.authService.login(req.user.email);
			if (user) {
				throw new BadRequestException('User already registered');
			}

			user = await this.authService.register(req.user.email, registerRequestDto.nickname);
			if (!user) {
				throw new BadRequestException('Failed to register');
			}

			const jwt = await this.cookieService.createJwt({
				email: user.email,
				nickname: user.nickname,
			});
			const cookieOption = this.cookieService.getCookieOption();

			res.cookie('accessToken', jwt, cookieOption);

			res.json(user);
		} catch (error) {
			throw new BadRequestException(`Failed to register: ${error.status}: ${error.message}`);
		}
	}
}

export default AuthController;
