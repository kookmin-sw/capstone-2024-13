import {
	BadRequestException,
	Body,
	Controller,
	Delete,
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
import AlbumService from '../album/album.service';
import UserService from '../user/user.service';
import * as Dto from '../../common/dto';
import { UserDocument } from 'src/common/database/schema';

@Controller('auth')
@ApiTags('auth')
class AuthController {
	constructor(
		private readonly configService: ConfigService,
		private readonly cookieService: CookieService,
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly albumService: AlbumService,
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
	async googleOAuth2Callback(@Request() req: any, @Response() res: any): Promise<void> {
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
	async login(@Request() req: any, @Response() res: any) {
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
	@ApiOkResponse({ description: 'User registered' })
	@ApiBadRequestResponse({ description: 'User already registered' })
	@ApiBadRequestResponse({ description: 'Failed to register' })
	async register(
		@Request() req: any,
		@Body() createRequestDto: Dto.Request.Create<any>,
		@Response() res: any,
	) {
		try {
			let user = await this.authService.login(req.user.email);
			if (user) {
				throw new BadRequestException('User already registered');
			}

			createRequestDto.doc = { email: req.user.email, ...createRequestDto.doc };
			user = await this.authService.register(createRequestDto as Dto.Request.Create<UserDocument>);
			if (!user) {
				throw new BadRequestException('Failed to register');
			}

			const album = await this.albumService.create({ doc: { userId: user._id, title: 'Recents' } });
			if (!album) {
				throw new BadRequestException('Failed to create album');
			}

			user = await this.userService.findByIdAndUpdate({
				id: user._id,
				update: { albumId: album._id },
			});
			if (!user) {
				throw new BadRequestException('Failed to update user');
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

	@Post('logout')
	@ApiOperation({ summary: 'Logout', description: 'Logout from service' })
	@ApiOkResponse({ description: 'User logged out' })
	@ApiBadRequestResponse({ description: 'Failed to logout' })
	async logout(@Request() req: any, @Response() res: any) {
		try {
			const cookieOption = this.cookieService.getCookieOption();
			res.clearCookie('accessToken', cookieOption);
			res.json({ message: 'User logged out' });
		} catch (error) {
			throw new BadRequestException(`Failed to logout: ${error.message}`);
		}
	}
}

export default AuthController;
