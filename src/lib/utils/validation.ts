import type { Key } from './constants';

export function isKey<K extends Key>(maybeKey: unknown, ...key: K[]): maybeKey is K {
	return key.indexOf(maybeKey as K) > -1;
}
