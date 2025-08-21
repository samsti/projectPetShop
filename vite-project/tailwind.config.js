/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",   // ← must include ts/tsx
    ],
    theme: { extend: {} },
    plugins: [],
}
