import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type Everything = string | number | boolean | null | undefined | Record<string, unknown>;

@Injectable()
class GoogleJwt extends AuthGuard('google-jwt') {
	handleRequest<TUser>(
		err: Everything,
		user: Everything,
		info: Everything,
		context: ExecutionContext,
		status?: Everything,
	): TUser {
		try {
			return super.handleRequest(err, user, info, context, status);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}

export default GoogleJwt;
