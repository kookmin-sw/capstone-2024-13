import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
class GoogleJwtStrategy extends PassportStrategy(Strategy, 'google-jwt') {
	constructor() {
		const configService = new ConfigService();

		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request.cookies['google-token'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
		});
	}

	async validate(payload: any, done: (err: Error, data: any) => void) {
		try {
			if (!payload) {
				throw new BadRequestException('Invalid token');
			}

			const { user } = payload;

			if (!user || !user.email || !user.nickname) {
				throw new BadRequestException('Invalid payload');
			}

			done(null, user);
		} catch (error) {
			done(error, null);
		}
	}
}

export default GoogleJwtStrategy;
