const { S3_BUCKET } = process.env;
const sharp = require('sharp');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const transformationOptions = [
	{ dir: 'w512', width: 512 },
	//  { dir: "w680", width: 680 },
];

exports.handler = async event => {
	try {
		const origin = event.Records[0].s3.object.key;
		const path = origin.split('/')[1];
		const key = origin.split('/')[2];
		const image = await s3.getObject({ Bucket: S3_BUCKET, Key: origin }).promise();

		await Promise.all(
			transformationOptions.map(async ({ dir, width }) => {
				try {
					const newKey = `${dir}/${path}/${key}`;
					const factor =
						dir === 'w512'
							? {
									width,
									height: width,
									fit: 'outside',
							  }
							: {
									width,
							  };
					const resizedImage = await sharp(image.Body).rotate().resize(factor).toBuffer();
					const params = {
						Bucket: S3_BUCKET,
						Key: newKey,
						Body: resizedImage,
					};

					await s3.putObject(params).promise();
				} catch (err) {
					throw err;
				}
			}),
		);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'success' }),
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify(err),
		};
	}
};
