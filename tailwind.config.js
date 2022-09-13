module.exports = {
    theme: {
        content: [
            './src/views/**/*.{pug,html,js}',
            './index.html',
        ],
        colors: {
            'black': '#0D0D0D',
            'white': '#F2F2F2',
            'gray': '#8C8987',
            'green-principal': '#038C25',
            'green-quarter': '#02731E',
            'grenn-medium': '#4D8C68',
            'green-light': '#B6F2CB'
        },
        fontFamily: {
            sans: ["Segoe UI" , 'Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ]
}