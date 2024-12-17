import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
      //Colors
			colors: {
				base: '#212121',
				gray: {
					base: '#FFFFFF',
					50: '#CDCDCD',
					100: '#9B9B9B',
					200: '#696969',
					300: '#181B1E',
					400: '#121518',
					500: '#0C0F12',
					600: '#06090C'
				},
				opacity: {
					white4: 'rgba(255, 255, 255, 0.04)',
					white8: 'rgba(255, 255, 255, 0.08)',
					white16: 'rgba(255, 255, 255, 0.16)',
          300: 'rgba(24, 27, 30, 0.10)',
					400: 'rgba(18, 21, 24, 0.30)',
					500: 'rgba(12, 15, 18, 0.50)',
					600: 'rgba(6, 9, 12, 0.70)'
				},
				system: {
					success: '#2CB59E',
					successBG: 'rgba(44, 181, 158, 0.2)',
					error: '#FF5C69',
					errorBG: 'rgba(255, 92, 105, 0.2)',
					info: '#6DB5E5',
					infoBG: 'rgba(109, 181, 229, 0.2)'
				}
			},

      // Typography
			fontFamily: {
				sans: ['GIP', 'system-ui', 'sans-serif'],
				heading: ['GIP', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			},
			fontWeight: {
				thin: '100',
				ultralight: '200',
				light: '300',
				normal: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
				extrabold: '800',
				black: '900',
				heavy: '950'
			},

      backdropBlur: {
        8: '8px',
        16: '16px',
        24: '24px',
        40: '40px',
        120: '120px',
      },

			fontSize: {
				// Display
				'display-1': [
					'64px',
					{
						lineHeight: '80px',
						fontWeight: '700' // bold
					}
				],
				'display-2': [
					'56px',
					{
						lineHeight: '68px',
						fontWeight: '500' // bold
					}
				],

				//Headings
				h1: [
					'40px',
					{
						lineHeight: '48px',
						fontWeight: '700', // bold
						letterSpacing: '-0.02em'
					}
				],
				h2: [
					'36px',
					{
						lineHeight: '44px',
						fontWeight: '700',
						letterSpacing: '-0.02em'
					}
				],
				h3: [
					'32px',
					{
						lineHeight: '40px',
						fontWeight: '700',
						letterSpacing: '-0.02em'
					}
				],
				h4: [
					'28px',
					{
						lineHeight: '36px',
						fontWeight: '700',
						letterSpacing: '-0.02em'
					}
				],
				h5: [
					'24px',
					{
						lineHeight: '32px',
						fontWeight: '700',
						letterSpacing: '-0.02em'
					}
				],

				//Body 1 variants
				'body-1-bold': [
					'20px',
					{
						lineHeight: '24px',
						fontWeight: '700'
					}
				],
				'body-1-medium': [
					'20px',
					{
						lineHeight: '24px',
						fontWeight: '500'
					}
				],
				'body-1-regular': [
					'20px',
					{
						lineHeight: '24px',
						fontWeight: '200',
            letterSpacing: '0.2px'
					}
				],

				// Body 2 variants (16px/20px)
				'body-2-bold': [
					'16px',
					{
						lineHeight: '20px',
						fontWeight: '700'
					}
				],
				'body-2-medium': [
					'16px',
					{
						lineHeight: '20px',
						fontWeight: '500'
					}
				],
				'body-2-regular': [
					'16px',
					{
						lineHeight: '20px',
						fontWeight: '400'
					}
				],

				'caption-1-bold': [
					'14px',
					{
						lineHeight: '18px',
						fontWeight: '700'
					}
				],
				'caption-1-medium': [
					'14px',
					{
						lineHeight: '18px',
						fontWeight: '500'
					}
				],
				'caption-1-regular': [
					'14px',
					{
						lineHeight: '18px',
						fontWeight: '400'
					}
				],

				// Caption 2 variants (12px/16px)
				'caption-2-bold': [
					'12px',
					{
						lineHeight: '16px',
						fontWeight: '700'
					}
				],
				'caption-2-medium': [
					'12px',
					{
						lineHeight: '16px',
						fontWeight: '500'
					}
				],
				'caption-2-regular': [
					'12px',
					{
						lineHeight: '16px',
						fontWeight: '400'
					}
				],

				// Button
				'btn-48': [
					'17px',
					{
						lineHeight: '24px',
						fontWeight: '400' // Semi-Bold
					}
				],
				'btn-40': [
					'15px',
					{
						lineHeight: '24px',
            letterSpacing: '0.3px',
						fontWeight: '600' // Semi-Bold
					}
				],
				'btn-32': [
					'13px',
					{
						lineHeight: '16px',
						fontWeight: '600' // Semi-Bold
					}
				],

				// Stylized
				stylized: [
					'16px',
					{
						lineHeight: '20px',
						fontWeight: '500' // Medium
					}
				]
			}
		}
	},

	plugins: [typography, forms, containerQueries,]
} satisfies Config;
