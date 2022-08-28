import { rest } from 'msw';

import { API_URL_LOGIN } from '../constants/api-urls';
export const handlers = [
	rest.post(API_URL_LOGIN, (req, res, ctx) => {
		sessionStorage.setItem('is-authenticated', 'true');

		return res(
			ctx.status(200),
		);
	}),
];
