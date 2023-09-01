import axios from 'axios';
import qs from 'querystring';
const CLIENT_ID = process.env.PAPAGO_CLIENT_ID;
const CLIENT_SECRET = process.env.PAPAGO_CLIENT_SECRET;

export const translate = async (prompt: string) => {
	if (!prompt) {
		throw new Error('Search term should be provided as lookup arguments');
	}

	const url = 'papago/n2mt';
	const params = qs.stringify({ source: 'ko', target: 'en', text: prompt });

	const config = {
		baseURL: 'https://openapi.naver.com/v1/',
		headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Naver-Client-Id': CLIENT_ID,
			'X-Naver-Client-Secret': CLIENT_SECRET,
		},
	};

	const response = await axios.post(url, params, config);

	return response.data.message.result.translatedText;
};
