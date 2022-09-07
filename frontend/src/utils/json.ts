/**
 * By default, stringification and parsing of JSON doesn't take into account ES6 objects of type Map and Set, and simply
 * stringifies them to empty objects "{}"
 *
 * We here provide both a replacer and a matching reviver function to account for these objects and ensure compatibility
 * with localStorage.
 */
export const ES6JSON = {
	_flag: 'es6-json-reviver-flag',
	/**
	 * Use this function to customize JSON.stringify behavior and ensure persistance of ES6 Maps and Sets.
	 */
	replacer: (key, value) => {
		let _type = null;
		if (value instanceof Map) _type = 'Map';
		if (value instanceof Set) _type = 'Set';

		if (_type) {
			return {
				_flag: ES6JSON._flag,
				_type,
				_value: [...value],
			};
		}
		return value;
	},
	/**
	 * Use this function to customize JSON.parse behavior and ensure proper revival of stringified ES6 Maps and Sets.
	 */
	reviver: (key, value) => {
		if (typeof value === 'object' && value._flag === ES6JSON._flag) {
			if (value._type === 'Map') return new Map(value._value);
			if (value._type === 'Set') return new Set(value._value);
		}
		return value;
	},
};
