/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            'background': '#f5f5f5',
            'primary': '#7E3AF2',
            'secondary': '#D1D5D8',
            'primarydark': '#5521B5',
            'primarylight': '#EDE9FE',
            'accent': {
              'green': '#34D399',
              'pink': '#F472B6',
              'yellow': '#FBBF24',
              'blue': '#60A5FA',
            },
         }
      },
   },
   plugins: [],
};
