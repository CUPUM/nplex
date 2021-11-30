export function getSegments(url?: string): string[] {
	url = url || location.pathname;
	return url.replace(/#.*$/,'').replace(/^\/+/, '').split('/').map(segment => '/' + segment);
};

// export function getHash(url?: string): string[] {
// 	return location.hash ? location.hash.replace(/^#/, '').split('=') : [];
// };