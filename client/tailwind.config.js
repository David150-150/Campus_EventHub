/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors:{
            'background': '#f5f5f5',
            'primary': '#0054B3',
            'secondary': '#D1D5D8',
            'primarydark': '#003B7F',
            'primarylight':'#E6F0FF',
         }

      },
   },
   plugins: [],
};
