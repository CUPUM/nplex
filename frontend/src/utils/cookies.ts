import cookie from 'cookie';
import setCookieParser from 'set-cookie-parser';

export type SetCookieDetails = Record<string, { value: string; options: cookie.CookieSerializeOptions }>;

/**
 * Apply set-cookie headers to the passed response with check. By default, this will overwrite any priorly applied
 * set-cookie header with cookie of corresponding name.
 *
 * @param overwrite Defaults to true. Set to false if you want to keep original headers.
 */
export function applySetCookieHeaders(res: Response, cookieDetails: SetCookieDetails, overwrite: boolean = true) {
	// Parsing previously set headers, formatting in preparation of cookie.serialize, and merging with new cookieDetails.
	const setCookies = {
		...(!overwrite ? cookieDetails : null),
		...setCookieParser.parse(res.headers.get('set-cookie')).reduce((acc, curr) => {
			acc[curr.name] = {
				value: curr.value,
				options: {
					secure: curr.secure,
					expires: curr.expires,
					maxAge: curr.maxAge,
					httpOnly: curr.httpOnly,
					path: curr.path,
					sameSite:
						curr.sameSite === 'true' || curr.sameSite === 'false'
							? Boolean(curr.sameSite)
							: (curr.sameSite as cookie.CookieSerializeOptions['sameSite']),
				},
			};
			return acc;
		}, {} as SetCookieDetails),
		...(overwrite ? cookieDetails : null),
	};
	// Deleting previously applied headers to start anew.
	res.headers.delete('set-cookie');
	// Appending combined headers.
	Object.keys(setCookies).forEach((cookieName) => {
		res.headers.append(
			'set-cookie',
			cookie.serialize(cookieName, setCookies[cookieName].value, setCookies[cookieName].options)
		);
	});
	return res;
}
