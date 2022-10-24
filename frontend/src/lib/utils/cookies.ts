import type { Cookies } from '@sveltejs/kit';

/**
 * Utility to set clearing cookie by name.
 */
export function setClearCookies(cookies: Cookies, ...cookieNames: string[]) {
	cookieNames.forEach((c) => {
		cookies.set(c, '', {
			maxAge: -1,
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
		});
	});
}

// export type SetCookieDetails = { name: string; value: string; options: cookie.CookieSerializeOptions };

// /**
//  * Apply set-cookie headers to the passed response with check. By default, this will overwrite any priorly applied
//  * set-cookie header with cookie of corresponding name.
//  *
//  * @param overwrite Defaults to true. Set to false if you want to keep original headers.
//  */
// export function applySetCookieHeaders(res: Response, setCookies: SetCookieDetails[], overwrite: boolean = true) {
// 	// Parsing previously set headers, formatting in preparation of cookie.serialize, merging with new cookieDetails and eliminating duplicate keys.
// 	const merged: SetCookieDetails[] = [
// 		...(!overwrite ? setCookies : []),
// 		...setCookieParser.parse(res.headers.get('set-cookie')).map((cookieDetails) => {
// 			return {
// 				name: cookieDetails.name,
// 				value: cookieDetails.value,
// 				options: {
// 					secure: cookieDetails.secure,
// 					expires: cookieDetails.expires,
// 					maxAge: cookieDetails.maxAge,
// 					httpOnly: cookieDetails.httpOnly,
// 					path: cookieDetails.path,
// 					sameSite:
// 						cookieDetails.sameSite.toLowerCase() === 'true'
// 							? true
// 							: cookieDetails.sameSite.toLowerCase() === 'false'
// 							? false
// 							: (cookieDetails.sameSite as cookie.CookieSerializeOptions['sameSite']),
// 				},
// 			};
// 		}),
// 		...(overwrite ? setCookies : []),
// 	];

// 	const unique = [...new Map(merged.map((cookieDetail) => [cookieDetail.name, cookieDetail])).values()];

// 	// Deleting previously applied headers to start anew.
// 	res.headers.delete('set-cookie');

// 	// Appending combined headers.
// 	unique.forEach((cookieDetail) => {
// 		res.headers.append('set-cookie', cookie.serialize(cookieDetail.name, cookieDetail.value, cookieDetail.options));
// 	});

// 	return res;
// }
