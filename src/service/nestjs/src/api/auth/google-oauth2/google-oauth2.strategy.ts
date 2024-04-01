import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import axios from 'axios';

@Injectable()
class GoogleOAuth2Strategy extends PassportStrategy(Strategy, 'google-oauth2') {
	constructor() {
		const configService: ConfigService = new ConfigService();

		super({
			authorizationURL: `${configService.getOrThrow('GOOGLE_OAUTH_URL')}?access_type=offline&prompt=select_account`,
			tokenURL: configService.getOrThrow('GOOGLE_TOKEN_URL'),
			clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
			clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
			callbackURL: `${configService.getOrThrow('NESTJS_URL')}/auth/google/callback`,
			scope: ['profile', 'email'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Record<string, any>,
		done: (error: any, user: any, info?: any) => void,
	): Promise<void> {
		try {
			const configService: ConfigService = new ConfigService();
			const user = await axios
				.get(configService.getOrThrow('GOOGLE_USERINFO_URL'), {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
				.then((response: { data: { email: any; name: any; }; }) => {
					return {
						email: response.data.email,
						nickname: response.data.name,
					};
				});

			done(null, { user });
		} catch (error) {
			done(error, false);
		}
	}
}

export default GoogleOAuth2Strategy;
