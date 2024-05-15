Netlify Link to deployed site:[ (https://resplendent-meerkat-095d5c.netlify.app)](https://resplendent-meerkat-095d5c.netlify.app)

# Song Maker: An app that gives ideas to musicians

## Intro

I created this app to fight against writer's block by giving musicians a list of instruments and chord progressions to add to their compositions.

As musicians, we can often experience a lack of inspiration. This impacts your productivity, leading to delays in musical project completion.

This app is supposed to help you find inspiration by creating 'Fake' Songs. It mashes up different songs based on user-defined criteria, such as genre and danceability, offering new creative insights.

It outputs lyrics and instrumental tracks (piano, guitar… ) to help you get inspired.

## Design

### Color Palette

Primary Color: Light pink - Used for backgrounds to create a soft, welcoming feel. Second Color: Red - Used for buttons and interactive elements to make them stand out

### Fonts (google fonts)

Main Font: "Raleway" - Used for headers and titles. Secondary Font: "Jost" - Used for body text to complement the headers. Third Font: "Rubik Glitch" or certain buttons .

## Initial idea

This was the original idea that I designed beforehand

<img width="503" alt="image" src="https://github.com/Serenwfs/songmaker2/assets/116518998/16e2087f-406d-4f2f-8b65-abfbb1d56656">

<img width="499" alt="image" src="https://github.com/Serenwfs/songmaker2/assets/116518998/c5de0123-cdfd-48c2-8cf7-4d1516f4f93e">

The site looks good on devices of various sizes, from mobile phones to large desktop screens.

## State Management

It uses React's state to track user interactions like inputs and authentication status. State management also handles visibility and content updates like the lists of songs and user profiles, and takes care of reacting to user actions as well as data fetching.

## API

I used a MySQL database created via Python Flask and deployed it using Heroku as my API. Therefore, the songs that I choose, and some combination of danceability and genre, might not output anything.

This is a Next.js project bootstrapped with create-next-app.



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
