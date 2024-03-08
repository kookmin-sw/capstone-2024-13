import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import GoogleOAuth2Strategy from './google-oauth2.strategy';

@Module({
	imports: [PassportModule],
	providers: [GoogleOAuth2Strategy],
})
class GoogleOAuth2Module {}

export default GoogleOAuth2Module;
