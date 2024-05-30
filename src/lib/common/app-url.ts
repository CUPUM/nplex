import { DOMAIN_NAME } from '$env/static/private';

/**
 * Prepend the necessary url components to have a full app url for external use, such as in emails.
 *
 * @param href Application-oriented absolute href, must start with a '/'.
 */
export function appUrl(
	href: string,
	{ protocol = 'https' }: { protocol?: 'https' | undefined } = {}
) {
	return `${protocol}${protocol ? '://' : ''}${DOMAIN_NAME}${href}`;
}
