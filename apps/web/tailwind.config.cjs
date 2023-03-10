/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    800: "#141E33",
                },
            },
            screens: {
                "2xl": "1736px",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@headlessui/tailwindcss')({ prefix: 'ui' }),
        require('@tailwindcss/line-clamp'),
    ],
    darkMode: "class",
}
