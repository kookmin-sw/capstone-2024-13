import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import axios, {AxiosResponse, AxiosError} from 'axios';
import { Auth } from 'src/common';

@Controller('test')
@ApiTags('test')
@UseGuards(Auth.Guard.UserJwt)
class TestController {
	@Post('/langserve')
	@ApiOperation({ summary: 'Test langserve' })
	@ApiBody({ schema: { type: 'object', properties: { content: { type: 'string' } } } })
	async langserve(@Req() req: any, @Body('content') content: string): Promise<string> {
		try {
			console.log(req.user);

			return await axios
				.post('http://langserve:8000/v2/chat', { content })
				.then((response: AxiosResponse<any>) => response.data.content)
				.catch((error: AxiosError) => {
					console.log(error);
					return error;
				});
		} catch (error) {
			throw new BadRequestException(`Langserve failed: ${error.status}: ${error.message}`);
		}
	}
}

export default TestController;
