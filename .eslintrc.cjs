module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'eslint-plugin-import', 'eslint-plugin-drizzle'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'import/no-duplicates': 'error',
		'curly': ['error', 'all'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ ignoreRestSiblings: true, destructuredArrayIgnorePattern: '^_' },
		],
	},
};
