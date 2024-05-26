module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:unicorn/recommended',
		'prettier',
		'plugin:import/errors',
		'plugin:import/warnings'
	],
	root: true,
	env: {
		node: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'prettier/prettier': ['error'],
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: '*', next: 'return' },
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
			{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
			{ blankLine: 'always', prev: '*', next: ['if', 'try', 'class', 'function'] },
			{ blankLine: 'always', prev: ['if', 'try', 'class', 'function'], next: '*' }
		],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				pathGroups: [
					{
						pattern: './*.css',
						group: 'index',
						position: 'after'
					}
				],
				pathGroupsExcludedImportTypes: ['builtin'],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				}
			}
		],
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	}
};
