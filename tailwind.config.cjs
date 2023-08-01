/* eslint-disable @typescript-eslint/no-var-requires */
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},

	plugins: [forms, typography]
};

module.exports = config;
