import * as daisyui from 'daisyui';
import * as daisyThemes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	darkMode: 'class',
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				dark: {
					...daisyThemes['[data-theme=dark]'],
					primary: '#4EDADD',

					'primary-focus': '#2BCDCD',
					/*
					'primary-content': '#003642',
          */
					secondary: '#5271FF',
					/*
					'secondary-focus': '#ff8ea1',
					'secondary-content': '#66002c',
          */

					'base-300': '#333f4d',
					'base-200': '#212B36',
					'base-100': '#161C24',
					'base-content': '#fff'
				}
			}
		]
	}
};
/*
          
 "primary": "#4EDADD",
          
 "secondary": "#5271FF",
          
 "accent": "#95042E",
          
 "neutral": "#2d2c3a",
          
 "base-100": "#161C24",
          
 "info": "#84aef5",
          
 "success": "#7be5a9",
          
 "warning": "#c7770f",
          
 "error": "#f62847",

*/
