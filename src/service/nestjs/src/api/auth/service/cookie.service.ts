import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'express';

@Injectable()
class CookieService {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	getCookieOption(): CookieOptions {
		const maxAge = 24 * 60 * 60 * 1000; // 24 hours

		return this.configService.get('cookie') === 'production'
			? { secure: true, sameSite: 'none', maxAge }
			: { maxAge };
	}

	createJwt<T extends Record<string, string | number | boolean>>(payload: T): string {
		return this.jwtService.sign(payload);
	}

	readJwt<T extends Record<string, string | number | boolean>>(jwt: string): T {
		return this.jwtService.verify(jwt);
	}
}

export default CookieService;
