import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function setupSwagger(app: INestApplication) {
	const title = 'You-know-what NestJS API docs';
	const description = `
	This API documentation contains a detailed description of the backend services of You-know-what

		
	Purpose
		
	1. Understanding the service: To enable developers to understand the main features, endpoints and functionality of the service
	2. Integration guide: Provide a step-by-step guide to integrate or utilize the service
	3. Provide examples: Provide examples and use cases of API calls


	Documentation organization
		
	The API documentation is organized into the following sections
		
	Introduction: Provide a brief introduction to the API and the service
	Endpoints: Includes a list of available endpoints and a description of each
	Requests and responses: Provides detailed information and examples about the format of API requests and responses
	Authentication: Describes the authentication methods and requirements for the API
	Error handling: Provides information about API error codes and error handling
	Usage examples: Shows developers how to use the API, including real-world usage examples
	Troubleshooting guide: Provides information to help you resolve issues you may encounter while using the API
	Resources: Provides resources, links, references, and more to help you use the API
		
		
	Getting started
		
	Before using the API, check out the Authentication guide (link in the Authentication section) to set up your authentication method for the API, and refer to the Requests and responses (link in the Requests and responses section) section to understand the basic request and response formats
		
		
	Need more help?
		
	If you need additional help while using the API documentation, feel free to contact us and our support team will be happy to answer your questions
	We hope that this API documentation will help you utilize our services effectively
	`;
	const version = '1.0.0';
	const config = new DocumentBuilder()
		.setTitle(title)
		.setDescription(description)
		.setVersion(version)
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);
}

export default setupSwagger;
