import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
js.configs.recommended,
...tseslint.configs.recommended,
...svelte.configs['flat/recommended'],
prettierConfig,
{
files: ['**/*.{js,mjs,cjs,ts,svelte}'],
plugins: {
prettier
},
languageOptions: {
globals: {
...globals.browser,
...globals.node
},
parserOptions: {
extraFileExtensions: ['.svelte']
}
},
rules: {
'prettier/prettier': 'warn',
'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'svelte/prefer-svelte-reactivity': 'off'
}
},
{
files: ['**/*.svelte'],
languageOptions: {
parserOptions: {
parser: tseslint.parser
}
}
},
{
ignores: [
'.svelte-kit/**',
'build/**',
'dist/**',
'node_modules/**',
'package-lock.json',
'.next/**',
'app/**',
'components/**'
]
}
];
