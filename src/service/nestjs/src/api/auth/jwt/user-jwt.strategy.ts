import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User } from 'src/common/database/schema';
import UserService from 'src/api/user/user.service';

@Injectable()
class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
	constructor(private readonly userService: UserService) {
		const configService = new ConfigService();

		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request.cookies['accessToken'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
		});
	}

	async validate(payload: any, done: (err: Error, data: User) => void) {
		try {
			const user = await this.userService.findByEmail(payload.email);
			if (!user) {
				throw new NotFoundException('User not found');
			}

			done(null, user);
		} catch (error) {
			done(error, null);
		}
	}
}

export default UserJwtStrategy;
