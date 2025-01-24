import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "components/**/*.{ts,tsx}",
    "./src/**/*.{tsx,ts}",
    "./indedx.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
	require('@tailwindcss/typography'),
	require("tailwindcss-animate"),
	require("tailwindcss-line-clamp"),
	plugin(({ addUtilities }) => {
		addUtilities({
			".scrollbar-hide": {
				/* IE and Edge */
				"-ms-overflow-style": "none",
				/* Firefox */
				"scrollbar-width": "none",
				/* Safari and Chrome */
				"&::-webkit-scrollbar": {
					display: "none",
				},
			},
			".text-truncate-3": {
				display: "-webkit-box",
				"-webkit-box-orient": "vertical",
				"-webkit-line-clamp": "3",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			},
			".text-trruncate": {
				display: "-webkit-box",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			},
			".my-scrollbar": { // 
			// 自定义滚动条样式
				"&::-webkit-scrollbar": {
					width: "10px",
					height: "8px",
				},
				"&::-webkit-scrollbar-track": {
					backgroundColor: "#FFFFFF",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#ccc",
					
				},
				"&::-webkit-scrollbar-thumb:hover": {
					backgroundColor: "#E3E3E3",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#E3E3E3",
				},
				cursor: "auto",
			}
		})
	}) 
],
}

